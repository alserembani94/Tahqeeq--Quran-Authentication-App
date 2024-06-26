import React from 'react';
import {
} from 'react-native';
import {
    Card,
} from 'react-native-elements';
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
                <ArabicText>{this.props.matchedVerse.textual[0].text}</ArabicText>
                <Card title="Verse Info">
                    <Text style={{ textAlign: 'center' }}>[{this.props.matchedVerse.chapter.name} : {this.props.matchedVerse.number_in_chapter}]</Text>
                </Card>
            </Layout>
        );
    }
}