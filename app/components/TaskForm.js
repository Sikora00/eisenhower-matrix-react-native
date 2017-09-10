import React from 'react';
import ReactNative from 'react-native';

const {
    Text,
    TextInput,
    View,
    TouchableHighlight
} = ReactNative;

const styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 150,
        backgroundColor: '#F7F7F7',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D7D7D7',
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 3
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FAFAFA'
    },
    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#05A5D1',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cancelButton: {
        backgroundColor: '#666'
    }
});

export default class TaskForm extends React.Component {

    static navigationOptions = {
        title: 'Add Task',
    };

    state = {
        taskText: '',
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onPress={this.addTask()}
                    style={styles.input}
                    onChangeText={(taskText) => this.setState({taskText})} value={this.state.taskText}
                    />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    addTask() {
        if (this.state.taskText) {
            fetch('http://192.168.0.13/eisenhower-matrix-api/web/app_dev.php/' + 'task', {
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
}