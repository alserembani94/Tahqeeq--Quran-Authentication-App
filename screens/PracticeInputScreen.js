import React from 'react';
import {
    ScrollView,
} from 'react-native';
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
            withTashkeel: true,
        };
        this.updateUserInput = this.updateUserInput.bind(this);
    }

    updateUserInput(userInput) {
        this.setState({ userInput });
    }

    render() {
        console.log(this.props.navigation)

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
                    onPress={() => this.props.navigation.navigate("PracticeResult")}
                >Submit</Button>
            </ScrollView>
        );
    }
}

PracticeInputScreen.navigationOptions = {
    header: null,
    tabBarVisible: false,
}