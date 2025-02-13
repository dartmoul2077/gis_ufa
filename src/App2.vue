<script setup>
import Header2 from './components/Header2.vue';
import way from './components/way.vue';
import page2 from './components/page2.vue';
// import { RouterView } from 'vue-router';
import page3 from './components/page3.vue';
// import { ref } from 'vue';
import routeAll from './components/routeAll.vue';
import routePif from './components/routePif.vue';
import popup from './components/popup.vue';
import testpop from './components/testpop.vue';
import register from './views/register.vue';
import signIn from './views/signIn.vue';


const currentPage = ref('way');
const currentRoute = ref('routeAll'); // Текущий компонент карты

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const isLoggedIn = ref(false)

let auth;
onMounted (() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        }
        else {
            isLoggedIn.value = false
        }
    });
});


const hadleSignOut = () => {
    signOut(auth).then(() => {

    });

}

</script>

<template>
    <Header2 :isLoggedIn="isLoggedIn" @navigateToWay="currentPage = 'way'; currentRoute = 'routeAll'" @navigateToRegister="currentPage = 'register'" @navigateToLogin="currentPage = 'signIn'" @logout="hadleSignOut"/>
    <div class="flex min-h-screen"> <!--недавно-->
        <div class="bg-indigo-800 min-h-screen w-[500px] flex flex-col items-center space-y-12">
            <!-- <way v-if="currentPage === 'way'" @navigate="currentPage = 'page2' " /> -->
            <way v-if="currentPage === 'way'" @navigate="currentPage = 'page2'" @selectRoute="(route) => currentRoute = route" />
            <page2 v-if="currentPage === 'page2'" @navigateBack="currentPage = 'way'" />
            <page3 v-if="currentPage === 'page3'" @navigateBack="currentPage = 'page2'"/>
            <register v-if="currentPage === 'register'" />
            <signIn v-if="currentPage === 'signIn'" />
            
        </div>

        <div class="bg-white flex-grow">
            <routeAll v-if="currentRoute === 'routeAll'" />
            <popup v-else-if="currentRoute === 'routePif'" @navigateToPage3="currentPage = 'page3'"/>
        </div>

    </div>

</template>
    

<style scoped>
</style>