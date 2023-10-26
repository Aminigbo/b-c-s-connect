import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    ActivityIndicator, Modal
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { FetchUserTime, surprise_state, user_state, Brethren, Connect_user, Scan_User, Authenticating_fellowship } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { UserCard } from '../components/user-cards';
import FilterButton from '../../components/buttons/filterButton';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FetchAllUsers } from '../models';
import { CurrentDate } from '../../utilities';
import { Style } from '../../../assets/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FilterComponent } from '../components/filter-component';
import { PrimaryButton } from '../../components/buttons/primary';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { AllStates, Courses, Fellowships, SkillSets } from '../../utilities/data';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Search({ navigation, disp_user, appState, disp_fetchTime, disp_brethren, route, disp_viewUser, disp_scanned_user, disp_AuthFellowship }) {
    const [filter, setFilter] = useState(false)


    const MeetingData = appState.AuthFellowship;
    const Meetings = appState.Meetings;

    const [modalVisible, setModalVisible] = useState({
        status: false,
        type: ""
    })
    const [NewFilteredDataX, setNewFilteredDataX] = useState([])
    const [Filterdata, setFilterData] = useState({
        filteredStates: [],
        filteredFellowships: [],
        filteredSkills: [],
        filteredCourses: []
    })

    const [loading, setLoading] = useState(false)
    const [Buttonloading, setButtonLoading] = useState(false)
    let Brethren = appState.Brethren
    const [data, setData] = useState({
        randomUsers: []
    });


    // render random users
    function RandomUsers() {
        let fetch = () => {
            FetchAllUsers()
                .then(data => {
                    // console.log(data)
                    if (data.data.length < 1) {

                    } else {
                        let rndUsers = data.data.sort(() => 0.5 - Math.random()).slice(0, 30)
                        setData({
                            ...data,
                            randomUsers: rndUsers
                        })
                        disp_brethren(data.data)
                        disp_fetchTime({
                            ...appState.FetchUserTime,
                            usersFetch: CurrentDate()
                        })
                        // console.log(rndUsers[0])
                    }
                    setLoading(false)
                })
        }
        setLoading(true)
        if (Brethren.length > 0) {
            if (appState.FetchUserTime.usersFetch == CurrentDate()) {
                let rndUsers = Brethren.sort(() => 0.5 - Math.random()).slice(0, 30)
                setLoading(false)
                setTimeout(() => {
                }, 500);
                setData({
                    ...data,
                    randomUsers: rndUsers
                })
                // fetch()
                console.log("fetched today")
            } else {
                fetch()
                console.log("not todat")
            }
        } else {
            fetch()
            console.log("Brethren object is empty")
        }
        // setLoading(true)

    }

    // If the purpose of the search is to authenticate user
    function Verify(UserData) {
        disp_scanned_user([UserData])
        // =========================================
        let filter = MeetingData.attendance_data.filter(e => e.phone == UserData.phone)
        let findIndex = MeetingData.attendance_data.findIndex(e => e.phone == UserData.phone)
        if (filter.length < 1) {
            let UserAttData = {
                name: UserData.name,
                phone: UserData.phone,
                id: UserData.id,
                gender: UserData.meta.gender,
            }
            MeetingData.attendance_data.push(UserAttData)
            let newData = {
                ...MeetingData,
                attendance: MeetingData.attendance + 1,
            }
            disp_AuthFellowship(newData)
            Meetings.splice(findIndex, 1, newData)


            // ===============================================
            navigation.navigate("Verify-auht", { UserData });
            console.log(UserData)
        } else {
            Alert.alert("Error", "Already authenticated", [{
                text: "Got it",
                onPress: () => {
                    navigation.navigate("Verify-auht");
                }
            }])
        }

    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log(route.params)
            RandomUsers()
            setFilter(false)
        });
        // console.log(Brethren[0].name)
        return unsubscribe;
    }, [navigation])


    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");


    const [stateEntered, setStateEntered] = useState("");
    const [enteredFellowship, setenteredFellowship] = useState("")
    const [enteredSkill, setenteredSkill] = useState("")
    const [enteredCourses, setenteredCourses] = useState("")



    let NewFilteredData = []
    const TriggerFilter = () => {

        if (stateEntered.length < 3) {
            NewFilteredData = Brethren
            // setNewFilteredData(Brethren)
            console.log("Default")
        } else {
            // setNewFilteredData(Brethren.filter(e => e.state == stateEntered))
            NewFilteredData = Brethren.filter(e => e.state == stateEntered)
            console.log("filtered")
        }

        // ======== filter for fellowship
        if (enteredFellowship.length > 5) {
            let XX = []
            NewFilteredData.forEach(element => {
                const cncfMemberships = element.fellowship.filter(fellowship => fellowship.fellowship === enteredFellowship && fellowship.member == true);
                cncfMemberships.forEach(membership => {
                    XX.push(element)
                });
            });
            NewFilteredData = XX
            // setNewFilteredData(XX)

        }

        // ========================= filter course of study
        if (enteredCourses.length > 2) {
            const XX = []
            NewFilteredData.forEach(element => {
                const cncfMemberships = element.study.filter(course => course.course === enteredCourses);
                cncfMemberships.forEach(membership => {
                    XX.push(element)
                });
            });
            NewFilteredData = XX
            // setNewFilteredData(XX)
        }

        // ============= filter Skills
        if (enteredSkill.length > 2) {
            const XX = []
            NewFilteredData.forEach(element => {
                const cncfMemberships = element.skills.filter(fellowship => fellowship === enteredSkill);
                cncfMemberships.forEach(membership => {
                    XX.push(element)
                });
            });
            NewFilteredData = XX
            // console.group(Brethren)
            // setNewFilteredData(XX)
        }

        console.log(NewFilteredData)
        setNewFilteredDataX(NewFilteredData)

        setTimeout(() => {
            setModalVisible({
                status: false,
                type: ""
            })
            setButtonLoading(false)
            setFilter(true)
        }, 3000);
    }


    const handleFilter = (searchWord) => {
        const newFilter = Brethren.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };



    // =================================================
    const handleStateFilter = (searchWord) => {
        const newFilter = AllStates.filter((value) => {
            return value.value.toLowerCase().includes(searchWord.toLowerCase());
        });
        setStateEntered(searchWord);

        if (searchWord === "") {
            setFilterData({
                ...Filterdata,
                filteredStates: []
            })
        } else {
            setFilterData({
                ...Filterdata,
                filteredStates: newFilter
            })
        }
    };


    // handle fellowship input
    const handleFellowshipFilter = (searchWord) => {
        const newFilter = Fellowships.filter((value) => {
            return value.label.toLowerCase().includes(searchWord.toLowerCase());
        });
        setenteredFellowship(searchWord);

        if (searchWord === "") {
            setFilterData({
                ...Filterdata,
                filteredFellowships: []
            })
        } else {
            setFilterData({
                ...Filterdata,
                filteredFellowships: newFilter
            })
        }
    };

    const handleSkillFilter = (searchWord) => {
        const newFilter = SkillSets.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        setenteredSkill(searchWord);

        if (searchWord === "") {
            setFilterData({
                ...Filterdata,
                filteredSkills: []
            })
        } else {
            setFilterData({
                ...Filterdata,
                filteredSkills: newFilter
            })
        }
    };

    const handleCoursesFilter = (searchWord) => {
        const newFilter = Courses.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        setenteredCourses(searchWord);

        if (searchWord === "") {
            setFilterData({
                ...Filterdata,
                filteredCourses: []
            })
        } else {
            setFilterData({
                ...Filterdata,
                filteredCourses: newFilter
            })
        }
    };

    //  render filter button
    function FilterButton() {
        if (stateEntered.length < 3 && enteredFellowship.length < 3 && enteredSkill.length < 3 && enteredCourses.length < 3) {
            return (<>
                <PrimaryButton
                    callBack={() => {
                    }}
                    title="Filter"
                    style={{
                        opacity: 0.3,
                        width: "100%",
                        marginTop: 40
                    }}
                />
            </>)
        } else {
            return (<>
                <PrimaryButton
                    loading={Buttonloading}
                    callBack={() => {
                        setButtonLoading(true)
                        TriggerFilter()
                        // navigation.navigate("Edit-profile");
                    }}
                    title="Filter"
                    style={{
                        // marginBottom: 10,
                        // marginLeft: "5%",
                        width: "100%",
                        marginTop: 40
                    }}
                />
            </>)
        }
    }

    return (

        <>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 20,
                // backgroundColor: Colors.white,
                // backgroundColor: "green",
                // marginBottom: 15,
                position: 'absolute',
                // top: 10,
                left: "5%",
                zIndex: 2000,
                width: "90%",
                // height: 50,

            }} >

                <TextInput
                    autoFocus
                    onFocus={() => { }}
                    value={wordEntered}
                    onChangeText={(value) => handleFilter(value)}
                    style={{
                        width: "100%",
                        backgroundColor: Colors.light
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
                    mode="outlined"
                    // multiline
                    label="Type the name to search"
                />
                {/* <TextInput
                    autoFocus
                    onFocus={() => { }}
                    value={wordEntered}
                    onChangeText={(value) => handleFilter(value)}
                    style={{
                        width: "70%",
                        backgroundColor: Colors.light
                    }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Type the name to search"
                /> */}


                {/* <TouchableOpacity
                    onPress={() => {
                        setStateEntered("")
                        setenteredFellowship("")
                        setenteredSkill("")
                        setenteredCourses("")
                        setModalVisible({
                            status: true,
                            type: "FILTER"
                        })
                    }}
                    style={{
                        // backgroundColor: "blue",
                        flex: 1,
                        padding: 12,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        marginRight: 10,

                    }} >
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: Colors.light,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,

                    }}>
                        <Text style={[Style.boldText2, { color: Colors.primary, }]} >Filter</Text>
                        <FontAwesomeIcon size={20} style={{
                            // flex: 1,
                            color: Colors.primary,
                            // opacity: 0.8,
                            marginLeft: 10
                            // margin: 20,
                        }}
                            icon={faFilter} />
                    </View>
                </TouchableOpacity> */}

            </View >

            {
                loading == true ?
                    <>
                        <View style={{
                            justifyContent: "center",
                            flex: 1
                        }} >
                            <ActivityIndicator />
                        </View>
                    </>
                    :
                    <>
                        <SafeAreaView style={styles.container}>
                            <ScrollView>
                                <View style={{ width: "100%", marginTop: 80 }}>


                                    {filteredData.length != 0 && (
                                        <View>
                                            {filteredData.slice(0, 4).map((value, index) => {
                                                return (
                                                    <UserCard
                                                        action={() => {
                                                            if (route.params && route.params.type == "MEETING AUTH") {
                                                                Verify(value)
                                                                // =========

                                                            } else {
                                                                navigation.navigate("User-Profile", { value })
                                                            }
                                                        }}
                                                        disp_viewUser={disp_viewUser}
                                                        // setModalVisible={setModalVisible}
                                                        data={value}
                                                        Navigation={navigation}
                                                        key={index}
                                                        setWordEntered={setWordEntered}
                                                        setFilteredData={setFilteredData}
                                                    />
                                                );
                                            })}
                                        </View>
                                    )}


                                </View>
                                <View style={styles.content}>


                                    {
                                        filter == true && <>
                                            {
                                                NewFilteredDataX.length < 1 ? <>
                                                    <View
                                                        style={{ marginVertical: "50%" }}
                                                    >
                                                        <Text>No data found.</Text>
                                                    </View>
                                                </> : NewFilteredDataX.map((e, index) => {
                                                    return (
                                                        <UserCard
                                                            action={() => {
                                                                navigation.navigate("User-Profile", { e })
                                                            }}
                                                            disp_viewUser={disp_viewUser}
                                                            data={e} Navigation={navigation} key={index} />
                                                    )
                                                })

                                            }</>
                                    }

                                </View>
                            </ScrollView>
                        </SafeAreaView>

                        <ScrollView>
                            <View style={{

                            }}>
                                <Modal
                                    animationType="fade"
                                    transparent={false}
                                    visible={modalVisible.status}
                                    onRequestClose={() => {
                                        // Alert.alert('Modal has been closed.');
                                        setModalVisible({
                                            status: false,
                                            type: ""
                                        });
                                    }}>


                                    {modalVisible.type == 'FILTER' &&
                                        <View style={{
                                            // backgroundColor: "red",
                                            padding: 15,
                                            flex: 1
                                        }} >
                                            <BoldText3
                                                text="Filter"
                                                style={{
                                                    marginVertical: 20
                                                }}
                                            />
                                            <BoldText1

                                                color="black"
                                                text="Filter through States, Fellowships, Course of study and skills"
                                            />

                                            <View style={{
                                                flex: 1,
                                                marginTop: 30
                                            }} >
                                                <TextInput
                                                    disabled={Buttonloading}
                                                    // onFocus={() => { handleSnapPress(2) }}
                                                    value={stateEntered}
                                                    onChangeText={(value) => handleStateFilter(value)}
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: 20
                                                    }}
                                                    textColor={Colors.dark}
                                                    theme={{
                                                        colors: {
                                                            primary: Colors.dark,
                                                            background: 'white',
                                                            placeholder: "red",
                                                        },
                                                        // roundness: 8,
                                                    }}
                                                    mode="outlined"
                                                    // multiline
                                                    label="Filter state"
                                                />
                                                {Filterdata.filteredStates.length != 0 && (
                                                    <View style={{ marginBottom: 40 }}>
                                                        {Filterdata.filteredStates.slice(0, 4).map((value, index) => {
                                                            return (
                                                                <>
                                                                    <Pressable
                                                                        key={index}
                                                                        onPress={() => {
                                                                            setStateEntered(value.label)
                                                                            setFilterData({
                                                                                ...Filterdata,
                                                                                filteredStates: []
                                                                            })
                                                                        }} >
                                                                        <View
                                                                            style={{
                                                                                padding: 10,
                                                                                marginVertical: 3,
                                                                                backgroundColor: Colors.light,
                                                                            }}>
                                                                            <BoldText2
                                                                                color={Colors.dark}
                                                                                text={value.label} />
                                                                        </View >
                                                                    </Pressable>
                                                                </>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                                <TextInput
                                                    disabled={Buttonloading}
                                                    // onFocus={() => { handleSnapPress(2) }}
                                                    value={enteredFellowship}
                                                    onChangeText={(value) => handleFellowshipFilter(value)}
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: 20
                                                    }}
                                                    textColor={Colors.dark}
                                                    theme={{
                                                        colors: {
                                                            primary: Colors.dark,
                                                            background: 'white',
                                                            placeholder: "red",
                                                        },
                                                        // roundness: 8,
                                                    }}
                                                    mode="outlined"
                                                    // multiline
                                                    label="Filter fellowship"
                                                />
                                                {Filterdata.filteredFellowships.length != 0 && (
                                                    <View style={{ marginBottom: 40 }}>
                                                        {Filterdata.filteredFellowships.slice(0, 4).map((value, index) => {
                                                            return (
                                                                <>
                                                                    <Pressable
                                                                        key={index}
                                                                        onPress={() => {
                                                                            setenteredFellowship(value.label)
                                                                            setFilterData({
                                                                                ...Filterdata,
                                                                                filteredFellowships: []
                                                                            })
                                                                        }} >
                                                                        <View
                                                                            style={{
                                                                                padding: 10,
                                                                                marginVertical: 3,
                                                                                backgroundColor: Colors.light,
                                                                            }}>
                                                                            <BoldText2
                                                                                color={Colors.dark}
                                                                                text={value.label} />
                                                                        </View >
                                                                    </Pressable>
                                                                </>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                                {Filterdata.filteredCourses.length != 0 && (
                                                    <View style={{ marginTop: 20 }}>
                                                        {Filterdata.filteredCourses.slice(0, 4).map((value, index) => {
                                                            return (
                                                                <>
                                                                    <Pressable
                                                                        key={index}
                                                                        onPress={() => {
                                                                            setenteredCourses(value)
                                                                            setFilterData({
                                                                                ...Filterdata,
                                                                                filteredCourses: []
                                                                            })
                                                                        }} >
                                                                        <View
                                                                            style={{
                                                                                padding: 10,
                                                                                marginVertical: 3,
                                                                                backgroundColor: Colors.light,
                                                                            }}>
                                                                            <BoldText2
                                                                                color={Colors.dark}
                                                                                text={value} />
                                                                        </View >
                                                                    </Pressable>
                                                                </>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                                <TextInput
                                                    disabled={Buttonloading}
                                                    // onFocus={() => { handleSnapPress(2) }}
                                                    value={enteredCourses}
                                                    onChangeText={(value) => handleCoursesFilter(value)}
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: 20
                                                    }}
                                                    textColor={Colors.dark}
                                                    theme={{
                                                        colors: {
                                                            primary: Colors.dark,
                                                            background: 'white',
                                                            placeholder: "red",
                                                        },
                                                        // roundness: 8,
                                                    }}
                                                    mode="outlined"
                                                    // multiline
                                                    label="Filter course of study"
                                                />

                                                {Filterdata.filteredSkills.length != 0 && (
                                                    <View style={{ marginTop: 20 }}>
                                                        {Filterdata.filteredSkills.slice(0, 4).map((value, index) => {
                                                            return (
                                                                <>
                                                                    <Pressable
                                                                        key={index}
                                                                        onPress={() => {
                                                                            setenteredSkill(value)
                                                                            setFilterData({
                                                                                ...Filterdata,
                                                                                filteredSkills: []
                                                                            })
                                                                        }} >
                                                                        <View
                                                                            style={{
                                                                                padding: 10,
                                                                                marginVertical: 3,
                                                                                backgroundColor: Colors.light,
                                                                            }}>
                                                                            <BoldText2
                                                                                color={Colors.dark}
                                                                                text={value} />
                                                                        </View >
                                                                    </Pressable>
                                                                </>
                                                            );
                                                        })}
                                                    </View>
                                                )}
                                                <TextInput
                                                    disabled={Buttonloading}
                                                    // onFocus={() => { handleSnapPress(2) }}
                                                    value={enteredSkill}
                                                    onChangeText={(value) => handleSkillFilter(value)}
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: 20
                                                    }}
                                                    textColor={Colors.dark}
                                                    theme={{
                                                        colors: {
                                                            primary: Colors.dark,
                                                            background: 'white',
                                                            placeholder: "red",
                                                        },
                                                        // roundness: 8,
                                                    }}
                                                    mode="outlined"
                                                    // multiline
                                                    label="Filter skills"
                                                />



                                                <FilterButton />
                                            </View>






                                        </View>
                                    }

                                    {modalVisible.type == 'SEARCH' &&
                                        <View style={styles.centeredView}>
                                            <TextInput
                                                autoFocus
                                                onFocus={() => { }}
                                                value={wordEntered}
                                                onChangeText={(value) => handleFilter(value)}
                                                style={{ width: "100%", backgroundColor: Colors.white }}
                                                textColor={Colors.dark}
                                                theme={{
                                                    colors: {
                                                        primary: Colors.dark,
                                                        background: 'white',
                                                        placeholder: "red",
                                                    },
                                                    // roundness: 8,
                                                }}
                                                mode=" "
                                                // multiline
                                                label="Type the name to search"
                                            />

                                            {filteredData.length != 0 && (
                                                <View>
                                                    {filteredData.slice(0, 4).map((value, index) => {
                                                        return (
                                                            <UserCard
                                                                action={() => {
                                                                    navigation.navigate("User-Profile", { value })
                                                                }}
                                                                disp_viewUser={disp_viewUser}
                                                                setModalVisible={setModalVisible}
                                                                data={value}
                                                                Navigation={navigation}
                                                                key={index}
                                                                setWordEntered={setWordEntered}
                                                                setFilteredData={setFilteredData}
                                                            />
                                                        );
                                                    })}
                                                </View>
                                            )}


                                        </View>
                                    }


                                </Modal>
                            </View >
                        </ScrollView>


                    </>}

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
        disp_fetchTime: (payload) => dispatch(FetchUserTime(payload)),
        disp_brethren: (payload) => dispatch(Brethren(payload)),
        disp_viewUser: (payload) => dispatch(Connect_user(payload)), // when tap on any user, dispatch their data to state

        // ==
        disp_scanned_user: (payload) => dispatch(Scan_User(payload)),
        disp_AuthFellowship: (payload) => dispatch(Authenticating_fellowship(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);



const styles = StyleSheet.create({

    container: {
        // flex: 1,
        paddingTop: 15,
        // backgroundColor: "red",

    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: "red",
        marginTop: 50
    },

    textInput: {
        width: '100%',
        backgroundColor: Colors.light,
        height: 50,
        // borderWidth: 1,
        // borderColor: 'gray',
        // paddingLeft: 10,
        // borderRadius: 76, // Add a borderRadius of 16
    },

    input: {
        // height: 40,
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "black"
    },

});

