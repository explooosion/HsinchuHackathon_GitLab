/**
 * 圖層 - 砂石車
 */
export class Truck {
    public group: String = 'truck';
    public no: Number;
    public name: String;
    public memo: String;
    public path: Object;

    constructor(data) {
        const [no, name, memo, path] = data;
        this.no = no;
        this.name = name;
        this.memo = memo;
        this.path = path;
    }
}