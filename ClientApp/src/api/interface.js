import axios from 'axios'
import authService from '../components/api-authorization/AuthorizeService'

export default class ApiInterface {

    constructor (url) {
        this.url = url
    }

    async get () {
        return await this.call(axios.get, this.url, null)
    }

    async post (data) {
        return await this.call(axios.post, this.url, data)
    }

    async put (id, data) {
        return await this.call(axios.put, this.url + '/' + id, data)
    }

    async delete(id) {
        return await this.call(axios.delete, this.url + '/' + id, null)
    }

    async call (_call, url, data) {

        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        console.log(user)
        var headers = {'Content-Type': 'application/json'}
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let axios_call = data ? _call(url, data, {headers}) : _call(url, {headers})
        return await axios_call.then(response => {
            return response.data
        }).catch(function (error) {
            console.log(error);
        });
    }
}