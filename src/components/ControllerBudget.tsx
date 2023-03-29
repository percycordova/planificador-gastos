import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../styles'
import { formatAmount } from '../helpers/index'
import { IForm } from '../../App'
import CircularProgress from 'react-native-circular-progress-indicator'

interface IProps {
  budget: string
  expenses: IForm[]
  formCategory: any
  isFilter: boolean
  resetBudget: () => void
}

const ControllerBudget = ({ budget, expenses, isFilter, formCategory, resetBudget }: IProps) => {
  const [available, setAvailable] = useState('0')
  const [spent, setSpent] = useState('0')

  useEffect(() => {
    const totalSpent = expenses.reduce((accumulated, value) => Number(value.expenseAmount) + accumulated, 0)
    setSpent(totalSpent.toString())
    const totalAvailable = Number(budget) - totalSpent
    setAvailable(totalAvailable.toString())
  }, [expenses])

  return (
    <View style={styles.container__controller}>
      <View style={styles.center__graph}>
        <CircularProgress
          value={Number(spent)}
          radius={150}
          duration={1000}
          progressValueColor='#1048a4'
          maxValue={Number(budget)}
          valuePrefix='S/ '
          valueSuffix='.00'
          titleColor='#64748B'
          progressValueStyle={{ fontSize: 36 }}
          title={isFilter ? `Gastado en ${formCategory.category}` : 'Gastado en total'}
          titleStyle={{ fontSize: 20, marginBottom: -20, fontWeight: 'bold' }}
          inActiveStrokeColor='#dcdddb'
          activeStrokeColor='#1048a4'
          inActiveStrokeOpacity={0.75}
        />
      </View>
      <View style={styles.container__text}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={resetBudget}>
          <Text style={styles.btnText}>Reiniciar App</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.value, color: '#64748B' }}>
          <Text style={styles.label}> Presupuesto: </Text>
          {formatAmount(budget)}
        </Text>
        <Text style={{ ...styles.value, color: '#64748B' }}>
          <Text style={styles.label}> Disponible: </Text>
          {formatAmount(available)}
        </Text>
        <Text style={{ ...styles.value, color: '#64748B' }}>
          <Text style={styles.label}> Gastado: </Text>
          {formatAmount(spent)}
        </Text>
      </View>
    </View>
  )
}

export default ControllerBudget

const styles = StyleSheet.create({
  container__controller: {
    ...globalStyles.contenedor,
    paddingHorizontal: 10,
  },
  center__graph: {
    alignItems: 'center',
  },
  container__text: {
    marginTop: 30,
  },
  btn: {
    backgroundColor: '#DB2777',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'tahoma',
    fontSize:17
  },
  value: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    color: '#3882f6',
  },
})
