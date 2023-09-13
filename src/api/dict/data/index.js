import request from "@/utils/request";

export function listAll(query = {}) {
    return request.get(
        '/dict-data/all',
        {params: query}
    )
}

export function listAllByDictType(type, query = {}) {
    if (!query['dictType.type']) {
        query['dictType.type'] = type
    }
    if (query['sort']) {
        query["sort"] = "idx,asc"
    }
    return new Promise((resolve, reject) => {
        request.get(
            '/dict-data/all',
            {params: query}
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
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

export function sort(ids) {
    return new Promise((resolve, reject) => {
        request.patch(
            `/dict-data/sort`,
            ids
        ).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}