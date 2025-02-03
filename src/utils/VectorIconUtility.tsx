import React from 'react';
import {View, ViewStyle} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
type IconLibrary =
  | 'Ionicons'
  | 'MaterialIcon'
  | 'MaterialCommunityIcon'
  | 'SimpleLineIcons'
  | 'AntDesign'
  | 'Entypo'
  | 'Fontisto'
  | 'Foundation'
  | 'FontAwesome6'
  | 'FontAwesome5'
  | 'FontAwesome'
  | 'Feather';

interface IconProps {
  library: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const getIconComponent = (library: IconLibrary): any => {
  switch (library) {
    case 'Ionicons':
      return Ionicons;
    case 'MaterialIcon':
      return MaterialIcon;
    case 'MaterialCommunityIcon':
      return MaterialCommunityIcon;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'AntDesign':
      return AntDesign;
    case 'Entypo':
      return Entypo;
    case 'Fontisto':
      return Fontisto;
    case 'Foundation':
      return Foundation;
    case 'FontAwesome5':
      return FontAwesome5;
    case 'FontAwesome6':
      return FontAwesome6;
    case 'Feather':
      return Feather;
    default:
      return FontAwesome;
  }
};

const VectorIcon: React.FC<IconProps> = ({
  library,
  name,
  size = 20,
  color = 'black',
  style,
}) => {
  const IconComponent = getIconComponent(library);

  return (
    <View style={style}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
};

export default VectorIcon;
