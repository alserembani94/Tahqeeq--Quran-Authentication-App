import React from 'react';
import {
    Layout,
} from 'react-native-ui-kitten';

import styles from '../styles';
import { ArabicText } from '../ArabicText';

export default class ResultErrorFilter extends React.Component {
    render() {
        return(
            <Layout>
                <ArabicText>
                    {
                        this.props.errorFilteredVerse.map((part, index) => {
                            if(part.added) {
                                return <ArabicText key={index} style={{ color: 'orange'}}>{part.value}</ArabicText>
                            }
                            else if(part.removed) {
                                return <ArabicText key={index} style={{ color: 'blue' }}>{part.value}</ArabicText>
                            }
                            else {
                                return <ArabicText key={index} style={{ color: 'green' }}>{part.value}</ArabicText>
                            }
                        })
                    }
                </ArabicText>
            </Layout>
        );
    }
}


// // Importing global styles
// import { styles } from '../../global_styles/styles';

// // Importing functions
// import { errorFilter } from '../../functions/quranicInquiry';

// // Importing components
// import ErrorHighlightByCharacter from './ErrorHighlightByCharacter';

// export default class ErrorHighlight extends React.Component {
//   render() {
//     const result = errorFilter(this.props.userInput, this.props.bestMatch, this.props.tashkeelOption);

//     return (
//       <View>
//         <View style={styles.sectionHeader}>
//           <Text>Error Highlight</Text>
//         </View>
//         <View style={styles.sectionBody}>
//           <View style={{ flexDirection: 'row', flexWrap: 'wrap', flexDirection: 'row-reverse', alignContent: 'center', justifyContent: 'center' }}>
//             {
//               result.map((part, index) => {
//                 if (part.added) {
//                     return (
//                         <ErrorHighlightByCharacter key={index} alter='added' value={part.value} />
//                     );
//                 } else if (part.removed) {
//                     return (
//                         <ErrorHighlightByCharacter key={index} alter='removed' value={part.value} />
//                     );
//                 } else {
//                     return (
//                         <ErrorHighlightByCharacter key={index} alter='none' value={part.value} />
//                     );
//                 }

//               })
//             }
//           </View>
//         </View>
//         <View styles={{ padding: 5 }}></View>
//       </View>
//     );
//   }
// }
