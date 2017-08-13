import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Note from './app/components/Note';
import ApiUtils from './app/components/ApiUtils'

export default class App extends React.Component {

    state = {
        noteArray: [],
        noteText: '',
    };

    constructor() {
        super();
        this.pullNotes();
    }

    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)}/>
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>= Noter -</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}/>
                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

                <TextInput style={styles.textInput}
                           onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
                           placeholder='> note' placeholderTextColor='white' underlineColorAndroid='transparent'>
                </TextInput>

            </View>

        );
    }

    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray});
            fetch('http://192.168.0.14/eisenhower-matrix-api/web/app_dev.php/task', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: this.state.noteText
                    })
                }
            )
                .then(ApiUtils.checkStatus)
                .then(response => response.json())
                .catch(e => e)
                .then((res) => {
                    alert(JSON.stringify(res));
                })
             .done();
            this.setState({noteText: ''});
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }

    pullNotes() {
        fetch('http://192.168.0.14/eisenhower-matrix-api/web/app_dev.php/task', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                alert(JSON.stringify(res));
                res.forEach((note) => {
                    this.state.noteArray.push({
                        'date': note.date,
                        'note': note.title,
                    });
                    this.setState({noteArray: this.state.noteArray});
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
        marginBottom: 100,
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
