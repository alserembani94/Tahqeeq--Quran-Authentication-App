import React from 'react';
import {
    Picker,
    ScrollView,
    View,
} from 'react-native';
import {
    ButtonGroup,
    Overlay,
} from 'react-native-elements';
import {
    Button,
    CheckBox,
    Layout,
    Text,
} from 'react-native-ui-kitten';

import styles from '../styles';

export default class PracticeOptionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            practiceModeIndex: 0,
            selectionModeIndex: 0,
            randomSelectionIndex: 0,
            selectedJuz: 1,
            tashkeelFilter: false,

            selectedChapterID: null,
            selectedVerse: null,
            chapterInfoIsLoaded: false,
            verseInfoIsLoaded: false,

            isRandomised: false,
            isSelected: false,
        };

        this.updatePracticeModeIndex = this.updatePracticeModeIndex.bind(this);
        this.updateSelectionModeIndex = this.updateSelectionModeIndex.bind(this);
        this.updateRandomSelectionIndex = this.updateRandomSelectionIndex.bind(this);
        this.updateSelectedJuz = this.updateSelectedJuz.bind(this);
        this.updateTashkeelFilter = this.updateTashkeelFilter.bind(this);
        this.updateSelectedChapterID = this.updateSelectedChapterID.bind(this);
        this.updateSelectedVerseID = this.updateSelectedVerseID.bind(this);
    }

    componentDidMount() {
        this.fetchChapterInfo().then(chapterInfo => {
            this.setState({ chapterInfo, chapterInfoIsLoaded: true })
            this.state.selectedChapterID == null && this.setState({ selectedChapterID: chapterInfo[0]._id })
        }).then(() => {
            this.fetchVersesInChapter(this.state.selectedChapterID).then(verseInfo => {
                this.setState({ verseInfo, verseInfoIsLoaded: true })
                this.state.selectedVerse == null && this.setState({ selectedVerse: verseInfo[0] })
            })
        }).catch(
            error => console.log(error)
        )
    }

    updatePracticeModeIndex(practiceModeIndex) {
        this.setState({ practiceModeIndex });
    }

    updateSelectionModeIndex(selectionModeIndex) {
        this.setState({ selectionModeIndex, randomSelectionIndex: 0 });
    }

    updateRandomSelectionIndex(randomSelectionIndex) {
        this.setState({ randomSelectionIndex });
    }

    updateSelectedJuz(selectedJuz) {
        this.setState({ selectedJuz });
    }

    updateTashkeelFilter(tashkeelFilter) {
        this.setState({ tashkeelFilter });
    }

    updateSelectedChapterID(selectedChapterID) {
        this.setState({ selectedChapterID, verseInfoIsLoaded: false });
        this.fetchVersesInChapter(selectedChapterID).then(verseInfo => {
            this.setState({ verseInfo, verseInfoIsLoaded: true })
            this.state.selectedVerse == null && this.setState({ selectedVerse: verseInfo[0] })
        })
    }

    updateSelectedVerseID(selectedVerse) {
        this.setState({ selectedVerse, isSelected: true });
    }

    fetchChapterInfo = async() => {
        const response = await fetch('https://mighty-depths-66221.herokuapp.com/qas/chapters');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    fetchVersesInChapter = async(chapterID) => {
        const response = await fetch('https://mighty-depths-66221.herokuapp.com/qas/verse/chapter/' + chapterID);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    render() {
        const { practiceModeIndex, selectionModeIndex, randomSelectionIndex, selectedJuz, tashkeelFilter, selectedChapterID, chapterInfo, chapterInfoIsLoaded, selectedVerse, verseInfo, verseInfoIsLoaded, selectedVerseObject, isSelected } = this.state;
        const practiceModeList = ['Hafazan'];
        const selectionModeList = ['Random', 'User Select'];
        const randomSelectionList = ['Whole Quran', 'Juz', 'Chapter'];
        const randomJuz = [...Array(31).keys()].slice(1);

        return (
            <ScrollView style={styles.background}>
                {/* Practice Mode Selection */}
                <Layout style={styles.cardContainer}>
                    <Text category="h5">Practice Mode</Text>
                    <Text category="c1" appearance="hint">Choose the mode of practice.</Text>
                    <Text></Text>
                    <ButtonGroup
                        onPress={this.updatePracticeModeIndex}
                        selectedIndex={practiceModeIndex}
                        buttons={practiceModeList}
                        containerStyle={{ borderRadius: 5 }}
                        selectedButtonStyle={{ backgroundColor: 'green' }}
                    />
                </Layout>

                {/* Verse Selection */}
                <Layout style={styles.cardContainer}>
                    <Text category="h5">Verse Selection</Text>
                    <Text></Text>

                    <Layout style={styles.optionContainer} for="Verse Selection Mode">
                        <Text category="h6" style={{ textAlign: 'center' }}>Selection Mode</Text>
                        <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose whether to random select or select the verse yourself.</Text>
                        <ButtonGroup
                            onPress={this.updateSelectionModeIndex}
                            selectedIndex={selectionModeIndex}
                            buttons={selectionModeList}
                            containerStyle={{ borderRadius: 5, marginTop: 15 }}
                            selectedButtonStyle={{ backgroundColor: 'green' }}
                        />
                    </Layout>

                    {
                        /* Random Selection Menu */
                        selectionModeIndex == 0 && (
                            <Layout style={styles.optionContainer} for="Random Selection">
                                <Text category="h6" style={{ textAlign: 'center' }}>Random Selection</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose how the random verse should be picked.</Text>
                                <ButtonGroup
                                    onPress={this.updateRandomSelectionIndex}
                                    selectedIndex={randomSelectionIndex}
                                    buttons={randomSelectionList}
                                    containerStyle={{ borderRadius: 5, marginTop: 15 }}
                                    selectedButtonStyle={{ backgroundColor: 'green' }}
                                />
                            </Layout>
                        )
                    }

                    {
                        /* User Selection Menu */
                        selectionModeIndex == 1 && (
                            <Layout style={styles.optionContainer} for="User Selection">
                                <Text category="h6" style={{ textAlign: 'center' }}>User Selection</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose your preferred verse.</Text>
                                <Layout style={{ flexDirection: 'row', width: '80%' }}>
                                    <Picker
                                        selectedValue={selectedVerse}
                                        onValueChange={this.updateSelectedVerseID}
                                        enabled={verseInfoIsLoaded}
                                        style={{ width: '40%', height: 60}}
                                    >
                                        {
                                            verseInfoIsLoaded
                                            ? verseInfo.map(verse => <Picker.Item key={verse.number_in_chapter} label={verse.number_in_chapter.toString()} value={verse} />)
                                            : <Picker.Item label="Loading" value={null} />
                                        }
                                    </Picker>
                                    <Picker
                                        selectedValue={selectedChapterID}
                                        onValueChange={this.updateSelectedChapterID}
                                        enabled={chapterInfoIsLoaded}
                                        style={{ width: '60%', height: 60 }}
                                    >
                                        {
                                            chapterInfoIsLoaded
                                            ? chapterInfo.map(chapter => <Picker.Item key={chapter.number} label={chapter.name} value={chapter._id} />)
                                            : <Picker.Item label="Loading" value={null} />
                                        }
                                    </Picker>
                                </Layout>
                            </Layout>
                        )                        
                    }

                    {
                        randomSelectionIndex == 1 && (
                            <Layout style={styles.optionContainer} for="Random Juz">
                                <Text category="h6" style={{ textAlign: 'center' }}>Random Juz</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which juz you want to be picked from.</Text>
                                <Layout style={{ width: '60%', height: 60, display: 'flex', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.15)' }}>
                                    <Picker
                                        selectedValue={selectedJuz}
                                        onValueChange={this.updateSelectedJuz}
                                        style={{ width: '100%', height: '100%' }}
                                        itemStyle={{ borderColor: 'red', borderWidth: 1 }}
                                    >
                                        {
                                            randomJuz.map(juz => <Picker.Item key={juz} label={juz.toString()} value={juz} />)
                                        }
                                    </Picker>
                                </Layout>
                            </Layout>
                        )
                    }

                    {
                        randomSelectionIndex ==2 && (
                            <Layout style={styles.optionContainer} for="Randon Chapter">
                            <Text category="h6" style={{ textAlign: 'center' }}>Random Juz</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which juz you want to be picked from.</Text>
                                <Layout style={{ width: '60%', height: 60, display: 'flex', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.15)' }}>
                                <Picker
                                        selectedValue={selectedChapterID}
                                        onValueChange={this.updateSelectedChapterID}
                                        enabled={chapterInfoIsLoaded}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        {
                                            chapterInfoIsLoaded
                                            ? chapterInfo.map(chapter => <Picker.Item key={chapter.number} label={chapter.name} value={chapter._id} />)
                                            : <Picker.Item label="Loading" value={null} />
                                        }
                                    </Picker>
                                </Layout>
                            </Layout>
                        )
                    }

                    {
                        selectionModeIndex == 0 && <Button disabled style={[styles.submitButton, { width: '80%' }]} onPress={this.toggleVerseSelectionModalVisibility}>Randomise Verse</Button>
                    }

                    {
                        selectedVerse && (
                            <Layout style={{ backgroundColor: '#FFFDDD', width: '90%', padding: 20, borderLeftWidth: 4, borderLeftColor: '#FFe600', alignItems: 'center' }}>
                                <Text>Your verse is</Text>
                                <Text>[{selectedVerse.chapter.name} : {selectedVerse.number_in_chapter} ]</Text>
                            </Layout>)   
                    }
                </Layout>

                <Layout style={styles.cardContainer}>
                    <Text category="h5">Checking Option</Text>
                    <Text category="c1" appearance="hint">Option for cheking method (scoring will be affected).</Text>
                    <Text></Text>
                    <CheckBox
                        checked={tashkeelFilter}
                        onChange={this.updateTashkeelFilter}
                        text="Check with tashkeel"
                    />
                </Layout>

                <Button
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.navigate("PracticeInput", {selectedVerse, tashkeelFilter})}
                    disabled={!selectedVerse}
                >Proceed</Button>
            </ScrollView>
        );
    }
}

PracticeOptionScreen.navigationOptions = {
    title: 'Self Practice Option',
    headerTitleStyle: {
        color: 'white',
    },
    headerStyle: {
        backgroundColor: 'green',
    },
    headerTintColor: 'white',
}