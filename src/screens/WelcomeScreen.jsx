import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../../assets/images/bg.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Nexus Hospital</Text>
        <Text style={styles.subtitle}>Management Portal</Text>
        
        <CustomButton 
          title="Get Started" 
          onPress={() => navigation.navigate('Login')} 
          style={styles.button}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'extrabold',
    color: '#1A365D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 40,
    fontWeight: '500',
  },
  button: {
    width: '85%',
    paddingVertical: 15,
    borderRadius: 30,
  }
});