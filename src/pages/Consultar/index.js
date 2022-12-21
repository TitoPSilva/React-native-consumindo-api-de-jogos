import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';



export default function Consultar(){
    const [ jogoEscolhido, setJogoEscolhido ] = useState(null);
    const [ nomeJogo, setNomeJogo] = useState(null)
  
    const getJogo = ( nomeJogo) => {
      const endpoint = `https://apijogos.pythonanywhere.com/leitura/${nomeJogo}`;
      // console.log(JSON.stringify(endpoint))
      fetch(endpoint)
        .then(resposta => resposta.json())
          .then( json => {
            const jogo = {
              nomeJogo: json.nomeJogo,
              genero: json.genero,
              plataforma: json.plataforma
            };
            setJogoEscolhido(jogo);
          })
          .catch(() => {
            Alert.alert('Falha na busca', 'Não encontrei nenhum jogo com este nome!');
          });
    }
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topo}>
            <Text style={styles.topoTitulo}>Jogos</Text>
            </View>
            {jogoEscolhido != null && (
            <View style={styles.cardContainer}>
              <Text style={styles.linha}>Nome do jogo: {jogoEscolhido.nomeJogo}</Text>
            <Text style={styles.linha}>Genero: {jogoEscolhido.genero}</Text>
            <Text style={styles.linha}>Plataforma: {jogoEscolhido.plataforma}</Text>
            </View>
          )}
  
  

            
            <View style={styles.cardContainer}>
              
              {jogoEscolhido == null &&(
                <><Text>Digite o nome do jogo no campo abaixo:</Text><TextInput style={styles.TextInputt}
                onChangeText={setNomeJogo}
                value={ nomeJogo}
                KeyboardType="text" /></>
              )}


              <Button title="Consultar" onPress={()=>getJogo( nomeJogo)}/>
            </View>
            
  
          
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fafafa' },
  
    topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#b01376' },
    topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center'},
  
    cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10, },
    cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },
  
    Box: { alignItems: 'center' },
     
    linha: { fontSize: 18, marginBottom: 10, borderRadius: 4, paddingLeft: 10, paddingBottom: 2, paddingTop: 2 },
    
    TextInputt:{
      backgroundColor: '#DCDCDC',
      borderRadius: 4,
      marginBottom: 15,
      marginTop: 5,
      color: '#4F4F4F',
      paddingLeft: 10,
  },  
  });

