/**
 * 新竹市監視器相關資訊
 */
export class Monitor {
    public no: Number;
    public name: String;
    public lat: Number;
    public lng: Number;

    constructor(no, name, lat, lng) {
        this.no = no;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}