import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import TaskComponent from './app/components/Task';
import ApiUtils from './app/components/ApiUtils'
import Task from './app/entities/Task.js'

export default class App extends React.Component {

    state = {
        taskArray: [],
        taskText: '',
    };

    constructor() {
        super();
        this.pullTasks();
    }

    render() {

        let tasks = this.state.taskArray.map((task, key) => {
            return <TaskComponent key={key} keyval={key} task={task} deleteMethod={() => this.deleteTask(key)}/>
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>= Eisenhower Matrix -</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {tasks}
                </ScrollView>

                <View style={styles.footer}/>
                <TouchableOpacity onPress={this.addTask.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

                <TextInput style={styles.textInput}
                           onChangeText={(taskText) => this.setState({taskText})} value={this.state.taskText}
                           placeholder='> task' placeholderTextColor='white' underlineColorAndroid='transparent'>
                </TextInput>

            </View>

        );
    }

    addTask() {
        if (this.state.taskText) {
            fetch('http://192.168.0.14/eisenhower-matrix-api/web/app_dev.php/task', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: this.state.taskText
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
    }

    deleteTask(key) {
        task = this.state.taskArray[key];
        fetch('http://192.168.0.14/eisenhower-matrix-api/web/app_dev.php/task/'+task.id, {
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
        fetch('http://192.168.0.14/eisenhower-matrix-api/web/app_dev.php/task', {
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
            .done();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
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
        backgroundColor: '#E91E63',
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
