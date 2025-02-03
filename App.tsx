import {SafeAreaView, StatusBar} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {initDB} from './src/database';
import FlashMessage from 'react-native-flash-message';
import styles from './src/screens/LoginScreen/styles';

const App = () => {
  const loadData = useCallback(async () => {
    try {
      initDB();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <FlashMessage position="top" floating={true} animationDuration={250} />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
