import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const NFCReceiver: React.FC = () => {
  const [receivedId, setReceivedId] = useState<string | null>(null);

  const readNFC = async (): Promise<void> => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      if (tag && tag.ndefMessage) {
        const decodedText = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
        setReceivedId(decodedText);
        Alert.alert('Success', `Received ID: ${decodedText}`);
      } else {
        Alert.alert('No Data', 'NFC tag is empty');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read NFC');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NFC Receiver</Text>
      <Text style={styles.text}>Received ID: {receivedId || 'None'}</Text>
      <Button title="Read NFC ID" onPress={readNFC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18, marginBottom: 10},
});

export default NFCReceiver;
