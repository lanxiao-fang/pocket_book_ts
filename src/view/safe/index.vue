<template>
    <div>
        <van-form @submit="onSubmit" autocomplete="off">
            <van-cell-group inset>
                <!-- 解决浏览器自动填充 -->
                <van-field v-model="old_pass" type="text" name="old_pass" label="旧密码" placeholder="请输入旧密码"
                    :rules="[{ required: true, message: '请填写旧密码' }]" clearable />
                <!-- 解决浏览器自动填充 -->

                <van-field v-show="false" v-model="old_pass" name="old_pass" label="旧密码" placeholder="请输入旧密码"
                    :rules="[{ required: true, message: '请填写旧密码' }]" clearable />

                <van-field v-model="new_pass" type="text" name="new_pass" label="新密码" placeholder="请输入新密码"
                    :rules="[{ required: true, message: '请填写新密码' }]" clearable />

                <van-field v-model="new_pasa2" type="text" name="new_pasa2" label="确认密码" placeholder="请二次输入新密码"
                    :rules="new_pasa2Rules" clearable />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { passData } from '@/api/user/index'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const formData = reactive<passData>({
    old_pass: '', // 原密码
    new_pass: '', // 新密码
    new_pasa2: '', // 确认新密码
})

const new_pasa2Rules = reactive([
    { required: true, message: "请确认新密码", trigger: "onBlur" },
    {
        validator: (value: string) => {
            console.log('bbbb', value);

            return false;
        },
        message: " 二次确认密码不一致！",
        trigger: "onBlur",
    }
])
const onSubmit = async (values: passData) => {
    const res = await userStore.setPassFn(values)
    console.log('看看密码成功与否', res);

};
const { old_pass, new_pass, new_pasa2 } = toRefs(formData)



</script>

<style scoped>

</style>