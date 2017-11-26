import { Directive, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Marker } from '../class/marker';
declare var google: any;

@Directive({
  selector: 'agm-directions'
})
export class AgmDirectionsDirective {
  @Input() origin: Marker;
  @Input() destination: Marker;
  @Input() waypoints: any; // 必經路線
  @Input() travelMode: String;  // 移動方式

  public directionsService = new google.maps.DirectionsService;
  public directionsDisplay;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }
  ngOnInit() {
    console.log(this.waypoints);
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      // var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      this.directionsService.route({
        origin: { lat: this.origin.lat, lng: this.origin.lng },
        destination: { lat: this.destination.lat, lng: this.destination.lng },
        waypoints: this.waypoints
        // || [
        //   {
        //     location: { lat: 24.795448, lng: this.origin.lng },
        //     stopover: true // 標記AB上去,否則會出現白點
        //   },
        //   {
        //     location: { lat: 24.795114, lng: 120.979221 },
        //     stopover: true // 標記AB上去,否則會出現白點
        //   }
        // ]
        ,
        optimizeWaypoints: true,
        travelMode: this.travelMode || 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.directionsDisplay = directionsDisplay;
        } else {
          // window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.origin.firstChange == false) {
      this.origin = changes.origin.currentValue;
      this.destination = changes.destination.currentValue;
      this.gmapsApi.getNativeMap().then(map => {
        let directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        this.directionsService.route({
          origin: { lat: this.origin.lat, lng: this.origin.lng },
          destination: { lat: this.destination.lat, lng: this.destination.lng },
          waypoints: this.waypoints || []
          // || [
          //   {
          //     location: { lat: 24.795448, lng: this.origin.lng },
          //     stopover: true // 標記AB上去,否則會出現白點
          //   },
          //   {
          //     location: { lat: 24.795114, lng: 120.979221 },
          //     stopover: true // 標記AB上去,否則會出現白點
          //   }
          // ]
          ,
          optimizeWaypoints: true,
          travelMode: this.travelMode || 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            // window.alert('Directions request failed due to ' + status);
          }
        });

      });
    }

  }

}
