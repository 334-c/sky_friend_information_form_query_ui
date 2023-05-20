import axios from "axios"
import { QueryBody } from "../classes"


export const find = async (data: QueryBody) => {
    return await axios.post("/api/sky/find", {data})
}