import http from '../utils/http.js'


// 获取数据
const getData = (type) => {
    return http({
        url: '',
        method: 'get',
        data: {
            type
        }
    })
}

// 获取热力图数据
const getHeatMapData = () => {
    return http({
        url: '',
        method: 'get',
    })
}

// 获取散点图数据
const getScatterData = () => {
    return http({
        url: '',
        method: 'get',
    })
}

// 获取聚类数据
const getClusterData = (type) => {
    return http({
        url: '',
        method: 'get',
        data: {
            type
        }
    })
}

// 获取分类树
const getTreeData = () => {
    return http({
        url: '',
        method: 'get',
    })
}

// 获取回归
const getRegressionData = (type) => {
    return http({
        url: '',
        method: 'get',
        data: {
            type
        }
    })
}
