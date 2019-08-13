var commentDao = require('../dao/CommentDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var path = new Map();
var url = require('url');
// 生成验证码
var captcha = require('svg-captcha');

function addComment(request, response){
    var param = url.parse(request.url, true).query;
    commentDao.insertComment(param.bid, param.parent, param.parent_name, param.name, param.content, param.email, timeUtil.getNow(), timeUtil.getNow(), function(){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null))
        response.end();
    })
}
path.set('/addComment',addComment);

function queryRandomCode(request, response){
    // 生成验证码图片
    var img = captcha.create({fontSize: 50, width: 100, heigth: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '添加成功', img))
    response.end();
}
path.set('/queryRandomCode',queryRandomCode);

function queryCommentsByBlogId (request, response){
    var param = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(param.bid, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功', result));
        response.end();
    })
}
path.set('/queryCommentsByBlogId',queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response){
    var param = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(param.bid, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功', result));
        response.end();
    })
}
path.set('/queryCommentsCountByBlogId',queryCommentsCountByBlogId);

function queryNewComments(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryNewComments(parseInt(params.size), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result));
        response.end();
    });


}
path.set('/queryNewComments', queryNewComments);

module.exports.path = path;