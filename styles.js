import {
    Platform,
    StyleSheet,
} from 'react-native';

export default styles = StyleSheet.create({
    background: {
        backgroundColor: '#F9F9F9',
    },
    //212740
    //#F9F9F9

    cardContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
        display: 'flex',
        flexDirection: 'column',
    },

    submitButton: {
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        marginBottom: 20,
    },

    menuList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    menuListItem: {
        paddingVertical: 17,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgba(200,200,200, 1.0)',
        borderBottomWidth: .5,
        borderTopColor: 'rgba(200,200,200, 1.0)',
        borderTopWidth: .5,
    },
    optionContainer: {
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
});

// ...Platform.select({
//   ios: {
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   android: {
//     elevation: 20,
//   },
// }),