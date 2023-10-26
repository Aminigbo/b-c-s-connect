import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../config/supabase"
import { API_Base_URL } from '../../utilities';


export function FetchAllJobs() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${API_Base_URL}jobs/all`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result)
            return data
        })
        .catch(error => {
            return error
        });


}

export function AddJobsController(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": data.title,
        "employerType": data.employerType,
        "location": data.location,
        "worktplaceype": data.worktplaceype,
        "jobtype": data.jobtype,
        "date": data.deadline,
        "salary": data.salary,
        "company": data.company,
        "description": data.description,
        "User": {
            "name": data.poster,
            "email": data.poster_id,
            "ID": data.posterID
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${API_Base_URL}jobs/post-job`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let Data = JSON.parse(result)
            return Data
        })
        .catch(error => console.log('error', error));
}



export function FetchAllUsersJobs(poserId){
    return supabase
    .from("jobs")
    .select("*")
    .eq("poster_id", poserId)
}

export function ApplyForJob(payload) {
    console.log(payload)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "job": payload.job,
        "application": payload.application
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${API_Base_URL}jobs/submit-application`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let Data = JSON.parse(result)
            return Data
        })
        .catch(error => console.log('error', error));
}


export async function GetSingleJob(id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}jobs/single/${id}`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1);
        return data
    } catch (error) {
        return error
    }
}
