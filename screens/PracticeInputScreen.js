import React from 'react';
import {
    ScrollView,
} from 'react-native';
import {
    Overlay,
} from 'react-native-elements';
import {
    Button,
    Input,
    Layout,
    Text,
} from 'react-native-ui-kitten';
import styles from '../styles';

export default class PracticeInputScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            withTashkeel: this.props.navigation.getParam('tashkeelFilter'),
            confirmMessageVisibility: false,
            selectedVerse: this.props.navigation.getParam('selectedVerse').textual[0].text,
        };
        this.updateUserInput = this.updateUserInput.bind(this);
        this.submitInput = this.submitInput.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    componentDidMount() {
        const timeStart = new Date();
        this.setState({ timeStart })
    }

    updateUserInput(userInput) {
        this.setState({ userInput });
    }

    submitInput = () => {
        const timeEnd = new Date();
        this.setState({ timeEnd, confirmMessageVisibility: !this.state.confirmMessageVisibility });
    }

    changeVisibility() {
        this.setState({ confirmMessageVisibility: !this.state.confirmMessageVisibility })
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <Layout style={[styles.cardContainer, { marginTop: 50 }]}>
                    <Text category="h4">Self Practice</Text>

                    <Text appearance="hint">Your selected verse is</Text>
                    <Text appearance="hint">[Surah al-Baqarah, 2: 16]</Text>
                    <Text></Text>

                    <Input
                        label="Type here"
                        placeholder={ this.props.navigation.getParam('tashkeelFilter') ? "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ" : "بسم الله الرحمن الرحيم" }
                        size="large"
                        textStyle={{fontFamily: 'hafs', fontSize: 24, textAlign: 'center' }}
                        status={ null }
                        multiline={true}
                        value={this.state.userInput}
                        onChangeText={this.updateUserInput}
                        numberOfLines={10}
                    />
                </Layout>

                <Button
                    style={styles.submitButton}
                    onPress={this.submitInput}
                >Submit</Button>

                <Overlay
                    isVisible={this.state.confirmMessageVisibility}
                    onBackdropPress={this.changeVisibility}
                    height="auto"
                >
                    <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Text>Are you sure with your submission?</Text>
                        <Button
                            style={styles.submitButton}
                            onPress={() => {
                                this.setState({  confirmMessageVisibility: false })
                                this.props.navigation.navigate('PracticeResult', this.state)
                            }}
                        >Submit</Button>
                    </Layout>
                </Overlay>
            </ScrollView>
        );
    }
}

PracticeInputScreen.navigationOptions = {
    header: null,
    tabBarVisible: false,
}