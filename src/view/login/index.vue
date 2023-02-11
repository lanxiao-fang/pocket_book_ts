<template>
    <div>
        <img class="login-img"
            src="https://play-lh.googleusercontent.com/pvRimUSIXNT5KHU3SCfkD-wLOn_hALI-XuaDXjoncpPr2BAKvMywvtnZW8ZGj4ITOiSP=w240-h480-rw"
            alt="登录图标">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="账号" placeholder="请输入账号" :rules="usernameRules" />
                <!-- :rules="passwordRules" -->
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="请输入密码" />
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
import { useUserStore } from '@/store'
import { LoginData } from '@/api/user/index';
import router from '@/router/index'
const userStore = useUserStore();

let username = ref('')
let password = ref('')

const usernameRules = reactive([
    { required: true, message: "手机号码不能为空", trigger: "onChange" },
    {
        validator: (value: any) => {
            return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
        },
        message: "请输入正确的手机号码",
        trigger: "onBlur",
    }
])
const passwordRules = reactive([
    { required: false, message: "密码不能为空", trigger: "onChange" },
    {
        validator: (value: any) => {
            return /^(?=.*[a-z])(?=.*\d)[^]{8,16}$/.test(value);
        },
        message: "密码必须包含数字,字母,且不少于8位",
        trigger: "onBlur",
    }
])
const onSubmit = async (values: LoginData) => {
    try {
        const result = await userStore.login(values)
        console.log(66666666, result);
        router.replace('/details')

    } catch (error) {

    }


};

</script>

<style lang="scss" scoped>
.login-img {
    display: block;
    width: 200px;
    height: 200px;
    margin: 50px auto 20px;
}
</style>