/**
 * 左側圖層控制
 */
export const LayerControl = [
    {
        id: 1,
        name: '地區圖層',
        isExpanded: true,
        children: [
            { id: 11, name: '新竹市' },
            // { id: 12, name: '鄉鎮市區界線' },
            /*{ id: 13, name: '村里界圖' }*/
        ]
    },
    {
        id: 2,
        name: '便利',
        isExpanded: true,
        children: [
            { id: 21, name: '公有停車場' },
            { id: 22, name: '動物醫院' },
            { id: 23, name: '幼兒園' },
            { id: 24, name: '托嬰中心' },
        ]
    }, {
        id: 3,
        name: '安全',
        isExpanded: true,
        children: [
            { id: 31, name: '監視器' },
            { id: 32, name: '婦幼安全警示地點' },
        ]
    }
];