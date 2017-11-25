/**
 * 新竹市立國高中通訊資料
 */
export class School {
    public group: String = 'school';
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