import request from "@/utils/request";
import {setToken} from "@/utils/cookie";

export function login(param) {
    return new Promise((resolve, reject) => {
        request.post(
            '/auth/login',
            param,
            {
                headers: {isToken: false}
            }
        ).then(data => {
            setToken(data)
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function test() {
    return request.get('/auth/test')
}