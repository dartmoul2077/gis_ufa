<script setup>
import Header2 from './components/Header2.vue';
import way from './components/way.vue';
import page2 from './components/page2.vue';
import page3 from './components/page3.vue';
import routeAll from './components/routeAll.vue';
import routePif from './components/routePif.vue';
import popup from './components/popup.vue';
import popup_vernadsky from './components/popup_vernadsky.vue';
import popup_sokrat from './components/popup_sokrat.vue';
import popup_tsiolkovsky from './components/popup_tsiolkovsky.vue';
import popup_mendeleev from './components/popup_mendeleev.vue';
import popup_shenko from './components/popup_shenko.vue';
import testpop from './components/testpop.vue';
import register from './views/register.vue';
import signIn from './views/signIn.vue';
import routeShenko from './components/routeShenko.vue';
import routeSokrat from './components/routeSokrat.vue';
import routeTsiolkovsky from './components/routeTsiolkovsky.vue';
import routeVernadsky from './components/routeVernadsky.vue';
import routeMendeleev from './components/routeMendeleev.vue';
import page2_shenko from './components/page2_shenko.vue';
import page2_sokrat from './components/page2_sokrat.vue';
import page2_tsiolkovsky from './components/page2_tsiolkovsky.vue';
import page2_vernadsky from './components/page2_vernadsky.vue';
import page2_mendeleev from './components/page2_mendeleev.vue';
import ufarob from './components/ufarob.vue';
import nots from './components/nots.vue';
import poligon from './components/poligon.vue';
import rosstel_muz from './components/rosstel_muz.vue';
import rosstel from './components/rosstel.vue';
import tech_park from './components/tech_park.vue';
import uust from './components/uust.vue';
import favoritesPage from './components/favoritesPage.vue';
import vernadsky_1 from './components/vernadsky_1.vue';
import vernadsky_2 from './components/vernadsky_2.vue';
import vernadsky_3 from './components/vernadsky_3.vue';
import sokrat_1 from './components/sokrat_1.vue';
import sokrat_2 from './components/sokrat_2.vue';
import sokrat_3 from './components/sokrat_3.vue';
import sokrat_4 from './components/sokrat_4.vue';
import sokrat_5 from './components/sokrat_5.vue';
import sokrat_6 from './components/sokrat_6.vue';
import tsiolkovsky_1 from './components/tsiolkovsky_1.vue';
import tsiolkovsky_2 from './components/tsiolkovsky_2.vue';
import tsiolkovsky_3 from './components/tsiolkovsky_3.vue';
import tsiolkovsky_4 from './components/tsiolkovsky_4.vue';
import tsiolkovsky_5 from './components/tsiolkovsky_5.vue';
import tsiolkovsky_6 from './components/tsiolkovsky_6.vue';
import mendeleev_1 from './components/mendeleev_1.vue';
import mendeleev_2 from './components/mendeleev_2.vue';
import shenko_1 from './components/shenko_1.vue';
import shenko_2 from './components/shenko_2.vue';
import shenko_3 from './components/shenko_3.vue';
import shenko_4 from './components/shenko_4.vue';
import { onMounted, ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnXXJ1R-lkoheA8LEJuHLzy2kjUvcC4-w",
  authDomain: "myproject-35bc3.firebaseapp.com",
  projectId: "myproject-35bc3",
  storageBucket: "myproject-35bc3.firebasestorage.app",
  messagingSenderId: "1064017138140",
  appId: "1:1064017138140:web:b294ccd4f2b9c9762abf19"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const currentPage = ref('way');
const currentRoute = ref('routeAll'); // Текущий компонент карты

const isLoggedIn = ref(false)

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        // Дополнительные действия после выхода
    });
};

// Добавляем ref для доступа к маршрутом way.vue
const wayRef = ref(null);

</script>

<template>
    <Header2 :isLoggedIn="isLoggedIn" 
    @navigateToWay="currentPage = 'way'; currentRoute = 'routeAll'"
    @navigateToFavorites="currentPage = 'favorites'" 
    @navigateToRegister="currentPage = 'register'" 
    @navigateToLogin="currentPage = 'signIn'" 
    @logout="handleSignOut"/>

    <div class="flex min-h-screen"> <!--недавно-->
        <div class="bg-indigo-800 min-h-screen w-[500px] flex flex-col items-center space-y-12">
            <!-- <way v-if="currentPage === 'way'" @navigate="currentPage = 'page2' " /> -->
            <way v-if="currentPage === 'way'" ref="wayRef" @navigate="currentPage = 'page2'" @selectRoute="(route) => {
                currentRoute = route;
                if (route === 'routeShenko') currentPage = 'page2_shenko';
                else if (route === 'routeSokrat') currentPage = 'page2_sokrat';
                else if (route === 'routeTsiolkovsky') currentPage = 'page2_tsiolkovsky';
                else if (route === 'routeVernadsky') currentPage = 'page2_vernadsky';
                else if (route === 'routeMendeleev') currentPage = 'page2_mendeleev';
                else if (route === 'routeAll') currentPage = 'page2';
            }" />

            <!-- <favoritesPage v-if="currentPage === 'favorites'" /> -->

            <page2 v-if="currentPage === 'page2'" @navigateBack="currentPage = 'way'" />
            <page2_shenko v-if="currentPage === 'page2_shenko'" @navigateBack="currentPage = 'way'" />
            <page2_sokrat v-if="currentPage === 'page2_sokrat'" @navigateBack="currentPage = 'way'"/>
            <page2_tsiolkovsky v-if="currentPage === 'page2_tsiolkovsky'" @navigateBack="currentPage = 'way'"/>
            <page2_vernadsky v-if="currentPage === 'page2_vernadsky'" @navigateBack="currentPage = 'way'"/>
            <page2_mendeleev v-if="currentPage === 'page2_mendeleev'" @navigateBack="currentPage = 'way'"/>
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

            <vernadsky_1 v-if="currentPage === 'vernadsky_1'" @navigateBack="currentPage = 'page2_vernadsky'"/>
            <vernadsky_2 v-if="currentPage === 'vernadsky_2'" @navigateBack="currentPage = 'page2_vernadsky'"/>
            <vernadsky_3 v-if="currentPage === 'vernadsky_3'" @navigateBack="currentPage = 'page2_vernadsky'"/>

            <sokrat_1 v-if="currentPage === 'sokrat_1'" @navigateBack="currentPage = 'page2_sokrat'"/>
            <sokrat_2 v-if="currentPage === 'sokrat_2'" @navigateBack="currentPage = 'page2_sokrat'"/>
            <sokrat_3 v-if="currentPage === 'sokrat_3'" @navigateBack="currentPage = 'page2_sokrat'"/>
            <sokrat_4 v-if="currentPage === 'sokrat_4'" @navigateBack="currentPage = 'page2_sokrat'"/>
            <sokrat_5 v-if="currentPage === 'sokrat_5'" @navigateBack="currentPage = 'page2_sokrat'"/>
            <sokrat_6 v-if="currentPage === 'sokrat_6'" @navigateBack="currentPage = 'page2_sokrat'"/>

            <tsiolkovsky_1 v-if="currentPage === 'tsiolkovsky_1'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>
            <tsiolkovsky_2 v-if="currentPage === 'tsiolkovsky_2'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>
            <tsiolkovsky_3 v-if="currentPage === 'tsiolkovsky_3'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>
            <tsiolkovsky_4 v-if="currentPage === 'tsiolkovsky_4'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>
            <tsiolkovsky_5 v-if="currentPage === 'tsiolkovsky_5'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>
            <tsiolkovsky_6 v-if="currentPage === 'tsiolkovsky_6'" @navigateBack="currentPage = 'page2_tsiolkovsky'"/>

            <mendeleev_1 v-if="currentPage === 'mendeleev_1'" @navigateBack="currentPage = 'page2_mendeleev'"/>
            <mendeleev_2 v-if="currentPage === 'mendeleev_2'" @navigateBack="currentPage = 'page2_mendeleev'"/>

            <shenko_1 v-if="currentPage === 'shenko_1'" @navigateBack="currentPage = 'page2_shenko'"/>
            <shenko_2 v-if="currentPage === 'shenko_2'" @navigateBack="currentPage = 'page2_shenko'"/>
            <shenko_3 v-if="currentPage === 'shenko_3'" @navigateBack="currentPage = 'page2_shenko'"/>
            <shenko_4 v-if="currentPage === 'shenko_4'" @navigateBack="currentPage = 'page2_shenko'"/>

            <favoritesPage 
                v-if="currentPage === 'favorites'" 
                :routes="wayRef?.routes"
                @navigate="currentPage = 'page2'" 
                @selectRoute="(route) => {
                currentRoute = route;
                if (route === 'routeShenko') currentPage = 'page2_shenko';
                else if (route === 'routeSokrat') currentPage = 'page2_sokrat';
                else if (route === 'routeTsiolkovsky') currentPage = 'page2_tsiolkovsky';
                else if (route === 'routeVernadsky') currentPage = 'page2_vernadsky';
                else if (route === 'routeMendeleev') currentPage = 'page2_mendeleev';
                else if (route === 'routeAll') currentPage = 'page2';}"/>
            
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
            
            <popup_vernadsky v-else-if="currentRoute === 'routeVernadsky'"
            @navigateToMainK="currentPage = 'vernadsky_1'"
            @navigateToMainUust="currentPage = 'vernadsky_2'"
            @navigateToNotsRb="currentPage = 'vernadsky_3'"/>

            <popup_sokrat v-else-if="currentRoute === 'routeSokrat'"
            @navigateToNotsRB="currentPage = 'sokrat_1'"
            @navigateToMainKUust="currentPage = 'sokrat_2'"
            @navigateToGumK="currentPage = 'sokrat_3'"
            @UFiS_Ran="currentPage = 'sokrat_4'"
            @BGPU="currentPage = 'sokrat_5'"
            @UGNTU="currentPage = 'sokrat_6'"/>

            <popup_tsiolkovsky v-else-if="currentRoute === 'routeTsiolkovsky'"
            @navigateToNoTSRB="currentPage = 'tsiolkovsky_1'"
            @MC="currentPage = 'tsiolkovsky_2'"
            @Intel="currentPage = 'tsiolkovsky_3'"
            @Evren="currentPage = 'tsiolkovsky_4'"
            @Planet="currentPage = 'tsiolkovsky_5'"
            @Run="currentPage = 'tsiolkovsky_6'"/>

            <popup_mendeleev v-else-if="currentRoute === 'routeMendeleev'"
            @UFIX_run="currentPage = 'mendeleev_2'"
            @UFIS_RUN="currentPage = 'mendeleev_1'"
            />

            <popup_shenko v-else-if="currentRoute === 'routeShenko'"
            @NOTSRB="currentPage = 'shenko_1'"
            @UUST2k="currentPage = 'shenko_2'"
            @BGAU="currentPage = 'shenko_3'"
            @UGNTu="currentPage = 'shenko_4'"
            />
            
        </div>

    </div>

</template>