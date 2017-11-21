/**
 * 圖層 - 砂石車
 */
export class Truck {
    public no: Number;
    public name: String;
    public memo: String;
    public path: Object;

    constructor(no, name, memo, path) {
        this.no = no;
        this.name = name;
        this.memo = memo;
        this.path = path;
    }
}