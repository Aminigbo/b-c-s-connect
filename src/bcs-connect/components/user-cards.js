import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider } from 'react-native-paper';
import { UserTitle } from './title-display';
import { NameDisplay } from './name-display';
import { ImgBaseUrl } from '../../utilities';

const Colors = Color()
export function UserCard({
    Navigation, data, setModalVisible,
    setWordEntered,
    setFilteredData,
    disp_viewUser,
    action
}) {
    return (
        <Pressable
            onPress={() => {
                disp_viewUser(data) 
                if (setModalVisible) { setModalVisible(false) }
                if (setWordEntered) { setWordEntered("") }
                if (setFilteredData) { setFilteredData([]) }
                action()
            }}
            style={styles.container}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                // marginTop: 10
            }} >
                <View style={{
                    flex: 1,
                    justifyContent: "center", alignContent: "center"
                }} >

                    {
                        data && data.img ?
                            <Image
                                style={[{
                                    width: 30, height: 30,
                                    // marginTop: 10,
                                    borderRadius: 30,
                                }]}
                                // source={require('../../assets/user.png')}
                                // source={require('../../../assets/img2.jpg')}
                                // source={require('@expo/snack-static/react-native-logo.png')}
                                src={`${ImgBaseUrl}/${data.img}`}
                                resizeMode={'cover'} />
                            :
                            <Avatar.Text size={30} label={`${data.name.split(" ")[0][0]} ${data.name.split(" ")[1][0]}`} />
                    }

                </View>

                <View style={{ flex: 5 }} >
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }} >
                        <Text style={[Style.boldText, {}]} >

                            {data && <NameDisplay user={data} />}

                        </Text>
                        {/* {data.role.verified == true && <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={15} icon={faCheckCircle} />} */}

                    </View>
                    <Text style={[Style.Text, { marginTop: 5, color: Colors.dark }]}>

                        {data && <UserTitle User={data} />}
                    </Text>
                    {/* <Divider style={{ marginTop: 15, marginBottom: -15 }} /> */}
                </View>


            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "100%",
        // marginBottom:15
    },
});
