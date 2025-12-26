import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { useBillStore } from '../store/billStore';
import { getBillsByUser } from '../api/firebase';
import { formatCurrency, formatDate } from '../utils/helpers';

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const user = useAuthStore((state: any) => state.user);
  const bills = useBillStore((state: any) => state.bills);
  const setBills = useBillStore((state: any) => state.setBills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    if (!user) return;
    try {
      const userBills = await getBillsByUser(user.id);
      setBills(userBills);
    } catch (error) {
      console.error('Error loading bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalOwed = 0; // TODO: Calculate from participants
  const totalOwedToYou = 0; // TODO: Calculate from participants

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.name?.split(' ')[0]}! 👋</Text>
        <Text style={styles.subtitle}>Here's your expense summary</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          <Card style={[styles.summaryCard, styles.owedCard]}>
            <Text style={styles.summaryLabel}>You Owe</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalOwed)}</Text>
          </Card>
          
          <Card style={[styles.summaryCard, styles.owedToYouCard]}>
            <Text style={styles.summaryLabel}>Owed to You</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalOwedToYou)}</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Bills</Text>
          
          {bills.length === 0 ? (
            <Card>
              <Text style={styles.emptyText}>No bills yet. Create your first one!</Text>
            </Card>
          ) : (
            bills.map((bill: any) => (
              <TouchableOpacity
                key={bill.id}
                onPress={() => navigation.navigate('BillDetails', { billId: bill.id })}
              >
                <Card style={styles.billCard}>
                  <View style={styles.billHeader}>
                    <Text style={styles.billAmount}>{formatCurrency(bill.totalAmount)}</Text>
                    <Text style={styles.billDate}>{formatDate(bill.createdAt)}</Text>
                  </View>
                  <Text style={styles.billType}>{bill.splitType} split</Text>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="+ New Bill"
          onPress={() => navigation.navigate('UploadBill')}
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
  greeting: {
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
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
  },
  owedCard: {
    backgroundColor: '#fef2f2',
  },
  owedToYouCard: {
    backgroundColor: '#f0fdf4',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  billCard: {
    marginBottom: 12,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  billDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  billType: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    paddingVertical: 24,
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
