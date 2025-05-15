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
          const geoJsonFilePath = './avicena.geojson';
  
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
                  color: 'rgba(248,110,12,255)', // Цвет линии маршрута
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
  </style>
  