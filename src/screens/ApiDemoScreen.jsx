import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

export default function ApiDemoScreen() {
  const [searchQuery, setSearchQuery] = useState('Hospital in London');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchFreeAPI = async () => {
    if (!searchQuery) return;
    
    setLoading(true);
    setError('');
    
    // The official OpenStreetMap Free API URL
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=15`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'HospitalAppDemo/1.0'
        }
      });
      
      const data = await response.json();

      if (data && data.length > 0) {
        setPlaces(data);
      } else {
        setError('No results found. Try searching like "Dentist in New York".');
        setPlaces([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Failed to connect to the free API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Global Medical Directory</Text>
      <Text style={styles.subHeader}>Powered by OpenStreetMap (100% Free API)</Text>
      
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder='e.g., "Cardiologist in Paris" or "Clinic near me"'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CustomButton title="Search Live Data" onPress={searchFreeAPI} style={styles.searchBtn} />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#3182CE" style={{ marginTop: 20 }} />
      ) : (
        
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => {
            // OpenStreetMap returns a long display_name. We split it to make it look clean.
            const nameParts = item.display_name.split(', ');
            const title = item.name || nameParts[0]; 
            const details = nameParts.slice(1).join(', ');

            return (
              <Card
                title={title}
                subtitle={`Type: ${item.type.toUpperCase()}`}
                details={`Location: ${details}`}
              />
            );
          }}
          ListEmptyComponent={
            !loading && places.length === 0 && !error ? (
              <Text style={styles.emptyText}>Enter a specialty and city to find real clinics.</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D3748',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 15,
  },
  searchSection: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  searchBtn: {
    marginVertical: 0,
    backgroundColor: '#2F855A',
  },
  errorText: {
    color: '#E53E3E',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0AEC0',
    marginTop: 30,
    fontSize: 16,
  }
});