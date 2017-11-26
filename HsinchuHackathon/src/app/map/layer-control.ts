/**
 * 左側圖層控制
 */
export const LayerControl = [
    {
        id: 1,
        name: '地區圖層',
        isExpanded: true,
        children: [
            { id: 101, name: '新竹市' },
            // { id: 12, name: '鄉鎮市區界線' },
            /*{ id: 13, name: '村里界圖' }*/
        ]
    },
    {
        id: 2,
        name: '便利',
        isExpanded: false,
        children: [
            { id: 201, name: '公有停車場' },
            { id: 202, name: '動物醫院' },
            { id: 203, name: '幼兒園' },
            { id: 204, name: '托嬰中心' },
            { id: 205, name: '電動機車充電區' },
            { id: 206, name: '身心障礙福利機構' },
            { id: 207, name: '預防接種合約院所' },
            { id: 208, name: 'AED設置地點' },
            { id: 209, name: '老人福利機構' },
            { id: 210, name: '加油站' },
            { id: 211, name: '健保特約兒童復健' },
            { id: 212, name: '違規照相設置地點' },
            { id: 213, name: 'YouBike' },
            { id: 214, name: 'FreeWifi' },
            { id: 215, name: '市立國中高中' },
        ]
    },
    {
        id: 3,
        name: '安全',
        isExpanded: true,
        children: [
            // { id: 301, name: '監視器' },
            { id: 302, name: '婦幼安全警示地點' },
            { id: 303, name: '消防局' },
            { id: 304, name: '警察局' },
            { id: 305, name: 'A1交通事故' },
        ]
    },
    // {
    //     id: 4,
    //     name: '路線',
    //     isExpanded: true,
    //     children: [
    //         { id: 401, name: '砂石車不須通行路線' },
    //     ]
    // }
];