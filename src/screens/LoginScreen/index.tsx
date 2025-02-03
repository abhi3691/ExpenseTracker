/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import styles from './styles';
import TextButton from '../../components/TextButton';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from './constants/loginSchema';
import {ControllerInput} from '../../components/ControllerInput';
import SignUpLinkButton from './components/molecules/SignUpLinkButton';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../store';
import {login} from '../../store/slices/authSlice';

const LoginScreen = () => {
  const isFocued = useIsFocused();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    loading: loginLoading,
    error,
  } = useSelector((state: any) => state.auth); // Access Redux state
  const {control, handleSubmit, reset} = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useLayoutEffect(() => {
    if (isFocued) {
      reset();
    }
  }, [isFocued]);

  const onSubmit = (data: loginSchema) => {
    handleLogin(data);
  };

  const handleLogin = async (data: loginSchema) => {
    dispatch(login({email: data?.email, password: data?.password}));
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <ControllerInput control={control} name="email" placeholder="Email" />
      <ControllerInput
        control={control}
        name="password"
        placeholder="Password"
        isPassword
        onShowPassword={() => handleShowHidePassword()}
        secureTextEntry={!showPassword}
      />
      <View style={styles.buttonContainer}>
        <TextButton
          title="Login"
          onPress={handleSubmit(onSubmit)}
          isLoading={loginLoading}
        />
      </View>
      <SignUpLinkButton />
    </View>
  );
};

export default LoginScreen;
