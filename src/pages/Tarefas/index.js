// Tarefas.js

//Importações

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente principal do aplicativo
const TodoApp = () => {
  const navigation = useNavigation();

  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  // Efeito para salvar as tarefas no armazenamento local
  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        const tasksJSON = JSON.stringify(tasks);
        await AsyncStorage.setItem('tasks', tasksJSON);
      } catch (error) {
        console.error(
          'Erro ao salvar as tarefas no armazenamento local:',
          error,
        );
      }
    };

    saveTasksToStorage();
  }, [tasks]);

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };

      setTasks([...tasks, task]);
      setNewTask('');
    } else {
      alert('Digite uma tarefa primeiro');
    }
  };

  // Função para marcar uma tarefa como concluída
  const completeTask = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: true} : task,
    );
    setTasks(updatedTasks);
  };

  // Função para editar o título de uma tarefa
  const editTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, title: newTitle} : task,
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskTitle('');
  };

  // Função para remover uma tarefa
  const removeTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filtragem de tarefas em andamento e concluídas
  const inProgressTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Renderização da interface do aplicativo
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        source={require('../../img/fundotarefas.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <Text style={[styles.header, {textAlign: 'center'}]}>
            {' '}
            Minhas Tarefas{' '}
          </Text>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={text => setNewTask(text)}
            placeholder="Digite aqui as suas tasks"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTask}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>

          {/*  Verifica se há tarefas em andamento e renderiza a seção se houver */}
          {inProgressTasks.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Tarefas Pendentes:</Text>
              <FlatList
                data={inProgressTasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View style={styles.taskContainer}>
                    <Text style={styles.taskText}>{item.title}</Text>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => completeTask(item.id)}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/5290/5290982.png',
                          }}
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                      </View>
                      <Text style={styles.buttonText}>Concluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setEditingTask(item.id);
                        setEditedTaskTitle(item.title);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRrfTN6XRaUxRcCmXHyg8-crkGMTaX8Wc-mjszRQef&s',
                          }}
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                      </View>
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeTask(item.id)}>
                      <Image
                        source={{
                          uri: 'https://cdn.icon-icons.com/icons2/1791/PNG/512/trashcan_114640.png',
                        }}
                        style={{width: 20, height: 20, marginRight: 5}}
                      />
                      <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}

          {/* Verifica se há tarefas concluídas e renderiza a seção se houver */}

          {completedTasks.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Tarefas Concluídas:</Text>
              <FlatList
                data={completedTasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View style={styles.completedTaskContainer}>
                    <Text style={styles.completedTaskText}>{item.title}</Text>
                    <TouchableOpacity
                      style={[styles.removeButton, styles.smallIcon]}
                      onPress={() => removeTask(item.id)}>
                      <Text style={styles.removeButtonText}>
                        Remover tarefa concluída
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}

          {/* Renderiza o modal de edição se editingTask não for nulo */}
          {editingTask !== null && (
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Editar Tarefa</Text>
              <TextInput
                style={styles.modalInput}
                value={editedTaskTitle}
                onChangeText={text => setEditedTaskTitle(text)}
                placeholder="Nova edição"
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => editTask(editingTask, editedTaskTitle)}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => navigation.navigate('Sobre')}>
            <Text style={styles.buttonText}>Saiba como este App foi feito</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    fontSize: 35,
    fontFamily: 'Lato-Black',
    color: '#000',
    backgroundColor: 'white',
    opacity: 3,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    opacity: 0.9,
    fontFamily: 'Lato-Bold',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  sectionHeader: {
    fontSize: 19,
    marginTop: 20,
    marginBottom: 13,
    color: 'white',
    fontFamily: 'Lato-Regular',
    padding: 2,
    borderRadius: 10,
    backgroundColor: '#2E1C14',
    textAlign: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
  },
  taskText: {
    flex: 1,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  completeButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
  },
  completedTaskContainer: {
    backgroundColor: '#d3ffd3',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  completedTaskText: {
    color: '#5cb85c',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    zIndex: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Lato-Regular',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
    padding: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
  },
  backgroundImage: {
    flex: 1,
  },
  aboutButton: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    left: '37%',
    marginLeft: -60,
  },
});

export default TodoApp;
