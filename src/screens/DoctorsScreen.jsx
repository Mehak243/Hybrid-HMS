import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const initialDoctors = [
  { id: '1', name: 'Dr. Shayan', specialty: 'Cardiology', phone: '555-0101', email: 'sarah@hospital.com' },
  { id: '2', name: 'Dr. Suhaib', specialty: 'Neurology', phone: '555-0102', email: 'mark@hospital.com' },
  { id: '3', name: 'Dr. Ibrahim', specialty: 'Pediatrics', phone: '555-0103', email: 'emily@hospital.com' },
];

export default function DoctorsScreen() {
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [newDoc, setNewDoc] = useState({ name: '', specialty: '', phone: '', email: '' });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@doctors_data');
      if (storedData !== null) {
        setDoctors(JSON.parse(storedData));
      } else {
        setDoctors(initialDoctors);
        await AsyncStorage.setItem('@doctors_data', JSON.stringify(initialDoctors));
      }
    } catch (error) {
      console.error("Error loading doctors", error);
    }
  };

  const handleAddDoctor = async () => {
    if(newDoc.name && newDoc.specialty) {
      const newDoctorEntry = { 
        id: Date.now().toString(), 
        ...newDoc 
      };
      const updatedDoctors = [...doctors, newDoctorEntry];
      
      setDoctors(updatedDoctors);
      setModalVisible(false);
      
      setNewDoc({ name: '', specialty: '', phone: '', email: '' });

      try {
        await AsyncStorage.setItem('@doctors_data', JSON.stringify(updatedDoctors));
      } catch (error) {
        console.error("Error saving doctor", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const updatedDoctors = doctors.filter(doc => doc.id !== id);
    setDoctors(updatedDoctors);
    
    try {
      await AsyncStorage.setItem('@doctors_data', JSON.stringify(updatedDoctors));
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imageSource={require('../../assets/images/doctor1.jpg')}
            title={item.name}
            subtitle={item.specialty}
            details={`${item.phone} | ${item.email}`}
          >
            <CustomButton 
              title="Remove" 
              color="#D9534F" 
              style={{ paddingVertical: 6, paddingHorizontal: 12, marginVertical: 0 }}
              onPress={() => handleDelete(item.id)} 
            />
          </Card>
        )}
      />
      <CustomButton title="Add New Doctor" onPress={() => setModalVisible(true)} style={styles.addBtn} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Doctor</Text>
            <TextInput style={styles.input} placeholder="Name" value={newDoc.name} onChangeText={(t) => setNewDoc({...newDoc, name: t})} />
            <TextInput style={styles.input} placeholder="Specialty" value={newDoc.specialty} onChangeText={(t) => setNewDoc({...newDoc, specialty: t})} />
            <TextInput style={styles.input} placeholder="Phone" value={newDoc.phone} onChangeText={(t) => setNewDoc({...newDoc, phone: t})} />
            
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              value={newDoc.email} 
              onChangeText={(t) => setNewDoc({...newDoc, email: t})} 
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomButton title="Save" onPress={handleAddDoctor} />
            <CustomButton title="Cancel" color="#6c757d" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  addBtn: { margin: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 15, fontSize: 16, paddingVertical: 8 }
});