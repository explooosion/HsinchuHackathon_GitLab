import { Component, Input, NgZone, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GMapsService } from '../../service/gmaps.service';
import { LayerService } from '../../service/layer.service';
import { YearStructureService } from '../../service/year-structure.service';
import { PopulationStructureService } from '../../service/population-structure.service';

import { TravelMode } from '../../class/travelmode';
import { Direction } from '../../class/direction';
import { Marker } from '../../class/marker';
import { MapsAPILoader } from '@agm/core';

import { LayerControl } from '../../map/layer-control';
import { LayerData } from '../../map/layer-data';
import { async } from '@angular/core/testing';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css'],
  providers: [
    GMapsService,
    LayerService,
    YearStructureService,
    Marker,
    PopulationStructureService,
  ]
})
export class MapModalComponent implements OnInit {

  bounds;
  // 初始資料
  lat: Number = 24.799448;
  lng: Number = 120.979021;
  // 路徑規劃(起點終點)
  public direction: Direction = null;
  // 必經點位
  public waypoints: any;
  // public travelModeSelect = 'BICYCLING';
  // public travelode = TravelMode;

  public pointer_life_arr = []; //樣本數

  public pointer_life = {
    live: 0,
    traffic: 0,
    edu: 0,
    hospital: 0
  }

  public pointer_women_child = {
    crime: 0,
    traffic: 0,
    police: 0
  }
  zoom: Number = 15;
  radius: Number = 500; // 半徑(公尺)
  color: string = '#aa93d6';
  addr: string = "新竹市新都旅社";
  addr2: string = "新竹市鳳仙清粥小菜";

  // bug
  // addr: string = "德記青草茶老店本舖";
  // addr2: string = "新竹中央市場";

  // 分析統計
  countPark: number = 17;

  // 圖層清單
  public layerData = LayerData;

  // 圖層控制
  public nodes = LayerControl;

  // 點位訊息小窗
  infowinLat: number = 23.458987;
  infowinLng: number = 120.29294219999997;
  infowinMsg: string[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
  infowinIsOpen: boolean = false;

  // 年齡結構 - 卷軸
  yearActiveSlider: string = null;
  yearValueSlider: number = 1;
  yearDateSlider: string = `${new Date().getFullYear().toString()}年 - ${new Date().getMonth().toString()}月`;

  // 人口結構 - 卷軸
  popuActiveSlider: string = null;
  popuValueSlider: number = 41;
  popuDateSlider: string = `${new Date().getFullYear().toString()}年 - 第${new Date().getMonth().toString()}季`;

  // 年齡結構 - 圖表
  //yearData: any[] = [];
  // yearDataFilter: any[] = []; // 儲存卷軸對應的No.資料
  yearDataPercent: any[] = [50, 50, 50]; // 年齡結構百分比[A群,B群,C群]
  yearCountOldMan: number[] = [1, 2, 3, 4];
  yearCountMale: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  yearCountPercent: number = 51.13;

  // 人口結構 - 圖表
  popuData: any[] = [];
  popuDataFilter: any[] = [];
  popuDataPercent: any[] = [50, 50, 50];

  // 圖表 - 年齡結構分析
  doughnutChartLabels: string[] = ['~17', '18~65', '65~',];
  doughnutChartData: number[] = [650, 210, 140];
  doughnutChartType: string = 'doughnut'; // 改讀取 yearDataPercent

  // 圖表 - 區域社福評估
  radarChartLabels: string[] = ['監視', '醫院', '照護', '宗教', '竊盜'];
  radarChartData: any = [
    { data: [17, 7, 3, 2, 1], label: '新竹市' }
  ];
  radarChartType: string = 'radar';
  radarChartOptions: any = [{
    borderColor: 'rgba(54,162,235,.8)',
    backgroundColor: 'rgba(54,162,235,.3)',
    pointBackgroundColor: '#36A2EB',
    pointBorderColor: '#fff'
    // [colors]="colors" 
  }];

  // 圖表 - 人口數量預測
  barChartOptions: any = {
    scaleOverride: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 800000
        }
      }]
    }
  };
  barChartLabels: string[] = ['2014', '2015', '2016', '2017', '自訂年(季)'];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: any[] = [
    { data: [524787, 519659, 514201, 508414, 505412], label: '新竹市' }
  ];

  constructor(
    private popuService: PopulationStructureService,
    private yearService: YearStructureService,
    private gmapService: GMapsService,
    private layerService: LayerService,
    private mapsAPILoader: MapsAPILoader,
    private zone: NgZone,
    private marker: Marker
  ) { }

  ngOnInit() {

    // 載入圖層資料
    this.LoadAllLayer();

    // 載入圖表資料
    // this.optionPopuChange('Chiayi');
    // this.optionYearChange('Chiayi');
  }

  /**
   * 載入所有圖層
   */
  public async LoadAllLayer() {

    await this.layerService.getGeoJsonLayer('county')
      .subscribe(result => this.layerData[0].geojson = result);

    this.layerData.forEach(async (obj) => {

      // 點圖
      if (obj.parent_id < 4) {
        if (obj.id != 101) {
          await this.layerService.getPointerLayer(obj.file, obj.class)
            .subscribe(result => obj.geojson = result);
        }
      } else if (obj.parent_id == 4) {
        // 線圖
        await this.layerService.getLineLayer(obj.file, obj.class)
          .subscribe(result => {
            obj.geojson = result;
          });
      }
    });

  }

  /**
   * 座標點選 EVENT
   * @param e 
   */
  public geoLayerClick(e) {
    let feature = e.feature.f;
    this.infowinLat = Number(feature.lat) + 0.00008;
    this.infowinLng = Number(feature.lng);

    if (feature.name) {
      this.infowinMsg[0] = feature.name;
    }

    if (feature.addr) {
      this.infowinMsg[1] = feature.addr;
    }

    if (feature.tel) {
      this.infowinMsg[2] = `Tel: ${feature.tel}`;
    }

    this.infowinIsOpen = true;
  }


  /**
   * 婦幼安全路線分析
   */
  public async analyticsDirections() {
    let origin = new Marker();
    let destination = new Marker();

    // reset data
    // this.direction = null;
    this.waypoints = [];

    await this.gmapService.getLatLan(this.addr)
      .subscribe(
      async (result1) => {
        await this.gmapService.getLatLan(this.addr2)
          .subscribe(
          async (result) => {
            origin.lat = result1.lat();
            origin.lng = result1.lng();
            destination.lat = result.lat();
            destination.lng = result.lng();

            // center point
            let clat = (result1.lat() + result.lat()) / 2;
            let clng = (result1.lng() + result.lng()) / 2;
            this.lat = clat;
            this.lng = clng;
            await this.setCircle(clat, clng);

            await this.gmapService.getDistance([origin.lat, origin.lng], [clat, clng])
              .subscribe(result => {
                this.radius = result;
              });

            // 確認有無危險地點
            await this.analyticsDangerous();

            // console.log(this.waypoints);
            if (!this.direction) {
              this.direction = new Direction(origin, destination);
            } else {
              // this.direction.destination = destination;
              // this.direction.origin = origin;
              this.direction = new Direction(origin, destination);
            }

          });
      });

  }


  /**
   * 危險路徑替代點位
   */
  public async analyticsDangerous() {

    this.countPark = 0;

    this.layerData.forEach(obj => {

      let minDis = 0;
      let minPoint;

      if (obj.description == '婦幼安全警示地點') {

        obj.geojson['features'].forEach(async (element) => {
          let lat = Number(element.geometry.coordinates[1]);
          let lng = Number(element.geometry.coordinates[0]);
          let p2 = [lat, lng];
          await this.gmapService.getDistance([this.lat, this.lng], p2)
            .subscribe(
            result => {
              this.zone.run(() => {

                // 如果在半徑內  
                if (result <= this.radius) {

                  if (minDis == 0) {
                    minDis = result;
                    minPoint = p2;
                  } else if (result < minDis) {
                    minDis = result;
                    minPoint = p2;
                  }

                  this.waypoints.push(
                    {
                      location: { lat: Number(element.properties.lat2), lng: Number(element.properties.lng2) },
                      stopover: true // 標記AB上去,否則會出現白點
                    });
                }
              });
            });
        });

      }

    });


  }


  /**
   * 環域分析-指數計算
   */
  public async analyticsArea() {

    // loop 跑樣本數
    // min = 所有集合對於該指數最小的
    // 
    // 樣本數
    for (let j = 0; j < 2; j++) {

      // 產生樣本點
      //const newPoint = this.gmapService.generatePoint(this.layerData[0].geojson.features[11].geometry.coordinates[0]);


      // Reset Pointer
      this.pointer_life = {
        live: 0,
        traffic: 0,
        edu: 0,
        hospital: 0
      }

      this.pointer_women_child = {
        crime: 0,
        traffic: 0,
        police: 0
      }

      // counter 2
      let count;

      await this.setCircle(null, null);

      // 跑所有圖層

      let i = 0;
      this.layerData.forEach((obj) => {

        // parent_id = 1 新竹邊界圖
        if (obj.parent_id > 1) {

          obj.geojson['features'].forEach(async (element) => {
            let lat = Number(element.geometry.coordinates[1]);
            let lng = Number(element.geometry.coordinates[0]);
            let p2 = [lat, lng];
            await this.gmapService.getDistance([this.lat, this.lng], p2)
              .subscribe(
              result => {
                this.zone.run(() => {
                  // 如果在半徑內  
                  if (result <= this.radius) {

                    // 類別( 生活便利 & 婦幼安全 )
                    if (obj.parent_id == 2) {
                      switch (obj.group) {
                        case 'live': this.pointer_life.live++; break;
                        case 'traffic': this.pointer_life.traffic++; break;
                        case 'edu': this.pointer_life.edu++; break;
                        case 'hospital': this.pointer_life.hospital++; break;
                      }
                      count = this.pointer_life;
                    } else {
                      switch (obj.group) {
                        case 'crime': this.pointer_women_child.crime++; break;
                        case 'traffic': this.pointer_women_child.traffic++; break;
                        case 'police': this.pointer_women_child.police++; break;
                      }
                    }

                    // 只處理 生活便利
                    // if (index == this.layerData.length - 1) {
                    //   // this.pointer_life_arr.push(count);
                    //   // console.log(this.pointer_life_arr);
                    //   console.log('end');
                    // }

                    // i++;
                    // if (i == this.layerData.length - 1) {

                    //   // 當最後一筆的時候
                    //   count = this.pointer_life;
                    //   this.pointer_life_arr.push(count);
                    //   console.log(this.pointer_life_arr);
                    // }

                  }
                });
              });
          });

        }

      });
    }

  }


  /**
   * 繪製圓形區域 EVENT
   */
  public async setCircle(lat, lng) {

    await this.gmapService.getLatLan(this.addr)
      .subscribe(
      async (result) => {
        //必須使用zone 觀察整個 view 否則會導致延遲
        await this.zone.run(() => {
          this.mapsAPILoader.load().then(() => {

            this.lat = lat || result.lat();
            this.lng = lng || result.lng();

            this.saveMarker(result.lat(), result.lng());
            this.bounds = new window['google'].maps.LatLngBounds(new window['google'].maps.LatLng(this.lat, this.lng));
          }
          )

        });
        this.zoom = 15;
      },
      error => console.log(error),
      () => console.log('Geocoding completed!')
      );
  }

  /**
   * 當前座標
   * @param lat 
   * @param lng 
   */
  public saveMarker(lat: Number, lng: Number) {
    this.marker.lat = lat;
    this.marker.lng = lng;
  }

  /**
   * 圖層樣式
   * @param feature 
   */
  public styleLayer(feature) {

    if ($('.gmap-loading').css('display') != 'none') {
      setTimeout(() => {
        $('.gmap-loading').hide();
      }, 1000);
    }

    let icon, visible = true, color = 'green';
    // console.log(feature);

    if (feature.getProperty('COUNTYENG') != '') {
      console.log('load 縣市');
      if (
        feature.getProperty('COUNTYENG') == 'Hsinchu City'
      ) {
        color = 'red';
        visible = true;
      } else {
        visible = false;
      }
    }

    if (feature.getProperty('group') != undefined) {
      visible = true;
    }

    switch (feature.getProperty('group')) {
      case 'park':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F2545B'; break;
      case 'monitor':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|A93F55'; break;
      case 'anihospi':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|8C5E58'; break;
      case 'kindergarten':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F7DBA7'; break;
      case 'warningplace':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|EEC643'; break;
      case 'parenting':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|01BAEF'; break;
      case 'motocharge':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|001427'; break;
      case 'obstacle':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFD700'; break;
      case 'vaccinehospi':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|BF211E'; break;
      case 'aedplace':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0978E8'; break;
      case 'oldagency':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|43C17E'; break;
      case 'gas':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|B28A74'; break;
      case 'firedepartment':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|9D59BA'; break;
      case 'plice':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|E56300'; break;
      case 'childrenRehabilitation':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|7AC1BD'; break;
      case 'speedmonitor':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4F3620'; break;
      case 'youbike':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|EF476F'; break;
      case 'freewifi':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|06D6A0'; break;
      case 'school':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFB46'; break;
      case 'a1':
        icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|26547C'; break;
    }

    return {
      icon: icon,
      visible: visible,
      fillColor: color,
      fillOpacity: 0.2,
      strokeColor: color,
      strokeWeight: 1,
      strokeOpacity: 0.8,
    };
  }


  /**
 * 圖層控制
 * @param node 
 * @param event 
 */
  public check(node, $event) {

    if (!node.data.checked) $('.gmap-loading').show();

    this.updateChildNodesCheckBox(node, $event.target.checked);
    this.updateParentNodesCheckBox(node.parent);

    // 圖層勾選清單
    this.layerData.forEach(obj => {
      if (obj.id == node.id) {
        obj.show = node.data.checked;
      } else if (obj.parent_id == node.id) {
        obj.show = node.data.checked;
      }
    });

  }




  // /**
  //  * 下拉式選單 - 年齡結構
  //  * @param city 
  //  */

  // public optionYearChange(city: any) {
  //   this.yearDataPercent = this.yearService.getStructurePercent(city, this.yearValueSlider);
  //   this.yearActiveSlider = ''; // 選擇縣市後才可以滑動 Slider

  //   // 扶養比
  //   this.yearCountPercent = Number(Number((Number(this.yearDataPercent[0]) + Number(this.yearDataPercent[2])) / this.yearDataPercent[1] * 100).toFixed(2));
  //   var old = Number(this.yearCountPercent / 10);
  //   this.yearCountOldMan = [];
  //   for (let i = 1; i <= old; i++) {
  //     this.yearCountOldMan.push(i);
  //   }
  //   var man = 10;
  //   this.yearCountMale = [];
  //   for (let j = 1; j <= man; j++) {
  //     this.yearCountMale.push(j);
  //   }
  // }

  // /**
  //  * 卷軸 - 年齡結構
  //  * @param no 
  //  */
  // public onYearSliderChange(no: number) {
  //   this.yearDataPercent = this.yearService.getStructurePercent(this.cityYearSelect, no);
  //   let _mon = no % 12 == 0 ? 12 : no % 12;
  //   let _year = no / 12 == 0 ? 2012 : Math.floor(no / 12) + 2012;
  //   this.yearDateSlider = `${_year}年 - ${_mon}月`;

  //   // 扶養比
  //   this.yearCountPercent = Number(Number((Number(this.yearDataPercent[0]) + Number(this.yearDataPercent[2])) / this.yearDataPercent[1] * 100).toFixed(2));
  //   var old = Number(this.yearCountPercent / 10);
  //   this.yearCountOldMan = [];
  //   for (let i = 1; i <= old; i++) {
  //     this.yearCountOldMan.push(i);
  //   }
  //   var man = 10;
  //   this.yearCountMale = [];
  //   for (let j = 1; j <= man; j++) {
  //     this.yearCountMale.push(j);
  //   }
  // }

  // /**
  //  * 下拉式選單 - 人口結構
  //  * @param city 
  //  */
  // public optionPopuChange(city: any) {
  //   this.popuDataPercent = this.popuService.getPopulationPercent(city, this.yearValueSlider)[0];
  //   this.popuActiveSlider = ''; // 選擇縣市後才可以滑動 Slider
  //   this.onPopuSliderChange(41);
  // }

  // /**
  //  * 卷軸 - 年齡結構
  //  * @param no 
  //  */
  // public onPopuSliderChange(no: number) {
  //   this.popuDataPercent = this.popuService.getPopulationPercent(this.cityPopuSelect, no);
  //   let _mon = no % 4 == 0 ? 4 : no % 4;
  //   let _year = no / 4 == 0 ? 2007 : Math.floor(no / 4) + 2007;
  //   this.popuDateSlider = `${_year}年 - 第${_mon}季`;

  //   let popuNow = Number(this.popuService.getPopulationPercent(this.cityPopuSelect, no)[0]);
  //   let popu1 = Number(this.popuService.getPopulationPercent(this.cityPopuSelect, no + 4)[0]);
  //   let popu2 = Number(this.popuService.getPopulationPercent(this.cityPopuSelect, no + 8)[0]);
  //   let popu3 = Number(this.popuService.getPopulationPercent(this.cityPopuSelect, no + 12)[0]);
  //   let popu4 = Number(this.popuService.getPopulationPercent(this.cityPopuSelect, no + 16)[0]);
  //   this.barChartData = [{ data: [popuNow, popu1, popu2, popu3, popu4], label: this.cityPopuSelect }];

  //   let bartmpLabels = [
  //     `${_year}-${_mon}(季)`,
  //     `${_year + 1}`,
  //     `${_year + 2}`,
  //     `${_year + 3}`,
  //     `${_year + 4}`,
  //   ];
  //   this.barChartLabels.length = 0;
  //   for (let i = 0; i < bartmpLabels.length; i++) {
  //     this.barChartLabels.push(bartmpLabels[i]);
  //   }
  // }


  /**
   * check 連動
   * @param node 
   * @param checked 
   */
  public updateChildNodesCheckBox(node, checked) {
    node.data.checked = checked;
    if (node.children) {
      node.children.forEach((child) => this.updateChildNodesCheckBox(child, checked));
    }
  }

  /**
   * check 連動
   * @param node 
   */
  public updateParentNodesCheckBox(node) {
    if (node && node.level > 0 && node.children) {
      let allChildChecked = true;
      let noChildChecked = true;

      for (let child of node.children) {
        if (!child.data.checked) {
          allChildChecked = false;
        } else if (child.data.checked) {
          noChildChecked = false;
        }
      }

      if (allChildChecked) {
        node.data.checked = true;
        node.data.indeterminate = false;
      } else if (noChildChecked) {
        node.data.checked = false;
        node.data.indeterminate = false;
      } else {
        node.data.checked = true;
        node.data.indeterminate = true;
      }
      this.updateParentNodesCheckBox(node.parent);
    }
  }
}
