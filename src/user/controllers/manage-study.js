import { AddCourse, AddUser_meta, NewCourse } from "../models/user-model"

export const Add_study = (payload) => {
    let saveCourses = () => {
        //save to list of courses
        let CoursePayload = {
            course: { label: payload.course, value: payload.course },
            college: { label: payload.school, value: payload.school }
        }
        NewCourse(CoursePayload)
    }

    if (payload.type == "COLLEGE") {
        if (!payload.college || !payload.course) {
            alert("Provide all details")
        } else {
            if (payload.graduated == true) {
                if (payload.To.length < 3) {
                    alert("Provide all details")
                } else {
                    saveCourses()
                    payload.setloading(true)
                    let newData = {
                        course: payload.course,
                        school: payload.college,
                        isGraduate: true,
                        type: "college",
                        meta: {
                            fromYear: payload.From,
                            toYear: payload.To,
                        }
                    }
                    payload.User.study.push(newData)
                    const payloadXX = {
                        data: payload.User.study,
                        user: payload.User.phone
                    }
                    AddCourse(payloadXX)
                        .then(res => {
                            payload.setloading(false)
                            if (res.error == null) {
                                payload.disp_user(payload.User)
                                payload.setloading(false)
                                payload.Alert.alert("Success", "Profile updated successfully.",
                                    [
                                        {
                                            text: "Close",
                                            onPress: () => { payload.setModalVisible(false) }
                                        }
                                    ]
                                );
                            }
                        })

                }
            } else {
                // saveCourses()
                payload.setloading(true)
                let newData = {
                    course: payload.course,
                    school: payload.college,
                    isGraduate: false,
                    type: "college",
                    meta: {
                        fromYear: payload.From,
                        toYear: null,
                    }
                }
                payload.User.study.push(newData)
                const payloadX = {
                    data: payload.User.study,
                    user: payload.User.phone
                }
                AddCourse(payloadX)
                    .then(res => {
                        payload.setloading(false)
                        if (res.error == null) {
                            payload.disp_user(payload.User)
                            payload.setloading(false)
                            payload.Alert.alert("Success", "Profile updated successfully.",
                                [
                                    {
                                        text: "Close",
                                        onPress: () => { payload.setModalVisible(false) }
                                    }
                                ]
                            );
                        }
                    })
            }
        }
    } else if (payload.type == "HIGH SCHOOL") {
        if (!payload.highschool || !payload.class) {
            alert("Provide all details")
        } else {
            saveCourses()
            payload.setloading(true)
            let newData = {
                course: null,
                school: payload.highschool,
                isGraduate: false,
                type: "highschool",
                meta: {
                    class: payload.class,
                }
            }
            payload.User.study.push(newData)
            const payloadX = {
                data: payload.User.study,
                user: payload.User.phone
            }
            AddCourse(payloadX)
                .then(res => {
                    payload.setloading(false)
                    if (res.error == null) {
                        payload.disp_user(payload.User)
                        payload.setloading(false)
                        payload.Alert.alert("Success", "High School added successfully.",
                            [
                                {
                                    text: "Close",
                                    onPress: () => { payload.setModalVisible(false) }
                                }
                            ]
                        );
                    }
                })
        }
    } else {
        payload.setloading(true)
        let newData = {
            institution: payload.data.institution,
            certificate: payload.data.cert,
            year: payload.data.certYear,
        }
        // console.log(payload.User.meta)
        payload.User.meta.certification.push(newData)
        const payloadXX = {
            data: {
                ...payload.User.meta,
                certification: payload.User.meta.certification
            },
            user: payload.User.phone
        }
        AddUser_meta(payloadXX)
            .then(res => {
                console.log("saved", res)
                payload.setloading(false)
                if (res.error == null) {
                    payload.disp_user(payload.User)
                    payload.setloading(false)
                    payload.Alert.alert("Success", "New certificaton added successfully.",
                        [
                            {
                                text: "Close",
                                onPress: () => { payload.setModalVisible(false) }
                            }
                        ]
                    );
                } else {
                    alert("A network error occured, make sure you are connected to the internet.")
                }
            })
    }
}

export function EditStudy(payload) {
    payload.setloading(true)
    const payloadX = {
        data: payload.User.study,
        user: payload.User.phone
    }
    AddCourse(payloadX)
        .then(res => {
            payload.setloading(false)
            if (res.error == null) {

                payload.setloading(false)
                payload.Alert.alert("Success", "Operation successful.",
                    [
                        {
                            text: "Close",
                            onPress: () => { }
                        }
                    ]
                );
            }
        })
}