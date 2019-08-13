var blogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var path = new Map();
var url = require('url');

function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, ' ').replace('，', ',');
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString().trim(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null))
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(',');
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}
path.set('/editBlog', editBlog)

function queryTag(tag, blogId) {
    tagDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    })
}

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result))
        response.end();
    })
}
path.set('/queryAllBlog', queryAllBlog);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0; i < result.length; i++) {
            // 过滤图片
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, '');
            // 过滤标签
            // result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result))
        response.end();
    })
}
path.set('/queryBlogByPage', queryBlogByPage);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result));
        response.end();
    })
}
path.set('/queryBlogCount', queryBlogCount);

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.addViews(params.bid, function (result) {
        blogDao.queryBlogById(params.bid, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '请求成功', result));
            response.end();
        })
    });
}
path.set('/queryBlogById', queryBlogById);


function queryHotBlog(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryHotBlog(parseInt(params.size), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result));
        response.end();
    });
}
path.set('/queryHotBlog', queryHotBlog);

function querySearchBlog(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.querySearchBlog(params.search, parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0; i < result.length; i++) {
            // 过滤图片
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, '');
            // 过滤标签
            // result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result))
        response.end();
    })
}
path.set('/querySearchBlog', querySearchBlog);

function querySearchBlogCount(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.querySearchBlogCount(params.search, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result))
        response.end();
    })
}
path.set('/querySearchBlogCount', querySearchBlogCount);



module.exports.path = path;