const urlTemplate = {
  //在mapbox自定义的影像地图
  mapbox_Image:
    'https://api.mapbox.com/styles/v1/yqcim/cizh1ma3400ez2so5x1anhuzo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieXFjaW0iLCJhIjoiY2l6ZmhnZjExMDBhajJ4cGxnNGN5MnhpdCJ9.pcZtdfk8mSFboCdwqkvW6g',
  //在mapbox自定义的矢量地图
  mapbox_Vector:
    'https://api.mapbox.com/styles/v1/liuvigongzuoshi/cjbf0ypqz8wp62ro6iayiivzy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl1dmlnb25nenVvc2hpIiwiYSI6ImNqYmYwd24wczJyd24yeGxsMWE5bGpxaGkifQ.CVKELjW5ASK8EnQfQCbxFw',
  //在mapbox地图接口
  mapbox_url:
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  // 影像地图
  SYS_IMG_MAPSERVER_PATH: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile',
  // 影像注记
  SYS_IMG_LABEL_MAPSERVER_PATH:
    'http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  // 矢量地图
  SYS_VEC_MAPSERVER_PATH: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile',
  // 地形地图
  SYS_DEM_MAPSERVER_PATH: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer',
};
