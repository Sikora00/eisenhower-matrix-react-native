import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class TaskComponent extends React.Component {
    task;
    render() {
        return (
            <View style={styles.note}>

                <Text style={styles.noteText}>{this.props.task.data}</Text>
                <Text style={styles.noteText}>{this.props.task.title}</Text>

                <TouchableOpacity style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        backgroundColor: '#fff'
    },
    noteText: {
      paddingLeft: 20,
      borderLeftWidth: 10,
      borderLeftColor: '#00ace9'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white'
    }
});
