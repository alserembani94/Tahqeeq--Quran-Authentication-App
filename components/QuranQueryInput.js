import React from 'react';
import {
} from 'react-native';
import {
    Input,
    Layout,
    Text,
} from 'react-native-ui-kitten';
import styles from '../styles';

export default class QuranQueryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputError: undefined }
        this.updateUserInput = this.updateUserInput.bind(this);
    }

    updateUserInput = ( userInput ) => {
        this.props.updateUserInput(userInput);
        const inputError = ( userInput == ''
            ? undefined
            : userInput.match(/[^\u0621-\u064A\u0671-\u0673\u064B-\u0653\s]/g)
                ? `Invalid input - only arabic character allowed. Please install the arabic keyboard from the system setting if not installed.`
                : this.props.withTashkeel
                    ? userInput.match(/[\u064B-\u0653]/g)
                        ? undefined
                        : 'No tashkeel detected.'
                    : userInput.match(/[\u064B-\u0653]/g)
                        ? "Tashkeel detected - please choose 'Search verse with tashkeel' instead."
                        : undefined
        );

        this.setState({ inputError });
        this.props.inputError(inputError ? true : false);
    }

    render() {
        return(
            <Layout style={styles.cardContainer}>
                <Text category="h6" style={{marginBottom: 20}}>Quran Authenticator</Text>
                <Input
                    label="User Input"
                    caption={ this.state.inputError ? this.state.inputError : "Type or paste the quranic verse here to be checked."}
                    placeholder="اكتب هنا"
                    size="large"
                    textStyle={{fontFamily: 'hafs', fontSize: 24, textAlign: 'center'}}
                    status={ this.state.inputError ? 'danger' : this.props.userInput ? 'success' : null }
                    multiline={true}
                    value={this.props.userInput}
                    onChangeText={this.updateUserInput}
                />
            </Layout>
        );
    }
}