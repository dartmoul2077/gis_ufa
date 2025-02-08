<!-- <template>
  <div>
    <div id="map" class="map" tabindex="0"></div>
  </div>
</template>

<script>
  import { onMounted } from 'vue';
  import Map from 'ol/Map';
  import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import View from 'ol/View';
  import { fromLonLat } from 'ol/proj';
  import 'ol/ol.css';
  import { GeoJSON } from 'ol/format'; // Для работы с GeoJSON
  import { Vector as VectorLayer } from 'ol/layer'; // Для создания векторного слоя
  import { Vector as VectorSource } from 'ol/source'; // Для создания источника векторных объектов
  import { Style, Stroke } from 'ol/style'; // Для стилизации
  
  export default {
    name: 'MapComponent',
    setup() {
      let map = null;

      const zoomIn = () => {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
      };

      const zoomOut = () => {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
      };

      onMounted(() => {
        // Инициализация карты
        map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([55.9721, 54.7388]), // Центр карты (Уфа)
            zoom: 13, // Начальный зум
          }),
        });

        // Путь к файлу GeoJSON с маршрутом, который был создан в OpenRouteService
        const geoJsonFilePath = '/ors__v2_directions_{profile}_geojson_post_1733420735317.geojson';

        // Загрузка GeoJSON
        fetch(geoJsonFilePath)
          .then(response => response.json())
          .then(data => {
            // Используем GeoJSON формат OpenLayers для создания векторных объектов
            const geojsonFormat = new GeoJSON();
            const features = geojsonFormat.readFeatures(data, {
              featureProjection: 'EPSG:3857', // Убедитесь, что проекция соответствует OpenLayers
            });

            // Создание стиля для маршрута
            const routeStyle = new Style({
              stroke: new Stroke({
                color: 'rgba(0, 148, 255, 1)', // Цвет линии маршрута
                width: 4, // Толщина линии
              }),
            });

            // Применение стиля ко всем объектам
            features.forEach(feature => {
              feature.setStyle(routeStyle); // Применяем стиль к каждому объекту маршрута
            });

            // Создание источника для векторного слоя
            const vectorSource = new VectorSource({
              features: features,
            });

            // Создание векторного слоя
            const vectorLayer = new VectorLayer({
              source: vectorSource,
            });

            // Добавление векторного слоя на карту
            map.addLayer(vectorLayer);
          })
          .catch(error => console.error('Ошибка при загрузке GeoJSON:', error));
      });

      return {
        zoomIn,
        zoomOut,
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
  .controls {
    margin-top: 10px;
  }
</style> -->


<template>
  <div>
    <div id="map" class="map" tabindex="0"></div>
  </div>
</template>

<script>
  import { onMounted } from 'vue';
  import Map from 'ol/Map';
  import OSM from 'ol/source/OSM';
  import TileLayer from 'ol/layer/Tile';
  import View from 'ol/View';
  import { fromLonLat } from 'ol/proj';
  import 'ol/ol.css';
  import { GeoJSON } from 'ol/format'; // Для работы с GeoJSON
  import { Vector as VectorLayer } from 'ol/layer'; // Для создания векторного слоя
  import { Vector as VectorSource } from 'ol/source'; // Для создания источника векторных объектов
  import { Style, Stroke, Fill } from 'ol/style'; // Для стилизации

  export default {
    name: 'MapComponent',
    setup() {
      let map = null;
      let highlightedFeature = null; // Переменная для сохранения выделенного маршрута
      let vectorLayers = []; // Сюда будем добавлять все слои с маршрутами
      let highlightedLayer = null; // Новый слой для выделенного маршрута

      const zoomIn = () => {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
      };

      const zoomOut = () => {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
      };

      onMounted(() => {
        // Инициализация карты
        map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([55.9721, 54.7388]), // Центр карты (Уфа)
            zoom: 13, // Начальный зум
          }),
        });

        // Путь к файлам GeoJSON с маршрутами
        const geoJsonFiles = [
          { file: 'ors__v2_directions_{profile}_geojson_post_1733420735317.geojson', style: 'blue' },  // Первый маршрут
          { file: 'avicena.geojson', style: 'orange' },  // Второй маршрут
          { file: 'vernadsky.geojson', style: 'green' },  // Третий маршрут
          { file: 'mendeleev.geojson', style: 'purple' },   // Четвертый маршрут
          { file: 'sokrat.geojson', style: 'red' },      // Пятый маршрут
          { file: 'tsiolkovsky.geojson', style: 'yellow' },   // Шестой маршрут
          { file: 'shen_ko.geojson', style: 'pink' },     // Седьмой маршрут
        ];

        geoJsonFiles.forEach((route) => {
          // Загрузка GeoJSON
          fetch(route.file)
            .then((response) => response.json())
            .then((data) => {
              // Используем GeoJSON формат OpenLayers для создания векторных объектов
              const geojsonFormat = new GeoJSON();
              const features = geojsonFormat.readFeatures(data, {
                featureProjection: 'EPSG:3857', // Убедитесь, что проекция соответствует OpenLayers
              });

              // Создание стиля для маршрута в зависимости от типа маршрута
              let routeStyle;
              if (route.style === 'blue') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(0, 148, 255, 1)', // Цвет линии маршрута для первого маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'orange') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(243,211,46,255)', // Цвет линии маршрута для второго маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'green') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(150,105,200,255)', // Цвет линии маршрута для третьего маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'purple') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(0,168,221,255)', // Цвет линии маршрута для четвертого маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'red') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(255,184,0,255)', // Цвет линии маршрута для пятого маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'yellow') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(255,107,0,255)', // Цвет линии маршрута для шестого маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              } else if (route.style === 'pink') {
                routeStyle = new Style({
                  stroke: new Stroke({
                    color: 'rgba(52,215,215,255)', // Цвет линии маршрута для седьмого маршрута
                    width: 4, // Толщина линии
                  }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                  }),
                });
              }
              
              // Применение стиля ко всем объектам маршрута
              features.forEach((feature) => {
                feature.setStyle(routeStyle); // Применяем стиль к каждому объекту маршрута
              });

              // Создание источника для векторного слоя
              const vectorSource = new VectorSource({
                features: features,
              });

              // Создание векторного слоя
              const vectorLayer = new VectorLayer({
                source: vectorSource,
              });

              // Добавление векторного слоя на карту
              map.addLayer(vectorLayer);
              vectorLayers.push(vectorLayer); // Добавляем слой в список слоев

              // Слушатель событий клика
              map.on('singleclick', (event) => {
                const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);

                if (feature) {
                  // Если новый объект, выделяем его
                  if (highlightedFeature !== feature) {
                    // Если был выделен предыдущий маршрут, сбрасываем стиль
                    if (highlightedFeature) {
                      highlightedFeature.setStyle(highlightedFeature.originalStyle);
                    }

                    // Запоминаем новый объект
                    highlightedFeature = feature;
                    highlightedFeature.originalStyle = feature.getStyle(); // Сохраняем оригинальный стиль

                    // Создаем новый слой для выделенного маршрута и добавляем его поверх
                    if (!highlightedLayer) {
                      highlightedLayer = new VectorLayer({
                        source: new VectorSource({
                          features: [feature],
                        }),
                        zIndex: 200, // Этот слой будет поверх всех других
                      });
                      map.addLayer(highlightedLayer);
                    }

                    // Подсвечиваем маршрут
                    feature.setStyle(new Style({
                      stroke: new Stroke({
                        color: feature.getStyle().getStroke().getColor(), // Оставляем тот же цвет
                        width: 7,
                        lineCap: 'round',
                        lineJoin: 'round',
                      }),
                    }));
                  }
                } else {
                  // Если кликнули в пустое место, убираем подсветку
                  if (highlightedFeature) {
                    highlightedFeature.setStyle(highlightedFeature.originalStyle);
                    highlightedFeature = null;

                    // Убираем слой для выделенного маршрута
                    if (highlightedLayer) {
                      map.removeLayer(highlightedLayer);
                      highlightedLayer = null;
                    }
                  }
                }
              });
            })
            .catch((error) => console.error('Ошибка при загрузке GeoJSON:', error));
        });
      });

      return {
        zoomIn,
        zoomOut,
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
  .controls {
    margin-top: 10px;
  }
</style>


