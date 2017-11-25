/**
 * 電動東機車充電區
 */
export class MotoCharge {
    public group: String = 'motocharge';
    public name: String;
    public addr: String;
    public count: String;
    public lat: Number;
    public lng: Number;

    constructor(data) {
        const [name, addr, count, lat, lng] = data;
        this.name = name;
        this.addr = addr;
        this.count = count;
        this.lat = lat;
        this.lng = lng;
    }
}