export interface typeItem {
    id: number | string,
    name: string,
    type: string | number,
    user_id?: number
}


export interface typeList {
    list: typeItem[]
}

export interface TypeState {
    expense: typeItem[],
    income: typeItem[],
}

