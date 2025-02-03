import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import CardCompontent from './components/organization/CardCompontent';
import HomeHeader from './components/organization/HomeHeader';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('MangeExpenseScreen');
  };
  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.cardContainer}>
        <CardCompontent
          title="Manage Expense"
          iconName="bank"
          onPress={() => handleNavigation()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
