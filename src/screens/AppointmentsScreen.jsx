import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const initialAppointments = [
  { id: '1', patientName: 'Alishba', doctorName: 'Dr. Shayan', date: '2026-05-10', time: '10:00 AM' },
  { id: '2', patientName: 'Simran', doctorName: 'Dr. Ibrahim', date: '2026-05-11', time: '02:30 PM' },
];

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '', time: '' });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@appointments_data');
      if (storedData !== null) {
        setAppointments(JSON.parse(storedData));
      } else {
        setAppointments(initialAppointments);
        await AsyncStorage.setItem('@appointments_data', JSON.stringify(initialAppointments));
      }
    } catch (error) {
      console.error("Error loading appointments", error);
    }
  };

  const handleAdd = async () => {
    if(form.patientName && form.doctorName) {
      const newAppt = { id: Date.now().toString(), ...form };
      const updatedAppointments = [...appointments, newAppt];
      
      setAppointments(updatedAppointments);
      setModalVisible(false);
      setForm({ patientName: '', doctorName: '', date: '', time: '' });

      try {
        await AsyncStorage.setItem('@appointments_data', JSON.stringify(updatedAppointments));
      } catch (error) {
        console.error("Error saving appointment", error);
      }
    }
  };

  const handleCancel = async (id) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);

    try {
      await AsyncStorage.setItem('@appointments_data', JSON.stringify(updatedAppointments));
    } catch (error) {
      console.error("Error cancelling appointment", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={`Patient: ${item.patientName}`}
            subtitle={`Doctor: ${item.doctorName}`}
            details={`Date: ${item.date} | Time: ${item.time}`}
          >
            <CustomButton 
              title="Cancel/Remove Appt." 
              color="#D9534F" 
              style={{ paddingVertical: 6, paddingHorizontal: 12, marginVertical: 0 }}
              onPress={() => handleCancel(item.id)} 
            />
          </Card>
        )}
      />
      <CustomButton title="Book Appointment" onPress={() => setModalVisible(true)} style={styles.addBtn} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <TextInput style={styles.input} placeholder="Patient Name" value={form.patientName} onChangeText={(t) => setForm({...form, patientName: t})} />
            <TextInput style={styles.input} placeholder="Doctor Name" value={form.doctorName} onChangeText={(t) => setForm({...form, doctorName: t})} />
            <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={form.date} onChangeText={(t) => setForm({...form, date: t})} />
            <TextInput style={styles.input} placeholder="Time (HH:MM AM/PM)" value={form.time} onChangeText={(t) => setForm({...form, time: t})} />
            <CustomButton title="Confirm" onPress={handleAdd} />
            <CustomButton title="Close" color="#6c757d" onPress={() => setModalVisible(false)} />
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