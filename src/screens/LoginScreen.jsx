import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { validateEmail, validateLogin } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) return setError('Please fill in all fields.');
    if (!validateEmail(email)) return setError('Invalid email format.');
    if (validateLogin(email, password, 'admin@hospital.com', 'Admin123')) {
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        
        <View style={styles.branding}>
          <Text style={styles.logoText}>HM</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Welcome Back</Text>
          <Text style={styles.subHeader}>Log in to manage the hospital</Text>
          
          <TextInput
            style={styles.input} placeholder="admin@hospital.com" placeholderTextColor="#94A3B8"
            value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"
          />
          <TextInput
            style={styles.input} placeholder="Password" placeholderTextColor="#94A3B8"
            value={password} onChangeText={setPassword} secureTextEntry
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <CustomButton title="Sign In" onPress={handleLogin} style={styles.button} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(15, 23, 42, 0.6)' },
  
  branding: { alignSelf: 'center', backgroundColor: '#0EA5E9', width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 10 },
  logoText: { color: '#FFF', fontSize: 32, fontWeight: '900', letterSpacing: 1 },
  
  card: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 30, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20 },
  header: { fontSize: 28, fontWeight: '900', color: '#0F172A', textAlign: 'center', marginBottom: 4 },
  subHeader: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 30 },
  
  input: {
    height: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: { marginTop: 10, borderRadius: 16 },
  errorText: { color: '#EF4444', textAlign: 'center', marginBottom: 15, fontWeight: '600' }
});