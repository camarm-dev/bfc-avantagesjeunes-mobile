import {post} from "@/functions/fetch/tools";


async function getNews(page: number = 1) {
    const url = import.meta.env.VITE_API_URL + '/api/news/list'
    const data = {
        page: page.toString(),
        parPage: "10"
    }
    return await post(url, data)
}

export {
    getNews
}
