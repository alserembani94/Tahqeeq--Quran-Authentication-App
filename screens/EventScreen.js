import React from 'react';
import {
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Layout,
    Text,
} from 'react-native-ui-kitten';
import {
    Icon,
} from 'react-native-elements';

import styles from '../styles';

export default class EventScreen extends React.Component {
    state = {
        announcementList: null,
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <Layout style={styles.cardContainer}>
                    <Text category="h5">Competition</Text>
                    <Text category="c1" appearance="hint">Utilising quran filtering function for quranic events.</Text>
                    <Text></Text>
                    <Layout style={styles.menuList}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PracticeOption')} style={styles.menuListItem}>
                            <Icon
                                name={Platform.OS === 'ios' ? 'ios-flash' : 'md-flash'}
                                type='ionicon'
                                color='green'
                            />
                            <Text>          Self Practice</Text>                    
                        </TouchableOpacity>
                        <TouchableOpacity onPress={null} style={styles.menuListItem} disabled>
                            <Icon
                                name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}
                                type='ionicon'
                                color='gray'
                            />
                            <Text style={styles.menuDisabled}>          Join Competition - in progress</Text>                    
                        </TouchableOpacity>
                        <TouchableOpacity onPress={null} style={styles.menuListItem} disabled>
                            <Icon
                                name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
                                type='ionicon'
                                color='gray'
                            />
                            <Text style={styles.menuDisabled}>          Create Competition - in progress</Text>                    
                        </TouchableOpacity>
                    </Layout>
                </Layout>
                <Layout style={styles.cardContainer}>
                    <Text category="h5">Announcements</Text>
                    <Text></Text>
                    {
                        this.state.announcementList
                        ? null
                        : <Text appearance="hint">There is no announcement at the moment.</Text>
                    }
                </Layout>
            </ScrollView>
        );
    }
}

EventScreen.navigationOptions = {
    title: 'Event',
    headerTitleStyle: {
        color: 'white',
    },
    headerStyle: {
        backgroundColor: 'green',
    },
    headerTintColor: 'white',
    
};

/*
state = {
        selectedIndex: 0,
    };
   
    onIndexChange = (selectedIndex: number) => {
        this.setState({ selectedIndex });
    };
   
    shouldLoadPageContent = (index: number): boolean => {
        return index === this.state.selectedIndex;
    };



<ViewPager
                    selectedIndex={this.state.selectedIndex}
                    shouldLoadComponent={this.shouldLoadPageContent}
                    onSelect={this.onIndexChange}
                >
                    <View>
                        <Text>Tab 1</Text>
                    </View>
                    <View>
                        <Text>Tab 2</Text>
                    </View>
                    <View>
                        <Text>Tab 3</Text>
                    </View>
                </ViewPager> */