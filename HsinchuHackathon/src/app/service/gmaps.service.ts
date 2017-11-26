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
