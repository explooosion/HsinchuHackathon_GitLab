import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GeoJson, Features, Geometry } from '../class/geo-json';

import { Truck } from '../class/truck';
import { Park } from '../class/park';
import { Monitor } from '../class/monitor';
import { AniHospi } from '../class/anihospi';
import { KinderGarten } from '../class/kindergarten';

@Injectable()
export class LayerService {

  // private truck: Truck;
  // private park: Park;
  // private monitor: Monitor;
  // private anihospi: AniHospi;

  private truckArr: Truck[];
  private parkArr: Park[];
  private monitorArr: Monitor[];
  private anihospiArr: AniHospi[];
  private kindergartenArr: KinderGarten[];

  private fileUrl: string = 'assets/layer/';
  private fileExtend: string[] = ['.csv', '.json'];

  private countyUrl: string = 'assets/layer/map/county.json';
  private townUrl: string = 'assets/layer/map/town.json';

  // SHP > GEO
  // npm install mapshaper -g
  // mapshaper TOWN_MOI_1060525.shp -o encoding=big5 format=geojson TOWN_MOI_1060525.json
  constructor(private http: Http) { }

  /**
   * 讀取地區 County JSON（GeoJson）
   */
  public getGeoJsonLayer(type: string) {
    return this.http.get(this.fileUrl + 'map/' + type + this.fileExtend[1])
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 讀取圖層
   * @param category 
   * @param city 
   */
  public getPointerLayer(filename: String) {

    return this.http.get(this.fileUrl + '/' + filename)
      .map(
      (res) => {
        switch (filename) {
          case 'truck':
            return this.saveTruck(res);
          case '新竹市公有停車場相關資訊.csv':
            return this.savePark(res);
          case '監視器.csv':
            return this.saveMonitor(res);
          case '新竹市動物醫院.csv':
            return this.saveAniHospi(res);
          case '新竹市幼兒園名錄.csv':
            return this.saveKinderGarten(res);
        }
      }
      );
  }

  /**
   * Layer - 新竹市公有停車場相關資訊
   * @param res 
   */
  public savePark(res: Response) {

    let csvData = res['_body'] || '';

    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');

    let lines = [];
    for (let i = 1; i < allTextLines.length; i++) {

      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {

        lines.push(
          new Park(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6],
            data[7],
            data[8],
            data[9],
            data[10],
            data[11],
            data[12],
          ));
      }
      this.parkArr = lines;

    }

    let geo = new GeoJson();

    this.parkArr.forEach(element => {
      geo.features.push(
        new Features(
          {
            group: 'park',
            name: element.name,
            address: element.addr,
            lat: Number(element.lat),
            lng: Number(element.lng),
          },
          new Geometry('Point', [Number(element.lng), Number(element.lat)])
        )
      );
    });

    return JSON.parse(JSON.stringify(geo));
  }


  /**
   * Layer - 新竹市公有停車場相關資訊
   * @param res 
   */
  public saveMonitor(res: Response) {

    let csvData = res['_body'] || '';

    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');

    let lines = [];
    for (let i = 1; i < allTextLines.length; i++) {

      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {

        lines.push(new Monitor(
          data[0],
          data[1],
          data[2],
          data[3]
        ));
      }
      this.monitorArr = lines;

    }

    let geo = new GeoJson();

    this.monitorArr.forEach(element => {
      geo.features.push(
        new Features(
          {
            group: 'monitor',
            no: element.no,
            name: element.name,
            lat: Number(element.lat),
            lng: Number(element.lng),
          },
          new Geometry('Point', [Number(element.lng), Number(element.lat)])
        )
      );
    });

    return JSON.parse(JSON.stringify(geo));
  }





  /**
   * Layer - 新竹市動物醫院
   * @param res 
   */
  public saveAniHospi(res: Response) {

    let csvData = res['_body'] || '';

    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');

    let lines = [];
    for (let i = 1; i < allTextLines.length; i++) {

      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {

        lines.push(new AniHospi(
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5]
        ));
      }
      this.anihospiArr = lines;

    }

    let geo = new GeoJson();

    this.anihospiArr.forEach(element => {
      geo.features.push(
        new Features(
          {
            group: 'anihospi',
            name: element.name,
            doctor: element.doctor,
            tel: element.tel,
            addr: element.addr,
            lat: Number(element.lat),
            lng: Number(element.lng),
          },
          new Geometry('Point', [Number(element.lng), Number(element.lat)])
        )
      );
    });

    return JSON.parse(JSON.stringify(geo));
  }







  /**
   * Layer - 新竹市幼兒園名錄
   * @param res 
   */
  public saveKinderGarten(res: Response) {

    let csvData = res['_body'] || '';

    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');

    let lines = [];
    for (let i = 1; i < allTextLines.length; i++) {

      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {

        lines.push(new KinderGarten(
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9]
        ));
      }
      this.kindergartenArr = lines;

    }

    let geo = new GeoJson();

    this.kindergartenArr.forEach(element => {
      geo.features.push(
        new Features(
          {
            group: 'kindergarten',
            type: element.type,
            name: element.name,
            found: element.found,
            id: element.id,
            director: element.director,
            tel: element.tel,
            addr: element.addr,
            total: element.total,
            lat: Number(element.lat),
            lng: Number(element.lng),
          },
          new Geometry('Point', [Number(element.lng), Number(element.lat)])
        )
      );
    });

    return JSON.parse(JSON.stringify(geo));
  }





  /**
   * Layer - 砂石車路徑
   * @param res 
   */
  public saveTruck(res: Response) {
    console.log(res);

    // let csvData = res['_body'] || '';
    // let allTextLines = csvData.split(/\r\n|\n/);
    // let headers = allTextLines[0].split(',');

    // let lines = [];
    // for (let i = 1; i < allTextLines.length; i++) {

    //   let data = allTextLines[i].split(',');
    //   if (data.length == headers.length) {

    //     this.temple = new Temple(
    //       data[0],  // name
    //       data[1],  // lordgod
    //       data[2],  // area
    //       data[3],  // address
    //       data[4],  // lat
    //       data[5]   // lng
    //     );

    //     lines.push(this.temple);
    //   }
    //   this.truckArr = lines;

    // }
    return this.truckArr;
  }

}
