import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {theme} from '../../common/theme';

interface TextButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}
const TextButton: FC<TextButtonProps> = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={props.onPress}
      disabled={props.disabled || props.isLoading}>
      {props.isLoading ? (
        <ActivityIndicator color={theme.color.primary} size={'small'} />
      ) : (
        <Text style={styles.titleText}>{props?.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
