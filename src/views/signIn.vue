<template>
    <h1 class="text-white text-xl">Войти в аккаунт</h1>
    <p><input class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 shadow-sm 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
                   transition duration-300 ease-in-out" 
                   type="text" placeholder="Email" v-model="email" /></p>
    <p class="relative">
        <input 
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
                   transition duration-300 ease-in-out pr-10" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Пароль" v-model="password" 
        />

        <!-- Кнопка "глаз" для скрытия/показа пароля -->
        <button 
            type="button"
            class="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600"
            @click="togglePassword"
        >
            <span v-if="showPassword">🙈</span> <!-- Если пароль видимый -->
            <span v-else>👁️</span>  <!-- Если пароль скрыт -->
        </button>
    </p>


    <p v-if="errmsg" class="text-red-500">{{ errmsg }}</p>
    <p>
        <button 
            @click="sign" 
            class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg 
                   hover:bg-blue-600 transition duration-300 ease-in-out 
                   shadow-md hover:shadow-lg active:scale-95">Войти
        </button>
    </p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const email = ref('');
const password = ref('');
const errmsg = ref('');

const showPassword = ref(false); // Флаг для скрытия/показа пароля
// Функция переключения пароля
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};


const sign= () => {
    const auth = getAuth(); // Исправил getAut() -> getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Successfully signed in", userCredential.user);
            // console.log(); // Теперь userCredential содержит пользователя
            window.location.href = '/';
        })
        .catch((error) => {
            console.log("Error:", error.code);
            switch (error.code){
                case "auth/invalid-email":
                    errmsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errmsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errmsg.value = "Incorrect password";
                    break;
                default:
                    errmsg.value = "Email or password was incorrect";
                    break;
            }
            // alert(error.message);
        });
};


</script>
