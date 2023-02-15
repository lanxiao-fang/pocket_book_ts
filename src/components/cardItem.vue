<template>
    <div>
        <div class="every-day">
            <div class="every-day-title flex-between">
                <span>{{ itemData.date }}</span>
                <span>
                    <span class="mr-24">收{{ income }}</span>
                    <span>支{{ expense }}</span>
                </span>
            </div>
            <div class="every-day-detals">
                <van-cell v-for="(item, index) in itemData.bills" :title="item.type_name"
                    :value="`${item.pay_type == 1 ? '-' : '+'}${item.amount}`"
                    :label="`${timeFomater(item.date)}${item.remark ? ' | ' + item.remark : ''}`" />
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { billListDay } from '@/api/details/inde'

const props = defineProps<{
    itemData: billListDay
}>()

let income = ref(0)
let expense = ref(0)

income.value = props.itemData.bills
    .filter((v) => v.pay_type == 2)
    .reduce((acc, cur) => {
        acc = acc + Number(cur.amount)
        return acc
    }, 0)
expense.value = props.itemData.bills
    .filter((v) => v.pay_type == 1)
    .reduce((acc, cur) => {
        acc = acc + Number(cur.amount)
        return acc
    }, 0)
const timeFomater = (time: string | number) => {
    return dayjs(time).format('HH:mm')
}
console.log('props.itemData.bills', props.itemData.bills);

</script>

<style lang="scss" scoped>
.every-day {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);

    &-title {
        color: $main-color;
        font-size: 14px;
    }

    &-detals {}

}
</style>