<template>
    <div>
      <div id="map-mendeleev" class="map" tabindex="0">
      </div>
      
    </div>
  </template>
  
  <script>
  console.log("routeMendeleev.vue загружен!");
    import { onMounted } from 'vue';
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
  
    export default {
      name: 'MapComponent',
      emits: ['navigateToPage3'], // Добавляем событие для навигации
  
  
      setup(_, { emit }) {
        onMounted(() => {
          const map = new Map({
            target: 'map-mendeleev',
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
          fetch('./mendeleev.geojson')
            .then((response) => response.json())
            .then((data) => {
              const geojsonFormat = new GeoJSON();
              const features = geojsonFormat.readFeatures(data, {
                featureProjection: 'EPSG:3857',
              });
  
              const routeStyle = new Style({
                stroke: new Stroke({
                  color: 'rgba(0,168,221,255)', // Полупрозрачный маршрут
                  width: 4,
                }),
              });
  
              features.forEach((feature) => feature.setStyle(routeStyle));
              routeSource.addFeatures(features);
            });
  
          const routeLayer = new VectorLayer({
            source: routeSource,
            zIndex: 1, // Низкий zIndex
          });
  
          map.addLayer(routeLayer);
  
          // === Слой точек ===
          const pointSource = new VectorSource();
          const coordinates = [
            [55.931985, 54.719634], 
            [56.015727, 54.767287],
            [56.038583, 54.797439],
            [56.058497, 54.818319],
          ];
  
          const pointStyle = new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({
                color: 'rgba(0,168,221,255)',
              }),
              stroke: new Stroke({
                color: 'black',
                width: 1,
              }),
            }),
          });
  
          // Добавляем точки и устанавливаем индекс
          coordinates.forEach((coord, index) => {
            const pointFeature = new Feature({
              geometry: new Point(fromLonLat(coord)),
            });
            pointFeature.set('index', index); // Устанавливаем индекс точки
            pointFeature.setStyle(pointStyle);
            pointSource.addFeature(pointFeature);
          });
  
  
          const pointsLayer = new VectorLayer({
            source: pointSource,
            zIndex: 2, // Высокий zIndex
          });
  
          map.addLayer(pointsLayer);
          // === Обработка кликов на точках ===
          // map.on('singleclick', (evt) => {
          //   map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          //     const index = feature.get('index'); // Получаем индекс точки
          //     if (index === 0) {
          //       // Если нажали на первую точку
          //       emit('navigateToPage3'); //отключил переход к обьекту уфанет
          //     }
          //   });
          // });
        });
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
  