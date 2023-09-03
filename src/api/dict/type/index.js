import request from "@/utils/request";

export function search(search = {}, page = {}) {
    const params = {...page}
    return request.post(
        '/dict-types/search',
        search,
        {params}
    )
}

export function create(param) {
    return new Promise((resolve, reject) => {
        request.post(
            '/dict-types',
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
            `/dict-types/${id}`,
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
            `/dict-types/${id}`,
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
            `/dict-types/${id}`,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

export function deleteMultiple(ids) {
    return new Promise((resolve, reject) => {
        request.delete(
            `/dict-types/${ids.join(',')}`,
        ).then(data => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}