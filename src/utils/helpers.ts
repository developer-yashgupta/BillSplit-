export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const splitEqually = (total: number, people: number): number => {
  return Math.round((total / people) * 100) / 100;
};

export const calculateTotalOwed = (participants: any[], userId: string): number => {
  return participants
    .filter(p => p.userId === userId && p.status === 'unpaid')
    .reduce((sum, p) => sum + p.amountToPay, 0);
};

export const calculateTotalOwedToYou = (participants: any[], userId: string, bills: any[]): number => {
  const yourBills = bills.filter((b: any) => b.createdBy === userId);
  const yourBillIds = yourBills.map((b: any) => b.id);
  
  return participants
    .filter((p: any) => yourBillIds.indexOf(p.billId) !== -1 && p.userId !== userId && p.status === 'unpaid')
    .reduce((sum: number, p: any) => sum + p.amountToPay, 0);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const validateUPIId = (upiId: string): boolean => {
  const upiRegex = /^[\w.-]+@[\w.-]+$/;
  return upiRegex.test(upiId);
};
