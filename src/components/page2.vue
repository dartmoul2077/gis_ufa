<script>
import Search from './search.vue';
import Timeline from './Timeline.vue';

  export default {
    data() {
      return {
        activeTab: 'about', // Начальная вкладка
      };
    },
    components: {
      Timeline,
      Search
    },
  };
</script>


<template>
    <span class=" text-white text-3xl text-center" >«Пифагор». IT-UFA</span>
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
                Уникальная возможность познакомиться с IT-индустрией в Уфе и Башкортостане всего за один день! Вы посетите «секретные» лаборатории Межвузовского студенческого кампуса Евразийского НОЦ, Центр киберспорта и спортивного программирования СПАРКС, познакомитесь с суперкомпьютером, роботами-помощниками, передовыми технологиями ведущих IT-компаний. Вас ждут интеллектуальные квесты, викторины и квизы.
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
                        4 ч 35 мин
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Протяженность.svg" alt="way" class="w-5">
                    <b>
                        Протяженность:
                    </b>

                    <span>
                        14,3 км
                    </span>
                </div>

                <div class="flex border-b gap-3 py-3">
                    <img src="/Кол-во участников.svg" alt="count" class="w-5">
                    <b>
                        Кол-во участников:
                    </b>

                    <span>
                        до 15 чел
                    </span>
                </div>

            </div>

        </div>

        
        <!-- Контент вкладки "объекты маршрута" -->
        <div v-if="activeTab === 'objects'" class="text-white px-3 space-y-5">
          <span class="text-l">
            Объекты маршрута «Пифагор». IT-UFA
          </span>

          <div class="flex justify-center">
            <Timeline />
          </div>

        </div>
      </div>
    </div>
</template>






  