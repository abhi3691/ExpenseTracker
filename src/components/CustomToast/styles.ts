import {StyleSheet} from 'react-native';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: globalSize(10),
  },
  text: {
    color: theme.color.primary,
    fontSize: theme.fontSize.lg,
  },
  info: {
    color: theme.color.primary,
    fontSize: theme.fontSize.xs,
    marginLeft: globalSize(20),
  },
});

export default styles;
