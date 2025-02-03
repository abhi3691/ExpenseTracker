import {Alert} from 'react-native';
import {logout} from '../../../store/slices/authSlice';

export const handleLogout = (dispatch: any) => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        dispatch(logout()); // Clear Redux state);
      },
    },
  ]);
};
