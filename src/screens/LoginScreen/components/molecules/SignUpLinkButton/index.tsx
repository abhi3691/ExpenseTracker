import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const SignUpLinkButton = () => {
  const navigation: NativeStackNavigationProp<ParamListBase> = useNavigation();

  const handleNavigateToSignup = () => {
    navigation.navigate('RegisterScreen');
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigateToSignup()}>
      <Text style={styles.infotext}>
        Dont have an account? <Text style={styles.link}>SignUp</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default SignUpLinkButton;
