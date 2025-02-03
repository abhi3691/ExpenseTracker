import {View} from 'react-native';
import React from 'react';
import {ControllerInput} from '../../../../../components/ControllerInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import TextButton from '../../../../../components/TextButton';
import {expenseSchema} from '../../../common/expenseSchema';
import styles from './styles';
import {AppDispatch, RootState} from '../../../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {createTransaction} from '../../../../../store/slices/transactionsSlice';
import {getUser} from '../../../../../utils/mmkvHelper';
import dayjs from 'dayjs';
const AddExpense = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const {control, handleSubmit} = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: dayjs().format('DD-MM-YYYY'),
    },
  });

  const onSubmit = (data: expenseSchema) => {
    let variables = {
      description: data.description,
      amount: parseFloat(data.amount),
      date: data.date,
      userId: user?.id,
    };
    dispatch(createTransaction(variables));
  };

  return (
    <View style={styles.container}>
      <ControllerInput
        control={control}
        name={'description'}
        placeholder="Description"
      />
      <ControllerInput
        control={control}
        name={'amount'}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextButton title="Add Expense" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddExpense;
