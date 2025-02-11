import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const NFCSender: React.FC = () => {
  const id = '1234535436546';
  const [isNfcSupported, setIsNfcSupported] = useState<boolean>(true);

  useEffect(() => {
    const checkNFC = async () => {
      const supported = await NfcManager.isSupported();
      if (!supported) {
        setIsNfcSupported(false);
        Alert.alert('NFC Not Supported', 'This device does not support NFC.');
      } else {
        await NfcManager.start(); // Initialize NFC Manager
      }
    };

    checkNFC();
  }, []);

  const writeNFC = async (): Promise<void> => {
    if (!isNfcSupported) {
      Alert.alert('Error', 'NFC is not supported on this device.');
      return;
    }

    try {
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        Alert.alert('NFC Disabled', 'Please enable NFC in settings.');
        return;
      }

      await NfcManager.requestTechnology(NfcTech.Ndef);
      const message = Ndef.encodeMessage([Ndef.textRecord(id)]);

      if (message) {
        await NfcManager.ndefHandler.writeNdefMessage(message);
        Alert.alert('Success', 'ID sent via NFC!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send ID');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.idText}>ID {id}</Text>
      <Text style={styles.text}>NFC Sender</Text>
      <Button
        title="Send ID via NFC"
        onPress={writeNFC}
        disabled={!isNfcSupported}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default NFCSender;
