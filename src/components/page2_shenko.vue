<script>
import Search from './search.vue';
import Timeline_shenko from './Timeline_shenko.vue';

  export default {
    data() {
      return {
        activeTab: 'about', // Начальная вкладка
      };
    },
    components: {
      Timeline_shenko,
      Search
    },
  };
</script>


<template>
    <span class=" text-white text-3xl text-center" >Шень Ко</span>
    <search placeholderText="найти объект" /> 

    <div class="w-full">
      <!-- Заголовки вкладок -->
      <div class="flex justify-between border-b border-gray-300 px-10">
        <button
          class="p-2 focus:outline-none"
          :class="activeTab === 'about' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-white'"
          @click="activeTab = 'about'"
        >
          о маршруте
        </button>

        <button
          class="p-2 focus:outline-none"
          :class="activeTab === 'objects' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-white'"
          @click="activeTab = 'objects'"
        >
          объекты маршрута
        </button>
      </div>
  
      <!-- Контент вкладок -->
      <div class="mt-5">
        <!-- Контент вкладки "о маршруте" -->
        <div v-if="activeTab === 'about'" class="text-white text-sm px-3 space-y-5">
            <span class="">
                Технические науки помогают природных катаклизмов и даже путешествовать в космос. решать экологические проблемы, защищаться от Маршрут посещение суперсовременных экскурсии включает - посещение суперсовременных лабораторий Межвузовского студенческого кампуса Евразийского НОЦ и ведущих университетов республики. Вы сможете увидеть модель уникального станка, который не встретишь больше нигде в мире, изучить наноструктурный титан для биомедицины и узнать еще много нового о возможностях современных технологий.
            </span>

            <div class="h-80  rounded-xl px-3" style="background-color: rgb(64,84,148);">
                <div class="flex border-b gap-3 py-3"> <!-- для картинок и текса-->
                    <img src="/Аудитория.svg" alt="audit" class="w-5">
                    <b>
                        Целевая аудитория:
                    </b>

                    <span>
                        16-18 лет
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Программа обслуживания и посещения.svg" alt="pro" class="w-5">
                    <b>
                        Программа обслуживания и посещения:
                    </b>

                    <span>
                        Посещение объектов по маршруту с экскурсоводами от организации, автобусная и пешая экскурсия с гидом между объектами
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Продолжительность.svg" alt="time" class="w-5">
                    <b>
                        Продолжительность:
                    </b>

                    <span>
                        3 ч 40 мин
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Протяженность.svg" alt="way" class="w-5">
                    <b>
                        Протяженность:
                    </b>

                    <span>
                        8,7 км
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Кол-во участников.svg" alt="count" class="w-5">
                    <b>
                        Кол-во участников:
                    </b>

                    <span>
                        до 25 чел
                    </span>
                </div>

            </div>

        </div>

        
        <!-- Контент вкладки "объекты маршрута" -->
        <div v-if="activeTab === 'objects'" class="text-white px-3 space-y-5">
          <span class="text-l">
            Объекты маршрута Шень Ко: мир научно-технических разработок
          </span>

          <Timeline />

        </div>
      </div>
    </div>
</template>






  