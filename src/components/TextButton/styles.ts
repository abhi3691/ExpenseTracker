import {StyleSheet} from 'react-native';
import {globalSize} from '../../common/functions';
import {theme} from '../../common/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: globalSize(20),
    paddingVertical: globalSize(10),
    height: globalSize(50),
    borderRadius: globalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.secondary,
  },
  titleText: {
    fontSize: theme.fontSize.xl,
    color: theme.color.primary,
  },
});

export default styles;
