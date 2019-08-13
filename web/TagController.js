var tagDap = require('../dao/TagDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var blogDao = require('../dao/BlogDao');
var respUtil = require('../util/RespUtil');
var url = require('url');
var path = new Map();

function queryAllTags (request, response){
    tagDap.queryAllTags(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功', result));
        response.end();
    })
}
path.set('/queryRandomTag',queryAllTags);

function queryByTags (request, response){
    var param = url.parse(request.url, true).query;
    tagBlogMappingDao.queryByTags(param.tag, parseInt(param.page), parseInt(param.pageSize), function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功', result));
            response.end();
        }else{
            var resArr = [];
            for(var i = 0; i < result.length; i ++){
                blogDao.queryBlogById(result[i].blog_id, function(result){
                    resArr.push(result[0])
                })
            }

            getResult(resArr, result.length, response)
            
        }
        
    })
}
path.set('/queryByTags',queryByTags);

function getResult(resArr, resLen, response){
    if(resArr.length == resLen){
        for (var i = 0; i < resArr.length; i++) {
            // 过滤图片
            resArr[i].content = resArr[i].content.replace(/<img[\w\W]*">/, '');
            // 过滤标签
            // resArr[i].content = resArr[i].content.replace(/<[\w\W]{1,5}>/g, '');
            resArr[i].content = resArr[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功', resArr));
        response.end();
    } else {
        setTimeout(function(){
            getResult(resArr, resLen, response)
        }, 10)
    }
}

function queryByTagsCount (request, response){
    var param = url.parse(request.url, true).query;
    tagBlogMappingDao.queryByTagsCount(param.tag, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功', result));
        response.end();
    })
}
path.set('/queryByTagsCount',queryByTagsCount);


module.exports.path = path;