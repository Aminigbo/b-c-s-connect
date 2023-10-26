import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { Color } from '../../components/theme';
import { Style } from '../../../assets/styles';
import { Avatar, Divider } from 'react-native-paper';
import { UserTitle } from './title-display';
import { NameDisplay } from './name-display';
import { ImgBaseUrl } from '../../utilities';
import { Skeleton, VStack, HStack, Center, } from "native-base";

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

export function UserCardSkeletom({
}) {
    return (
        <>

            <View>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, index) => {
                    return <>
                        <View key={index} style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 20,
                            marginVertical: 7,
                            // backgroundColor: "green"
                        }}>
                            <Skeleton size="41" rounded="full" />
                            <View style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                // backgroundColor:"green",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                marginLeft: 15,
                                marginTop: 8
                            }}>
                                <Skeleton mb="3" h="3" w="90%" rounded="5" />
                                <Skeleton mb="3" h="2" w="40%" rounded="5" />
                                {/* <Skeleton.Text lines={1} alignItems="center" px="0" w="40%" /> */}
                            </View>
                        </View></>

                })}
            </View>
        </>
    )
}


export function UserProfileSkeletom({
}) {
    return (
        <>

            <View>
                <Center w="100%">
                    <VStack w="100%" maxW="400" space={6} rounded="md"   >
                        {/* <Skeleton startColor="amber.300"  h="50" mt="10" /> */}
                        <Skeleton mb="3" h="370" w="100%" rounded="5" />

                        <VStack
                            w="100%"
                            maxW="400"
                            alignItems="center"
                            _dark={{
                                borderColor: "coolGray.500"
                            }} _light={{
                                borderColor: "coolGray.200"
                            }}>
                            <Skeleton
                                startColor="lightgrey"
                                borderWidth={1}
                                borderColor="coolGray.200"
                                endColor="warmGray.50"
                                size="125"
                                rounded="full"
                                mt="-320"
                            />
                            <Skeleton mb="3" mt="3" h="2.5" w="45%" rounded="5" />
                            <Skeleton mb="3" mt="-1" h="2" w="60%" rounded="5" />
                            <HStack space="45" mt="15">
                                <Skeleton size="45" startColor="lightgrey" rounded="full" />
                                <Skeleton size="45" startColor="lightgrey" rounded="full" />
                                <Skeleton size="45" startColor="lightgrey" rounded="full" />
                            </HStack>
                        </VStack>

                        <View style={{
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                            backgroundColor: Colors.light,
                            // padding: 12,
                            marginTop: -75,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 15,
                            // flex:1,
                            // height:"100%",
                            minHeight: 450, // Set the minimum height here
                            // backgroundColor: 'red'
                        }} >

                            <View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    padding: 12,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="40%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="60%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="45%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>
                            </View>


                            <Divider style={{ marginVertical: 20, backgroundColor: "lightgrey" }} />

                            <View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    padding: 12,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        {/*  <Skeleton h="4" w="4" ml="3" rounded="2" /> */}
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="40%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="60%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="45%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                            </View>

                            <Divider style={{ marginVertical: 20, backgroundColor: "lightgrey" }} />

                            <View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    padding: 12,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="40%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="60%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginVertical: 9,
                                    // backgroundColor: "red"
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor: "green"
                                    }}>
                                        <Skeleton h="4" w="4" ml="3" rounded="2" />
                                        <Skeleton h="2" w="45%" ml="3" rounded="5" />
                                    </View>
                                    <Skeleton h="4" w="4" ml="3" rounded="2" />
                                </View>

                            </View>
                        </View>

                    </VStack>
                </Center>
            </View>
        </>
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
