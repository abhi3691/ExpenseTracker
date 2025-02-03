import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import VectorIcon from '../../../../../utils/VectorIconUtility';
import {globalSize} from '../../../../../common/functions';
import {handleLogout} from '../../../common/function';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../store';
const HomeHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user); // Get logged-in user
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcom {user?.name} </Text>
      <TouchableOpacity
        onPress={() => handleLogout(dispatch)}
        hitSlop={globalSize(10)}>
        <VectorIcon
          library="FontAwesome"
          name="sign-out"
          size={globalSize(30)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
