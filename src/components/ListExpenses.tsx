import React, { Dispatch, SetStateAction } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { IForm } from '../../App'
import ItemExpense from './ItemExpense'

interface IProps {
  expenses: IForm[]
  setModal: Dispatch<SetStateAction<boolean>>
  setForm: Dispatch<React.SetStateAction<IForm>>
  setExpenses: Dispatch<React.SetStateAction<IForm[]>>
}

const ListExpenses = ({ expenses, setModal, setForm, setExpenses }: IProps) => {
  return (
    <View style={styles.container__listBudgets}>
      <Text style={styles.title}>Gastos</Text>
      {expenses.length === 0 ? (
        <Text style={styles.noExpenses}>No hay gastos</Text>
      ) : (
        expenses.map((expense) => <ItemExpense key={expense.id} {...expense} setModal={setModal} setForm={setForm} setExpenses={setExpenses}/>)
      )}
    </View>
  )
}

export default ListExpenses

const styles = StyleSheet.create({
  container__listBudgets: {
    marginTop: 70,
    marginBottom: 50,
    //paddingBottom: 30,
  },
  title: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 20,
  },
  noExpenses: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#64748B',
    fontWeight: '700',
  },
})
