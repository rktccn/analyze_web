import http from '../utils/https.js'


// // 获取数据
export const getOriginData = (type) => {
    return http({
        url: '/get_origin_data',
        method: 'get',
        params: {
            type
        }
    })
}
//
// // 获取热力图数据
export const getHeatMapData = (confidence, support) => {
    return http({
        url: '/get_association_data',
        method: 'get',
        params: {
            confidence,
            support
        }
    })
}
//
// // 获取散点图数据
export const getScatterData = (scatterType) => {
    console.log(scatterType)
    return http({
        url: '/get_scatter_data',
        method: 'get',
        params: {
            scatterType
        }
    })
}
//
// // 获取聚类数据
export const getClusterData = (k_value = 3, clusterType = 0, scatterType = 0) => {
    return http({
        url: '/get_cluster_data',
        method: 'get',
        params: {
            k_value,
            clusterType,
            scatterType
        }
    })
}
//
// 获取分类树
export const getTreeData = (maxDepth, minLeaf) => {
    return http({
        url: '/get_tree_data',
        method: 'get',
        params: {
            maxDepth,
            minLeaf
        }
    })
}

// 获取回归
export const getRegressionData = (regressionType) => {
    return http({
        url: '/get_regress_data',
        method: 'get',
        params: {
            type: regressionType
        }
    })
}
