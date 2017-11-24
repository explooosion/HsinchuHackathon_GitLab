/**
 * 新竹市動物醫院
 */
export class AniHospi {
    public group = 'anihospi';
    public name: String;
    public doctor: String;
    public tel: String;
    public addr: String;
    public lat: Number;
    public lng: Number;

    constructor(data) {
        const [name, doctor, tel, addr, lat, lng] = data;
        this.name = name;
        this.doctor = doctor;
        this.tel = tel;
        this.addr = addr;
        this.lat = lat;
        this.lng = lng;
    }
}