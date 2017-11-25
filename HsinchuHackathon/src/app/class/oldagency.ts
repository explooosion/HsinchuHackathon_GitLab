/**
 * 新竹市老人福利機構一覽表
 */
export class OldAgency {
    public group: String = 'oldagency';
    public name: String;
    public postcode: String;
    public addr: String;
    public tel: String;
    public lat: Number;
    public lng: Number;
    constructor(data) {
        const [name, postcode, addr, tel, lat, lng] = data;
        this.name = name;
        this.postcode = postcode;
        this.addr = addr;
        this.tel = tel;
        this.lat = lat;
        this.lng = lng;
    }

}