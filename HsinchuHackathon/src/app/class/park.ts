/**
 * 新竹市公有停車場相關資訊
 */
export class Park {
    public group: String = 'park';
    public name: String;
    public carCount: Number;
    public motoCount: Number;
    public addr: String;
    public serviceTime: String;
    public payWeek: String;
    public payWeekend: String;
    public payMode: String;
    public other: String;
    public monthMode: String;
    public memo: String;
    public lat: Number;
    public lng: Number;

    constructor(data) {
        const [name, carCount, motoCount, addr, serviceTime, payWeek, payWeekend, payMode, other, monthMode, memo, lat, lng] = data;
        this.name = name;
        this.carCount = carCount;
        this.motoCount = motoCount;
        this.addr = addr;
        this.serviceTime = serviceTime;
        this.payWeek = payWeek;
        this.payWeekend = payWeekend;
        this.payMode = payMode;
        this.other = other;
        this.monthMode = monthMode;
        this.memo = memo;
        this.lat = lat;
        this.lng = lng;
    }
}