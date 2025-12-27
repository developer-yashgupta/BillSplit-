import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { createBillParticipants } from '../api/firebase';
import { generateUPILink } from '../api/payments';
import { splitEqually, formatCurrency } from '../utils/helpers';
import { Contact, BillParticipant } from '../types';

interface SplitBillScreenProps {
  navigation: any;
  route: any;
}

export const SplitBillScreen: React.FC<SplitBillScreenProps> = ({ navigation, route }) => {
  const { billId, ocrResult } = route.params;
  const user = useAuthStore((state: any) => state.user);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      // Map expo-contacts to our Contact type
      const mappedContacts = data.slice(0, 20).map((c: any) => ({
        id: c.id || '',
        name: c.name || 'Unknown',
        phoneNumbers: c.phoneNumbers,
      }));
      setContacts(mappedContacts);
    }
  };

  const toggleContact = (contact: Contact) => {
    if (selectedContacts.find((c: any) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c: any) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const createSplit = async () => {
    if (selectedContacts.length === 0) {
      Alert.alert('Error', 'Please select at least one person');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      const totalPeople = selectedContacts.length + 1; // +1 for current user
      const amountPerPerson = splitEqually(ocrResult.totalAmount, totalPeople);

      const participants: Omit<BillParticipant, 'id'>[] = [
        // Current user
        {
          billId,
          userId: user.id,
          userName: user.name,
          userPhone: user.phone,
          userUpiId: user.upiId,
          amountToPay: amountPerPerson,
          status: 'paid', // Creator is marked as paid
          reminderSent: false,
        },
        // Selected contacts
        ...selectedContacts.map((contact: any) => ({
          billId,
          userId: contact.id,
          userName: contact.name,
          userPhone: contact.phoneNumbers?.[0]?.number,
          userUpiId: undefined,
          amountToPay: amountPerPerson,
          status: 'unpaid' as const,
          upiPaymentLink: user.upiId ? generateUPILink({
            upiId: user.upiId,
            name: user.name,
            amount: amountPerPerson,
            note: `Bill split via BillSplit+`,
          }) : undefined,
          reminderSent: false,
        })),
      ];

      await createBillParticipants(participants);

      Alert.alert('Success', 'Bill split created!', [
        { text: 'OK', onPress: () => navigation.navigate('Payment', { billId }) }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const amountPerPerson = selectedContacts.length > 0 
    ? splitEqually(ocrResult.totalAmount, selectedContacts.length + 1)
    : ocrResult.totalAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Split Bill</Text>
        <Card style={styles.summaryCard}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{formatCurrency(ocrResult.totalAmount)}</Text>
          <Text style={styles.perPersonLabel}>
            {formatCurrency(amountPerPerson)} per person ({selectedContacts.length + 1} people)
          </Text>
        </Card>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select People</Text>
        
        {contacts.map((contact: any) => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => toggleContact(contact)}
          >
            <Card style={[
              styles.contactCard,
              selectedContacts.find((c: any) => c.id === contact.id) && styles.selectedCard
            ]}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                {contact.phoneNumbers?.[0] && (
                  <Text style={styles.contactPhone}>
                    {contact.phoneNumbers[0].number}
                  </Text>
                )}
              </View>
              {selectedContacts.find((c: any) => c.id === contact.id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Split with ${selectedContacts.length} ${selectedContacts.length === 1 ? 'person' : 'people'}`}
          onPress={createSplit}
          loading={loading}
          disabled={selectedContacts.length === 0}
        />
      </View>
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
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#f0f9ff',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  perPersonLabel: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#6b7280',
  },
  checkmark: {
    fontSize: 24,
    color: '#10b981',
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
