import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TaskForm from './app/components/TaskForm'
import DashboardComponent from "./app/components/DashboardComponent";

const AppNavigator = StackNavigator({
    Home: {
        screen: DashboardComponent
    },
    AddTask: {
        screen: TaskForm
    }
});

export default class App extends Component<{}> {
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