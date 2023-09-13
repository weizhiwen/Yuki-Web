import request from "@/utils/request";

export function search(search = {}, page = {}) {
    const params = {...page}
    return request.post(
        '/positions/search',
        search,
        {params}
    )
}

export function create(param) {
    return new Promise((resolve, reject) => {
        request.post(
            '/positions',
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
            `/positions/${id}`,
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
            `/positions/${id}`,
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export function deleteOne(id) {
    return new Promise((resolve, reject) => {
        request.delete(
            `/positions/${id}`,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function remove(ids) {
    return new Promise((resolve, reject) => {
        request.delete(
            `/positions/${ids.join(',')}`,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}