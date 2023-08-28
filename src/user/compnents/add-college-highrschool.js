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

export function HighschoolCollegeComponent({
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
                    justifyContent: "space-around",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
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
                            setData({
                                ...data, type: "COLLEGE"
                            })
                        }}
                        style={{
                            flex: 1, alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10, marginLeft: 10
                        }} >
                        <Text style={{
                            fontSize: 13, color: data.type == "COLLEGE" ? Colors.primary : Colors.grey, flex: 1, fontWeight: 900
                        }} >Add college</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            setData({
                                ...data, type: "HIGH SCHOOL"
                            })
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.white,
                            //  backgroundColor:Colors.light,
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: data.type == "HIGH SCHOOL" ? Colors.primary : Colors.grey, flex: 1, fontWeight: 900
                        }} >Add high school</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setData({
                                ...data, type: "CERTIFICATION"
                            })
                        }}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10,
                            marginRight: 10
                        }} >
                        <Text style={{
                            fontSize: 13, color: data.type == "CERTIFICATION" ? Colors.primary : Colors.grey, flex: 1, fontWeight: 900
                        }} >Certification</Text>
                    </TouchableOpacity>
                </View>
            </View >


            {
                data.type == "COLLEGE" &&
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
                                onChangeText={(value) => { setData({ ...data, college: value }) }}
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
                                label={`College name (required)`}
                            />
                            <TextInput
                                // autoFocus
                                value={data.course}
                                onChangeText={(value) => setData({ ...data, course: value })}
                                style={{
                                    // width: "90%",
                                    // marginLeft: "5%",
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
                                label={`Course of study (required)`}
                            />
                            <View
                                style={{
                                    display: "flex",
                                    // flex: 1,
                                    flexDirection: "row",
                                    // backgroundColor: Colors.lightgrey,
                                    justifyContent: "space-between",
                                    paddingVertical: 20,
                                    // paddingHorizontal:10,
                                    borderBottomColor: Colors.black,
                                    borderBottomWidth: 0.6,
                                    // width: "90%",
                                    // marginLeft: "5%"
                                    paddingHorizontal: 15,

                                }} >
                                <Pressable
                                    onPress={() => { }}
                                    style={{ flexDirection: "row", flex: 1, justifyContent: "flex-start", }} >
                                    <Text style={[Style.boldText2, {}]} >Graduated</Text>
                                </Pressable>

                                {
                                    data.graduated == true ? <>
                                        <Pressable
                                            onPress={() => {
                                                setData({
                                                    ...data,
                                                    graduated: false
                                                })
                                            }}
                                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end", }} >
                                            <FontAwesomeIcon style={{
                                                flex: 1,
                                                color: data.graduated == true ? Colors.primary : Colors.lightgrey,
                                                // marginRight: 10

                                            }} size={20} icon={faSquareCheck} />
                                        </Pressable>
                                    </> : <>
                                        <Pressable
                                            onPress={() => {
                                                setData({
                                                    ...data,
                                                    graduated: true
                                                })
                                            }}
                                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end", }} >
                                            <FontAwesomeIcon style={{
                                                flex: 1,
                                                color: data.graduated == true ? Colors.primary : Colors.lightgrey,
                                                // marginRight: 10

                                            }} size={20} icon={faSquare} />
                                        </Pressable>
                                    </>
                                }

                            </View>

                            <Text style={{ marginTop: 25, marginBottom: 1, marginLeft: 20, color: Colors.grey }}> {data.graduated == true ?
                                "From" : "Since"}</Text>


                            <View
                                style={{
                                    // backgroundColor: Colors.light,
                                    color: Colors.dark,
                                    // borderRadius: 10,
                                    // marginBottom: 10,
                                    borderBottomWidth: 0.5,
                                    borderColor: Colors.dark
                                }}
                            >
                                <Picker
                                    style={{
                                        width: "100%",
                                        color: Colors.dark
                                    }}
                                    selectedValue={data.From}
                                    onValueChange={(itemValue) => setData({ ...data, From: itemValue })}
                                    mode="dropdown"
                                >
                                    {years.map((item) => (
                                        <Picker.Item key={item} label={item.toString()} value={item} />
                                    ))}
                                </Picker>

                            </View>

                            {data.graduated == true &&
                                <>
                                    <Text style={{ marginTop: 25, marginBottom: 1, marginLeft: 20, color: Colors.grey }}>To</Text>

                                    <View
                                        style={{
                                            // backgroundColor: Colors.light,
                                            color: Colors.dark,
                                            // borderRadius: 10,
                                            // marginBottom: 10,
                                            borderBottomWidth: 0.5,
                                            borderColor: Colors.dark
                                        }}
                                    >
                                        <Picker
                                            style={{
                                                width: "100%",
                                                color: Colors.dark
                                            }}
                                            selectedValue={data.To}
                                            onValueChange={(itemValue) => setData({ ...data, To: itemValue })}
                                            mode="dropdown"
                                        >
                                            {years.map((item) => (
                                                <Picker.Item key={item} label={item.toString()} value={item} />
                                            ))}
                                        </Picker>

                                    </View>
                                </>
                            }
                        </View>
                    </View>
                </>
            }

            {data.type == "HIGH SCHOOL" &&
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
                            onChangeText={(value) => { setData({ ...data, highschool: value }) }}
                            style={{
                                width: "100%",
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
                            label={`High School name (required)`}
                        />

                        <Text style={{ marginTop: 25, marginBottom: 1, marginLeft: 20, color: Colors.grey }}>
                            Class year
                        </Text>

                        <View
                            style={{
                                // backgroundColor: Colors.light,
                                color: Colors.dark,
                                // borderRadius: 10,
                                // marginBottom: 10,
                                borderBottomWidth: 0.5,
                                borderColor: Colors.dark
                            }}
                        >
                            <Picker
                                style={{
                                    color: Colors.dark
                                }}
                                selectedValue={data.class}
                                onValueChange={(itemValue) => setData({ ...data, class: itemValue })}
                                mode="dropdown"
                            >
                                {years.map((item) => (
                                    <Picker.Item key={item} label={item.toString()} value={item} />
                                ))}
                            </Picker>

                        </View>



                    </View>
                </View>
            }

            {data.type == "CERTIFICATION" &&
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
                            textColor={Colors.dark}
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
                                borderBottomWidth: 0.2,
                            }}
                            textColor={Colors.dark}
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
                        <Text style={{ marginTop: 25, marginBottom: 1, marginLeft: 20, color: Colors.grey }}>
                            Year issued
                        </Text>

                        <View
                            style={{
                                // backgroundColor: Colors.light,
                                color: Colors.dark,
                                // borderRadius: 10,
                                // marginBottom: 10,
                                borderBottomWidth: 0.5,
                                borderColor: Colors.dark
                            }}
                        >
                            <Picker
                                style={{
                                    width: "100%",
                                    color: Colors.dark
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
                </View>

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
                        setModalVisible,
                        data
                    }

                    Add_study(payload)
                }}
                title={`Save`} />


        </>
    )
}