<template lang="html">
    <div class="loginLayout">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>

            <el-col :span="12" :xs="24" justify="center" align="middle">
                <el-form class="loginForm">
                    <el-row id="btnBack" align="start" justify="start">
                        <router-link to="/index">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </router-link>
                    </el-row>
                    <h1>登录</h1>
                    <el-form-item prop="username">
                        <el-input prefix-icon="User" type="text" v-model="loginFormInfo.username" size="large"
                            class="input" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="Lock" v-model="loginFormInfo.password" type="password" size="large"
                            class="input" placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btnLogin" type="primary" size="default" @click="login">登录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>

</template>
<script lang="ts" setup>
import { reactive, toRaw } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
let loginFormInfo = reactive({
    username: '',
    password: ''
})
console.log(loginFormInfo);

function logintest() {
    router.push('/manage/home');
}

function login() {
    axios.post('http://localhost:8080/login', loginFormInfo).then((res) => {
        if (res.data.code !== 1) {
            console.log(res.data.msg);
            return;
        } else {
            console.log(res.data.data.token);
            localStorage.setItem('token', res.data.data.token);
            router.push('/manage/home');
        }

    }).catch((err) => {
        console.log(err);
    })

}


</script>

<style scoped>
.loginLayout {
    /* display: flex; */
    /* justify-content: center;
        align-items: center; */
    height: 100vh;
    width: 100%;
    /* margin: 5px; */
    /* flex-direction: column; */
    background-image: url(../res/img/Background.png);
    background-repeat: no-repeat;
    background-size: cover;
    /* background-position: center;
        background-attachment: fixed; */
    /* overflow: hidden; */
}

.loginForm {
    position: relative;
    width: 70%;
    top: 25vh;
    padding: 5%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #6d696956;
    border: 1px solid #716d6df9;
    border-radius: 25px;
    box-sizing: border-box;
    box-shadow: 15px 15px 15px #000000ac;

}

.btnLogin {
    width: 50vh;
    height: 6vh;
    margin: 5%;
    border-radius: 20px;
    background-color: #63d886b2;
    color: #131212;
    font-size: 20px;
    box-shadow: 5px 5px 5px #000000a2;
}

.input {
    width: 50vh;
    height: 6vh;
    margin: 3%;
    border-radius: 20px;
    background-color: #6d6969c9;
    color: #171717;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 5px 5px 5px #3a3a3ab6;
}

#btnBack {
    position: absolute;
    top: 5%;
    left: 5%;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
}
</style>