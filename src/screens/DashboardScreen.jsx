import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function DashboardScreen({ navigation }) {
  
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bg.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.title}>Welcome, Admin</Text>
          <Text style={styles.subtitle}>What would you like to manage today?</Text>
        </View>
        
        <View style={styles.grid}>
          <CustomButton title="🩺 Doctors" style={styles.gridBtn} onPress={() => navigation.navigate('Doctors')} />
          <CustomButton title="📋 Staff" style={styles.gridBtn} onPress={() => navigation.navigate('Staff')} />
          <CustomButton title="💉 Nurses" style={styles.gridBtn} onPress={() => navigation.navigate('Nurses')} />
          <CustomButton title="🛏️ Patients" style={styles.gridBtn} onPress={() => navigation.navigate('Patients')} />
          <CustomButton title="📅 Appointments" style={styles.gridBtn} onPress={() => navigation.navigate('Appointments')} />
          <CustomButton title="📂 Records" style={styles.gridBtn} onPress={() => navigation.navigate('Records')} />
        </View>

        <CustomButton 
          title="🌐 Externals" 
          color="#2F855A"
          style={styles.apiBtn} 
          onPress={() => navigation.navigate('ApiDemo')} 
        />

        <CustomButton 
          title="🚪 Logout" 
          color="#E53E3E" 
          style={styles.logoutBtn} 
          onPress={handleLogout} 
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    //height: '100%',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerBox: {
    marginBottom: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 16,
    color: '#26282b',
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridBtn: {
    width: '48%',
    height: 110,
    marginBottom: 15,
    backgroundColor: '#3182CE',
    borderRadius: 15,
  },
  apiBtn: {
    width: '100%',
    height: 60,
    marginBottom: 20,
    borderRadius: 15,
  },
  logoutBtn: {
    marginTop: 'auto',
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 14,
  }
});