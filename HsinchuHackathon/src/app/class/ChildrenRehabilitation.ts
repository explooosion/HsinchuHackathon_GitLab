/**
 * 桃竹苗區健保特約兒童復健療育單位
 */
export class ChildrenRehabilitation {
    public group: String = 'childrenRehabilitation';
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