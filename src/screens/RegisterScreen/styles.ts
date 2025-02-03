import {StyleSheet} from 'react-native';
import {theme} from '../../common/theme';
import {globalSize} from '../../common/functions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary,
    padding: globalSize(30),
  },
  title: {
    fontSize: theme.fontSize.xl4,
    fontWeight: 'bold',
    color: theme.color.textColor,
    alignSelf: 'center',
    marginBottom: globalSize(20),
  },
  buttonContainer: {
    marginTop: globalSize(20),
  },
});

export default styles;
