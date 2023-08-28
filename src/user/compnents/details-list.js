import { faAdd, faCheckSquare, faPlusSquare, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Color } from '../../components/theme';
import { Style } from '../../../assets/styles';

const Colors = Color()
export function Details({
    data, icon, add, add_callback
}) {
    return (
        <Pressable
            onPress={() => {
                if (add) add_callback()
            }} style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
            }} >

            <View style={{
                flexDirection: "row",
                // marginRight: 20,
                // backgroundColor:"green",
                flex: 3,
                justifyContent: "flex-start",
                paddingLeft: 20

            }} >
                <FontAwesomeIcon size={16} style={{
                    flex: 1,
                    color: Colors.primary,
                    opacity: 0.8,
                    // marginTop:-30,
                }}
                    icon={icon} />
                <Text style={[Style.Text, { marginLeft: 10, marginTop: -2 }]} >{data}</Text>
            </View>

            <Pressable
                android_ripple={{ color: Colors.secondary }}
                onPress={() => {
                    add_callback()
                }} style={{
                    flexDirection: "row",
                    // marginRight: 20,
                    // backgroundColor:"red",
                    flex: 0.3,
                    justifyContent: "flex-end",
                    padding: 10
                    // display: 'none'

                }} >
                {add ? <>
                    <Pressable
                        android_ripple={{ color: Colors.secondary }}
                        onPress={() => {
                            add_callback()
                        }}
                        style={{}}
                    >
                        <FontAwesomeIcon size={18} style={{
                            flex: 1,
                            color: Colors.primary,
                            opacity: 0.8,
                            // margin: 20,
                            marginTop:-10,
                        }}
                            icon={faPlusSquare}
                        />

                    </Pressable>

                </> : <>
                    <FontAwesomeIcon size={18} style={{
                        flex: 1,
                        color: Colors.grey,
                        opacity: 0.8
                        // margin: 20,
                    }}
                        icon={faCheckSquare} />
                </>}
            </Pressable>
        </Pressable >
    )
}