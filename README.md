### 入门Leaflet之小Demo
---

> 写在前面 ---- WebGIS开发基础之Leaflet
> 1. GIS基本概念：GIS、Map、Layer、Feature、Geometry、Symbol、Data（Point、Polyline、Polygon）、Renderer、Scale、Project、Coordinates；
> 2. GIS开发概述：架构模式、常用平台和SDK、二维三维
> 3. 使用Leaflet开发常用功能
>   * 地图加载（底图类型、切换）：
>   * 地图操作（缩放、平移、定位/书签、动画）：
>   * 图层管理（加载、移除、调整顺序）：
>   * 要素标绘（点/聚簇、线、面，符号化/静态动态）：
>   * 属性标注（字段可选、样式定制）：
>   * 专题地图（点、线、面，渲染）：
>   * 查询定位（属性查询、空间查询/周边搜索/缓冲区/面查点线面/点线查面、图属互查、综合查询）：
>   * 信息窗口（入口、Popup、定制）：
>   * 坐标转换（）：
>   * 空间运算（长度面积测量、点取坐标、缓冲区、相交包含关系）：
>   * 动态监控（固定点状态切换、车辆监控）：
![](https://user-gold-cdn.xitu.io/2018/2/25/161cd7239e171384?w=1920&h=959&f=png&s=222128)
> 4. [Leaflet API](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/tree/Leaflet%20API.png)![](https://user-gold-cdn.xitu.io/2018/3/1/161dd4951441cce1?w=691&h=1217&f=png&s=54115)
---
#### Demo用到的库
* Flat-UI [ Flat UI is based on Bootstrap, a comfortable, responsive, and functional framework that simplifies the development of websites.](https://github.com/designmodo/Flat-UI/)Flat-UI是基于Bootstrap的一个扁平化风格web开发框架。
* leaflet [an open-source JavaScript library for mobile-friendly interactive maps.](http://leafletjs.com/reference-1.3.0.html)Leaflet 是一个为建设交互性好适用于移动设备地图，而开发的现代的、开源的 JavaScript 库。
* Esri Leaflet [A lightweight set of tools for using ArcGIS services with Leaflet.](http://esri.github.io/esri-leaflet/)一个轻量级的工具,基于leaflet利用ArcGIS服务。
---
### PART 1： 地图加载（底图类型、切换） [Demo 1 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo1.html)
![](https://user-gold-cdn.xitu.io/2018/2/25/161cd7e9bfff52ad?w=1920&h=957&f=jpeg&s=2237468)
* 库引用
```
<link rel="stylesheet" type="text/css" href="./lib/Flat-UI-master/dist/css/vendor/bootstrap/css/bootstrap.min.css"
    /> 
<link rel="stylesheet" href="./lib/Flat-UI-master/dist/css/flat-ui.min.css">
<link rel="stylesheet" href="./lib/leaflet/leaflet.css">
```
```
<script src="./lib/Flat-UI-master/dist/js/vendor/jquery.min.js"></script>
<script src="./lib/Flat-UI-master/dist/js/flat-ui.js"></script>
<script src="./lib/leaflet/leaflet.js"></script>
<script src="./js/urlTemplate.js"></script>
```
* 地图加载与切换
```
const map = L.map("mapDiv", {
        crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系,互联网地图主流坐标系
        // crs: L.CRS.EPSG4326, //WGS 84坐标系，GPS默认坐标系
        zoomControl: true,
        // minZoom: 1,
        attributionControl: true,
    }).setView([30.6268660000, 104.1528940000], 18);//定位在成都北纬N30°37′45.58″ 东经E104°09′1.44″
    let Baselayer = L.tileLayer(urlTemplate.mapbox_Image, {
       maxZoom: 17, //最大视图
        minZoom: 2, //最小视图
        attribution: 'liuvigongzuoshi@foxmail.com  &copy; <a href="https://github.com/liuvigongzuoshi/WebGIS-for-learnning/tree/master/Leaflet_Demo">WebGIS-for-learnning</a>'
    }).addTo(map);

const setLayer = (ele) => {
    map.removeLayer(Baselayer)
    if (ele == "mapbox_Image") {
        Baselayer = L.tileLayer(urlTemplate.mapbox_Image, {
            maxZoom: 17,
            minZoom: 2
        }).addTo(map);
    } else if (ele == "mapbox_Vector") {
        Baselayer = L.tileLayer(urlTemplate.mapbox_Vector, {
            maxZoom: 17,
            // minZoom: 2
        }).addTo(map);
        console.log(Baselayer)
    }
}
```
###  基于Demo 1 利用H5 Geolocation API 定位到当前位置  [Demo 1.1 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo1.1.html)
![](https://user-gold-cdn.xitu.io/2018/2/26/161d283e74f18d76?w=964&h=480&f=gif&s=862550)
* 库引用  如上  Demo 1
```
//marker高亮显示库引用
<link rel="stylesheet" href="./lib/leaflet.marker.highlight/leaflet.marker.highlight.css">
<script src="./lib/leaflet.marker.highlight/leaflet.marker.highlight.js"></script>
```
* 判断浏览器是否支持
```
    let map;
    let Baselayer;
    // 使用H5 API定位 定位在当前位置
    if (navigator.geolocation) {
        console.log('/* 地理位置服务可用 */')
        navigator.geolocation.getCurrentPosition(h5ApiSuccess, h5ApiError);
    } else {
        console.log('/* 地理位置服务不可用 */')
        mapInit([30.374558, 104.09144]);//指定一个数据 定位在成都北纬N30°37′45.58″ 东经E104°09′1.44″
    }
```
* 定位成功或失败
```
    const h5ApiSuccess = (position) => {
        var latitude = position.coords.latitude; //纬度
        var longitude = position.coords.longitude; //经度
        console.log('你的经度纬度分别为' + longitude + ',' + latitude + '。')
        return mapInit([latitude, longitude]);
    };

    const h5ApiError = () => {
        console.log('/* 地理位置请求失败 */')
        mapInit([30.374558, 104.09144]);//指定一个数据 定位在成都北纬N30°37′45.58″ 东经E104°09′1.44″
    };
```
* 成功后初始化底图
```
    const mapInit = (LatLng) => {
        map = L.map("mapDiv", {
            crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系
            // crs: L.CRS.EPSG4326, //国内的坐标参考系
            zoomControl: true,
            // minZoom: 1,
            attributionControl: true,
        }).setView(LatLng, 18);//定位在当前位置
        Baselayer = L.tileLayer(urlTemplate.mapbox_Image, {
            maxZoom: 17, //最大视图
            minZoom: 2, //最小视图
            attribution: 'liuvigongzuoshi@foxmail.com  &copy; <a href="https://github.com/liuvigongzuoshi/WebGIS-for-learnning/tree/master/Leaflet_Demo">WebGIS-for-learnning</a>'
        }).addTo(map);
        
        L.marker(LatLng, {
            highlight: "permanent" //永久高亮显示
        }).addTo(map);
    }
```
> * 更多了解geolocation对象，可参考[MDN Web 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/Using_geolocation)
> * 更多了解使用marker高亮显示，可参考[leaflet.marker.highlight](https://github.com/brandonxiang/leaflet.marker.highlight)插件
> * 基于Demo 1 利用eaflet封装好的H5定位API,定位到当前位置 [Demo](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo1.2.html)
### PART 2： 地图操作（缩放、平移、定位/书签、动画） [Demo 2 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo2.html)
![](https://user-gold-cdn.xitu.io/2018/2/28/161dcd420e164009?w=964&h=480&f=gif&s=2119022)
* 库引用  如上  Demo 1

* 设置地图缩放到指定图层

```
map.setZoom(10, {
  // animate: false
})  //设置地图缩放到
```
* 图层往里进一个图层，放大

```
map.zoomIn() //图层往里进一个图层，放大
//map.zoomOut()  //图层往里出一个图层，缩小
```
* 地图平移至中心点

```
map.panTo([37.91082, 128.73583], {
    animate: true
}) //地图平移，默认就是true，将地图平移到给定的中心。如果新的中心点在屏幕内与现有的中心点不同则产生平移动作。
```

* 地图飞到中心点

```
map.flyTo([36.52, 120.31]); // 点到点的抛物线动画，平移加缩放动画
```

> 注意：尽量避免setZoom()等地图缩放方法与flyTo、flyToBounds一起合用，因为这两类地图操作方法都有各自的缩放值，造成动画不流畅、不能定位到目的点。

* 地图飞到边界的合适的位置

```
map.flyToBounds(polygon.getBounds());   //getBounds（获取边界）：返回地图视图的经纬度边界。
    //飞到这个多变形区域上面，自动判断区域块的大小，合适缩放图层，将地图视图尽可能大地设定在给定的地理边界内。
    
let polygon = L.polygon(
          [[37, -109.05], 
          [41, -109.03], 
          [41, -102.05], 
          [37, -102.04]],
     [40.774, -74.125], {
       color: 'green',
       fillColor: '#f03',
       fillOpacity: 0.5
    }).addTo(map);  //地图上绘制一个多形
```

* 地图定位到边界的合适的位置

```
map.fitBounds(polygon.getBounds());  //getBounds（获取边界）：返回地图视图的经纬度边界。
  //平移到一个区域上面，自动判断区域块的大小，合适缩放图层
    
let polygon = L.polygon(
          [[37, -109.05], 
          [41, -109.03], 
          [41, -102.05], 
          [37, -102.04]],
     [40.774, -74.125], {
       color: 'green',
       fillColor: '#f03',
       fillOpacity: 0.5
    }).addTo(map);  //地图上绘制一个多边形
```

### PART 3： 图层管理（加载、移除、调整顺序）： [Demo 3 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo3.html)
![](https://user-gold-cdn.xitu.io/2018/2/28/161dce7e881a2362?w=1920&h=959&f=jpeg&s=2962698)
* 库引用
```
<link rel="stylesheet" type="text/css"  href="./lib/Flat-UI-master/dist/css/vendor/bootstrap/css/bootstrap.min.css"
    />
<link rel="stylesheet" href="./lib/Flat-UI-master/dist/css/flat-ui.min.css">
<link rel="stylesheet" href="./lib/leaflet/leaflet.css">
```
```
<script src="./lib/Flat-UI-master/dist/js/vendor/jquery.min.js"></script>
<script src="./lib/Flat-UI-master/dist/js/flat-ui.js"></script>
<script src="./lib/leaflet/leaflet.js"></script>
<script src="./lib/esri-leaflet-v2.1.2/dist/esri-leaflet.js"></script> <!-- esri-leafleat插件 -->
<script src="./js/urlTemplate.js"></script>
```
* 使用esri-leaflet插件加载ArcGIS底图服务
```
let oMap = null;
    let oLayer = [];

    oMap = L.map('mapDiv', {
        crs: L.CRS.EPSG4326,
        zoomControl: false,
        minZoom: 7,
        attributionControl: false
    }).setView([29.59, 106.59], 12); //定位在重庆
    
    oLayer.push(L.esri.tiledMapLayer({
        url: urlTemplate.SYS_CQMap_IMG_MAPSERVER_PATH,
        maxZoom: 17,
        minZoom: 0,
        useCors: false, //是否浏览器在跨域的情况下使用GET请求。
    }).addTo(oMap)); //加载第一个底图

    oLayer.push(L.esri.tiledMapLayer({
        url: urlTemplate.SYS_CQMap_IMG_LABEL_MAPSERVER_PATH,
        maxZoom: 17,
        minZoom: 0,
        useCors: false,
    }).addTo(oMap));  //加载第二个底图
```
* 切换底图(移除及加载)

```
const setLayer = (layerUrls, maxZoom) => {
        for (let i = 0; i < oLayer.length; i++) {
            oMap.removeLayer(oLayer[i]) //将图层在地图上移除
        }
        oLayer = [] //制空数组
        layerUrls.map((item) => {
            oLayer.push(L.esri.tiledMapLayer({
                url: item,
                useCors: false, 
                maxZoom: maxZoom, // 设置最大放大图层值
            }).addTo(oMap));
        })
    }
```
>  不同的底图可能图层数不一样，就可能造成浏览器去请求不存在的图层，以及给用户展示出空白区域的不好体验，所以切换图层时候应注意设置最大及最小缩放值。

###  PART 4： 要素标绘（点、线、面，符号化/静态动态） [Demo 4 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo4.html)
![](https://user-gold-cdn.xitu.io/2018/2/28/161dcf0290ac287b?w=964&h=480&f=gif&s=3275194)
* 库引用  如上  Demo 1
* 画一个圆
```
// 画一个circle
const circle = L.circle([36.52, 120.31], {
  color: 'green', //描边色
  fillColor: '#f03',  //填充色
  fillOpacity: 0.5, //透明度
  radius: 10000 //半径，单位米
}).addTo(map);
// 绑定一个提示标签
circle.bindTooltip('我是个圆');
```
* Maker及自定义Maker
```
// 做一个maker
const marker = L.marker([36.52, 120.31]).addTo(map);
// 绑定一个提示标签
marker.bindTooltip('这是个Marker', { direction: 'left' }).openTooltip();


//自定义一个maker
const greenIcon = L.icon({
  iconUrl: './icon/logo.png',
  iconSize: [300, 79], // size of the icon
  popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
});

const oMarker = L.marker([36.52, 124.31], { icon: greenIcon }).addTo(map);
// 绑定一个提示标签
oMarker.bindTooltip('这是个自定义Marker', { direction: 'left', offset: [-150, 0] });
```
* 画一根线
```
//画一根线
const polyline = L.polyline([[45.51, -122.68], [37.77, -122.43], [34.04, -118.2]], { color: 'red' }).addTo(map);
// 飞到这个线的位置
// map.fitBounds(polyline.getBounds());
```
* 画一个多边形
```
// 画一个polygon
const polygon = L.polygon([
  [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]], // outer ring
  [[37.29, -108.58], [40.71, -108.58], [40.71, -102.50], [37.29, -102.50]] // hole
], {
    color: 'green',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);
// 绑定一个提示标签
polygon.bindTooltip('this is 个多边形');
// 飞到这个多边形的位置
// map.fitBounds(polygon.getBounds());
```
 ### PART 5： 信息窗口（入口、Popup、定制） [Demo 5 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo5.html)
![](https://user-gold-cdn.xitu.io/2018/2/28/161dd0f8edbe36e5?w=964&h=480&f=gif&s=3360015)
* 库引用 如上  Demo 1
 * 画一个circle并绑定一个Popup
 ```
// 画一个circle
const circle = L.circle([36.92, 121.31], {
  color: 'green', //描边色
  fillColor: '#f03',  //填充色
  fillOpacity: 0.5, //透明度
  radius: 10000 //半径，单位米
}).addTo(map);

// 绑定一个弹窗
circle.bindPopup('我是个圆');
 ```
 * 定位一个marker，绑定一个自定义Popup
```
// 定位一个maker
const marker = L.marker([36.52, 120.31]).addTo(map);

//maker上自定义一个popup
const html = '<p>Hello world!<br />This is a nice popup.</p>';

const popup = marker.bindPopup(html, { maxHeight: 250, maxWidth: 490, className: 'content', offset: [0, 0] }).on('popupopen', function (params) {
  console.log(params)
});
```
* 实现动态改变Popup的内容
```
const mypop = L.popup();

map.on('click', function (e) {
  mypop.setLatLng(e.latlng)
    .setContent('你临幸了这个点：<br>' + e.latlng.toString())
    .openOn(map);
});
```

 ### PART 6： geojson 数据绘制边界(坐标转换、渲染) [Demo 6 ](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/demo6.html)
 
![](https://user-gold-cdn.xitu.io/2018/3/1/161dd3b18402adcc?w=964&h=480&f=gif&s=5224505)
* 库引用 如上  Demo   1

* 获得geojson并处理数据

```
// 请求geojson并处理数据
const population = () => {
    $.get("./js/geojson.json", function (response) {
        const poplData = response.data
        const PolygonsCenter = response.geopoint
        drawPolygons(poplData, PolygonsCenter)
    });
}
```

> 模拟后台返回的数据[geojson](https://github.com/liuvigongzuoshi/Leaflet_Demo/blob/master/js/geojson.json)

* 绘制边界并添加图例

```
let oPolygon_VilPop = [];

const legend = L.control({
    position: 'bottomright'
 });
 
const drawPolygons = (poplData, PolygonsCenter) => {
    for (const i in poplData) {
        poplData[i].geoJson = JSON.parse(poplData[i].geoJson)
        oPolygon_VilPop[i] = L.geoJSON(poplData[i].geoJson, {
            style: function () {
                return {
                    color: 'white',
                    fillColor: getBgColor(poplData[i].population), //获取边界的填充色
                    fillOpacity: 0.6,
                    weight: 3,
                    dashArray: '10'
                };
            }
        }).bindTooltip(poplData[i].villageName + '<br><br>人口' + poplData[i].population + '人', {
            direction: 'top'
        }).on({
            mouseover: highlight, //鼠标移动上去高亮
            mouseout: resetHighlight, //鼠标移出恢复原样式
            click: zoomTo //点击最大化
        }).addTo(oMap);
    }

    // 添加图例
    legend.onAdd = legendHtml;
    legend.addTo(oMap);

    // 定位到该界限的中心位置
    oMap.flyToBounds(PolygonsCenter);
}
    
// 添加图例
legend.onAdd = legendHtml;
legend.addTo(oMap);

// 定位到该界限的中心位置
oMap.flyToBounds(PolygonsCenter);
}
```

* 返回边界的填充色及图列的样式
```
const getBgColor = (d) => {
    return d > 400 ? '#800026' : d > 300 ? '#BD0026' : d > 200 ? '#FC4E2A' : d > 100 ? '#FD8D3C' : d > 50 ? '#FED976' : '#FFEDA0';
}

const legendHtml = (map) => {
    var div = L.DomUtil.create('div', 'legend locateVP_legend'),
        grades = [0, 50, 100, 200, 400],
        labels = [],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + getBgColor(from + 1) + '"></i> ' +
            from + (to ? ' &sim; ' + to + '人' : '以上'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
    };
```

* 鼠标移动上去的事件、鼠标移出的事件、发生点击的事件

```
const highlight = (e) => {
    var layer = e.target;
    layer.setStyle({
        weight: 6,
        color: '#fff',
        fillOpacity: 0.9,
        dashArray: '0'
    })
}

const resetHighlight = (e) => {
    var layer = e.target;
    layer.setStyle({
        color: 'white',
        weight: 3,
        fillOpacity: 0.6,
        dashArray: '10'
    })
}

const zoomTo = (e) => {
    oMap.fitBounds(e.target.getBounds());
}
```

### 写在后面 
#### 国内常用地图服务资源加载插件
> Leaflet.ChineseTmsProviders [Provider for Chinese Tms Service](https://github.com/htoooth/Leaflet.ChineseTmsProviders)

* Leaflet调用国内各种地图的功能十分复杂，幸好有leaflet.ChineseTmsProviders这个插件，这四种地图直接就可以加载进来，十分方便。

* 使用方法很简单可点击上面链接去GitHub看使用说明，或拉[这个demo](https://github.com/liuvigongzuoshi/WebGIS-for-learnning/tree/master/Leaflet.ChineseTmsProviders_Demo)下来来瞧一瞧代码。

#### 优化marker相关的插件
* 提供了丰富多彩的图标 [Leaflet.awesome-markers](https://github.com/lvoogdt/Leaflet.awesome-markers), See the [demo map](http://jsfiddle.net/VPzu4/92/)

* 强大的集聚插件 [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster), See the [demo map](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-realworld.388.html)

* 优化的label [Leaflet.label](https://github.com/Leaflet/Leaflet.label), See the [demo map](http://leaflet.github.io/Leaflet.label/)

* 优化重叠在一起的markers [OverlappingMarkerSpiderfier-Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet), See the [demo map](http://jawj.github.io/OverlappingMarkerSpiderfier-Leaflet/demo.html)

* 优化在边框上显示不在当前视野中的marker [Leaflet.EdgeMarker](https://github.com/ubergesundheit/Leaflet.EdgeMarker), See the [demo map](http://ubergesundheit.github.io/Leaflet.EdgeMarker/)

#### 模块化开发的加载包注意的问题
* 引 leaflet 包的时候不要忘记引用包里的css `import 'leaflet/dist/leaflet.css';`

#### 关于Leaflet和esri-leaflet一起使用L.esri.TiledMapLayer加载ArcGIS 服务切片底图时，控制台打印报错 ```Uncaught ReferenceError: proj4 is not defined``` 
* 查看了下源码 `if (!proj4) { warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');}` 问题就出在这里，esri-leaflet里的一个插件proj4leaflet依赖[proj4](https://github.com/proj4js/proj4js)，所以需要手动引入proj4这个包。
* 这个GitHub上面的提问及回答 [Github esri-leaflet Issues](https://github.com/Esri/esri-leaflet/issues/1019)
* 如果你是模块化开发，需要再```npm i proj4 ``` 然后再引入进来好了 ```import * as proj4 from 'proj4';
window['proj4'] = proj4;```
* 如果你是常规开发，直接添加一个script标签引用CDN资源上托管的[Proj4js](https://cdnjs.com/libraries/proj4js)就是了 `<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.4/proj4-src.js"></script>`

#### 参考
* [GIS制图乐园 esri-leaflet入门教程（1）-leaflet介绍](http://blog.csdn.net/liyuanxiang1984/article/details/54601985)
* [Awesome GIS（GIS Tech Stack技术栈）](https://www.jianshu.com/p/3b3efa92dd6d)
* [麻辣GIS Leaflet学习笔记](http://malagis.com/learning-leaflet-js-note.html)

> 持续更新中  原文地址： https://juejin.im/post/5a658614f265da3e3f4cce0e