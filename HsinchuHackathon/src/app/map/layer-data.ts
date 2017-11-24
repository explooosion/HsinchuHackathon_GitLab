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

export const LayerData = [
    {
        parent_id: 1,
        id: 11,
        name: 'County',
        class: null,
        description: '新竹市',
        show: false,
        geojson: null,
        file: 'county',
        icon: null
    },
    {
        parent_id: 2,
        id: 21,
        name: 'Park',
        class: Park,
        description: '公有停車場',
        show: false,
        geojson: null,
        file: '新竹市公有停車場相關資訊.csv',
        icon: 'c.png'
    },
    {
        parent_id: 2,
        id: 22,
        name: 'AniHospi',
        class: AniHospi,
        description: '動物醫院',
        show: false,
        geojson: null,
        file: '新竹市動物醫院.csv',
        icon: 'hospi.png'
    },
    {
        parent_id: 2,
        id: 23,
        name: 'KinderGarten',
        class: KinderGarten,
        description: '幼兒園',
        show: false,
        geojson: null,
        file: '新竹市幼兒園名錄.csv',
        icon: 'temple.png'
    },
    {
        parent_id: 2,
        id: 24,
        name: 'Parenting',
        class: Parenting,
        description: '托嬰中心',
        show: false,
        geojson: null,
        file: '新竹市私立托嬰中心名冊.csv',
        icon: 'school.png'
    },
    {
        parent_id: 3,
        id: 31,
        name: 'Monitor',
        class: Monitor,
        description: '監視器',
        show: false,
        geojson: null,
        file: '監視器.csv',
        icon: 'secure.png'
    },
    {
        parent_id: 3,
        id: 32,
        name: 'WarningPlace',
        class: WarningPlace,
        description: '婦幼安全警示地點',
        show: false,
        geojson: null,
        file: '婦幼安全警示地點.csv',
        icon: 'burglary.png'
    }
];

