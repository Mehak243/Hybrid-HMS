import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const initialRecords = [
  { id: '1', patient: 'Tom Hanks', type: 'Billing', details: '$500', status: 'Paid', date: '2026-05-01' },
  { id: '2', patient: 'Emma Watson', type: 'Prescription', details: 'Painkillers', status: 'Dispensed', date: '2026-05-05' },
];

export default function RecordsScreen() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ patient: '', type: '', details: '', status: '', date: '' });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@records_data');
      if (storedData !== null) {
        setRecords(JSON.parse(storedData));
      } else {
        setRecords(initialRecords);
        await AsyncStorage.setItem('@records_data', JSON.stringify(initialRecords));
      }
    } catch (error) {
      console.error("Error loading records", error);
    }
  };

  const handleAddRecord = async () => {
    if (form.patient && form.type) {
      const newRecord = { id: Date.now().toString(), ...form };
      const updatedRecords = [...records, newRecord];
      
      setRecords(updatedRecords);
      setModalVisible(false);
      setForm({ patient: '', type: '', details: '', status: '', date: '' });

      try {
        await AsyncStorage.setItem('@records_data', JSON.stringify(updatedRecords));
      } catch (error) {
        console.error("Error saving record", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const updatedRecords = records.filter(rec => rec.id !== id);
    setRecords(updatedRecords);
    
    try {
      await AsyncStorage.setItem('@records_data', JSON.stringify(updatedRecords));
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  const filteredRecords = records.filter(record => 
    record.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Patient Name..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={`Patient: ${item.patient}`}
            subtitle={`Type: ${item.type} | Date: ${item.date}`}
            details={`Details/Amount: ${item.details} - Status: ${item.status}`}
          >
            <CustomButton 
              title="Delete" 
              color="#D9534F" 
              style={{ paddingVertical: 6, paddingHorizontal: 12, marginVertical: 0 }}
              onPress={() => handleDelete(item.id)} 
            />
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No records found.</Text>}
      />

      <CustomButton title="Add New Record" onPress={() => setModalVisible(true)} style={styles.addBtn} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Record</Text>
            
            <TextInput style={styles.input} placeholder="Patient Name" value={form.patient} onChangeText={(t) => setForm({...form, patient: t})} />
            <TextInput style={styles.input} placeholder="Type (Billing, Prescription, etc.)" value={form.type} onChangeText={(t) => setForm({...form, type: t})} />
            <TextInput style={styles.input} placeholder="Details or Amount" value={form.details} onChangeText={(t) => setForm({...form, details: t})} />
            <TextInput style={styles.input} placeholder="Status (Paid, Pending, etc.)" value={form.status} onChangeText={(t) => setForm({...form, status: t})} />
            <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={form.date} onChangeText={(t) => setForm({...form, date: t})} />
            
            <CustomButton title="Save Record" onPress={handleAddRecord} />
            <CustomButton title="Cancel" color="#6c757d" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  searchContainer: { padding: 16, backgroundColor: '#fff', elevation: 2 },
  searchInput: { backgroundColor: '#eee', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 },
  addBtn: { margin: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 15, fontSize: 16, paddingVertical: 8 }
});