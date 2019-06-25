import React from 'react';
import {
} from 'react-native';
import {
    Layout,
    Text,
} from 'react-native-ui-kitten';
import { ArabicText } from '../ArabicText';
import styles from '../styles';

export default class QuranicResultUserInput extends React.Component {
    render() {
        return (
            <Layout style={styles.cardContainer}>
                <Text category="h6">User Input</Text>
                <ArabicText>{this.props.userInput}</ArabicText>
            </Layout>
        );
    }
}