import React from 'react';
import {
} from 'react-native';
import {
    Layout,
    Text,
    CheckBox,
} from 'react-native-ui-kitten';

import styles from '../styles';

export default class QuranQueryOption extends React.Component {
    constructor(props) {
        super(props);
        this.updateTashkeelOption = this.updateTashkeelOption.bind(this);
    }

    updateTashkeelOption = (withTashkeel) => {
        this.setState({ withTashkeel });
        this.props.updateTashkeelOption(withTashkeel);
    }

    render() {
        return(
            <Layout style={styles.cardContainer}>
                <Text category="s2" style={{marginBottom: 20}}>Filter Options</Text>
                <CheckBox
                    text="Check with tashkeel"
                    status={this.props.withTashkeel ? "success" : null}
                    checked={this.props.withTashkeel}
                    onChange={this.updateTashkeelOption}
                />
            </Layout>
        )
    }
}