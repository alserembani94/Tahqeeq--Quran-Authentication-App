import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    ScrollView,
} from 'react-native';
import {
    Button,
} from 'react-native-ui-kitten';

import styles from '../styles';

import QuranQueryInput from '../components/QuranQueryInput';
import QuranQueryOption from '../components/QuranQueryOption';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: null,
            withTashkeel: false,
            inputErrorStatus: true,
        }
        this.updateUserInput = this.updateUserInput.bind(this);
        this.inputError = this.inputError.bind(this);
        this.updateTashkeelOption = this.updateTashkeelOption.bind(this);
    }

    updateUserInput(userInput) {
        this.setState({ userInput });
    }

    inputError(inputErrorStatus) {
        this.setState({ inputErrorStatus });
    }

    updateTashkeelOption(withTashkeel) {
        this.setState({ withTashkeel });
    }

    render() {
        const { userInput, withTashkeel, inputErrorStatus } = this.state;
        return (
            <ScrollView style={styles.background}>
                <QuranQueryInput
                    userInput={userInput}
                    withTashkeel={withTashkeel}
                    updateUserInput={this.updateUserInput}
                    inputError={this.inputError}
                />
                <QuranQueryOption
                    withTashkeel={withTashkeel}
                    updateTashkeelOption={this.updateTashkeelOption}
                />

                <Button
                    disabled={(inputErrorStatus || userInput == '') ? true : false}
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.navigate('HomeResult', this.state)}
                >Check</Button>
            </ScrollView>
        );
    }
}

HomeScreen.navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
        color: 'white',
    },
    headerStyle: {
        backgroundColor: 'green',
    },
    headerTintColor: 'white',
};
