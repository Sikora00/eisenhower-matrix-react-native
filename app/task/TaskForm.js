import React, {Component} from 'react';
import ReactNative from 'react-native';
import store from './TaskStore';
import {createTaskAction} from "./TaskActions";

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

export default class TaskForm extends Component<{}> {

    static navigationOptions = {
        title: 'Add TaskModel',
    };

    state = {
        taskText: '',
    };

    render() {

        const {goBack} = this.props.navigation;

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    onChangeText={(taskText) => this.setState({taskText})} value={this.state.taskText}
                />
                <TouchableHighlight
                    onPress={() => this.addTask()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => goBack()}
                    style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    addTask() {
        const {goBack} = this.props.navigation;
        if (!this.state.taskText) {
            return;
        }

        store.dispatch(createTaskAction({title: this.state.taskText}));
        this.setState({taskText: ''});
        goBack()
    }
}