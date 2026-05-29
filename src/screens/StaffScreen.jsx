import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';

const staffMembers = [
  { id: '1', name: 'Alice Cooper', role: 'Receptionist', phone: '555-0201', image: require('../../assets/images/staff1.jpg') },
  { id: '2', name: 'John Doe', role: 'Janitor', phone: '555-0202', image: require('../../assets/images/staff1.jpg') },
  { id: '3', name: 'Mary Smith', role: 'IT Support', phone: '555-0203', image: require('../../assets/images/staff1.jpg') },
];

export default function StaffScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={staffMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imageSource={item.image}
            title={item.name}
            subtitle={item.role}
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