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
import routeShenko from './components/routeShenko.vue';
import routeSokrat from './components/routeSokrat.vue';
import page2_shenko from './components/page2_shenko.vue';
import page2_sokrat from './components/page2_sokrat.vue';
import ufarob from './components/ufarob.vue';
import nots from './components/nots.vue';
import poligon from './components/poligon.vue';
import rosstel_muz from './components/rosstel_muz.vue';
import rosstel from './components/rosstel.vue';
import tech_park from './components/tech_park.vue';
import uust from './components/uust.vue';

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


const currentPage = ref('way');
const currentRoute = ref('routeAll'); // Текущий компонент карты

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

    });}


</script>

<template>
    <Header2 :isLoggedIn="isLoggedIn" 
    @navigateToWay="currentPage = 'way'; currentRoute = 'routeAll'" 
    @navigateToRegister="currentPage = 'register'" 
    @navigateToLogin="currentPage = 'signIn'" 
    @logout="hadleSignOut"/>

    <div class="flex min-h-screen"> <!--недавно-->
        <div class="bg-indigo-800 min-h-screen w-[500px] flex flex-col items-center space-y-12">
            <!-- <way v-if="currentPage === 'way'" @navigate="currentPage = 'page2' " /> -->
            <way v-if="currentPage === 'way'" @navigate="currentPage = 'page2'" @selectRoute="(route) => {
                currentRoute = route;
                if (route === 'routeShenko') currentPage = 'page2_shenko';
                else if (route === 'routeSokrat') currentPage = 'page2_sokrat';
                else if (route === 'routeAll') currentPage = 'page2';
            }" />

            <page2 v-if="currentPage === 'page2'" @navigateBack="currentPage = 'way'" />
            <page2_shenko v-if="currentPage === 'page2_shenko'" @navigateBack="currentPage = 'way'" />
            <page2_sokrat v-if="currentPage === 'page2_sokrat'" @navigateBack="currentPage = 'way'"/>
            <page3 v-if="currentPage === 'page3'" @navigateBack="currentPage = 'page2'"/>

            <register v-if="currentPage === 'register'" />
            <signIn v-if="currentPage === 'signIn'" />
            <ufarob v-if="currentPage === 'ufarob'" @navigateBack="currentPage = 'page2'"/>
            <nots v-if="currentPage === 'nots'" @navigateBack="currentPage = 'page2'" />
            <poligon v-if="currentPage === 'poligon'" @navigateBack="currentPage = 'page2'" />
            <rosstel_muz v-if="currentPage === 'rosstel_muz'" @navigateBack="currentPage = 'page2'" />
            <rosstel v-if="currentPage === 'rosstel'" @navigateBack="currentPage = 'page2'" />
            <tech_park v-if="currentPage === 'tech_park'" @navigateBack="currentPage = 'page2'"/>
            <uust v-if="currentPage === 'uust'" @navigateBack="currentPage = 'page2'"/>
            
        </div>

        <div class="bg-white flex-grow">
            <routeAll v-if="currentRoute === 'routeAll'" />
            <popup v-else-if="currentRoute === 'routePif'" 
            @navigateToPage3="currentPage = 'page3'" 
            @navigateToUfarob="currentPage = 'ufarob'"
            @navigateToNots = "currentPage = 'nots'"
            @navigateToPoligon =  "currentPage = 'poligon'"
            @navigateToRostMuz = "currentPage = 'rosstel_muz'"
            @navigateToRosstel = "currentPage = 'rosstel'"
            @navigateToTechPark = "currentPage = 'tech_park'"
            @navigateToUust = "currentPage = 'uust'"/>
            
            <routeShenko v-else-if="currentRoute === 'routeShenko'" />
            <routeSokrat v-else-if="currentRoute === 'routeSokrat'"/>
        </div>

    </div>

</template>
    

<style scoped>
</style>