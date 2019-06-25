import React from 'react';
import {
} from 'react-native';
import {
    Layout,
    Text,
} from 'react-native-ui-kitten';
import { ArabicText } from '../ArabicText';
import styles from '../styles';

export default class QuranicResultMatch extends React.Component {
    render() {
        return (
            <Layout style={styles.cardContainer}>
                <Text category="h6">Quranic Match</Text>
                <ArabicText>{this.props.matchedVerse}</ArabicText>
            </Layout>
        );
    }
}