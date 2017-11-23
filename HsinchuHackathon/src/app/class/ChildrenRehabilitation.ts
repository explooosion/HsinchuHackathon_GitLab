/**
 * 新竹市監視器相關資訊
 */
export class ChildrenRehabilitation {
    public name: String;
    public addr: String;
    public tel: String;
    public lat: Number;
    public lng: Number;

    constructor(name, addr, tel, lat, lng) {
        this.name = name;
        this.addr = addr;
        this.tel = tel;
        this.lat = lat;
        this.lng = lng;
    }
}