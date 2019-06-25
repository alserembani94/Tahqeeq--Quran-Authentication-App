import React from 'react';
import {
    ScrollView,
} from 'react-native';
import {
    Button,
    Layout,
    Text,
} from 'react-native-ui-kitten';
import { StackActions } from 'react-navigation';

import styles from '../styles';

export default class PracticeResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        }
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <Layout style={styles.cardContainer}>
                    <Text category="h4">The result is in!</Text>
                </Layout>

                <Button
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.dispatch(StackActions.popToTop())}
                >Back to home</Button>
            </ScrollView>
        );
    }
}

PracticeResultScreen.navigationOptions = {
    title: 'Practice Result',
    headerLeft: null
}