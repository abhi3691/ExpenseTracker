import {StyleSheet} from 'react-native';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary,
    padding: globalSize(30),
  },
});

export default styles;
