import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuthStore } from '../store/authStore';
import { useBillStore } from '../store/billStore';
import { uploadBillImage, createBill } from '../api/firebase';
import { mockExtractBillData } from '../api/ai';

interface UploadBillScreenProps {
  navigation: any;
}

export const UploadBillScreen: React.FC<UploadBillScreenProps> = ({ navigation }) => {
  const user = useAuthStore((state: any) => state.user);
  const setCurrentBill = useBillStore((state: any) => state.setCurrentBill);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is needed to take photos');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const processBill = async () => {
    if (!imageUri || !user) return;

    setLoading(true);
    try {
      // Upload image
      const imageUrl = await uploadBillImage(imageUri, user.id);

      // Extract data using AI (using mock for now)
      const ocrResult = await mockExtractBillData(imageUrl);

      // Create bill
      const billId = await createBill({
        createdBy: user.id,
        imageUrl,
        totalAmount: ocrResult.totalAmount,
        items: ocrResult.items,
        tax: ocrResult.tax,
        tip: ocrResult.tip,
        splitType: 'equal',
        createdAt: new Date(),
      });

      // Navigate to split screen
      navigation.navigate('SplitBill', { billId, ocrResult });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Bill</Text>
        <Text style={styles.subtitle}>Take a photo or choose from gallery</Text>
      </View>

      <View style={styles.content}>
        {imageUri ? (
          <Card style={styles.previewCard}>
            <Image source={{ uri: imageUri }} style={styles.preview} />
            <Button
              title="Change Photo"
              onPress={() => setImageUri(null)}
              variant="outline"
            />
          </Card>
        ) : (
          <View style={styles.uploadOptions}>
            <Button
              title="📷 Take Photo"
              onPress={takePhoto}
            />
            <View style={styles.spacer} />
            <Button
              title="🖼️ Choose from Gallery"
              onPress={pickImage}
              variant="secondary"
            />
          </View>
        )}
      </View>

      {imageUri && (
        <View style={styles.footer}>
          <Button
            title="Extract & Continue"
            onPress={processBill}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  uploadOptions: {
    gap: 16,
  },
  spacer: {
    height: 16,
  },
  previewCard: {
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 16,
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
