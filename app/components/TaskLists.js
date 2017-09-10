import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ApiUtils from './ApiUtils'
import Task from '../entities/Task.js'
import TaskList from './TaskList';
import TaskForm from './TaskForm';


class TaskLists extends React.Component {
    static navigationOptions = {
        title: 'Task Lists',
    };
    state = {
        taskArray: [],
        taskText: '',
    };

    constructor() {
        super();
        this.state.taskArray = [new Task(100, "tekścik")];
        this.pullTasks();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>= Eisenhower Matrix -</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    <TaskList tasks={this.state.taskArray}/>
                </ScrollView>

                <View style={styles.footer}/>
                <TouchableOpacity onPress={() => navigate('AddTask')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

                <TextInput style={styles.textInput}
                           onChangeText={(taskText) => this.setState({taskText})} value={this.state.taskText}
                           placeholder='> task' placeholderTextColor='white' underlineColorAndroid='transparent'>
                </TextInput>

            </View>

        );
    }


    deleteTask(task) {
        fetch('http://192.168.0.13/eisenhower-matrix-api/web/app_dev.php/' + 'task/'+task.id, {
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

        let tasks = this.state.taskArray;
        key = tasks.findIndex(function (item) {
            return task.id = item.id
        });
        this.state.taskArray.filter(key, 1);
        this.setState({taskArray: this.state.taskArray});
    }

    pullTasks() {
        fetch('http://192.168.0.13/eisenhower-matrix-api/web/app_dev.php/' + 'task', {
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
                    this.state.taskArray = [new Task(100, "tekścik")];
                });
            })
            .catch(e => e)
            .done();
    }

}

export default TaskLists;

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
