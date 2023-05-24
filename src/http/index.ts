import axios from "axios"
import { QueryBody, Page } from "../classes"


export const find = async (data: QueryBody, page: Page) => {
    return await axios.post("/api/sky/find", {...data, ...page})
}