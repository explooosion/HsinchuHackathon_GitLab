/**
 * 婦幼安全警示地點
 */
export class WarningPlace {
    public name: String;
    public place: String;
    public branch: String;
    public lat: Number;
    public lng: Number;

    constructor(name, place, branch, lat, lng) {
        this.name = name;
        this.place = place;
        this.branch = branch;
        this.lat = lat;
        this.lng = lng;
    }
}