<template>
    <div>
        <van-popup v-model:show="_show" closeable round position="bottom" :style="{ height: '60%' }"
            @click-overlay="typeCancel">
            <div class="type-content">
                <div class="header">请选择类型</div>
                <div class="body">
                    <p class="type-title">全部</p>
                    <div class="expense-content">
                        <span v-for="item in all" :key="item.id" :class="{ active: active == item.id }"
                            @click="selectType(item)">
                            {{ item.name }}
                        </span>
                    </div>

                    <p class="type-title">支出</p>
                    <div class="expense-content">
                        <span v-for="item in typeStore.expense" :key="item.id" :class="{ active: active == item.id }"
                            @click="selectType(item)">
                            {{ item.name }}
                        </span>
                    </div>

                    <p class="type-title">收入</p>
                    <div class="income-content">
                        <span v-for="item in typeStore.income" :key="item.id" :class="{ active: active == item.id }"
                            @click="selectType(item)">
                            {{ item.name }}
                        </span>
                    </div>

                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { typeItem } from '@/api/details/inde'
import { useTypeStore } from '@/store';
const typeStore = useTypeStore()




const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits(['selectType', 'update:show'])
let _show = ref(props.show)
let state = reactive<{
    all: typeItem[],
    active: number | string
}>({
    all: [{
        id: 'all',
        name: '全部类型',
        type: 'all',
    }],
    active: 'all'
})

watch(
    () => props.show,
    (value) => {
        _show.value = value
    }
)

const selectType = (val: typeItem) => {
    state.active = val.id
    emit('selectType', val)
    typeCancel()
    _show.value = false
}
const typeCancel = () => {
    emit('update:show', false)
}
const { all, active } = toRefs(state)

</script>

<style lang="scss" scoped>
.type-content {
    background: $bg-color;

    .header {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: $main-color;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid $border-color;
    }

    .body {
        padding: 12px;
        background: #fff;
        box-sizing: border-box;

        .type-title {
            font-size: 16px;
        }

        .expense-content,
        .income-content {
            span {
                display: inline-block;
                padding: 2px 6px;
                margin: 0 0 0 12px;
                font-size: 14px;
                border: 1px solid $theme_color;
                border-radius: 4px;
                // border: 1px solid red;
            }

            .active {
                background: $theme_color;
            }
        }
    }

}
</style>