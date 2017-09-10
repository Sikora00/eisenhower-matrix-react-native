import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TaskLists from './app/components/TaskLists'
import TaskForm from './app/components/TaskForm'

const AppNavigator = StackNavigator({
    Home: {
        screen: TaskLists
    },
    AddTask: {
        screen: TaskForm
    }
});

export default class App extends React.Component {
    someEvent() {
        // call navigate for AppNavigator here:
        this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({ routeName: 'Home1' +
            '' })
        );
    }
    render() {
        return (
            <AppNavigator ref={nav => { this.navigator = nav; }} />
        );
    }
}

AppRegistry.registerComponent('AppNavigator', () => AppNavigator, 'Task');