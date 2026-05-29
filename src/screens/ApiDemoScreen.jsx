// // src/screens/ApiDemoScreen.jsx
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
// import Card from '../components/Card';

// export default function ApiDemoScreen() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1. Fetching live data from a public API
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(json => {
//         // 2. Save the API data to our state
//         setData(json);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("API Fetch Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Show a loading spinner while waiting for the internet
//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#3182CE" />
//         <Text style={styles.loadingText}>Fetching live API data...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Specialist Directory</Text>
//       <Text style={styles.subHeader}>(Live API Fetch Demonstration)</Text>
      
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Card
//             title={`Dr. ${item.name}`}
//             subtitle={`Hospital: ${item.company.name}`}
//             details={`Email: ${item.email} | Phone: ${item.phone}`}
//           />
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//     paddingTop: 15,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FA',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#4A5568',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#2D3748',
//   },
//   subHeader: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#718096',
//     marginBottom: 15,
//   }
// });








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
          // OpenStreetMap asks developers to identify their app in the headers
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
      
      {/* Search Bar Area */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder='e.g., "Cardiologist in Paris" or "Clinic near me"'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CustomButton title="Search Live Data" onPress={searchFreeAPI} style={styles.searchBtn} />
      </View>

      {/* Error Handling */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#3182CE" style={{ marginTop: 20 }} />
      ) : (
        /* Results List */
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
    backgroundColor: '#2F855A', // Green button to match the Dashboard API button
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