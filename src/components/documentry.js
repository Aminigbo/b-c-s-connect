import {
    View,
    StyleSheet,
    Dimensions, Image, ScrollView
} from 'react-native';
import React from 'react';  
export default function Documentary({ navigation,autoplay }) { 
    const width = Dimensions.get('window').width;
    return (
       <ScrollView
       horizontal
       >
        {[1,1,1,1,1].map((item,index)=>{
            return (
                <View style={{backgroundColor:"red",height:200,margin:10}} /> 
            )
        })}
       </ScrollView>
    )
}


const style = StyleSheet.create({
    icons: {
        color: "rgb(146, 20, 12)",
    },

    view: {
        marginTop: 10,
    }


})