var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page/'));


app.get('/queryEveryDay', loader.get('/queryEveryDay'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/queryBlogById', loader.get('/queryBlogById'));
app.get('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'));
app.get('/queryAllBlog', loader.get('/queryAllBlog'));
app.get('/queryRandomTag', loader.get('/queryRandomTag'));
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
app.get('/queryNewComments', loader.get('/queryNewComments'));
app.get('/queryByTags', loader.get('/queryByTags'));
app.get('/queryByTagsCount', loader.get('/queryByTagsCount'));
app.get('/querySearchBlog', loader.get('/querySearchBlog'));
app.get('/querySearchBlogCount', loader.get('/querySearchBlogCount'));


app.post('/editEveryDay', loader.get('/editEveryDay'));
app.post('/editBlog', loader.get('/editBlog'));



app.listen(globalConfig.port, function(){
    console.log('服务器已启动');
})
