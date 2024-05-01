import {post} from "@/functions/fetch/tools"
import {NewsResponse} from "@/types/news"
import {APIResponse} from "@/functions/fetch/interfaces"


async function getNews(page = 1): Promise<NewsResponse & APIResponse> {
    const url = import.meta.env.VITE_API_URL + "/api/news/list"
    const data = {
        page: page.toString(),
        parPage: "10"
    }
    return await post(url, data) as unknown as NewsResponse & APIResponse
}

export {
    getNews
}
