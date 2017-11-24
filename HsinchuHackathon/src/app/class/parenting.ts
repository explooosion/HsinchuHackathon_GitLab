/**
 * 托嬰中心
 */
export class Parenting {
    public group: String = 'parenting';
    public name: String;
    public president: String;
    public addr: String;
    public tel: String;
    public lat: Number;
    public lng: Number;

    constructor(data) {
        const [name, president, addr, tel, lat, lng] = data;
        this.name = name;
        this.president = president;
        this.addr = addr;
        this.tel = tel;
        this.lat = lat;
        this.lng = lng;
    }
}