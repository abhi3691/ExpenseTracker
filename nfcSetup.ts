import NfcManager from 'react-native-nfc-manager';

// Initialize NFC
export const initializeNFC = async (): Promise<void> => {
  await NfcManager.start();
};
