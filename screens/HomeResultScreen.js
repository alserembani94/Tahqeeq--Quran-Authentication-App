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



export default class HomeResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearched: false,
            isFiltered: false,
        };
    }

    componentDidMount() {
        this.fetchVerses().then(result => {
            // Search the verse here
            this.setState({ isSearched: true });
            return null;
        }).then(nextResult => {
            // Filter the verse here
            this.setState({ isFiltered: true });
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
        const { isSearched, isFiltered } = this.state;
        return (
            <ScrollView style={styles.background}>
                {
                    isSearched /* searching indicator */
                    ? (
                        <View>
                            <QuranicResultUserInput userInput={this.props.navigation.getParam('userInput')}/>
                            <QuranicResultMatch matchedVerse="قل هو الله احد" />
                            <QuranicResultFilter filteredVerse={{ first: 'قل' }} />
                        </View>
                    )
                    : isFiltered
                    ? (
                        <Layout>
                            <Text>Filtering the input with the match</Text>
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