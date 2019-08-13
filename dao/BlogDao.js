var dbutil = require('./dbutil');

function insertBlog (title, content, tags, views, ctime, utime, success) {
    var insertSql = 'insert into blog (title, content, tags, views, ctime, utime) values (?,?,?,?,?,?);';
    var params = [title, content,views, tags, ctime, utime];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryBlogByPage (page, pageSize,success) {
    var querySql = 'select * from blog order by id desc limit ?, ?;';
    var params = [page*pageSize, pageSize]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryBlogCount (success) {
    var querySql = 'select count(1) as count from blog;';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryBlogById (id,success) {
    var querySql = 'select * from blog where id = ?;';
    var params = [id]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryAllBlog (success) {
    var querySql = 'select * from blog order by id desc;';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function addViews (bid, success) {
    var updateSql = 'update blog set views = views + 1 where id = ?;';
    var param = [bid];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, param, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryHotBlog (size, success) {
    var querySql = 'select id,title,views from blog order by views desc limit ?;';
    var param = [size];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, param, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function querySearchBlog (search, page, pageSize, success) {
    var querySql = 'select * from blog where title like ? order by id desc limit ?, ?;';
    var params = ['%'+search+'%', page*pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function querySearchBlogCount (search, success) {
    var querySql = 'select count(1) as count from blog where title like ?;';
    var params = ['%'+search+'%'];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}

module.exports = {
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlog,
    querySearchBlog,
    querySearchBlogCount
}