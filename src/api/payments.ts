import { Linking } from 'react-native';

export interface UPIPaymentParams {
    upiId: string;
    name: string;
    amount: number;
    note?: string;
}

export const generateUPILink = (params: UPIPaymentParams): string => {
    const { upiId, name, amount, note = 'BillSplit+' } = params;

    const encodedName = encodeURIComponent(name);
    const encodedNote = encodeURIComponent(note);

    return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR&tn=${encodedNote}`;
};

export const openUPIPayment = async (params: UPIPaymentParams): Promise<boolean> => {
    const upiLink = generateUPILink(params);

    try {
        const canOpen = await Linking.canOpenURL(upiLink);
        if (canOpen) {
            await Linking.openURL(upiLink);
            return true;
        } else {
            console.error('No UPI app found');
            return false;
        }
    } catch (error) {
        console.error('Error opening UPI payment:', error);
        return false;
    }
};

// For Razorpay integration (Phase 2)
export const createRazorpayOrder = async (amount: number, userId: string) => {
    // TODO: Implement Razorpay order creation via Cloud Function
    throw new Error('Razorpay integration not implemented yet');
};
