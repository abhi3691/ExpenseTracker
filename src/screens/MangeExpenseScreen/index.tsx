import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import NavigaionHeader from '../../components/NavigaionHeader';
import ExpenseList from './components/template/ExpenseList';
import AddExpense from './components/template/AddExpense';
const MangeExpenseScreen = () => {
  return (
    <View style={styles.container}>
      <NavigaionHeader title="Manage Expense" />
      <AddExpense />
      <ExpenseList />
    </View>
  );
};

export default MangeExpenseScreen;
