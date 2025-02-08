<!-- тут тот же функционал routePiff только + есть вслыпающее окно-->
<!-- <template> 
    <div>
      <div id="map" class="map" tabindex="0"></div>
      
      
      <div id="popup" class="ol-popup" ref="popup">
        <div id="popup-content">{{ popupContent }}</div>
        <button @click="closePopup" class="close-btn">Закрыть</button>
      </div>
      
    </div>
</template>
  
<script>
  import { onMounted, ref } from 'vue';
  import Map from 'ol/Map';
  import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import View from 'ol/View';
  import { fromLonLat } from 'ol/proj';
  import 'ol/ol.css';
  import { GeoJSON } from 'ol/format';
  import { Vector as VectorLayer } from 'ol/layer';
  import { Vector as VectorSource } from 'ol/source';
  import { Style, Stroke, Fill, Circle } from 'ol/style';
  import { Point } from 'ol/geom';
  import { Feature } from 'ol';
  import Overlay from 'ol/Overlay';
  
  export default {
    name: 'MapComponent',
  
    setup() {
      const popupContent = ref('');
      const popup = ref(null);
      let overlay;

      const popupVisible = ref(false); //добавили 3
      const popupText = ref('');
      const popupPosition = ref({ x: 0, y: 0 });
  
      onMounted(() => {
        const map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([55.9721, 54.7388]),
            zoom: 13,
          }),
        });
  
        // === Слой маршрута ===
        const routeSource = new VectorSource();
        fetch('/ors__v2_directions_{profile}_geojson_post_1733420735317.geojson')
          .then((response) => response.json())
          .then((data) => {
            const geojsonFormat = new GeoJSON();
            const features = geojsonFormat.readFeatures(data, {
              featureProjection: 'EPSG:3857',
            });
  
            const routeStyle = new Style({
              stroke: new Stroke({
                color: 'rgba(0, 148, 255, 1)', 
                width: 4,
              }),
            });
  
            features.forEach((feature) => feature.setStyle(routeStyle));
            routeSource.addFeatures(features);
          });
  
        const routeLayer = new VectorLayer({
          source: routeSource,
          zIndex: 1,
        });
  
        map.addLayer(routeLayer);
  
        // === Слой точек ===
        const pointSource = new VectorSource();
        const coordinates = [
          [55.936081, 54.720401, "НОЦ"], 
          [55.940732, 54.724981, "УУНИТ"],
          [55.942299, 54.729234, "ООО НПП «Полигон»"],
          [55.947889, 54.726752, "Музей связи компании «Ростелеком»"],
          [55.960789, 54.729599, "Детский технопарк «Кванториум Башкортостана»"],
          [55.983218, 54.726248, "Проектный офис цифровой трансформации «Ростелеком»"],
          [56.007203, 54.716375, "Центр роботизации бизнеса «Ufarobotics»"],
          [55.989414, 54.741021, "АО «Уфанет»"],
        ];
  
        const pointStyle = new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({ color: 'rgba(0, 148, 255, 1)' }),
            stroke: new Stroke({ color: 'black', width: 1 }),
          }),
        });
  
        const pointNames = [
          'Точка 1: Начало маршрута',
          'Точка 2: Достопримечательность A',
          'Точка 3: Кафе',
          'Точка 4: Парк',
          'Точка 5: Памятник',
          'Точка 6: Музей',
          'Точка 7: Торговый центр',
          'Точка 8: Конец маршрута'
        ];
  
        const pointFeatures = coordinates.map((coord, index) => {
          const pointFeature = new Feature({
            geometry: new Point(fromLonLat(coord)),
            name: pointNames[index],
          });
  
          pointFeature.setStyle(pointStyle);
          pointSource.addFeature(pointFeature);
  
          return pointFeature;
        });
  
        const pointsLayer = new VectorLayer({
          source: pointSource,
          zIndex: 2,
        });
  
        map.addLayer(pointsLayer);
  
        // === Overlay для Popup ===
        overlay = new Overlay({
          element: popup.value,
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -10],
        });
  
        map.addOverlay(overlay);
  
        // === Обработка кликов ===
        map.on('singleclick', (evt) => {
          const feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
          
          if (feature && feature.getGeometry() instanceof Point) {
            const coordinate = evt.coordinate;
            popupContent.value = feature.get('name'); 
            overlay.setPosition(coordinate);
          } else {
            overlay.setPosition(undefined);
          }
        });
      });
  
      function closePopup() {
        overlay.setPosition(undefined);
      }
  
      return {
        popupContent,
        popup,
        closePopup,
      };
    },
  };
</script>
  
<style>
  .map {
    width: 100%;
    height: 740px;
    border: 1px solid #ccc;
  }
  
  .ol-popup {
  position: absolute;
  background: rgba(255, 255, 255, 0.9); /* Полупрозрачный фон */
  padding: 12px 16px;
  border-radius: 8px; /* Закруглённые углы */
  border: 1px solid #007bff; /* Голубая обводка */
  bottom: 12px;
  left: -50px;
  min-width: 220px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif; /* Шрифт */
  font-size: 16px;
  color: #333; /* Цвет текста */
  }
  
  .close-btn {
  margin-top: 10px;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  }

.close-btn:hover {
  background: #0056b3; /* Темнее при наведении */
}
</style> -->

<template>
    <div>
      <div id="map" class="map" tabindex="0"></div>
  
      <!-- Popup -->
      <div v-if="popupVisible" :style="{ top: popupPosition.y + 'px', left: popupPosition.x + 'px' }" class="custom-popup">
        <button class="close-btn" @click="hidePopup">✖</button>
        <h3 class="popup-title">IF-UFA</h3>
        <p class="popup-subtitle">Наименование</p>
        <p class="popup-content">{{ popupText }} </p>
  
        <div class="popup-actions">
          <button class="popup-btn">
            <span>🔍</span> Приблизить
          </button>
          <button class="popup-btn">
            <span>ℹ️</span> Подробнее
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import { onMounted, ref } from 'vue';
    import Map from 'ol/Map';
    import View from 'ol/View';
    import { fromLonLat, toLonLat } from 'ol/proj';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import { Vector as VectorLayer } from 'ol/layer';
    import { Vector as VectorSource } from 'ol/source';
    import { GeoJSON } from 'ol/format';
    import { Point } from 'ol/geom';
    import { Feature } from 'ol';
    import { Style, Stroke, Fill, Circle } from 'ol/style';
  
    export default {
      setup() {
        const popupVisible = ref(false);
        const popupText = ref('');
        const popupPosition = ref({ x: 0, y: 0 });
  
        onMounted(() => {
          const map = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            view: new View({
              center: fromLonLat([55.9721, 54.7388]),
              zoom: 13,
            }),
          });
  
          // === 1. Добавляем слой маршрута ===
          const routeSource = new VectorSource();
          fetch('/ors__v2_directions_{profile}_geojson_post_1733420735317.geojson')
            .then((response) => response.json())
            .then((data) => {
              const geojsonFormat = new GeoJSON();
              const features = geojsonFormat.readFeatures(data, {
                featureProjection: 'EPSG:3857',
              });
  
              const routeStyle = new Style({
                stroke: new Stroke({
                  color: 'rgba(0, 148, 255, 1)', // Синий цвет маршрута
                  width: 4,
                }),
              });
  
              features.forEach((feature) => feature.setStyle(routeStyle));
              routeSource.addFeatures(features);
            });
  
          const routeLayer = new VectorLayer({
            source: routeSource,
            zIndex: 1, // Низкий zIndex, маршрут ниже точек
          });
  
          map.addLayer(routeLayer);
  
          // === 2. Добавляем слой точек ===
          const pointSource = new VectorSource();
          const coordinates = [
            [55.936081, 54.720401, "Кампус Евразийского НОЦ РБ"],
            [55.940732, 54.724981, "УУНиТ"],
            [55.942299, 54.729234, "ООО НПП «Полигон»"],
            [55.947889, 54.726752, "Музей связи компании «Ростелеком»"],
            [55.960789, 54.729599, "Детский технопарк «Кванториум Башкортостана»"],
            [55.983218, 54.726248, "Проектный офис цифровой трансформации «Ростелеком»"],
            [56.007203, 54.716375, "Центр роботизации бизнеса «Ufarobotics»"],
            [55.989414, 54.741021, "АО «Уфанет»"],
          ];
  
          const pointStyle = new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({ color: 'rgba(0, 148, 255, 1)' }),
              stroke: new Stroke({ color: 'black', width: 1 }),
            }),
          });
  
          coordinates.forEach(([lon, lat, name]) => {
            const pointFeature = new Feature({
              geometry: new Point(fromLonLat([lon, lat])),
            });
            pointFeature.set('name', name);
            pointFeature.setStyle(pointStyle);
            pointSource.addFeature(pointFeature);
          });
  
          const pointsLayer = new VectorLayer({
            source: pointSource,
            zIndex: 2, // Высокий zIndex, точки над маршрутом
          });
  
          map.addLayer(pointsLayer);
  
          // === 3. Обработка кликов по точкам ===
          map.on('singleclick', (evt) => {
            map.forEachFeatureAtPixel(evt.pixel, (feature) => {
              const name = feature.get('name');
              if (name) {
                popupText.value = name;
  
                // Получаем координаты клика в мировой системе координат (lon/lat)
                const coords = toLonLat(evt.coordinate);
  
                // Преобразуем координаты в пиксели экрана
                const pixel = map.getPixelFromCoordinate(evt.coordinate);
  
                // Устанавливаем позицию popup относительно этих пикселей
                popupPosition.value = { x: pixel[0], y: pixel[1] };
  
                popupVisible.value = true;
              }
            });
          });
        });
  
        const hidePopup = () => {
          popupVisible.value = false;
        };
  
        return { popupVisible, popupText, popupPosition, hidePopup };
      },
    };
  </script>
  
  <style>
    .map {
      width: 100%;
      height: 740px;
      border: 1px solid #ccc;
    }
  
    /* Стили для popup */
    .custom-popup {
      position: absolute;
      background: white;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #ccc;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      width: 280px;
      font-family: Arial, sans-serif;
    }
  
    .close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
  
    .popup-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 6px;
    }
  
    .popup-subtitle {
      font-size: 12px;
      color: gray;
    }
  
    .popup-content {
      font-size: 14px;
    }
  
    .popup-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  
    .popup-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      padding: 6px 10px;
      border: none;
      border-radius: 6px;
      background: #f3f3f3;
      cursor: pointer;
    }
  
    .popup-btn:hover {
      background: #e0e0e0;
    }
  </style>
  
  
  