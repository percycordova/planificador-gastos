import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles'

interface IProps {
  handleNewBudget: (budget: string) => void
}

const NewBudget = ({ handleNewBudget }: IProps) => {
  const [textBugget, setTextBudget] = useState('')

  return (
    <View style={styles.container__newBudget}>
      <Text style={styles.label}> Defenir Presupuesto</Text>
      <TextInput
        keyboardType='numeric'
        placeholder='Agrega tu presupuesto: Ej s/. 500'
        style={styles.input}
        value={textBugget}
        onChangeText={(value) => setTextBudget(value)}
        placeholderTextColor='#64748B'
      />
      <Pressable style={styles.btn} onPress={() => handleNewBudget(textBugget)}>
        <Text style={styles.btnText}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  )
}

export default NewBudget

const styles = StyleSheet.create({
  container__newBudget: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 28,
    color: '#3b82f6',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
    color: '#64748B',
    fontSize: 18,
    fontWeight: '400',
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
