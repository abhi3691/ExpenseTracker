import {StyleSheet} from 'react-native';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary,
    padding: globalSize(30),
  },
  cardContainer: {
    marginTop: globalSize(20),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: globalSize(10),
  },
});
export default styles;
