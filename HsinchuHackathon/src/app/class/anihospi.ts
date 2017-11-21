/**
 * 新竹市動物醫院
 */
export class AniHospi {
    public name: String;
    public doctor: String;
    public tel: String;
    public addr: String;
    public lat: Number;
    public lng: Number;

    constructor(name, doctor, tel, addr, lat, lng) {
        this.name = name;
        this.doctor = doctor;
        this.tel = tel;
        this.addr = addr;
        this.lat = lat;
        this.lng = lng;
    }
}