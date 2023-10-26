import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { NavigationType } from 'react-router-dom';
import { Color } from '../../components/theme';
import { NumberWithCommas } from '../../utilities';
import { MarkNotificationRead } from '../models';
import { BoldText2 } from '../../components/text';

const Colors = Color()
export function NotificationCard({
    navigation,
    data,
    disp_viewUser,
    disp_notification,
    Notifications,
    User
}) {
    let title = "";
    let desc = ""

    if (data.meta.event) {
        title = "Campaign support"
        desc = `${data.meta.user.name} invited you to support a campaign`
    } else if (data.type == "CONTACT REQUEST") {
        title = "Contact Info Request"
        desc = `${data.meta.user.name} Requested for your Contact info, see his profile.`
    } else if (data.type == "CONTACT REQUEST APPROVED") {
        title = "Contact Info Request Approved"
        desc = `You can now view ${data.meta.user.name}'s contact info.`
    } else {
        title = "New Job alert"
        desc = ` ${data.meta.job.jobtype} ${data.meta.job.title} available at ${data.meta.job.location}. (₦${NumberWithCommas(data.meta.job.salary)})`
    }

    let filter = Notifications.filter(e => e.id == data.id)[0]
    let filterIndex = Notifications.findIndex(e => e.id == data.id)
    let FilterSeen_arry = filter.seen_arry.filter(e => e == User.phone) // check if user have already vied

    return (
        <Pressable
            onPress={() => {
                // disp_notification



                // if not, push to array
                if (FilterSeen_arry.length < 1) {
                    filter.seen_arry.push(User.phone)
                    let NewFilterData = {
                        ...filter,
                        seen: true,
                        seen_arry: filter.seen_arry
                    }
                    // splice
                    Notifications.splice(filterIndex, 1, NewFilterData)
                    disp_notification(Notifications)
                }

                if (data.meta.event) {
                    MarkNotificationRead(data.id, User.phone)
                    navigation.navigate("View-event", { id: data.meta.event.id })
                } else if (data.type == "CONTACT REQUEST") {
                    // console.log(data)
                    MarkNotificationRead(data.id, User.phone)
                    disp_viewUser({
                        meta: {
                            phone: data.meta.user.phone
                        }
                    })
                    navigation.navigate("User-Profile", { data, Request: data.status == null ? true : false })
                    // navigation.navigate("View-event", { id: data.meta.id })
                } else if (data.type == "CONTACT REQUEST APPROVED") {
                    // console.log(data)
                    MarkNotificationRead(data.id, User.phone)
                    disp_viewUser({
                        meta: {
                            phone: data.meta.user.phone
                        }
                    })
                    navigation.navigate("User-Profile", { data })
                    // navigation.navigate("View-event", { id: data.meta.id })
                } else if (data.type == "JOB CREATION") {
                    navigation.navigate("View-job", { id: data.meta.job.id })
                    MarkNotificationRead(data.id, User.phone)
                }
            }}
            style={[styles.container, { backgroundColor: FilterSeen_arry.length < 1 ? "lightgrey" : "#fffdfd" }]} >

            <>
                <Text style={{ fontWeight: 900, fontSize: 15, color: Colors.dark }} >
                    {title}
                </Text>

            </>


            <Text style={{ color: Colors.grey, fontSize: 14, marginTop: 10 }}>
                {desc}
            </Text>
            {data.type == "CONTACT REQUEST" && <>
                {data.seen == false && <BoldText2 style={{ marginTop: 10 }} text="SEE PROFILE" color={Colors.primary} />}
            </>}

            {data.meta.date &&
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10
                }} >
                    {data.meta.date && <Text style={{ color: Colors.grey, fontSize: 16, }}>
                        2023-08-12
                    </Text>}
                    {data.meta.time && <Text style={{ color: Colors.grey, fontSize: 16, }}>
                        3:08px
                    </Text>}

                </View>}
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "92%",
        marginLeft: "4%",
        marginBottom: 15
    },
});
