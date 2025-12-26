import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from '../components/Button';
import { signInWithGoogle } from '../api/firebase';
import { useAuthStore } from '../store/authStore';

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      setUser(user);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>💸</Text>
        <Text style={styles.title}>BillSplit+</Text>
        <Text style={styles.subtitle}>
          Snap. Split. Pay.{'\n'}In under a minute.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue with Google"
          onPress={handleGoogleSignIn}
          loading={loading}
        />
        <Text style={styles.terms}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    paddingBottom: 48,
  },
  terms: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
});
