import React from 'react';
import {
    Picker,
    ScrollView,
} from 'react-native';
import {
    ButtonGroup
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
            verseSelectionModeIndex: 0,
            randomLevelIndex: 0,
            juzLevelIndex: null,
            chapterLevelIndex: null,
            tashkeelFilter: false,
        };
        this.updatePracticeModeIndex = this.updatePracticeModeIndex.bind(this);
        this.updateVerseSelectionModeIndex = this.updateVerseSelectionModeIndex.bind(this);
        this.updateRandomLevelIndex = this.updateRandomLevelIndex.bind(this);
        this.updateJuzLevelIndex = this.updateJuzLevelIndex.bind(this);
        this.updateChapterLevelIndex = this.updateChapterLevelIndex.bind(this);
        this.updateTashkeelFilter = this.updateTashkeelFilter.bind(this);
    }

    updatePracticeModeIndex(practiceModeIndex) {
        this.setState({ practiceModeIndex });
    }

    updateVerseSelectionModeIndex(verseSelectionModeIndex) {
        this.setState({ verseSelectionModeIndex });
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

    render() {
        const practiceMode = ['Hafazan', 'Typing'];
        const verseSelectionMode = ['Random', 'User Select'];
        const randomLevel = ['Whole Quran', 'Juz', 'Chapter'];
        const juzLevel = [...Array(31).keys()].slice(1);
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

                    <Layout style={styles.optionContainer} for="Juz Level">
                        <Text category="h6" style={{ textAlign: 'center' }}>Juz Selection</Text>
                        <Text category="c1" style={{ textAlign: 'center' }} appearance="hint">Choose which juz you want to be picked from.</Text>
                        <Picker
                            selectedValue={juzLevelIndex}
                            onValueChange={this.updateJuzLevelIndex}
                            style={{ width: '50%', display: 'flex', justifyContent: 'center', elevation: 2 }}
                            itemStyle={{ borderColor: 'red', borderWidth: 1 }}
                        >
                            {
                                juzLevel.map(juz => <Picker.Item key={juz} label={juz.toString()} value={juz} />)
                            }
                        </Picker>
                    </Layout>

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
                    onPress={() => this.props.navigation.navigate("PracticeInput")}
                >Check</Button>
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