import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import TextButton from '../../components/TextButton';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from './constants/registerSchema';
import {ControllerInput} from '../../components/ControllerInput';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../store/slices/authSlice';
import NavigaionHeader from '../../components/NavigaionHeader';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowPConfirmPassword] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {loading: registerLoading, error} = useSelector(
    (state: RootState) => state.auth,
  );
  const {control, handleSubmit} = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: registerSchema) => {
    handleSignUp(data);
  };

  const handleSignUp = async (data: registerSchema) => {
    dispatch(
      register({
        name: data?.name || '',
        email: data?.email,
        password: data?.password,
      }),
    );
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowHideConfirmPassword = () => {
    setShowPConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <NavigaionHeader title="SignUp" />
      <ControllerInput control={control} name="name" placeholder="Name" />
      <ControllerInput control={control} name="email" placeholder="Email" />
      <ControllerInput
        control={control}
        name="password"
        placeholder="Password"
        isPassword
        onShowPassword={() => handleShowHidePassword()}
        secureTextEntry={!showPassword}
      />
      <ControllerInput
        control={control}
        name="confirmPassword"
        placeholder="Confirm Password"
        isPassword
        onShowPassword={() => handleShowHideConfirmPassword()}
        secureTextEntry={!showConfirmPassword}
      />
      <View style={styles.buttonContainer}>
        <TextButton
          title="SignUp"
          onPress={handleSubmit(onSubmit)}
          isLoading={registerLoading}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
