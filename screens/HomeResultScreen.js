import React from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import {
    Text,
    Layout,
} from 'react-native-ui-kitten';

import QuranicResultUserInput from '../components/QuranicResultUserInput';
import QuranicResultMatch from '../components/QuranicResultMatch';
import QuranicResultFilter from '../components/QuranicResultFilter';

// Importing all functions
import { findBestVerseMatch } from '../functions/quranicFilter';


export default class HomeResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearched: false,
        };
    }

    componentDidMount() {
        this.fetchVerses().then(verses => {
            const bestVerseMatch = findBestVerseMatch(this.props.navigation.getParam('userInput'), verses, this.state.tashkeelOption);
            this.setState({ isSearched: true, bestVerseMatch });
        });
    }

    fetchVerses = async() => {
        const response = await fetch('https://mighty-depths-66221.herokuapp.com/qas/verses');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    }

    render() {
        const { isSearched } = this.state;
        return (
            <ScrollView style={styles.background}>
                {
                    isSearched /* searching indicator */
                    ? (
                        <Layout>
                            <QuranicResultUserInput userInput={this.props.navigation.getParam('userInput')}/>
                            <QuranicResultMatch matchedVerse={this.state.bestVerseMatch && this.state.bestVerseMatch} />
                            <QuranicResultFilter userInput={this.props.navigation.getParam('userInput')} bestMatch={this.state.bestVerseMatch} withTashkeel={this.props.navigation.getParam('withTashkeel')} />
                        </Layout>
                    )
                    : (
                        <Layout>
                            <Text>Searching best match with Quranic Database</Text>
                        </Layout>
                    )
                }
            </ScrollView>
        );
    }
}

HomeResultScreen.navigationOptions = {
    title: 'Search Result',
    headerTitleStyle: {
        color: 'white',
    },
    headerStyle: {
        backgroundColor: 'green',
    },
    headerTintColor: 'white',
};