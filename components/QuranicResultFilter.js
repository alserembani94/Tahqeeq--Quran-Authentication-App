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

import ResultErrorFilter from '../components/ResultErrorFilter';
import { errorFilter } from '../functions/quranicFilter';
import { ArabicText } from '../ArabicText';
import styles from '../styles';

export default class QuranicResultMatch extends React.Component {
    render() {
        const errorFilteredVerse = errorFilter(this.props.userInput, this.props.bestMatch.textual[0].text, this.props.tashkeelOption);

        return (
            <Layout style={styles.cardContainer}>
                <Text category="h6">Input Filter</Text>
                <ResultErrorFilter errorFilteredVerse={errorFilteredVerse}/>
                <Card title="Legend">
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'red'}}>Red Letter</Text> indicates the missing letter in your input.</Text>
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'blue'}}>Blue Letter</Text> indicates the additional letter found in your input.</Text>
                    <Text category="c1" appearance='hint' style={{ textAlign: 'center'}}><Text category="c1" style={{ color: 'green'}}>Green Letter</Text> indicates the letter that matches with the targeted verse.</Text>
                </Card>
            </Layout>
        );
    }
}