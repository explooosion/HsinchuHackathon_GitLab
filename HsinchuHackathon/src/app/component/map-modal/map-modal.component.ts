import { Component, Input, NgZone, OnInit, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { GMapsService } from '../../service/gmaps.service';
import { LayerService } from '../../service/layer.service';

import { YearStructureService } from '../../service/year-structure.service';
import { PopulationStructureService } from '../../service/population-structure.service';

import { Marker } from '../../class/marker';

import { MapsAPILoader } from '@agm/core';

import { Park } from '../../class/park';



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
  lat: number = 24.799448;
  lng: number = 120.979021;
  zoom: number = 16;
  radius: number = 500; // 半徑(公尺)
  color: string = '#aa93d6';
  addr: string = "新竹市體育館";

  // 分析統計
  countPark: number = 17;

  // 圖層資料
  geoLayerCounty: Object = null;
  geoLayerPark: Object = null;
  geoLayerMonitor: Object = null;

  // 圖層是否顯示
  geoLayerShowCounty: boolean = false;
  geoLayerShowPark: boolean = false;
  geoLayerShowMonitor: boolean = false;

  // 點位訊息小窗
  infowinLat: number = 23.458987;
  infowinLng: number = 120.29294219999997;
  infowinMsg: string[] = ['', '', ''];
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

  // 圖層清單
  nodes = [
    {
      id: 1,
      name: '地區圖層',
      isExpanded: true,
      children: [
        { id: 11, name: '新竹市' },
        // { id: 12, name: '鄉鎮市區界線' },
        /*{ id: 13, name: '村里界圖' }*/
      ]
    },
    {
      id: 2,
      name: '便利',
      isExpanded: true,
      children: [
        { id: 21, name: '公有停車場' },
      ]
    }, {
      id: 3,
      name: '安全',
      isExpanded: true,
      children: [
        { id: 31, name: '監視器' },
      ]
    }
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
      .subscribe(result => this.geoLayerCounty = result);

    await this.layerService.getPointerLayer('新竹市公有停車場相關資訊.csv')
      .subscribe(result => this.geoLayerPark = result);

    await this.layerService.getPointerLayer('監視器.csv')
      .subscribe(result => this.geoLayerMonitor = result);

  }

  /**
   * 座標點選 EVENT
   * @param e 
   */
  public geoLayerClick(e) {

    let feature = e.feature.f;
    this.infowinLat = feature.lat + 0.00008;
    this.infowinLng = feature.lng;
    this.infowinMsg[0] = feature.name;
    this.infowinMsg[1] = feature.address;

    if (feature.level) {
      this.infowinMsg[2] = `長照等級：${feature.level}`;
    } else if (feature.date) {
      this.infowinMsg[2] = `事件時間：${feature.date}`;
    } else if (feature.lordgod) {
      this.infowinMsg[2] = `寺廟主神：${feature.lordgod}`;
    } else {
      this.infowinMsg[2] = null;
    }
    this.infowinIsOpen = true;
  }

  /**
   * 環域分析 EVENT
   */
  public analyticsPointer() {

    this.countPark = 0;

    this.geoLayerPark['features'].forEach(async (element) => {
      let lat = Number(element.geometry.coordinates[1]);
      let lng = Number(element.geometry.coordinates[0]);
      let p2 = [lat, lng];
      await this.gmapService.getDistance([this.lat, this.lng], p2)
        .subscribe(
        result => {
          this.zone.run(() => {
            if (result <= this.radius) {
              this.countPark++;
            }
          });
        });
    });


    // 分析完後要更新圖表 - 區域社福評估
    this.radarChartData = [
      {
        data: [
          this.countPark],
        label: this.addr
      }
    ];

  }

  /**
   * 繪製圓形區域 EVENT
   */
  public async setCircle() {

    await this.gmapService.getLatLan(this.addr)
      .subscribe(
      result => {
        //必須使用zone 觀察整個 view 否則會導致延遲
        this.zone.run(() => {
          this.lat = result.lat();
          this.lng = result.lng();
          this.saveMarker(result.lat(), result.lng());
          this.mapsAPILoader.load().then(() => {
            this.bounds = new window['google'].maps.LatLngBounds(new window['google'].maps.LatLng(this.lat, this.lng));
          }
          )

        });
        this.zoom = 10;
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
  public saveMarker(lat: number, lng: number) {
    this.marker.lat = lat;
    this.marker.lng = lng;
  }

  /**
   * 圖層樣式
   * @param feature 
   */
  public styleLayer(feature) {

    console.log(feature);
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
        icon = 'assets/images/c.png';
        break;
      case 'monitor':
        icon = 'assets/images/secure.png';
        break;
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
   * 下拉式選單 - 年齡結構
   * @param city 
   */

  public optionYearChange(city: any) {
    this.yearDataPercent = this.yearService.getStructurePercent(city, this.yearValueSlider);
    this.yearActiveSlider = ''; // 選擇縣市後才可以滑動 Slider

    // 扶養比
    this.yearCountPercent = Number(Number((Number(this.yearDataPercent[0]) + Number(this.yearDataPercent[2])) / this.yearDataPercent[1] * 100).toFixed(2));
    var old = Number(this.yearCountPercent / 10);
    this.yearCountOldMan = [];
    for (let i = 1; i <= old; i++) {
      this.yearCountOldMan.push(i);
    }
    var man = 10;
    this.yearCountMale = [];
    for (let j = 1; j <= man; j++) {
      this.yearCountMale.push(j);
    }
  }

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
   * 圖層控制
   * @param node 
   * @param event 
   */
  public check(node, $event) {

    if (!node.data.checked) $('.gmap-loading').show();

    this.updateChildNodesCheckBox(node, $event.target.checked);
    this.updateParentNodesCheckBox(node.parent);

    switch (node.id) {
      case 1:
        if (node.data.checked) {
          this.geoLayerShowCounty = true;
        } else {
          this.geoLayerShowCounty = false;
        }
        break;
      case 11:
        this.geoLayerShowCounty = !this.geoLayerShowCounty;
        break;
      case 2:
        if (node.data.checked) {
          this.geoLayerShowPark = true;
        } else {
          this.geoLayerShowPark = false;
        }
        break;
      case 21:
        this.geoLayerShowPark = !this.geoLayerShowPark;
        break;
      case 3:
        if (node.data.checked) {
          this.geoLayerShowMonitor = true;
        } else {
          this.geoLayerShowMonitor = false;
        }
        break;
      case 31:
        this.geoLayerShowMonitor = !this.geoLayerShowMonitor;
        break;
    }
  }

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
