import {StyleSheet} from 'react-native';
import {globalSize} from '../../../../../common/functions';
import {theme} from '../../../../../common/theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: globalSize(20),
  },
  infotext: {
    fontSize: theme.fontSize.md,
    fontWeight: '300',
    color: theme.color.textColor,
  },
  link: {
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
    color: theme.color.secondary,
    marginLeft: globalSize(5),
    textDecorationLine: 'underline',
  },
});

export default styles;
