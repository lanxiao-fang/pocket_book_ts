<template>
    <div>
        <van-popup v-model:show="_show" round position="bottom" :style="{ height: '50%' }" @click-overlay="monthCancel">
            <van-date-picker v-model="currentDate" title="选择年月" :columns-type="columnsType" @confirm="monthConfirm"
                @cancel="monthCancel" />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { DatePickerColumnType } from 'vant';
import { } from '@/api/details/inde'

const props = withDefaults(defineProps<{
    show: boolean,
    columnsType?: DatePickerColumnType[]
}>(), {
    show: false,
    columnsType: ['year', 'month']
})
// 避免直接修改props，编译失败
let _show = ref(props.show)
watch(
    () => props.show,
    (value) => {
        _show.value = value
    }
)
const tranCurrentDate = (val?: Date) => {
    let str = ''
    if (JSON.stringify(props.columnsType) === JSON.stringify(['year', 'month'])) {
        str = val ? dayjs(val).format('YYYY-MM') : dayjs().format('YYYY-MM')
    } else if (JSON.stringify(props.columnsType) === JSON.stringify(['year', 'month', 'day'])) {
        str = val ? dayjs(val).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
    }
    return str.split('-')
}

const emit = defineEmits(['selectMonth', 'update:show'])
const currentDate = ref(tranCurrentDate())
console.log(String(dayjs().month() + 1));


const monthConfirm = (selectedValues: any) => {
    const yearAndMonth = selectedValues.selectedValues.join('-')
    emit('selectMonth', yearAndMonth)
    monthCancel()
}
const monthCancel = () => {
    emit('update:show', false)
}



</script>

<style lang="scss" scoped>

</style>