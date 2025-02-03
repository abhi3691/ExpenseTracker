import {View, Text} from 'react-native';
import React from 'react';
import {showMessage} from 'react-native-flash-message';
import VectorIcon from '../../utils/VectorIconUtility';
import styles from './styles';
import {theme} from '../../common/theme';

export const successMessage = (message: string) => {
  showMessage({
    message: '',
    backgroundColor: theme.color.secondary,
    icon: () => (
      <View style={styles.wrapper}>
        <VectorIcon
          library="Ionicons"
          name="checkmark-circle-sharp"
          color={theme.color.primary}
        />
        <Text style={{...styles.text, color: theme.color.primary}}>
          {message}
        </Text>
      </View>
    ),
  });
};

export const errorMessage = (message: string) => {
  showMessage({
    message: '',
    backgroundColor: theme.color.secondary,
    icon: () => (
      <View>
        <View style={styles.wrapper}>
          <VectorIcon
            library="Ionicons"
            name="close-circle-sharp"
            color={theme.color.primary}
          />
          <Text style={{...styles.text, color: theme.color.primary}}>
            {message}
          </Text>
        </View>
      </View>
    ),
  });
};
export const warningMessage = (message: string) => {
  showMessage({
    message: '',
    backgroundColor: theme.color.primary,
    icon: () => (
      <View style={styles.wrapper}>
        <VectorIcon
          library="Ionicons"
          name="information-circle-sharp"
          color={theme.color.primary}
        />
        <Text style={{...styles.text, color: theme.color.textColor}}>
          {message}
        </Text>
      </View>
    ),
  });
};
