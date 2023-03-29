import React, { Dispatch, SetStateAction, useState } from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import globalStyles from '../styles/index'
import { firstCapitalLetter, formatAmount, formatDate } from '../helpers'
import { IForm } from '../../App'
import AwesomeAlert from 'react-native-awesome-alerts'

const iconsDictionary: any = {
  ahorro: require('../img/icono_ahorro.png'),
  casa: require('../img/icono_casa.png'),
  comida: require('../img/icono_comida.png'),
  ocio: require('../img/icono_ocio.png'),
  ['otros gastos']: require('../img/icono_gastos.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
  educacion: require('../img/icono_educacion.png'),
  pasajes: require('../img/icono_pasajes.png'),
}

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>
  expenseName: string
  category: string
  expenseAmount: string
  date: any
  id: string
  setForm: Dispatch<React.SetStateAction<IForm>>
  setExpenses: Dispatch<React.SetStateAction<IForm[]>>
}

const ItemExpense = ({ setModal, expenseName, category, expenseAmount, id, date, setForm, setExpenses }: IProps) => {
  const [showAlert, setShowAlert] = useState(false)

  const handleActions = () => {
    setModal(true)
    setForm({ category, date, expenseAmount, expenseName, id })
  }

  const handleShowAlert = () => {
    setShowAlert(true)
  }
  const handleDelete = () => {
    setExpenses((expenses) => expenses.filter((item) => item.id !== id))
    setShowAlert(false)
  }

  return (
    <>
      <Pressable style={styles.container__itemExpense} onPress={handleActions}>
        <View style={styles.content}>
          <View style={styles.container__image}>
            <Image source={iconsDictionary[category]} style={styles.image} />
            <View style={styles.container__text}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.name}>{firstCapitalLetter(expenseName)}</Text>
              <Text style={styles.date}> {formatDate(date)}</Text>
            </View>
          </View>
          <Text style={styles.amount}>{formatAmount(expenseAmount)}</Text>
        </View>
        <Pressable style={styles.btn__delete} onPress={handleShowAlert}>
          <Text style={styles.text__btnDelete}>X</Text>
        </Pressable>
      </Pressable>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='Eliminar gasto'
        message={expenseName}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText='No, cancelar'
        confirmText='Si, Eliminar'
        confirmButtonColor='#DD6B55'
        cancelButtonColor='#7c7672'
        titleStyle={{ fontWeight: 'bold', fontSize: 28, color: '#1048a4' }}
        messageStyle={{ fontWeight: '500', fontSize: 18 }}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={handleDelete}
      />
    </>
  )
}

export default ItemExpense

const styles = StyleSheet.create({
  container__itemExpense: {
    ...globalStyles.contenedor,
    transform: [{ translateY: 0 }],
    paddingVertical: 0,
    paddingTop: 40,
    paddingBottom: 20,
    marginBottom: 25,
    position: 'relative',
    zIndex: 10,
  },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  container__image: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  image: { width: 70, height: 70 },
  container__text: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748B',
  },
  date: {
    fontWeight: '700',
    color: '#DB2777',
  },
  btn__delete: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderColor: '#DB2777',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#DB2777',
    borderRadius: 10,
    zIndex: 20,
  },
  text__btnDelete: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
