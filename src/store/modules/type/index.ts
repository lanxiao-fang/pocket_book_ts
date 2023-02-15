import { defineStore } from 'pinia';
import { getTypeListApi, addBillReq, addBillApi } from '@/api/details/inde'
import { TypeState } from './type'

export const useTypeStore = defineStore('type', {
    state: (): TypeState => ({
        expense: [],
        income: [],
    }),
    getters: {

    },
    actions: {
        // 获取消费、收入类型
        async getTypeList() {
            const { list } = await getTypeListApi()
            this.expense = list.filter((v) => v.type == 1)
            this.income = list.filter((v) => v.type == 2)
        },

        async addBill(data: addBillReq) {
            const res = await addBillApi(data)
            console.log('添加成功', res);


        }
    }
});