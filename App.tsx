import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View, Modal, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ControllerBudget from './src/components/ControllerBudget'
import FilterCategories from './src/components/FilterCategories'
import FormExpenses from './src/components/FormExpenses'
import Header from './src/components/Header'
import ListExpenses from './src/components/ListExpenses'
import NewBudget from './src/components/NewBudget'
import TypeView from './src/components/TypeView'
import { generateId } from './src/helpers'
import globalStyles from './src/styles/index'

export interface IExpenses {
  id: number
  cantidad: number
}
export const initialValues: IForm = {
  expenseAmount: '',
  expenseName: '',
  category: '',
  id: '',
  date: 'date',
}

export interface IForm {
  expenseName: string
  expenseAmount: string
  category: string
  id: string
  date: any
}

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState('0')
  // const [expenses, setExpenses] = useState<Array<IExpenses>>();
  const [expenses, setExpenses] = useState<IForm[]>([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<IForm>(initialValues)
  const [formCategory, setFormCategory] = useState({ category: '' })
  const [expensesFilter, setExpensesFilter] = useState<IForm[]>([])
  const [isFilter, setIsFilter] = useState(false)
  const handleNewBudget = (value: string) => {
    if (isNaN(Number(value))) {
      Alert.alert('Error', 'El cantidad ingresada no es un número.')
      return
    }
    if (Number(value) > 0) {
      setIsValidBudget(true)
      setBudget(value)
    } else {
      Alert.alert('Error', 'El presupuesto debe ser mayor a  0')
    }
  }

  const handleExpense = (expense: IForm) => {
    //  Si existe un id es que van a modificar el gasto
    if (expense.id) {
      if (isNaN(Number(expense.expenseAmount))) {
        Alert.alert('Error', 'El cantidad ingresada no es un número.')
        return
      }
      if (
        expense.category.trim().length === 0 ||
        expense.expenseAmount.trim().length === 0 ||
        expense.expenseName.trim().length === 0
      ) {
        Alert.alert('Error', 'Debe de rellenar todos los campos.')
        return
      }
      if (Number(expense.expenseAmount) <= 0) {
        Alert.alert('Error', 'La cantidad debe ser mayor a 0.')
        return
      }
      const newArray = expenses.map((item) => {
        if (item.id === expense.id) {
          return expense
        } else {
          return item
        }
      })
      setExpenses(newArray)
      setModal(false)
      setForm(initialValues)
      setFormCategory({ category: '' })
    } else {
      if (isNaN(Number(expense.expenseAmount))) {
        Alert.alert('Error', 'El cantidad ingresada no es un número.')
        return
      }
      if (
        expense.category.trim().length === 0 ||
        expense.expenseAmount.trim().length === 0 ||
        expense.expenseName.trim().length === 0
      ) {
        Alert.alert('Error', 'Debe de rellenar todos los campos.')
        return
      }
      if (Number(expense.expenseAmount) <= 0) {
        Alert.alert('Error', 'La cantidad debe ser mayor a 0.')
        return
      }
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([expense, ...expenses])
      setModal(false)
      setForm(initialValues)
      setFormCategory({ category: '' })
    }
  }
  const resetBudget = () => {
    Alert.alert('¿ Desea resetear la App ?', 'Esto eliminará el presupuesto y los gastos', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Si, Eliminar',
        onPress: async () => {
          try {
            await AsyncStorage.clear()
            setIsValidBudget(false)
            setBudget('0')
            setExpenses([])
          } catch (error) {
            console.log(error)
          }
        },
      },
    ])
  }

  useEffect(() => {
    const getBudgetStorage = async () => {
      try {
        const budgetStorage = (await AsyncStorage.getItem('budget_planner')) ?? ''
        if (Number(budgetStorage) > 0) {
          setBudget(budgetStorage)
          setIsValidBudget(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getBudgetStorage()
  }, [])
  useEffect(() => {
    const getExpensesStorage = async () => {
      try {
        const expensesStorage = await AsyncStorage.getItem('expenses_planner')
        setExpenses(expensesStorage ? JSON.parse(expensesStorage) : [])
      } catch (err) {
        console.log(err)
      }
    }
    getExpensesStorage()
  }, [])
  useEffect(() => {
    const saveExpensesStorage = async () => {
      try {
        await AsyncStorage.setItem('expenses_planner', JSON.stringify(expenses))
      } catch (error) {
        console.log(error)
      }
    }
    saveExpensesStorage()
  }, [expenses])

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('budget_planner', budget)
        } catch (error) {
          console.log(error)
        }
      }
      saveBudgetStorage()
    }
  }, [isValidBudget])

  useEffect(() => {
    if (formCategory.category === '') {
      setIsFilter(false)
      setExpensesFilter([])
    } else {
      setIsFilter(true)
      const newArray = expenses.filter((item) => item.category === formCategory.category)
      setExpensesFilter(newArray)
    }
  }, [formCategory, expenses])

  return (
    <View style={styles.container__app}>
      <TypeView isView={isValidBudget}>
        <View style={styles.container__header}>
          <Header />
          {isValidBudget ? (
            <ControllerBudget
              budget={budget}
              expenses={isFilter ? expensesFilter : expenses}
              isFilter={isFilter}
              formCategory={formCategory}
              resetBudget={resetBudget}
            />
          ) : (
            <NewBudget handleNewBudget={handleNewBudget} />
          )}
        </View>
        {isValidBudget && (
          <>
            <View style={{ ...globalStyles.contenedor, marginTop: 30, paddingTop: 10, paddingBottom: 20 }}>
              <FilterCategories
                title='Filtrar Gastos'
                form={formCategory}
                setForm={setFormCategory}
                fontSize={30}
                marginBottom={10}
                textAlign='center'
                titleFirstItem='--Listar todos--'
              />
            </View>
            <ListExpenses
              setExpenses={setExpenses}
              expenses={isFilter ? expensesFilter : expenses}
              setModal={setModal}
              setForm={setForm}
            />
          </>
        )}
      </TypeView>

      {modal && (
        <Modal animationType='slide' visible={modal}>
          <FormExpenses setModal={setModal} handleExpense={handleExpense} form={form} setForm={setForm} />
        </Modal>
      )}
      {isValidBudget && (
        <Pressable style={styles.container__img} onPress={() => setModal(true)}>
          <Image source={require('./src/img/nuevo-gasto.png')} style={styles.image__newBudget} />
        </Pressable>
      )}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container__app: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  container__header: {
    backgroundColor: '#3B82F6',
  },
  container__img: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  image__newBudget: {
    width: 60,
    height: 60,
  },
})
