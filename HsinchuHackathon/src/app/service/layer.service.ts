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
import { WarningPlace } from '../class/warningplace';
import { Parenting } from '../class/parenting';

@Injectable()
export class LayerService {

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
  public getPointerLayer(filename: String, csx: any) {
    return this.http.get(this.fileUrl + '/' + filename)
      .map((res) => { return this.FeaturesCreate(this.XmlParser(res, csx)); });
  }

  /**
   * 讀取線段
   * @param category 
   * @param city 
   */
  public getLineLayer(filename: String, csx: any) {
    return this.http.get(this.fileUrl + '/' + filename)
      .map((res) => { return this.XmlParser(res, csx); });
  }


  /**
   * XMl to Feature
   * @param res Response
   * @param clz lass
   */
  public XmlParser(res: Response, clz: any) {

    const filetype = res.url.toString().indexOf('json') > 0 ? 'json' : 'csv';

    let ResData = res['_body'] || '';
    let feature = [];

    if (filetype == 'json') {

      let json = JSON.parse(ResData);
      for (let i = 1; i < json.length; i++) {
        const _group = new clz(...json).group;
        json[i]['group'] = _group;
        feature.push(json[i]);
      }

    } else if (filetype == 'csv') {

      let allTextLines = ResData.split(/\r\n|\n/);
      let headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
          feature.push(new clz(data));
        }
      }
    }

    return feature;
  }

  /**
   * 建立 Feature
   * @param arr 資料陣列
   * @param cs  資料類別
   */
  public FeaturesCreate(arr: Array<any>) {

    let geo = new GeoJson();
    arr.forEach((element) => {
      geo.features.push(
        new Features(
          element,
          new Geometry('Point', [Number(element.lng), Number(element.lat)])
        )
      );
    });
    return JSON.parse(JSON.stringify(geo));
  }

}
