export class QueryBody {
    words: string
    sentences: Array<String>
    sentencesText: string
}
export class Page {
    pageNum: number = 1
    pageSize: number = 10
    total: number = 0
}
