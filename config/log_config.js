const path = require('path');

// 错误日志输出路径
const baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
const errorPath  = '/error';
//错误日志文件名
const errorFileName  = 'error';
//错误日志输出完整路径
const errorLogPath  = baseLogPath + errorPath + "/" + errorFileName;

const responsePath = '/response';
const responseFileName = 'response';
// 响应日志输出完整路径
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

// module.exports = {
//     'appenders': [
//         {
//             'category' : 'errorLogger',
//             'type' : 'dateFile',
//             'filename' : errorLogPath,
//             'alwaysIncludePattern' : true,
//             'pattern' : '-yyyy-MM-dd-hh.log',
//             'path': errorPath                     
//         },
//         {
//             'category' : 'resLogger',
//             'type' : 'dateFile',
//             'filename' : responseLogPath,
//             'alwaysIncludePattern' : true,
//             'pattern' : '-yyyy-MM-dd-hh.log',
//             'path' : responsePath   
//         }
//     ],
//     'levels':{
//         'errorLogger':'ERROR',
//         'resLogger':'ALL'
//     },
//     'baseLogPath':baseLogPath
// }

module.exports = {
    appenders: {
        errorLogger: {
            category : 'errorLogger',
            type : 'dateFile',
            filename : errorLogPath,
            alwaysIncludePattern : true,
            pattern : '-yyyy-MM-dd-hh.log',
            path: errorPath
        },
        resLogger: {
            category : 'resLogger',
            type : 'dateFile',
            filename : responseLogPath,
            alwaysIncludePattern : true,
            pattern : '-yyyy-MM-dd-hh.log',
            path : responsePath 
        }
    },

    categories: {
        errorLogger : { appenders: ['errorLogger'], level: 'ERROR'},
        resLogger : { appenders: ['resLogger'], level: 'ALL'},
        default: { appenders: ['resLogger'], level: 'ALL'}
    }
}