import request from "@/utils/request";

export function searchDictTypes(search = {}) {
    return request.post(
        '/dict-types/search',
        search
    )
}