import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import TaskComponent from './Task';

class TaskList extends React.Component {

    constructor(props, context)
    {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.tasks),
        };
    }

    renderRow(task) {
        return (
            <TaskComponent task={task}/>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    key={this.props.tasks}
                    renderRow={this.renderRow.bind(this)}
                    />


                <View style={styles.footer}/>

            </View>
        )
    }
}

TaskList.propTypes = {
    addTask: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        backgroundColor: '#e6ffff'
    },
    addButton: {
        backgroundColor: '#0b66e9',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginBottom: -45,
        zIndex: 10,
        alignSelf: 'flex-end',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    textInput: {
        alignSelf: 'stretch',
    }
});

export default TaskList;