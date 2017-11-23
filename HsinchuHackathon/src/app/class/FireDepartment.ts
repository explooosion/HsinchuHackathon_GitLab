/**
 * 新竹市監視器相關資訊
 */
export class FireDepartment {
    public name: String;
    public lat: Number;
    public lng: Number;

    constructor(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}