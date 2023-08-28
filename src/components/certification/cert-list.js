import { faCheckSquare, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Color } from '../../components/theme';
import { Style } from '../../../assets/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Colors = Color()
export function Certificates({
    data, icon, iconX, iconXCallback, approved
}) {
    return (
        <View
            // key={key}
            style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 17,
                paddingRight: 15,
                paddingLeft: 10,
                // backgroundColor:"red"
            }} >

            <View style={{
                flexDirection: "row",
                // marginRight: 20,
                // backgroundColor:"green",
                flex: 1,
                justifyContent: "space-between",
                // paddingLeft: 20

            }} >
                <FontAwesomeIcon size={14} style={{
                    flex: 1,
                    color: approved ? approved == true ? Colors.primary : Colors.grey : Colors.primary,
                    opacity: 0.8
                    // margin: 20,
                }}
                    icon={icon} />
                <Text style={[Style.boldText, { flex: 1, marginLeft: 10, marginTop: -2, }]} >{data}</Text>
                {iconX &&
                    <TouchableOpacity style={{ flex: 2 }}
                        onPress={iconXCallback}
                    >
                        <FontAwesomeIcon size={17} style={{
                            // flex: 1,
                            color: Colors.primary,
                            opacity: 0.8
                            // margin: 20,
                        }}
                            icon={iconX} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}