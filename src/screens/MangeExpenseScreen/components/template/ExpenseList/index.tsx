import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderItem from '../../organization/RenderItem';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getUserTransactions} from '../../../../../database';
import {AppDispatch, RootState} from '../../../../../store';
import {fetchTransactions} from '../../../../../store/slices/transactionsSlice';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../../../../common/theme';
import ListEmptyComponent from '../../organization/ListEmptyComponent';
import ListFooter from '../../organization/ListFooter';

const ExpenseList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {transactions, loading} = useSelector(
    (state: RootState) => state.transactions,
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTransactions(user.id));
    }
  }, [user?.id, dispatch]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.color.secondary} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => <RenderItem item={item} />}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooter}
        />
      )}
    </View>
  );
};

export default ExpenseList;
