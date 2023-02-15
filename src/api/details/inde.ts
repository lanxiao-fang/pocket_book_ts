// 权限问题后期增加
import { get, post } from '@/utils/http';


export interface billListReqData {
    date: string,
    page: number | string,
    page_size: number | string,
    type_id: number | string
}
export interface billListDayItem {
    amount: string,
    date: string,
    id: number | string,
    pay_type: number | string,
    remark: string,
    type_id: string | number,
    type_name: string
}

export interface billListDay {
    bills: billListDayItem[],
    date: string
}

export interface billList {
    list: billListDay[],
    totalExpense: number | string,
    totalIncome: string | number,
    totalPage: number | string
}

export class InitData {
    list: billList = {
        list: [],
        totalExpense: 0,
        totalIncome: 0,
        totalPage: 0
    }
}

export interface typeItem {
    id: number,
    name: string,
    type: string | number,
    user_id?: number
}


export interface typeList {
    list: typeItem[]
}
export interface addBillReq {
    id?: number | string,
    amount: string,
    type_id: number | string,
    type_name: string,
    pay_type: number,
    remark: string,
    date: number | Date
}


enum URL {
    billList = '/api/bill/list',
    type = '/api/type/list',
    addBill = '/api/bill/add'

}

const getBillListApi = async (params: billListReqData) => get<billList>({ url: URL.billList, params });
const getTypeListApi = async () => get<typeList>({ url: URL.type })
const addBillApi = async (data: addBillReq) => post({ url: URL.addBill, data })


export { getBillListApi, getTypeListApi, addBillApi };
