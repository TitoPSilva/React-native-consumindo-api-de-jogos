import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import {Alert, Button, TextInput, StyleSheet } from "react-native";
import Result from "./Result";


export default function Form() {

    const [nomeJogo, setNomeJogo] = useState(null)
    const [genero, setGenero] = useState(null)
    const [plataforma, setPlataforma] = useState(null)
    const [message, setmessage] = useState("Preencha as informações do jogo")
    const [textButton, setTextButton] = useState("Cadastrar")


    const cadastrarJogo = () => {
        const endpoint = `https://apijogos.pythonanywhere.com/nalinha/0/${nomeJogo}/${genero}/${plataforma}`;
        console.log(endpoint)
        console.log(nomeJogo)
        fetch(endpoint)
          .then(resposta => resposta.json())
            .catch(() => {
              Alert.alert('Cadastro', 'Jogo cadastrado com sucesso');
            });
      }

    function validation() {
        if (nomeJogo != null && genero != null && plataforma != null) {
            cadastrarJogo()
            setNomeJogo(null)
            setGenero(null)
            setPlataforma(null)
            setTextButton("Cadastro finalizado")
            return
        }
        setTextButton("Cadastrar")
        setmessage("Preencha no mínimo as informações: nome do jogo, genero, e plataforma")
    }

    return (
        <ScrollView>
            <View style={styles.topo}>
                <Text style={styles.topoTitulo}>Jogos</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.Textt}>Nome do jogo:</Text>
                <TextInput style={styles.TextInputt}
                    onChangeText={setNomeJogo}
                    value={nomeJogo}
                    // placeholder="Ex. 1.70"
                    KeyboardType="text"
                />

                <Text style={styles.Textt}>Genero:</Text>
                <TextInput style={styles.TextInputt}
                    onChangeText={setGenero}
                    value={genero}
                    ////placeholder="Ex. 60.30"
                    KeyboardType="text"
                />

                <Text style={styles.Textt}>Plataforma:</Text>
                <TextInput style={styles.TextInputt}
                    onChangeText={setPlataforma}
                    value={plataforma}
                    //placeholder="Ex. 60.30"
                    KeyboardType="text"
                />

                <Button
                    title={textButton}
                    onPress={() => validation()}
                />
            </View>

            <Result messageResult={message} />

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      marginLeft: 30,
      marginRight: 30,
      borderWidth: 1, 
      borderColor: '#d5d5d5', 
      borderRadius: 4, 
      marginBottom: 10, 
      marginHorizontal: 20, 
      padding: 10,
      backgroundColor: '#fafafa'
    },
    Textt:{
        fontSize: 15,
        color: '#363636'
    },
    TextInputt:{
        backgroundColor: '#DCDCDC',
        borderRadius: 4,
        marginBottom: 15,
        color: '#4F4F4F',
        paddingLeft: 10
    },
    TextTitle:{
        fontSize: 22, marginTop: 25, textAlign: 'center', color: 'black',
        backgroundColor: 'white' ,
        marginLeft: 80,
        marginRight: 80,
        borderRadius: 5
    },
    topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#b01376' },
    topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' }
})