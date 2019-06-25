import React from 'react';
import {
    ScrollView,
} from 'react-native';
import {
    Layout,
    Text,
} from 'react-native-ui-kitten';

import styles from '../styles';

let aboutUsDescription = `Tahqeeq: Quran Authentication App is a mobile application mainly to check the content of the quranic textual data. The source can be typed, or pasted from the various resources such as social medias and articles. This app is significant to protect the content of the quranic verses from being tempered.

Tahqeeq: Quran Authentication App is developed by University of Malaya as a part of the research project (RU007C-2017E). The effort is thanks to the endless effort of the researchers and developers that combine their effort to make this app possible.`;

export default class AboutScreen extends React.Component {
    render() {
        return (
            <ScrollView style={[styles.background, {paddingTop: 90}]}>
                <Layout style={styles.cardContainer}>
                    <Text category="h5">About Us</Text>
                    <Text></Text>
                    <Text category="p2" style={{ textAlign: 'justify' }}>{aboutUsDescription}</Text>
                </Layout>
            </ScrollView>
        );
    }
}

AboutScreen.navigationOptions = {
    header: null,
    
};