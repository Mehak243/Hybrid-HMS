import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const predefinedPatients = [
  { id: '1', name: 'Alishba', age: '25', disease: 'Flu', room: '101A', contact: '555-0401' },
  { id: '2', name: 'Simran', age: '30', disease: 'Migraine', room: '102B', contact: '555-0402' },
];

export default function PatientsScreen() {
  const [patients, setPatients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', disease: '', room: '', contact: '' });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@patients_data');
      if (storedData !== null) {
        setPatients(JSON.parse(storedData));
      } else {
        setPatients(predefinedPatients);
        await AsyncStorage.setItem('@patients_data', JSON.stringify(predefinedPatients));
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  const handleAddPatient = async () => {
    if (form.name && form.disease) {
      const newPatient = { id: Date.now().toString(), ...form };
      const updatedPatients = [...patients, newPatient];
      
      setPatients(updatedPatients);
      setModalVisible(false);
      setForm({ name: '', age: '', disease: '', room: '', contact: '' });

      try {
        await AsyncStorage.setItem('@patients_data', JSON.stringify(updatedPatients));
      } catch (error) {
        console.error("Error saving data", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const updatedPatients = patients.filter(p => p.id !== id);
    setPatients(updatedPatients);
    
    try {
      await AsyncStorage.setItem('@patients_data', JSON.stringify(updatedPatients));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imageSource={require('../../assets/images/patient1.jpg')}
            title={item.name}
            subtitle={`Age: ${item.age} | Room: ${item.room}`}
            details={`Disease: ${item.disease} | Contact: ${item.contact}`}
          >
            <CustomButton 
              title="Delete" 
              color="#D9534F" 
              style={{ paddingVertical: 6, paddingHorizontal: 12, marginVertical: 0 }}
              onPress={() => handleDelete(item.id)} 
            />
          </Card>
        )}
      />
      
      <CustomButton title="Admit Patient" onPress={() => setModalVisible(true)} style={styles.addBtn} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Admit New Patient</Text>
            <TextInput style={styles.input} placeholder="Patient Name" value={form.name} onChangeText={(t) => setForm({...form, name: t})} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={form.age} onChangeText={(t) => setForm({...form, age: t})} />
            <TextInput style={styles.input} placeholder="Disease/Diagnosis" value={form.disease} onChangeText={(t) => setForm({...form, disease: t})} />
            <TextInput style={styles.input} placeholder="Room Number" value={form.room} onChangeText={(t) => setForm({...form, room: t})} />
            <TextInput style={styles.input} placeholder="Contact" value={form.contact} onChangeText={(t) => setForm({...form, contact: t})} />
            <CustomButton title="Save Record" onPress={handleAddPatient} />
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