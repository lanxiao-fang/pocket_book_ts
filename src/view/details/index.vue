<template>
    <div class="details-page">
        <div class="header">
            <div class="type" @click="showTypePop">
                <span class="type-text">{{ selectItem.name || '全部类型' }}</span>
                <van-icon name="apps-o" />
            </div>
            <div class="details">
                <span class="date" @click="showMonthPop">{{ date }}<van-icon name="arrow-down" /></span>
                <span>总支出<span>￥{{ totalExpense }}</span></span>
                <span>总收入<span>￥{{ totalIncome }}</span></span>
            </div>
        </div>
        <div class="conten-body">
            <van-pull-refresh v-model="refresh" @refresh="onRefresh">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <template v-for="(item, index) in list" :key="item.date">
                        <CardItem :item-data="item"></CardItem>
                    </template>
                </van-list>
            </van-pull-refresh>

        </div>
        <div class="add-icon" @click="showAddPop">
            <van-icon name="plus" />
        </div>

        <TypePop v-model:show="showType" @selectType="selectType"></TypePop>

        <monthPop v-model:show="showMonth" :columnsType="['year', 'month']" @selectMonth="selectMonth">
        </monthPop>

        <addPop v-model:show="showAdd" @addBill="addBill"></addPop>

    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import CardItem from '@/components/cardItem.vue'
import TypePop from '@/components/typePop.vue'
import monthPop from '@/components/monthPop.vue'
import addPop from '@/components/addPop.vue'
import { getBillListApi, InitData, billList, typeItem, billListReqData } from '@/api/details/inde'
import { useTypeStore } from '@/store';
const typeStore = useTypeStore()

const { list: listInit } = new InitData()
let list = ref(listInit.list)
let totalExpense = ref(listInit.totalExpense)
let totalIncome = ref(listInit.totalIncome)
let showType = ref(false)
let refresh = ref(false)
let loading = ref(false)
let finished = ref(false)
let showMonth = ref(false)
let showAdd = ref(false)
let selectItem = ref<typeItem>({
    id: 0,
    name: '',
    type: 'all',
    user_id: 0
})

let billListReq = reactive<billListReqData>({
    date: dayjs().format('YYYY-MM'),
    page: 1,
    page_size: 5,
    type_id: 'all'
})


const getBillList = async () => {
    loading.value = true
    const res = await getBillListApi(billListReq)
    list.value = list.value.concat(res.list)
    totalExpense.value = res.totalExpense
    totalIncome.value = res.totalIncome
    refresh.value = false
    loading.value = false
    if (billListReq.page >= res.totalPage) {
        // 加载完列表
        finished.value = true
    }
}
const showTypePop = () => {
    showType.value = !showType.value
}
const showMonthPop = () => {
    showMonth.value = !showMonth.value
}
const showAddPop = () => {
    showAdd.value = !showAdd.value
}
const selectType = (val: typeItem) => {
    selectItem.value = val
    billListReq.type_id = val.id
    showTypePop()
    getBillList()
}
const selectMonth = (val: string) => {
    console.log('父组件接受的时间', val);
    billListReq.date = val
    billListReq.page = 1
    showMonthPop()
    getBillList()
}

const onRefresh = () => {
    billListReq.page = 1
    getBillList()
}
const onLoad = () => {
    billListReq.page = Number(billListReq.page) + 1
    getBillList()
}
const addBill = () => {
    onRefresh()
}
getBillList()
typeStore.getTypeList()

const { date } = toRefs(billListReq)

</script>

<style lang="scss" scoped>
.details-page {
    display: flex;
    position: relative;
    height: calc(100vh - 50px);
    padding: 80px 0 0 0;
    overflow: auto;

    .add-icon {
        position: fixed;
        bottom: calc(50px + 20px);
        right: 24px;
        width: 50px;
        height: 50px;
        color: $theme_color;
        font-weight: bold;
        text-align: center;
        line-height: 50px;
        background: #fff;
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
        border-radius: 50%;
        z-index: 2;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        padding: 12px 24px;
        font-size: 14px;
        color: $text-color6;
        background: $theme_color;
        box-sizing: border-box;
        z-index: 999;

        .type {
            display: inline-block;
            padding: 2px 4px;
            border-radius: 4px;
            position: relative;
            background: $theme_color;
            -webkit-align-self: baseline;
            -ms-flex-item-align: baseline;
            align-self: baseline;

            border: 2px solid $border-color;
            box-sizing: border-box;

            .type-text {
                position: relative;
                margin-right: 24px;

                &::after {
                    content: '';
                    position: absolute;
                    right: -12px;
                    top: 4px;
                    width: 1px;
                    height: 8px;
                    background: $border-color;
                }
            }
        }

        .details {
            margin: 12px 0 0 0;

            .date {
                margin: 0 24px 0 0;


            }

            span:nth-child(2) {
                margin-right: 18px;
            }

            span:nth-child(2) span {
                color: $danger-color;
                font-weight: bold;
                -webkit-align-self: baseline;
                -ms-flex-item-align: baseline;
                align-self: baseline;
            }

            span:nth-child(3) span {
                color: $warning-color;
                font-weight: bold;
                -webkit-align-self: baseline;
                -ms-flex-item-align: baseline;
                align-self: baseline;
            }
        }
    }

    .conten-body {
        flex: 1;
        width: calc(100% - 12px - 12px);
        margin: 12px;
        box-sizing: border-box;

        .van-pull-refresh {
            height: 100%;
            overflow: initial;
        }
    }
}
</style>