import React from 'react';
import {
} from 'react-native';
import {
    Layout,
    Text,
} from 'react-native-ui-kitten';
import {
    Card,
} from 'react-native-elements';

import { ArabicText } from '../ArabicText';
import styles from '../styles';

export default class QuranicResultMatch extends React.Component {
    render() {
        return (
            <Layout style={styles.cardContainer}>
                <Text category="h6">Error Highlight</Text>
                <ArabicText colorCode="red">{this.props.filteredVerse.first}</ArabicText>
                <Card title="Legend">
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'red'}}>Red Letter</Text> indicates the missing letter in your input.</Text>
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'orange'}}>Yellow Letter</Text> indicates the additional letter found in your input.</Text>
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'green'}}>Green Letter</Text> indicates the letter that matches with the targeted verse.</Text>
                </Card>
            </Layout>
        );
    }
}