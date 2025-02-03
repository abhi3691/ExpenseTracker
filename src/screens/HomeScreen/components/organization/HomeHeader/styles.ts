import {StyleSheet} from 'react-native';
import {globalSize} from '../../../../../common/functions';
import {theme} from '../../../../../common/theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: globalSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.fontSize.xl2,
    fontWeight: 'bold',
    color: theme.color.textColor,
  },
});

export default styles;
