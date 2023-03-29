import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.texto}>PLanificador de Gastos</Text>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {},
  texto: {
    textAlign: 'center',
    fontSize: 28,
    color: '#FFF',
    textTransform: 'uppercase',
    paddingTop: 20,
    fontWeight: 'bold',
  },
});
