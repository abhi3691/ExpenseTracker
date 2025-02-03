import {moderateScale} from 'react-native-size-matters';

export const theme = {
  color: {
    primary: '#FFFFFF',
    secondary: '#000000',
    textColor: '#101010',
    borderColor: '#d2d2d2',
    placeHolderColor: '#b7b7b7',
    error: '#FF0000',
  },
  boxshodow: {
    primary: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  font: {},
  fontSize: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xl2: moderateScale(20),
    xl3: moderateScale(24),
    xl4: moderateScale(30),
    xl5: moderateScale(40),
    xl6: moderateScale(50),
  },
};
