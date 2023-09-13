import request from "@/utils/request";

export function hierarchy(params = {}) {
    return request.get(
        '/departments/hierarchy',
        {params}
    )
}