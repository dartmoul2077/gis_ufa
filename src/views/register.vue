<template>
    <h1 class="text-white text-xl">Создать аккаунт</h1>
    <p><input class="rounded border-2 h-6" type="text" placeholder="Email" v-model="email" /></p>
    <p><input class="rounded border-2 h-6" type="password" placeholder="Пароль" v-model="password" /></p>
    <p><button @click="register" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg 
                   hover:bg-blue-600 transition duration-300 ease-in-out 
                   shadow-md hover:shadow-lg active:scale-95">Создать</button></p>
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
