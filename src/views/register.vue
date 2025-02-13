<template>
    <h1>Создать аккаунт</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Пароль" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const email = ref('');
const password = ref('');


const register = () => {
    const auth = getAuth(); // Исправил getAut() -> getAuth()

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Successfully registered!");
            console.log(userCredential.user); // Теперь userCredential содержит пользователя
            // window.location.href = '/';
            return auth.signOut(); // Разлогиниваем пользователя после регистрации
        })
        .then(() => {
            console.log("User signed out after registration");
            window.location.href = '/'; // Перенаправляем на главную страницу
        })
        .catch((error) => {
            console.log("Error:", error.code);
            alert(error.message);
        });
};
</script>
