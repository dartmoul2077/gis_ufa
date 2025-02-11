<template>
    <h1>Войти в аккаунт</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Пароль" v-model="password" /></p>
    <p v-if="errmsg" class="text-red-500">{{ errmsg }}</p>
    <p><button @click="sign">Submit</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const email = ref('');
const password = ref('');
const errmsg = ref('');


const sign= () => {
    const auth = getAuth(); // Исправил getAut() -> getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Successfully signed in", userCredential.user);
            // console.log(); // Теперь userCredential содержит пользователя
            // window.location.href = '/';
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
