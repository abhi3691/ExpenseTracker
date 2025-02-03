import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Controller} from 'react-hook-form';
import type {Control, FieldValues, Path} from 'react-hook-form';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';
import VectorIcon from '../../utils/VectorIconUtility';

export interface InputProps extends TextInputProps {
  onShowPassword?: () => void;
  isPassword?: boolean;
}

export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends InputProps,
    InputControllerType<T> {}

export function ControllerInput<T extends FieldValues>(
  props: ControlledInputProps<T>,
) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        console.log('typeof value', typeof value);
        return (
          <View style={styles.container}>
            <View style={[styles.input, error && styles.errorInput]}>
              <TextInput
                autoCapitalize="none"
                placeholderTextColor={theme.color.placeHolderColor}
                style={[styles.inputText]}
                numberOfLines={1}
                onChangeText={e => onChange(e)}
                onBlur={onBlur}
                value={value}
                {...props}
              />
              {props.isPassword && (
                <TouchableOpacity onPress={props.onShowPassword}>
                  <VectorIcon
                    library="Feather"
                    name={props.secureTextEntry ? 'eye-off' : 'eye'}
                    size={globalSize(20)}
                    style={styles.icon}
                    color={theme.color.borderColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Text style={styles.error}>{error.message || 'Error'}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
