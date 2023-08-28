import { PushNotification, PushNotificationMultiple } from "../../services/triggerNotifications"
import { AddJobsController } from "../models"

export function CreateJobs(
    {
        title,
        employerType,
        company,
        location,
        worktplaceype,
        jobtype,
        date,
        salary,
        description,
        Alert, User, setModalVisible,
        setLoading, AvailableJobs
    }
) {
    if (!title || !employerType || !company || !location || !worktplaceype || !jobtype || !date || !salary || !description) {
        Alert.alert("Error", "Fill out all fields")
    } else {
        let newData = {
            title,
            employerType,
            company,
            location,
            worktplaceype,
            jobtype,
            deadline: date,
            salary,
            description,
            poster: User.name,
            poster_id: User.meta.email,
            posterID: User.phone
        }
        AddJobsController(newData)
            .then(res => {
                if (res.success == true) {
                    Alert.alert("Success", "Job posted successfully.", [
                        {
                            title: "Done",
                            onPress: () => {
                                setModalVisible(false)
                                setLoading(false)
                                AvailableJobs(true)
                            }
                        }
                    ])
                } else {
                    Alert.alert("Error", res.message)
                }
                // AvailableJobs()
                // Alert.alert("Success", "Job posted successfully.")

                // PushNotificationMultiple({
                //     name:  User.name,
                //     message: `${jobtype} role available at ${location} for a pay starting from ${salary} || ${description.slice(0, 50)}`,
                //     // token: payload.invitee.meta.Fcmoken,
                //     title: `${title} needed at ${location} for ${salary}`,
                //     largeImg: `https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/0.5203534930645486.jpg`,
                //     id: "JOBID",
                //     type: "JOB"
                // })
            })
    }
}