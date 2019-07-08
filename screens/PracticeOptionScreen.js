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
import { FlexStyleProps } from 'react-native-ui-kitten/ui/support/typings';

export default class PracticeOptionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            practiceModeIndex: 0,
            verseSelectionModeIndex: 0,
            randomLevelIndex: 0,
            juzLevelIndex: null,
            chapterLevelIndex: null,
            tashkeelFilter: false,
            verseSelectionModalVisibility: false,
            selectedVerse: null,
        };
        this.updatePracticeModeIndex = this.updatePracticeModeIndex.bind(this);
        this.updateVerseSelectionModeIndex = this.updateVerseSelectionModeIndex.bind(this);
        this.updateRandomLevelIndex = this.updateRandomLevelIndex.bind(this);
        this.updateJuzLevelIndex = this.updateJuzLevelIndex.bind(this);
        this.updateChapterLevelIndex = this.updateChapterLevelIndex.bind(this);
        this.updateTashkeelFilter = this.updateTashkeelFilter.bind(this);
        this.updateVerseSelection = this.updateVerseSelection.bind(this);
        this.toggleVerseSelectionModalVisibility = this.toggleVerseSelectionModalVisibility.bind(this);
    }

    // Update selection values

    updatePracticeModeIndex(practiceModeIndex) {
        this.setState({ practiceModeIndex });
    }

    updateVerseSelectionModeIndex(verseSelectionModeIndex) {
        this.setState({ verseSelectionModeIndex, randomLevelIndex: 0 });
    }

    updateRandomLevelIndex(randomLevelIndex) {
        this.setState({ randomLevelIndex });
    }

    updateJuzLevelIndex(juzLevelIndex) {
        this.setState({ juzLevelIndex });
    }

    updateChapterLevelIndex(chapterLevelIndex) {
        this.setState({ chapterLevelIndex });
    }

    updateTashkeelFilter(tashkeelFilter) {
        this.setState({ tashkeelFilter });
    }

    updateVerseSelection() {
        this.setState({ selectedVerse: {} });
    }

    toggleVerseSelectionModalVisibility() {
        this.setState({ verseSelectionModalVisibility: !this.state.verseSelectionModalVisibility });
    }

    render() {
        const practiceMode = ['Hafazan'];
        const verseSelectionMode = ['Random', 'User Select'];
        const randomLevel = ['Whole Quran', 'Juz', 'Chapter'];
        const juzLevel = [...Array(31).keys()].slice(1);
        const chapterLevel = [...Array(145).keys()].slice(1);
        const { practiceModeIndex, verseSelectionModeIndex, randomLevelIndex, juzLevelIndex, chapterLevelIndex, tashkeelFilter } = this.state;

        return (
            <ScrollView style={styles.background}>
                <Layout style={styles.cardContainer}>
                    <Text category="h5">Practice Mode</Text>
                    <Text category="c1" appearance="hint">Choose the mode of practice.</Text>
                    <Text></Text>
                    <ButtonGroup
                        onPress={this.updatePracticeModeIndex}
                        selectedIndex={practiceModeIndex}
                        buttons={practiceMode}
                        containerStyle={{ borderRadius: 5 }}
                        selectedButtonStyle={{ backgroundColor: 'green' }}
                    />
                </Layout>

                <Layout style={styles.cardContainer}>
                    <Text category="h5">Verse Selection</Text>
                    <Text></Text>

                    <Layout style={styles.optionContainer} for="Verse Selection">
                        <Text category="h6" style={{ textAlign: 'center' }}>Selection Mode</Text>
                        <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose whether to random select or select the verse yourself.</Text>
                        <ButtonGroup
                            onPress={this.updateVerseSelectionModeIndex}
                            selectedIndex={verseSelectionModeIndex}
                            buttons={verseSelectionMode}
                            containerStyle={{ borderRadius: 5, marginTop: 15 }}
                            selectedButtonStyle={{ backgroundColor: 'green' }}
                        />
                    </Layout>

                    {
                        verseSelectionModeIndex == 0 && (
                            <Layout style={styles.optionContainer} for="Random Level">
                                <Text category="h6" style={{ textAlign: 'center' }}>Random Level</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which level the random selection will be made.</Text>
                                <ButtonGroup
                                    onPress={this.updateRandomLevelIndex}
                                    selectedIndex={randomLevelIndex}
                                    buttons={randomLevel}
                                    containerStyle={{ borderRadius: 5, marginTop: 15 }}
                                    selectedButtonStyle={{ backgroundColor: 'green' }}
                                />
                            </Layout>
                        )
                    }

                    {
                        randomLevelIndex == 1 && (
                            <Layout style={styles.optionContainer} for="Juz Level">
                                <Text category="h6" style={{ textAlign: 'center' }}>Juz Selection</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which juz you want to be picked from.</Text>
                                <Layout style={{ width: '60%', height: 60, display: 'flex', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.15)' }}>
                                    <Picker
                                        selectedValue={juzLevelIndex}
                                        onValueChange={this.updateJuzLevelIndex}
                                        style={{ width: '100%', height: '100%' }}
                                        itemStyle={{ borderColor: 'red', borderWidth: 1 }}
                                    >
                                        {
                                            juzLevel.map(juz => <Picker.Item key={juz} label={juz.toString()} value={juz} />)
                                        }
                                    </Picker>
                                </Layout>
                            </Layout>
                        )
                    }

                    {
                        randomLevelIndex == 2 && (
                            <Layout style={styles.optionContainer} for="Chapter Level">
                                <Text category="h6" style={{ textAlign: 'center' }}>Chapter Selection</Text>
                                <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which chapter you want to be picked from.</Text>
                                <Layout style={{ width: '60%', height: 60, display: 'flex', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.15)' }}>
                                    <Picker
                                        selectedValue={chapterLevelIndex}
                                        onValueChange={this.updateChapterLevelIndex}
                                        style={{ width: '100%', height: '100%' }}
                                        itemStyle={{ borderColor: 'red', borderWidth: 1 }}
                                    >
                                        {
                                            chapterLevel.map(chapter => <Picker.Item key={chapter} label={chapter.toString()} value={chapter} />)
                                        }
                                    </Picker>
                                </Layout>
                            </Layout>
                        )
                    }
                    <Button
                        style={[styles.submitButton, { width: '80%' }]}
                        onPress={this.toggleVerseSelectionModalVisibility}
                    >Select verse</Button>

                    <Overlay
                        isVisible={this.state.verseSelectionModalVisibility}
                        overlayStyle={{ display: 'flex', justifyContent: 'center' }}
                        onBackdropPress={this.toggleVerseSelectionModalVisibility}
                    >
                        <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Hello Modal</Text>
                            <Button
                                style={[styles.submitButton, { width: '80%' }]}
                                onPress={this.updateVerseSelection}
                            >Add verse object</Button>
                            <Button
                                style={[styles.submitButton, { width: '80%' }]}
                                onPress={this.toggleVerseSelectionModalVisibility}
                            >Close Modal</Button>
                        </Layout>
                    </Overlay>

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
                    disabled={!this.state.selectedVerse && true}
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.navigate("PracticeInput")}
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