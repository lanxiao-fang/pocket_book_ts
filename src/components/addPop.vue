<template>
    <div>
        <van-popup v-model:show="_show" round position="bottom" :style="{ height: '80%' }" @click-overlay="addCancel"
            @close="addCancel">
            <div class="header flex-between">
                <van-icon name="cross" @click="addCancel" />
                <van-button type="primary" size="small" @click="addComfirm">确定</van-button>
            </div>
            <div class="flex-between">
                <span class="change-type">
                    <span :class="{ active: pay_type == 1 }" @click="selectType(1)">支出</span>
                    <span :class="{ active: pay_type == 2 }" @click="selectType(2)">收入</span>
                </span>
                <span class="select-day" @click="showMonthPop">{{ dayjs(date).format('YYYY-MM-DD') }}<van-icon
                        name="play" /></span>
            </div>
            <div class="money-input">
                <span class="sufix">¥</span>
                <span class="money-num">{{ amount }}</span>
            </div>
            <div class="money-type-wrapper">
                <div :class="{ 'type-item': true, active: type_id == item.id }" v-for="item in currentTypeList"
                    @click="selectTypeId(item)">
                    <span>
                        <i class="iconfont" :class="iconMap[item.id].icon"></i>
                    </span>
                    <span class="name">{{ item.name }}</span>
                </div>

            </div>
            <div class="key-bord">
                <van-number-keyboard :show="true" extra-key="." @input="changeInput" @delete="onDelete" />
            </div>
            <monthPop v-model:show="showMonth" :columnsType="['year', 'month', 'day']" @selectMonth="selectMonth">
            </monthPop>


        </van-popup>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import monthPop from '@/components/monthPop.vue'
import { addBillReq } from '@/api/details/inde'
import { useTypeStore } from '@/store';
import { typeItem } from '@/store/modules/type/type'
import { iconMap } from '@/utils/iconType'
const typeStore = useTypeStore();

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits(['addBill', 'update:show'])
let _show = ref(props.show)
let type = ref(1)
let state = reactive<{
    currentTypeList: typeItem[],
}>({
    currentTypeList: typeStore.expense,
});
let addBillReq = reactive<addBillReq>({
    amount: '',
    type_id: 1,
    type_name: '餐饮',
    pay_type: 1,
    remark: '',
    date: new Date()
})
let showMonth = ref(false)


watch(
    () => props.show,
    (value) => {
        _show.value = value
    }
)
watch(
    () => typeStore.expense,
    (value) => {
        state.currentTypeList = typeStore.expense
        addBillReq.type_id = typeStore.expense[0]?.id
    }
)
watch(
    () => addBillReq.pay_type,
    (value) => {
        state.currentTypeList = value == 1 ? typeStore.expense : typeStore.income
    }, {
    immediate: true,
}
)

const addCancel = () => {
    emit('update:show', false)
}
const selectType = (val: number) => {
    addBillReq.pay_type = val
}

const onDelete = () => {
    addBillReq.amount = addBillReq.amount.substring(0, addBillReq.amount.length - 1)
};
const changeInput = (key: string) => {
    console.log('值', key);
    const arr = addBillReq.amount.split('.')
    // 如果已经存在.，再次输入则中断
    if (addBillReq.amount.includes('.') && key === '.') {
        return
    } else if (addBillReq.amount.includes('.') && arr[1].length >= 2) {
        // 如果已经存在.，则小数点后只能有2个数字
        return
    }
    addBillReq.amount += key
}
const selectTypeId = (val: typeItem) => {
    addBillReq.type_id = val.id
    addBillReq.type_name = val.name
}
const addComfirm = async () => {
    const res = await typeStore.addBill({
        ...addBillReq,
        amount: Number(addBillReq.amount).toFixed(2),
        // date: addBillReq.date 
    })
    addCancel()
    emit('addBill')
}
const showMonthPop = () => {
    showMonth.value = !showMonth.value
}
const selectMonth = (val: string) => {
    addBillReq.date = new Date(val).getTime()
}
const { currentTypeList } = toRefs(state)
const { amount, pay_type, type_id, date } = toRefs(addBillReq)
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 50px;
    padding: 0 12px;
    margin-bottom: 12px;
    // background-color: red;
}

.change-type {
    padding: 0 12px;
}

.select-day,
.change-type span {
    margin-right: 12px;
    padding: 2px 8px;
    color: $regular-color;
    font-size: 12px;
    background: $bg-btn-color;
    border-radius: 10px;

    .van-icon-play {
        transform: rotate(90deg);
    }

    &.active {
        background: $theme_color;
        color: #fff;
    }
}

.money-input {
    margin: 12px;
    border-bottom: 2px solid $border-color;
    // border-bottom: 1px solid red;

    .sufix,
    .money-num {
        font-size: 30px;
        font-weight: bold;
        vertical-align: bottom;
    }

    .money-num {
        margin-left: 6px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: -8px;
            top: 6px;
            width: 2px;
            height: 20px;
            background-color: $secondary-color;
            animation: cursor-blinks 1.2s infinite steps(1, start);
        }
    }
}

.money-type-wrapper {
    display: flex;
    flex-wrap: nowrap;
    margin: 12px;
    padding-bottom: 18px;
    overflow-x: auto;

    .type-item {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: 60px;
        font-size: 14px;
        color: $regular-color;
        text-align: center;

        .iconfont {
            font-size: 24px;
        }

        .name {
            font-size: 12px;
        }

        &.active {
            color: $theme_color;

            .iconfont {
                font-size: 28px;
            }

        }


    }
}

.key-bord {
    .van-number-keyboard {
        position: relative;
    }
}

@keyframes cursor-blinks {
    0% {
        opacity: 1;
        display: block;
    }

    50% {
        opacity: 0;
        display: none;
    }

    100% {
        opacity: 1;
        display: block;
    }
}
</style>