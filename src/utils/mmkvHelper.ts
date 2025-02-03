import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const storeUser = (user: any) => {
  storage.set('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = storage.getString('user');
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  storage.delete('user');
};
