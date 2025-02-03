import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/slices/authSlice';
import {getUser} from '../../utils/mmkvHelper';
import HomeStack from './HomeStack';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    const checkUserSession = () => {
      const userFromStorage = getUser();
      if (userFromStorage) {
        dispatch(setUser(userFromStorage));
      }
    };

    checkUserSession();
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <Stack.Screen name="HomeStack" component={HomeStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
