import {
    StyleSheet,
    View, 
} from 'react-native'; 
import React, { useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView} from 'react-native-gesture-handler'; 
import { Color } from '../../components/theme'; 
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';  

const Colors = Color()


function QRAUTH({ navigation}) {
 
 
  
    useEffect(() => {
       

    }, [navigation])

   

    return (

        <>  
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    );
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_user: (payload) => dispatch(user_state(payload)),
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(QRAUTH);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 65,
        // backgroundColor: "red"
    },


    inputIcon: {
        marginRight: 10,
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
        // backgroundColor:"red", 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        width: '92%',
    },
});

