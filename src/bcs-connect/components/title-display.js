import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    ActivityIndicator
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function UserTitle({ User }) {
    // console.log(User)
    if (User.role && User.role.officer) {
        return (
            <View>
                <Text style={{color:Colors.dark}} > {User.role && User.role.officer} </Text>
            </View>
        )
    } else if (User.study && User.study.length > 0) {
        let studyData = User.study.filter(e => e.type == "college")
        return studyData.slice(0,1).map(study => {
            if (study.isGraduate == true) {
                return (
                    <View>
                        <Text style={{color:Colors.dark}} >Studied {study.course}  ( {study.meta.fromYear + " - " + study.meta.toYear} )</Text>
                    </View>
                )
            } else {
                return (
                    <View>
                        <Text style={{color:Colors.dark}} >Studying {study.course}</Text>
                        <Text style={{color:Colors.dark}} > Till date </Text>
                    </View>
                )
            }

        })
    } else {
        if (User.meta.bethel) {
            return (
                <View>
                    <Text style={{color:Colors.dark}} > {User.meta.bethel} </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{color:Colors.dark}} > {User.state} </Text>
                </View>
            )
        }
    }
}
