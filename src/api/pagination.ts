import axiosInstance from "./axios";

// 获取分页用户
export function getPagination(API: string, page: number, sort: string, order: string, per_page: number) {
    return axiosInstance({
        url: "v1/" + API + "?page=" + page + "&sort=" + sort + "&order=" + order + "&per_page=" + per_page,
        method: "get"
    })
}

// 前往上一页/下一页
export function getPaginationPrevNext(URL: string) {
    return axiosInstance({
        url: URL,
        method: "get"
    })
}