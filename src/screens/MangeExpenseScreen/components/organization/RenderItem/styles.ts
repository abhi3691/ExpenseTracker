import {StyleSheet} from 'react-native';
import {globalSize} from '../../../../../common/functions';
import {theme} from '../../../../../common/theme';

const styles = StyleSheet.create({
  container: {
    padding: globalSize(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.color.borderColor,
  },
  title: {
    fontSize: theme.fontSize.md,
    color: theme.color.textColor,
    marginBottom: globalSize(5),
  },
  amount: {
    fontSize: theme.fontSize.lg,
    color: theme.color.textColor,
    fontWeight: 'bold',
  },
  date: {
    fontSize: theme.fontSize.md,
    color: theme.color.textColor,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
