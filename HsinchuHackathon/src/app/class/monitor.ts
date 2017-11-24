/**
 * 新竹市監視器相關資訊
 */
export class Monitor {
    public group: String = 'monitor';
    public no: Number;
    public name: String;
    public lat: Number;
    public lng: Number;

    constructor(data) {
        const [no, name, lat, lng] = data;
        this.no = no;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}