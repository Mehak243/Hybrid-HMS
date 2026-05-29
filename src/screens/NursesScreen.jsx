import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';

const nurses = [
  { id: '1', name: 'Nurse Joy', ward: 'Pediatrics', phone: '555-0301', image: require('../../assets/images/nurse1.jpg') },
  { id: '2', name: 'Nurse Clara', ward: 'ICU', phone: '555-0302', image: require('../../assets/images/nurse1.jpg') },
  { id: '3', name: 'Nurse Sam', ward: 'Emergency', phone: '555-0303', image: require('../../assets/images/nurse1.jpg') },
];

export default function NursesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={nurses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imageSource={item.image}
            title={item.name}
            subtitle={`Ward: ${item.ward}`}
            details={`Phone: ${item.phone}`}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingTop: 10 }
});