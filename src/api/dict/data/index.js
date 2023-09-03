import request from "@/utils/request";

export function listAll(query = {}) {
    return request.get(
        '/dict-data/all',
        {params: query}
    )
}

export function create(param) {
    return new Promise((resolve, reject) => {
        request.post(
            '/dict-data',
            param,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function update(id, param) {
    return new Promise((resolve, reject) => {
        request.put(
            `/dict-data/${id}`,
            param,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function detail(id) {
    return new Promise((resolve, reject) => {
        request.get(
            `/dict-data/${id}`,
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function disable(id) {
    return new Promise((resolve, reject) => {
        request.patch(
            `/dict-data/disable/${id}`,
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function enable(id) {
    return new Promise((resolve, reject) => {
        request.patch(
            `/dict-data/enable/${id}`,
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}