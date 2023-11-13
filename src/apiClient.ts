// create axios client
import axios from "axios";
import qs from "qs";

// import env from "dotenv";

// env.config();

const baseURL: string | undefined = process.env.FITBIT_API_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    headers: {
        'accept': 'application/json'
    }
});

/*
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.error(error);
    });
*/


const data = qs.stringify({
    'grant_type': 'refresh_token',
    'client_id': '23RFNV',
    'refresh_token': 'b88eaa0583a1b6118e34e2c27ad95e77128ec61f223c977012df66da1bfb2afd'
})


let getSleepDataConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.fitbit.com/1.2/user/-/sleep/date/2023-10-01/2023-11-11.json',
  headers: {
    'accept': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjdHNUwiLCJzdWIiOiJCNUtaSDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjk5ODEzMzc3LCJpYXQiOjE2OTk3MjY5Nzd9.xNajipCwpFbfebhVc4GIfLv6clES7OsvrRoLaZUlBqw'
  }
};
export const getSleepData = async () => {
    try {
        const response = await apiClient.request(getSleepDataConfig);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


const config = {
    method: 'post',
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
        'Authorization': 'Basic MjNSRk5WOjYyYzdkZGNiODY0ZWU1YTA4MTc3MjllZjkyNDRhOGU1',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
}


axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.error(error)
    })
