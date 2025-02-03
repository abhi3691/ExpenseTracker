import {StyleSheet} from 'react-native';
import {theme} from '../../../../../common/theme';
import {globalSize} from '../../../../../common/functions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.primary,
    boxShadow: theme.boxshodow.primary,
    padding: globalSize(15),
    borderRadius: globalSize(10),
    width: '50%',
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    width: '80%',
    lineHeight: globalSize(20),
    color: theme.color.textColor,
    marginBottom: globalSize(20),
  },
});

export default styles;
