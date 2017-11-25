export class Gas {
    public group: String = 'gas';
    public name: String;
    public manager: String;
    public addr: String;
    public date: String;
    public lat: Number;
    public lng: Number;
    constructor(data) {
        const [name, manager, addr, date, lat, lng] = data;
        this.name = name;
        this.manager = manager;
        this.addr = addr;
        this.date = date;
        this.lat = lat;
        this.lng = lng;
    }
}