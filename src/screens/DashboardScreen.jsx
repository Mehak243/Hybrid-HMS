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
      {/* Moved the transparent wash to a dedicated overlay View for better control */}
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerBox}>
            <Text style={styles.greeting}>Welcome Back,</Text>
            <Text style={styles.title}>Admin</Text>
            <Text style={styles.subtitle}>What would you like to manage today?</Text>
          </View>
          
          <View style={styles.grid}>
            {/* Added distinct modern colors for each category */}
            <CustomButton title="🩺 Doctors" color="#0EA5E9" style={styles.gridBtn} onPress={() => navigation.navigate('Doctors')} />
            <CustomButton title="📋 Staff" color="#8B5CF6" style={styles.gridBtn} onPress={() => navigation.navigate('Staff')} />
            <CustomButton title="💉 Nurses" color="#EC4899" style={styles.gridBtn} onPress={() => navigation.navigate('Nurses')} />
            <CustomButton title="🛏️ Patients" color="#14B8A6" style={styles.gridBtn} onPress={() => navigation.navigate('Patients')} />
            <CustomButton title="📅 Appointments" color="#F59E0B" style={styles.gridBtn} onPress={() => navigation.navigate('Appointments')} />
            <CustomButton title="📂 Records" color="#6366F1" style={styles.gridBtn} onPress={() => navigation.navigate('Records')} />
          </View>

          <View style={styles.bottomSection}>
            <CustomButton 
              title="🌐 Externals" 
              color="#1E293B" // Sleek dark slate color
              style={styles.apiBtn} 
              onPress={() => navigation.navigate('ApiDemo')} 
            />

            <CustomButton 
              title="🚪 Logout" 
              color="#EF4444" // Modern red
              style={styles.logoutBtn} 
              onPress={handleLogout} 
            />
          </View>
          
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly brighter glass effect
  },
  container: {
    padding: 24, // Increased padding for breathing room
    flexGrow: 1,
  },
  headerBox: {
    marginBottom: 35,
    marginTop: 40, // Pushed down to avoid phone notch/status bar
    alignItems: 'flex-start', // Left-aligned modern header
  },
  greeting: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -1.5,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    marginTop: 8,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridBtn: {
    width: '47%', // Gives a slightly wider gap between the two columns
    height: 125,
    marginBottom: 16,
    borderRadius: 24, // Deeply rounded 'squircle' look
    elevation: 6, // Soft shadow for Android
    shadowColor: '#000', // Soft shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  bottomSection: {
    marginTop: 'auto', // Pushes the bottom buttons exactly to the end of the screen
    paddingTop: 20,
  },
  apiBtn: {
    width: '100%',
    height: 60,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 4,
  },
  logoutBtn: {
    width: '100%',
    height: 60,
    marginBottom: 10,
    borderRadius: 16,
    elevation: 4,
  }
});