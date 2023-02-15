<template>
    <div class="my-page">
        <div class="my-header align-center">
            <img class="my-avtar" src="../../images/tx.png" alt="头像">
            <div style="margin-left: 12px;">
                <p class="my-name">{{ userStore.username }}</p>
                <p class="my-desc">个性签名： {{ userStore.signature }}。</p>
            </div>
        </div>
        <div class="my-cell-content">
            <van-cell title="修改个性签名" icon="edit" is-link @click="changeSignature">
            </van-cell>
            <van-cell title="账户安全" icon="setting-o" is-link @click="goToSetPass">
            </van-cell>
            <van-cell title="软件评分" icon="good-job-o" is-link @click="setRate">
            </van-cell>
            <van-collapse v-model="activeNames">
                <van-collapse-item title="切换主题" name="1" icon="shop-o">
                    <template v-for="(val, key, index) in variablesOpt" :key="key">
                        <van-cell :title="val.name" :style="{ color: val['--theme-color'] }" @click="changeTheme(key)">
                            <template #right-icon>
                                <span class="theme-color" :style="{ background: val['--theme-color'] }">{{
                                    val['--theme-color']
                                }}</span>
                            </template>
                        </van-cell>
                    </template>
                </van-collapse-item>
            </van-collapse>
        </div>

        <!-- 修改个性签名 -->
        <van-dialog v-model:show="showSignatureDialog" title="个性签名" show-cancel-button @confirm="confirmSignature">
            <van-cell-group inset>
                <van-field v-model="signature" rows="2" autosize type="textarea" maxlength="20" placeholder="请输入个性签名"
                    show-word-limit />
            </van-cell-group>
        </van-dialog>
        <!-- 修改个性签名 -->

        <!-- 评分 -->
        <van-dialog v-model:show="showStartDialog" title="软件评分" show-cancel-button @confirm="confirmStart">
            <div style="padding-left: 24px;padding-top: 12px;"><van-rate v-model="rateNum" allow-half /></div>
        </van-dialog>
        <!-- 评分 -->

    </div>
</template>

<script setup lang="ts">
import { variablesOpt } from '@/theme/variables'
import { useAppStore, useUserStore } from '@/store';
import router from '@/router/index'
const appStore = useAppStore();
const userStore = useUserStore()

let signature = ref(userStore.signature)
let showSignatureDialog = ref(false)
let showStartDialog = ref(false)
let rateNum = ref(3.5)
const activeNames = ref(['0']);



const changeTheme = (value: string) => {
    appStore.toggleTheme(value);
}

const changeSignature = () => {
    showSignatureDialog.value = !showSignatureDialog.value
}
const confirmSignature = async () => {
    const res = await userStore.setSignatureFn({
        signature: signature.value as string
    })
    if (!res) {
        // 修改失败，重置
        signature.value = userStore.signature
    }
}


const goToSetPass = () => {
    router.push('/safe')
}
const setRate = () => {
    showStartDialog.value = !showStartDialog.value
}
const confirmStart = () => {
    console.log('评分', rateNum.value);// 这里没接口

}
</script>

<style lang="scss" scoped>
.my-page {
    min-height: 100vh;
    padding: 12px;
    background: #f5f5f5;
    box-sizing: border-box;

    .my-header {
        width: 100%;
        height: 80px;
        padding: 0 18px;
        color: $text-color6;
        background: $theme_color;
        border-radius: 10px;
        box-sizing: border-box;

        .my-avtar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid $border-color;
        }

        .my-name {
            font-size: 14px;
            margin-bottom: 4px;
        }

        .my-desc {
            font-size: 12px;
            margin-top: 4px;
        }
    }

    .my-cell-content {
        margin-top: 24px;
        background: #fff;
    }


}

.van-popup--center {
    width: 80% !important;
}

.result {
    color: $theme_color;
}

.theme-color {
    padding: 0 2px;
    font-size: 12px;
    color: $text-color6;
    border-radius: 2px;
    box-sizing: border-box;
}
</style>