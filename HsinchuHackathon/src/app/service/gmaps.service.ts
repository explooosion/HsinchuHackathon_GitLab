import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';

declare var google: any;

@Injectable()
export class GMapsService extends GoogleMapsAPIWrapper {
  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  /**
   * 地址轉換經緯度
   * @param address 
   */
  getLatLan(address: string) {
    console.log('Getting Address - ', address);
    let geocoder = new google.maps.Geocoder();

    return Observable.create(observer => {
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }

  /**
   * 兩點座標距離(公尺)
   * @param point1 
   * @param point2 
   */
  getDistance(point1: any[], point2: any[]) {

    let p1 = new google.maps.LatLng(point1[0], point1[1]);
    let p2 = new google.maps.LatLng(point2[0], point2[1]);
    let dis = null;

    return Observable.create(observer => {
      dis = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
      if (typeof (dis) != null) {
        observer.next(dis);
        observer.complete();
      } else {
        console.log('Error - can not get distance');
        observer.next({});
        observer.complete();
      }
    })
  }


  /**
   * 樣本生成
   */
  public generatePoint(polygon) {

    // 新竹市南寮舊漁港
    // 24.8498061 最高緯度
    // 120.92900280000003

    // 新竹崎頂隧道文化公園
    // 24.7295481  最低緯度
    // 120.87860639999997 最小精度

    // 新竹柯子湖路雅池
    // 24.7588673
    // 121.03188699999998 最大精度

    // 歸納範圍
    // [24.7295481~24.8498061]
    // [120.87860639999997~121.03188699999998]

    let glat = (Math.random() * (24.8498061 - 24.7295481) + 24.7295481).toFixed(7);
    let glng = (Math.random() * (121.03188699999998 - 120.87860639999997) + 120.87860639999997).toFixed(14);

    let isIn = false;
    let limitCrash = 3000;
    while (isIn == false || limitCrash < 0) {
      limitCrash--;
      isIn = this.getContainsLocation({ lat: glat, lng: glng }, polygon);
    }

    return { lat: glat, lng: glng };
  }

  /**
   * 判斷點位是否在指定地域
   */
  public getContainsLocation(point, polygon) {

    let poly = [];

    polygon.forEach(p => {
      poly.push({
        lat: p[1],
        lng: p[0]
      });
    });

    let res = google.maps.geometry.poly.containsLocation(
      new google.maps.LatLng(point.lat, point.lng),
      new google.maps.Polygon({ paths: poly }
      ));

    console.log(res);

    return res;
  }

  /**
   * 繪製旅途建議路線
   * @param point1 起點
   * @param point2 終點
   */
  public getDirections(point1: any, point2: any) {

    let p1 = new google.maps.LatLng(point1[0], point1[1]);
    let p2 = new google.maps.LatLng(point2[0], point2[1]);

    return Observable.create(observer => {
      new google.maps.DirectionsService().route({
        origin: p1,
        destination: p2,
        travelMode: google.maps.TravelMode['DRIVING']
      }, function (response, status) {
        if (status == 'OK') {
          if (typeof (response) != null) {
            new google.maps.DirectionsRenderer().setDirections(response);
            observer.next(response);
            observer.complete();
          } else {
            observer.next({});
            observer.complete();
          }
        }
      });


    });
  }



}
