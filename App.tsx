import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { UploadBillScreen } from './src/screens/UploadBillScreen';
import { SplitBillScreen } from './src/screens/SplitBillScreen';
import { PaymentScreen } from './src/screens/PaymentScreen';
import { useAuthStore } from './src/store/authStore';
import { onAuthChange } from './src/api/firebase';

const Stack = createStackNavigator();

export default function App() {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="UploadBill" component={UploadBillScreen} />
            <Stack.Screen name="SplitBill" component={SplitBillScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
