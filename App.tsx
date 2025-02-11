import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {initializeNFC} from './nfcSetup';
import NFCSender from './NFCSender';

const App: React.FC = () => {
  useEffect(() => {
    initializeNFC();
  }, []);

  return (
    <View style={styles.container}>
      <NFCSender />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
