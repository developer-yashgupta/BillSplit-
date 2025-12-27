import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Share } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getParticipantsByBill, updateParticipantStatus } from '../api/firebase';
import { openUPIPayment } from '../api/payments';
import { formatCurrency } from '../utils/helpers';
import { BillParticipant } from '../types';

interface PaymentScreenProps {
  navigation: any;
  route: any;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation, route }) => {
  const { billId } = route.params;
  const [participants, setParticipants] = useState<BillParticipant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      const data = await getParticipantsByBill(billId);
      setParticipants(data);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (participant: BillParticipant) => {
    if (!participant.upiPaymentLink) {
      Alert.alert('Error', 'UPI payment link not available');
      return;
    }

    const success = await openUPIPayment({
      upiId: participant.userUpiId || '',
      name: participant.userName,
      amount: participant.amountToPay,
      note: 'BillSplit+ Payment',
    });

    if (success) {
      Alert.alert(
        'Payment Initiated',
        'Please complete the payment in your UPI app',
        [
          {
            text: 'Mark as Paid',
            onPress: () => markAsPaid(participant.id),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const markAsPaid = async (participantId: string) => {
    try {
      await updateParticipantStatus(participantId, 'paid');
      await loadParticipants();
      Alert.alert('Success', 'Payment marked as paid');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const sharePaymentLink = async (participant: BillParticipant) => {
    if (!participant.upiPaymentLink) return;

    try {
      await Share.share({
        message: `Hi ${participant.userName}! Please pay ${formatCurrency(participant.amountToPay)} for our bill split.\n\nPay here: ${participant.upiPaymentLink}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const unpaidCount = participants.filter((p: any) => p.status === 'unpaid').length;
  const paidCount = participants.filter((p: any) => p.status === 'paid').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Status</Text>
        <Card style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusValue}>{paidCount}</Text>
              <Text style={styles.statusLabel}>Paid</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statusItem}>
              <Text style={[styles.statusValue, styles.unpaidValue]}>{unpaidCount}</Text>
              <Text style={styles.statusLabel}>Pending</Text>
            </View>
          </View>
        </Card>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Participants</Text>
        
        {participants.map((participant: any) => (
          <Card key={participant.id} style={styles.participantCard}>
            <View style={styles.participantHeader}>
              <View style={styles.participantInfo}>
                <Text style={styles.participantName}>{participant.userName}</Text>
                <Text style={styles.participantAmount}>
                  {formatCurrency(participant.amountToPay)}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                participant.status === 'paid' ? styles.paidBadge : styles.unpaidBadge
              ]}>
                <Text style={[
                  styles.statusText,
                  participant.status === 'paid' ? styles.paidText : styles.unpaidText
                ]}>
                  {participant.status === 'paid' ? '✓ Paid' : 'Pending'}
                </Text>
              </View>
            </View>

            {participant.status === 'unpaid' && participant.upiPaymentLink && (
              <View style={styles.actions}>
                <Button
                  title="Pay Now"
                  onPress={() => handlePayment(participant)}
                  variant="secondary"
                />
                <View style={styles.actionSpacer} />
                <Button
                  title="Share Link"
                  onPress={() => sharePaymentLink(participant)}
                  variant="outline"
                />
              </View>
            )}
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
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
  statusCard: {
    backgroundColor: '#f0f9ff',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  unpaidValue: {
    color: '#f59e0b',
  },
  statusLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e7eb',
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
  participantCard: {
    marginBottom: 12,
  },
  participantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  participantAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  paidBadge: {
    backgroundColor: '#d1fae5',
  },
  unpaidBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  paidText: {
    color: '#065f46',
  },
  unpaidText: {
    color: '#92400e',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionSpacer: {
    width: 12,
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
