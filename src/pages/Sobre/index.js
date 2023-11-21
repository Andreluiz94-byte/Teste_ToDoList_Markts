// Sobre.js

// Importações
import React from 'react';
import {View, Text, StyleSheet, Linking, Button} from 'react-native';

// URL do site da empresa
const companyWebsite = 'https://www.markts.com.br/';

// Componente principal do aplicativo
const App = ({navigation}) => {
  // Função para abrir o site da empresa
  const openCompanyWebsite = () => {
    Linking.openURL(companyWebsite);
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.heading}>Teste Técnico</Text>

      {/* Sobre */}
      <Text style={styles.text}>
        Desenvolvido por{' '}
        <Text style={styles.boldText}>André Luiz Pinnola Filho</Text>, este
        aplicativo de lista de tarefas foi construído em React Native como parte
        do teste técnico para a empresa{' '}
        <Text style={styles.link} onPress={openCompanyWebsite}>
          {companyWebsite}
        </Text>
        .
      </Text>

      {/* Seção: Funcionalidades */}
      <View style={styles.topicContainer}>
        <Text style={styles.topicHeading}>Funcionalidades:</Text>
        <Text style={styles.topicText}>
          Gerenciamento completo de tarefas, incluindo adição, edição,
          salvamento e marcação de conclusão. As tarefas são separadas e
          organizadas em ordem alfabética, distinguindo claramente as concluídas
          das em andamento.
        </Text>
      </View>

      {/* Seção: Desenvolvimento */}
      <View style={styles.topicContainer}>
        <Text style={styles.topicHeading}>Desenvolvimento:</Text>
        <View>
          <Text style={styles.topicText}>
            - Configuração do ambiente de desenvolvimento React Native CLI.
          </Text>
          <Text style={styles.topicText}>
            - Implementação e instalação de bibliotecas diversas (verificar o
            arquivo package.json).
          </Text>
          <Text style={styles.topicText}>
            - Utilização de rotas simples para uma manutenção fácil e
            compreensão clara.
          </Text>
          <Text style={styles.topicText}>
            - Integração de componentes React respeitando uma estrutura de
            desenvolvimento consistente.
          </Text>
          <Text style={styles.topicText}>
            - Utilização e configuração de fontes (Lato foi a escolha neste
            caso).
          </Text>
          <Text style={styles.topicText}>
            - Integração de imagens e ícones.
          </Text>
        </View>
      </View>

      {/* Botão para navegar de volta para a página inicial */}
      <Button
        title="Voltar para a Página Inicial"
        onPress={() => navigation.navigate('Home')}
        color="orange"
        style={styles.button}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 15,
    color: '#333',
    fontFamily: 'Lato-Black',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  topicContainer: {
    marginBottom: 20,
    width: '100%',
    fontFamily: 'Lato-Regular',
  },
  topicHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  topicText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'left',
    fontFamily: 'Lato-Regular',
  },
  button: {
    marginTop: 20,
    fontFamily: 'Lato-Bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default App;
