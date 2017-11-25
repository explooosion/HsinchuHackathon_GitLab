/**
 * 新竹市AED心臟電擊器設置地點
 */
export class AEDPlace {
    public group: String = 'aedplace';
    public name: String;
    public addr: String;
    public type: String;
    public place: String;
    public manager: String;
    public tel: String;
    public setdate: String;
    public warrantydate: String;
    public lat: Number;
    public lng: Number;
    constructor(data) {
        const [name, addr, type, place, manager, tel, setdate, warrantydate, lat, lng] = data;
        this.name = name;
        this.addr = addr;
        this.type = type;
        this.place = place;
        this.manager = manager;
        this.tel = tel;
        this.setdate = setdate;
        this.warrantydate = warrantydate;
        this.lat = lat;
        this.lng = lng;
    }
}