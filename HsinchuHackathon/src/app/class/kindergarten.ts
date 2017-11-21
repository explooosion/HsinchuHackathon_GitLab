/**
 * 幼兒園名錄
 */
export class KinderGarten {
    public type: String;
    public name: String;
    public found: String;
    public id: String;
    public director: String;
    public tel: String;
    public addr: String;
    public total: Number;
    public lat: Number;
    public lng: Number;

    constructor(type, name, found, id, director, tel, addr, total, lat, lng) {
        this.type = type;
        this.name = name;
        this.found = found;
        this.id = id;
        this.director = director;
        this.tel = tel;
        this.addr = addr;
        this.total = total;
        this.lat = lat;
        this.lng = lng;
    }
}