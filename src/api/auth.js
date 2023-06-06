import request from '@/utils/request';

export function login(username, password) {
    const data = { username: username, password: password };
    return request.post({
        url: '/login',
        headers: {
            isToken: false
        },
        data: data
    })
}