import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TaskComponent from './TaskComponent';
import ApiUtils from './ApiUtils'
import Task from '../entities/Task'
import TaskList from './TaskList'

class DashboardComponent extends Component<{}> {

    static navigationOptions = {
        title: 'Task Lists',
    };
    state = {
        taskArray: [new Task(1, 'Test')],
        taskText: '',
    };

    constructor() {
        super();
        this.pullTasks();
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    render() {

        const {navigate} =this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>= Eisenhower Matrix -</Text>
                </View>

                <TaskList tasks={this.state.taskArray} deleteTask={this.deleteTask}/>
                <TaskList tasks={this.state.taskArray}/>

                <View style={styles.footer}/>
                <TouchableOpacity onPress={() => navigate('AddTask', {addTask: this.addTask})} style={styles.addButton}>
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
        if(!text) {
            return;
        }
            fetch('http://192.168.0.13/' + 'task', {
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
                    this.state.taskArray.push(
                        new Task(task.id, task.title)
                    );
                    this.setState({taskArray: this.state.taskArray});
                })
                .catch(e => e)
                .done();

            this.setState({taskText: ''});

    }

    deleteTask(key) {
        let task = this.state.taskArray[key];
        fetch('http://192.168.0.13/' + 'task/' + task.id, {
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

        this.state.taskArray.splice(key, 1);
        this.setState({taskArray: this.state.taskArray});
    }

    pullTasks() {
        this.state.taskArray = [];
        fetch('http://192.168.0.13/' + 'task', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                res.forEach((task) => {
                    this.state.taskArray.push(
                        new Task(task.id, task.title)
                    );
                    this.setState({taskArray: this.state.taskArray});
                });
            })
            .catch(e => e)
            .done();
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