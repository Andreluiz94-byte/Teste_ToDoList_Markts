// Home.js

//Importações
import React from 'react';
import {View, Text, Button, StyleSheet, ImageBackground} from 'react-native';

// Define o componente funcional Home, que recebe um objeto de navegação como parâmetro
// Vai para a página Tarefas
const Home = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../img/fundohome.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleInitial}>L</Text>
            <Text style={styles.titleRest}>ista de </Text>
            <Text style={styles.titleInitial}>T</Text>
            <Text style={styles.titleRest}>arefas.</Text>
          </Text>
        </View>
        <Text style={styles.description}>
          Organize-se de maneira eficiente!
        </Text>
        <Button
          title="Começar"
          onPress={() => navigation.navigate('Tarefas')}
          color="orange"
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    fontFamily: 'Lato-Black',
  },
  titleInitial: {
    fontSize: 50,
    color: 'orange',
  },
  titleRest: {
    fontSize: 32,
  },
  description: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    fontFamily: 'Lato-Italic',
  },
});

export default Home;
