import React, {useState, useEffect, useMemo, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');
  const nomeInput = useRef(null); //Focus

  useEffect(() => {
    async function getStorage() {
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if (nomeStorage != null) {
        setNome(nomeStorage);
      } 
    }
    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem('nomes', nome);
    }
    saveStorage();
  }, [nome])

  function alteraNome() {
    setNome(input);
    setInput('');
  }

  const letrasNome = useMemo(() => {
    console.log("Nome alterado"); //Informação do estado no console
    return nome.length;
  }, [nome]);

  //Focus event
  function novoNome() {
    nomeInput.current.focus();
  }

  return (
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <TextInput placeholder="Digite seu nome" value={input}
        onChangeText={(texto) => setInput(texto)} ref={nomeInput}></TextInput>
      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>Olá, {nome}</Text>
      <Text style={styles.contator}>Quantidade de letras: {letrasNome}</Text>
      <TouchableOpacity style={styles.btnNovoNome} onPress={novoNome}>
        <Text>Adicionar nome</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 15
  },
  texto: {
    fontSize: 30,
  },
  btn: {
    backgroundColor: 'red',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff'
  },
  contador: {
    fontSize: 16
  },
  btnNovoNome: {
    backgroundColor: '#83c300',
    alignItems: 'center'
  }
});
