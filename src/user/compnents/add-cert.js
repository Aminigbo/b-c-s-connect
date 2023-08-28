import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions,
    ImageBackground,
    Modal,
    TouchableOpacity
} from 'react-native';
import { Style } from '../../../assets/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faSquareCheck, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Add_study } from '../controllers/manage-study';
import { Divider, Avatar, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export function AddCertComponent({
    setModalVisible,
    modalVisible,
    setData,
    data,
    years,
    loading,
    setloading,
    User,
    disp_user,
    Colors
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
                    justifyContent: "flex-start",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <TouchableOpacity
                        onPress={() => {
                            if (data.type == "HIGH SCHOOL") {
                                setData({
                                    ...data, type: "COLLEGE"
                                })
                            } else {
                                setModalVisible(!modalVisible);
                            }
                        }}
                        style={{
                            flex: 0,
                            alignItems: "center",
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
                        style={{
                            // flex: 1,
                            alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10,
                            marginLeft: 40
                        }} >
                        <Text style={{
                            fontSize: 13, color: Colors.grey, flex: 1, fontWeight: 900
                        }} >Certification</Text>
                    </TouchableOpacity>
                </View>
            </View >


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
                        value={data.cert}
                        onChangeText={(value) => { setData({ ...data, cert: value }) }}
                        style={{
                            // width: "90%",
                            //  marginLeft: "5%",
                            backgroundColor: Colors.white,
                            borderBottomWidth: 0.1,
                        }}
                        theme={{
                            colors: {
                                primary: Colors.dark,
                                background: 'white',
                                placeholder: "red",

                            },
                            roundness: 8,
                        }}
                        // mode="outlined"
                        label={`Certificate acquired (required)`}
                    />
                    <TextInput
                        // autoFocus
                        value={data.institution}
                        onChangeText={(value) => setData({ ...data, institution: value })}
                        style={{
                            // width: "90%",
                            // marginLeft: "5%",
                            backgroundColor: Colors.white,
                            borderBottomWidth: 0.2
                        }}
                        theme={{
                            colors: {
                                primary: Colors.dark,
                                background: 'white',
                                placeholder: "red",

                            },
                            roundness: 8,
                        }}
                        // mode="outlined"
                        label={`Institution (who certified you)`}
                    />
                    <Text style={{ marginTop: 25, marginBottom: 1, marginLeft: 20 }}>
                        year
                    </Text>

                    <Picker
                        style={{
                            width: "100%",
                            // borderBottomWidth:10
                        }}
                        selectedValue={data.certYear}
                        onValueChange={(itemValue) => setData({ ...data, certYear: itemValue })}
                        mode="dropdown"
                    >
                        {years.map((item) => (
                            <Picker.Item key={item} label={item.toString()} value={item} />
                        ))}
                    </Picker>

                </View>
            </View>

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
                        To: data.To,
                        From: data.From,
                        college: data.college,
                        course: data.course,
                        graduated: data.graduated,
                        setloading,
                        User,
                        disp_user,
                        highschool: data.highschool,
                        class: data.class,
                        type: data.type,
                        Alert,
                        setModalVisible
                    }

                    Add_study(payload)
                }}
                title={`Save`} />


        </>
    )
}