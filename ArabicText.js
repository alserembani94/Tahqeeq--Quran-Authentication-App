import React from 'react';
import { Text } from 'react-native';

export class ArabicText extends React.Component {
    render() {
        if(this.props.colorCode == "red")
        {
            return <Text {...this.props} style={[this.props.style, { fontFamily: 'hafs', fontSize: 32, textAlign: 'center', color: 'red' }]} />;
        }
        else {
            return <Text {...this.props} style={[this.props.style, { fontFamily: 'hafs', fontSize: 32, textAlign: 'center' }]} />;
        }
    }
}