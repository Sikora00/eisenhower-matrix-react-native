import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
    TextInput,
  ScrollView
} from 'react-native';
import TaskComponent from '../TaskComponent';
import ApiUtils from '../../shared/ApiUtils'
import Task from '../../shared/models/Task'

class TaskList extends Component<{}> {

    state = {
        tasks: [new Task(1,'Test')],
        taskText: '',
    };

    render() {

        let tasks = this.props.tasks.map((task, key) => {
            return <TaskComponent key={key} keyval={key} task={task} deleteMethod={() => this.props.deleteTask(key)}/>
        });

        return (

              <ScrollView style={styles.scrollContainer}>
                  {tasks}
              </ScrollView>

        );
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

export default TaskList;