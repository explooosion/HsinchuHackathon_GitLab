/**
 * 新竹市監視器相關資訊
 */
export class FireDepartment {
    public name: String;
    public postcode: Number;
    public addr: String;
    public tel: String;
    public lat: Number;
    public lng: Number;

    constructor(name, postcode, addr, tel, lat, lng) {
        this.name = name;
        this.postcode = postcode;
        this.addr = addr;
        this.tel = tel;
        this.lat = lat;
        this.lng = lng;
    }
}