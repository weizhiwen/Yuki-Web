import request from '@/utils/request';

export function login(username, password) {
    const data = { username: username, password: password };
    return request({
        url: '/auth/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}