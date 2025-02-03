import {Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import VectorIcon from '../../../../../utils/VectorIconUtility';
import {globalSize} from '../../../../../common/functions';

interface CardCompontentProps {
  title: string;
  iconName: string;
  onPress: () => void;
}
const CardCompontent: FC<CardCompontentProps> = ({
  onPress,
  title,
  iconName,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <VectorIcon library="FontAwesome" name={iconName} size={globalSize(30)} />
    </TouchableOpacity>
  );
};

export default CardCompontent;
