import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles/index'
import { IForm, initialValues } from '../../App'
import FilterCategories from './FilterCategories'
interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>
  handleExpense: (value: IForm) => void
  setForm: Dispatch<React.SetStateAction<IForm>>
  form: IForm
}

const FormExpenses = ({ setModal, handleExpense, setForm, form }: IProps) => {
  return (
    <SafeAreaView style={styles.container__form}>
      <View>
        <Pressable
          style={styles.btnCancel}
          onPress={() => {
            setModal(false)
            setForm(initialValues)
          }}
        >
          <Text style={styles.btnCancelTxt}>cancelar</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Nuevo Gasto</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            value={form.expenseName}
            onChangeText={(value) => setForm({ ...form, expenseName: value })}
            placeholder='Ingrese el nombre del gasto'
            placeholderTextColor='#64748B'
            style={styles.input}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingrese la cantidad del gasto'
            placeholderTextColor='#64748B'
            keyboardType='numeric'
            value={form.expenseAmount}
            onChangeText={(value) => setForm({ ...form, expenseAmount: value })}
          />
        </View>
        <FilterCategories form={form} setForm={setForm} />
        <Pressable style={styles.submitBtn} onPress={() => handleExpense(form)}>
          <Text style={styles.sutmitBtnTxt}>{form.id ? 'Editar Gasto' : 'Agregar Gasto'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default FormExpenses

const styles = StyleSheet.create({
  container__form: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
    borderBottomColor: '#64748F',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
    // textTransform: 'uppercase',
  },
  form: {
    ...globalStyles.contenedor,
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    color: '#64748B',
    fontSize: 18,
    fontWeight: '400',
  },
  submitBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 10,
  },

  sutmitBtnTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  btnCancel: {
    backgroundColor: '#DB2777',
    padding: 12,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btnCancelTxt: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 18,
  },
})
