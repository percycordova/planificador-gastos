import { Text, View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export enum categorys {
  ahorro = 'ahorro',
  comida = 'comida',
  casa = 'casa',
  gastos = 'otros gastos',
  salud = 'salud',
  ocio = 'ocio',
  educacion = 'educacion',
  suscripciones = 'suscripciones',
  pasajes = 'pasajes',
}

interface IProps {
  form: any
  setForm: any
  title?: string
  fontSize?: number
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined
  marginBottom?: number
  titleFirstItem?: string
}

const FilterCategories = ({
  form,
  setForm,
  title = 'CATEGORIA GASTOS',
  fontSize = 16,
  textAlign = 'left',
  marginBottom = 0,
  titleFirstItem = '--Seleccione--',
}: IProps) => {
  return (
    <View style={styles.field}>
      <Text style={{ ...styles.label, fontSize, textAlign, marginBottom }}>{title}</Text>
      <Picker
        style={styles.input}
        selectedValue={form.category}
        onValueChange={(value: string) => setForm({ ...form, category: value })}
      >
        <Picker.Item label={titleFirstItem} value='' />
        <Picker.Item label='Ahorro' value={categorys.ahorro} />
        <Picker.Item label='Comida' value={categorys.comida} />
        <Picker.Item label='Casa' value={categorys.casa} />
        <Picker.Item label='Otros gastos' value={categorys.gastos} />
        <Picker.Item label='Salud' value={categorys.salud} />
        <Picker.Item label='Diversion' value={categorys.ocio} />
        <Picker.Item label='Educación' value={categorys.educacion} />
        <Picker.Item label='Pasajes' value={categorys.pasajes} />
        <Picker.Item label='Suscripciones' value={categorys.suscripciones} />
      </Picker>
    </View>
  )
}

export default FilterCategories

const styles = StyleSheet.create({
  container__form: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
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
    fontSize: 20,
    fontWeight: '400',
  },
})
