import {View, Text} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
interface RenderItemProps {
  item: Record<string, any>;
}
const RenderItem: FC<RenderItemProps> = ({item}) => {
  console.log('item', item);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.description}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.amount}>$ {item?.amount}</Text>
        <Text style={styles.date}>{item?.date}</Text>
      </View>
    </View>
  );
};

export default RenderItem;
