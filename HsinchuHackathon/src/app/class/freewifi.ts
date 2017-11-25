/**
 * 免費WIFI
 */
export class FreeWifi {
    public group: String = 'freewifi';
    public name: String;
    public addr: String;
    public lat: Number;
    public lng: Number;

    constructor(name, addr, lat, lng) {
        this.name = name;
        this.addr = addr;
        this.lat = lat;
        this.lng = lng;
    }
}