import {
    View,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Add_study } from './manage-study';
import { TextInput } from 'react-native-paper';
import { UpdateUserMetaController } from '../controllers/user-controller';

export function AddBethel({
    setModalVisible,
    modalVisible,
    setData,
    data,
    loading,
    setloading,
    User,
    disp_user,
    Colors,
    updateComponent,
    setUpdateComponent
}) {

    return (
        <>

            <View style={{
                display: "flex",
                flexDirection: "column",
                // marginTop: 10,
                // backgroundColor: Colors.light,
                // backgroundColor: "red",
                marginBottom: 5,
                // position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                // height: 50,
                paddingTop: 15,
                paddingBottom: 10,
            }} >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <TouchableOpacity
                        onPress={() => {
                            if (updateComponent == "ZONE") {
                                setUpdateComponent("BETHEL")
                            } else {
                                setModalVisible(!modalVisible);
                            }
                        }}
                        style={{
                            flex: 0, alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10, marginLeft: 10
                        }} >

                        <FontAwesomeIcon size={16} style={{
                            flex: 1,
                            color: Colors.primary,
                            opacity: 0.8
                            // margin: 20,
                        }}
                            icon={faArrowLeftLong} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            setUpdateComponent("BETHEL")
                        }}
                        style={{
                            flex: 1, alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10, marginLeft: 10
                        }} >
                        <Text style={{
                            fontSize: 13, color: updateComponent == "BETHEL" ? Colors.primary : Colors.grey, flex: 1, fontWeight: 900
                        }} >Add Your Bethel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setUpdateComponent("ZONE")
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.white,
                            //  backgroundColor:Colors.light,
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: updateComponent == "ZONE" ? Colors.primary : Colors.grey, flex: 1, fontWeight: 900
                        }} >Add Your Zone</Text>
                    </TouchableOpacity>
                </View>
            </View >


            {
                updateComponent == "BETHEL" ?
                    <>
                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: "100%",
                                // backgroundColor:Colors.lightgrey,
                                // padding:10
                            }} >
                                <TextInput
                                    // autoFocus
                                    value={data.college}
                                    onChangeText={(value) => { setData({ ...data, bethel: value }) }}
                                    style={{
                                        // width: "90%",
                                        //  marginLeft: "5%",
                                        backgroundColor: Colors.white,
                                        borderBottomWidth: 0.2,
                                    }}
                                    textColor={Colors.dark}
                                    theme={{
                                        colors: {
                                            primary: Colors.grey,
                                            background: 'white',
                                            placeholder: "red",

                                        },
                                        roundness: 8,
                                    }}
                                    // mode="outlined"
                                    label={`Enter the name of your Bethel....`}
                                />

                            </View>
                        </View>
                    </> :

                    <>
                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: "100%",
                                // backgroundColor:"white"
                            }} >
                                <TextInput
                                    // autoFocus
                                    value={data.highschool}
                                    onChangeText={(value) => { setData({ ...data, zone: value }) }}
                                    style={{
                                        width: "100%", marginLeft: "0%",
                                        backgroundColor: Colors.white,
                                        borderBottomWidth: 0.2
                                    }}
                                    textColor={Colors.dark}
                                    theme={{
                                        colors: {
                                            primary: Colors.grey,
                                            background: 'white',
                                            placeholder: "red",

                                        },
                                        roundness: 8,
                                    }}
                                    // mode="outlined"
                                    label={`Enter the name of your Zone....`}
                                />

                            </View>
                        </View>
                    </>

            }

            <PrimaryButton
                loading={loading}
                style={{
                    width: "90%",
                    textTransform: 'uppercase',
                    marginBottom: 20,
                    marginLeft: "5%"
                }}
                callBack={() => {
                    const payload = {
                        metaType: updateComponent,
                        setloading,
                        User,
                        disp_user,
                        Alert,
                        setModalVisible,
                        data
                    }
                    UpdateUserMetaController(payload)
                }}
                title={`Save`} />


        </>
    )
}