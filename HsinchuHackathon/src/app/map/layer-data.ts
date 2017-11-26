/**
 * 圖層清單
 */

import { Truck } from '../class/truck';
import { Park } from '../class/park';
import { Monitor } from '../class/monitor';
import { AniHospi } from '../class/anihospi';
import { KinderGarten } from '../class/kindergarten';
import { WarningPlace } from '../class/warningplace';
import { Parenting } from '../class/parenting';
import { MotoCharge } from '../class/motocharge';
import { Obstacle } from '../class/obstacle';
import { VaccineHospi } from '../class/vaccinehospi';
import { AEDPlace } from '../class/aedplace';
import { OldAgency } from '../class/oldagency';
import { Gas } from '../class/gas';
import { FireDepartment } from '../class/firedepartment';
import { PliceDepartment } from '../class/policedepartment';
import { ChildrenRehabilitation } from '../class/childrenrehabilitation';
import { SpeedMonitor } from '../class/speedmonitor';
import { YouBike } from '../class/youbike';
import { FreeWifi } from '../class/freeWifi';
import { School } from '../class/school';
import { A1 } from '../class/a1';

export const LayerData = [
    {
        parent_id: 1,
        id: 101,
        name: 'County',
        class: null,
        description: '新竹市',
        show: false,
        geojson: null,
        file: 'county',
        icon: null,
        group: 'geo'
    },
    {
        parent_id: 2,
        id: 201,
        name: 'Park',
        class: Park,
        description: '公有停車場',
        show: false,
        geojson: null,
        file: '新竹市公有停車場相關資訊.csv',
        icon: 'c.png',
        group: 'traffic'
    },
    {
        parent_id: 2,
        id: 202,
        name: 'AniHospi',
        class: AniHospi,
        description: '動物醫院',
        show: false,
        geojson: null,
        file: '新竹市動物醫院.csv',
        icon: 'hospi.png',
        group: 'hospital'
    },
    {
        parent_id: 2,
        id: 203,
        name: 'KinderGarten',
        class: KinderGarten,
        description: '幼兒園',
        show: false,
        geojson: null,
        file: '新竹市幼兒園名錄.csv',
        icon: 'temple.png',
        group: 'edu'
    },
    {
        parent_id: 2,
        id: 204,
        name: 'Parenting',
        class: Parenting,
        description: '托嬰中心',
        show: false,
        geojson: null,
        file: '新竹市私立托嬰中心名冊.csv',
        icon: 'school.png',
        group: 'edu'
    },
    {
        parent_id: 2,
        id: 205,
        name: 'MotoCharge',
        class: MotoCharge,
        description: '電動機車充電區',
        show: false,
        geojson: null,
        file: '新竹市電動機車充電站.csv',
        icon: 'a.png',
        group: 'traffic'
    },
    {
        parent_id: 2,
        id: 206,
        name: 'Obstacle',
        class: Obstacle,
        description: '身心障礙福利機構名冊',
        show: false,
        geojson: null,
        file: '新竹市身心障礙福利機構名冊.csv',
        icon: 'a.png',
        group: 'hospital'
    },
    {
        parent_id: 2,
        id: 207,
        name: 'VaccineHospi',
        class: VaccineHospi,
        description: '預防接種合約院所名冊',
        show: false,
        geojson: null,
        file: '新竹市預防接種合約院所名冊.csv',
        icon: 'a.png',
        group: 'hospital'
    }, {
        parent_id: 2,
        id: 208,
        name: 'AEDPlace',
        class: AEDPlace,
        description: 'AED心臟電擊器設置地點',
        show: false,
        geojson: null,
        file: '新竹市AED心臟電擊器設置地點.csv',
        icon: 'a.png',
        group: 'hospital'
    },
    {
        parent_id: 2,
        id: 209,
        name: 'OldAgency',
        class: OldAgency,
        description: '新竹市老人福利機構一覽表',
        show: false,
        geojson: null,
        file: '新竹市老人福利機構一覽表.json',
        icon: 'a.png',
        group: 'hospital'
    },
    {
        parent_id: 2,
        id: 210,
        name: 'Gas',
        class: Gas,
        description: '新竹市加油(氣)站',
        show: false,
        geojson: null,
        file: '新竹市加油(氣)站.csv',
        icon: 'c.png',
        group: 'traffic'
    },
    {
        parent_id: 2,
        id: 211,
        name: 'ChildrenRehabilitation',
        class: ChildrenRehabilitation,
        description: '桃竹苗區健保特約兒童復健療育單位',
        show: false,
        geojson: null,
        file: '桃竹苗區健保特約兒童復健療育單位.json',
        icon: 'c.png',
        group: 'hospital'
    },
    {
        parent_id: 2,
        id: 212,
        name: 'SpeedMonitor',
        class: SpeedMonitor,
        description: '測速照相',
        show: false,
        geojson: null,
        file: '測速照相.json',
        icon: 'c.png',
        group: 'traffic'
    },
    {
        parent_id: 2,
        id: 213,
        name: 'YouBike',
        class: YouBike,
        description: 'YouBike',
        show: false,
        geojson: null,
        file: 'YouBike.json',
        icon: 'c.png',
        group: 'traffic'
    },
    {
        parent_id: 2,
        id: 214,
        name: 'FreeWifi',
        class: FreeWifi,
        description: 'FreeWifi',
        show: false,
        geojson: null,
        file: '免費WIFI.json',
        icon: 'c.png',
        group: 'live'
    },
    {
        parent_id: 2,
        id: 215,
        name: 'School',
        class: School,
        description: 'FrschooleeWifi',
        show: false,
        geojson: null,
        file: '國高中學校.json',
        icon: 'c.png',
        group: 'edu'
    },
    // {
    //     parent_id: 3,
    //     id: 301,
    //     name: 'Monitor',
    //     class: Monitor,
    //     description: '監視器',
    //     show: false,
    //     geojson: null,
    //     file: '監視器.csv',
    //     icon: 'secure.png'
    // },
    {
        parent_id: 3,
        id: 302,
        name: 'WarningPlace',
        class: WarningPlace,
        description: '婦幼安全警示地點',
        show: false,
        geojson: null,
        file: '婦幼安全警示地點.csv',
        icon: 'burglary.png',
        group: 'crime'
    },
    {
        parent_id: 3,
        id: 303,
        name: 'FireDepartment',
        class: FireDepartment,
        description: '消防局',
        show: false,
        geojson: null,
        file: '消防局.json',
        icon: 'burglary.png',
        group: 'police'
    },
    {
        parent_id: 3,
        id: 304,
        name: 'PliceDepartment',
        class: PliceDepartment,
        description: '警察局',
        show: false,
        geojson: null,
        file: '警察局.json',
        icon: 'burglary.png',
        group: 'police'
    },
    {
        parent_id: 3,
        id: 305,
        name: 'A1',
        class: A1,
        description: 'A1交通事故',
        show: false,
        geojson: null,
        file: 'A1.json',
        icon: 'a.png',
        group: 'traffic'
    },
    // {
    //     parent_id: 4,
    //     id: 401,
    //     name: 'Truck',
    //     class: Truck,
    //     description: '砂石車不須經過申請即可通行之路線',
    //     show: false,
    //     geojson: null,
    //     file: '砂石車不須經過申請即可通行之路線.json',
    //     icon: 'a.png'
    // }
];

