import {StyleSheet} from 'react-native';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: globalSize(10),
  },

  input: {
    borderRadius: globalSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: globalSize(55),
    paddingHorizontal: globalSize(10),
    borderWidth: 1,
    borderColor: theme.color.borderColor,
  },

  inputText: {
    fontSize: theme.fontSize.md,
    flex: 1,
    padding: 0,
    color: theme.color.textColor,
  },

  icon: {
    marginHorizontal: globalSize(10),
  },
  error: {
    color: theme.color.error,
    fontSize: theme.fontSize.sm,
    marginTop: globalSize(10),
    marginLeft: globalSize(10),
  },
  errorInput: {
    borderWidth: 1,
    borderColor: theme.color.error,
  },
});

export default styles;
