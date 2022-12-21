import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';


export default function Alterar() {
  const [jogoEscolhido, setJogoEscolhido] = useState(null);
  const [nomeJogo, setNomeJogo] = useState(null)
  const [genero, setGenero] = useState(null)
  const [plataforma, setPlataforma] = useState(null)

  const atualizarJogo = () => {
    const endpoint = `https://apijogos.pythonanywhere.com/nalinha/update/${nomeJogo}/${genero}/${plataforma}`;
    console.log(endpoint)
    console.log(nomeJogo)
    fetch(endpoint)
      .then(resposta => resposta.json())
        .catch(() => {
          Alert.alert('Alteração', 'Jogo alterado com sucesso!');
        });
  }


  const getJogo = ( nomeJogo) => {
    const endpoint = `https://apijogos.pythonanywhere.com/leitura/${nomeJogo}`;
    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const jogo = {
          nomeJogo: json.nomeJogo,
          genero: json.genero,
          plataforma: json.plataforma
        };
        setJogoEscolhido(jogo);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível alterar este jogo');
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>Jogos</Text>
        </View>
        {jogoEscolhido != null && (
          <View style={styles.Box}>
            <Text style={styles.linha}>Nome do jogo: {jogoEscolhido.nomeJogo} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setNomeJogo}
                    value={ nomeJogo}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Genero: {jogoEscolhido.genero} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setGenero}
                    value={ genero}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Plataforma: {jogoEscolhido.plataforma} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setPlataforma}
                    value={ plataforma}
                    KeyboardType="text"
                />

          </View>
        )}


        <View style={styles.cardContainer}>
          {jogoEscolhido == null && (
            <><><Text>Digite o nome do jogo no campo abaixo:</Text></><TextInput style={styles.TextInputt}
              onChangeText={setNomeJogo}
              value={nomeJogo}
              KeyboardType="text" /><Button title="Carregar o jogo" onPress={() => getJogo(nomeJogo)} /></>
          )}

          {jogoEscolhido != null && (
            <><><Text>Digite novamente tudo para fazer a alteração e evitar que um campo fique nulo</Text></>
            <Button  title="Atualizar registro" onPress={() => atualizarJogo()}></Button></>
          )}

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#b01376' },
  topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' },

  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

  Box: { alignItems: 'center' },
  linha: { fontSize: 18, fontStyle: 'italic' },
  
  TextInputt:{
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10
},
TextInputtt:{
  marginTop: 5,
  backgroundColor: '#DCDCDC',
  borderRadius: 4,
  marginBottom: 15,
  marginTop: 5,
  paddingLeft: 100,
  paddingRight: 100,
  color: '#4F4F4F'
},
});

