/**
 * 婦幼安全警示地點
 */
export class WarningPlace {
    public group: String = 'warningplace';
    public name: String;
    public place: String;
    public branch: String;
    public lat: Number;
    public lng: Number;
    public lat2: Number;
    public lng2: Number;

    constructor(data) {
        const [name, place, branch, lat, lng, lat2, lng2] = data;
        this.name = name;
        this.place = place;
        this.branch = branch;
        this.lat = lat;
        this.lng = lng;
        this.lat2 = lat2;
        this.lng2 = lng2;
    }
}