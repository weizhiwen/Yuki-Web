import request from "@/utils/request";

export function searchDictTypes(search = {}, page = {}) {
    const params = {...page}
    return request.post(
        '/dict-types/search',
        search,
        {params}
    )
}