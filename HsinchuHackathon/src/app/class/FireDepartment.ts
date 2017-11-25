/**
 * 消防局
 */
export class FireDepartment {
    public group: String = 'firedepartment';
    public name: String;
    public lat: Number;
    public lng: Number;

    constructor(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}