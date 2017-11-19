import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ApiUtils from './ApiUtils'
import Task from '../entities/Task'
import TaskList from './TaskList'
import store from '../../TaskStore';
import Spinner from 'react-native-loading-spinner-overlay';


class DashboardComponent extends Component<{}> {

    static navigationOptions = {
        title: 'Task Lists',
    };

    state = store.getState();

    constructor() {
        super();
        store.dispatch({type:'PULL_TASKS'});
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);

        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        })
    }

    render() {
        const {navigate} = this.props.navigation;

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>= Eisenhower Matrix -</Text>
                    </View>

                    {this.state.loading ? (
                        <View style={{ flex: 1 }}>
                            <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                        </View>
                    ) : (
                        <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask}/>
                    )}

                    <View style={styles.footer}/>
                    <TouchableOpacity onPress={() => navigate('AddTask', {addTask: this.addTask})}
                                      style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.textInput}
                               onChangeText={(taskText) => this.setState({taskText})} value={this.state.taskText}
                               placeholder='> task' placeholderTextColor='white' underlineColorAndroid='transparent'>
                    </TextInput>

                </View>

            );
    }

    addTask(text) {
        if (!text) {
            return;
        }
        fetch('https://ms-eisenhover-matrix.herokuapp.com/' + 'task', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: text
                })
            }
        )
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then((task) => {
                taskEntity = new Task(task.id, task.title);
                store.dispatch({
                    type: 'ADD_TASK',
                    task: taskEntity
                })
            })
            .catch(e => e)
            .done();

        this.setState({taskText: ''});

    }

    deleteTask(key) {
        let task = this.state.tasks[key];
        fetch('https://ms-eisenhover-matrix.herokuapp.com/' + 'task/' + task.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .catch(e => e)
            .done();

        store.dispatch({type: 'DELETE_TASK', task: task, key: key});
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#00b1e9',
        alignItems: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 0,
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
    },
    addButton: {
        backgroundColor: '#0b66e9',
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginBottom: -45,
        zIndex: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 10,
        borderTopColor: '#ededed',
        paddingTop: 60,
    }
});

export default DashboardComponent;