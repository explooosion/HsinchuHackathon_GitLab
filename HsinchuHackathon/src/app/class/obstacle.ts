export class Obstacle {
    public group: String = 'obstacle';
    public name: String;
    public principal: String;
    public telname: String;
    public tel: String;
    public addr: String;
    public lat: Number;
    public lng: Number;
    constructor(data) {
        const [name, principal, telname, tel, addr, lat, lng] = data;
        this.name = name;
        this.principal = principal;
        this.telname = telname;
        this.tel = tel;
        this.addr = addr;
        this.lat = lat;
        this.lng = lng;
    }
}