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
import { errorDistance, removeTashkeel } from '../functions/quranicFilter';

export default class PracticeResultScreen extends React.Component {
    render() {
        const timeEnd = this.props.navigation.getParam('timeEnd');
        const timeStart = this.props.navigation.getParam('timeStart');
        const userInput = this.props.navigation.getParam('userInput');
        const selectedVerse = this.props.navigation.getParam('selectedVerse');
        const withTashkeel = this.props.navigation.getParam('withTashkeel');
        const millisecondDistance = timeEnd - timeStart;
        const elapsedTime = {
            milliseconds: millisecondDistance % 1000,
            seconds: Math.floor((millisecondDistance / 1000) % 60),
            minutes: Math.floor((millisecondDistance / 1000 / 60) % 60),
            hours: Math.floor((millisecondDistance / 1000 / 60 / 60) % 24)
        };
        const numberOfError = errorDistance(selectedVerse, userInput, withTashkeel);
        const score = 100 - (numberOfError / removeTashkeel(selectedVerse).length * 50) - (millisecondDistance / (removeTashkeel(selectedVerse).length * 2000) * 50);

        return (
            <ScrollView style={styles.background}>
                <Layout style={{ marginTop: 200 }}>
                    <Layout style={styles.cardContainer}>
                        <Text category="h4">The result is in!</Text>
                        <Layout style={{ textAlign: 'left', alignItems: 'flex-start', padding: 20, width: '80%' }}>
                            <Layout style={{ padding: 5, display: 'flex', flexDirection: 'row' }}>
                                <Layout style={{ width: '50%' }}>
                                    <Text>Time taken:</Text>
                                </Layout>
                                <Layout style={{ width: '50%' }}>
                                    { elapsedTime.minutes ? <Text>{elapsedTime.minutes} minutes</Text> : null }
                                    <Text>{elapsedTime.seconds} seconds</Text>
                                    <Text>{elapsedTime.milliseconds} milliseconds</Text>
                                </Layout>
                            </Layout>
                            <Layout style={{ padding: 5, display: 'flex', flexDirection: 'row' }}>
                                <Text style={{width: '50%'}}>Number of error:</Text>
                                <Text style={{width: '50%'}}>{numberOfError}</Text>
                            </Layout>
                            <Layout style={{ padding: 5, display: 'flex', flexDirection: 'row' }}>
                                <Text style={{width: '50%'}}>Score:</Text>
                                <Text style={{width: '50%'}}>{score.toFixed(2)}</Text>
                            </Layout>
                        </Layout>
                    </Layout>

                    <Button
                        style={styles.submitButton}
                        onPress={() => this.props.navigation.dispatch(StackActions.popToTop())}
                    >Back to home</Button>
                </Layout>
            </ScrollView>
        );
    }
}

PracticeResultScreen.navigationOptions = {
    header: null
}