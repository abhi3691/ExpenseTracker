import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import VectorIcon from '../../utils/VectorIconUtility';
import {useNavigation} from '@react-navigation/native';

interface NavigaionHeaderProps {
  title: string;
}
const NavigaionHeader: FC<NavigaionHeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <VectorIcon library="Ionicons" name="chevron-back" size={30} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NavigaionHeader;
