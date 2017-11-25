/**
 * 新竹市預防接種合約院所名冊
 */
export class VaccineHospi {
    public group: String = 'vaccinehospi';
    public name: String;
    public code: String;
    public tel: String;
    public addr: String;
    public lat: Number;
    public lng: Number;
    constructor(data) {
        const [name, code, tel, addr, lat, lng] = data;
        this.name == name;
        this.code = code;
        this.tel = tel;
        this.addr = addr;
        this.lat = lat;
        this.lng = lng;
    }
}