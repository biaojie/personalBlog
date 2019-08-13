var dbutil = require('./dbutil');

function insertComment(blog_id, parent, parent_name, user_name, comments, email, ctime, utime, success) {
    var insertSql = 'insert into comments (blog_id, parent, parent_name, user_name, comments, email, ctime, utime) values (?,?,?,?,?,?,?,?);';
    var params = [blog_id, parent, parent_name, user_name, comments, email, ctime, utime];
    
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

function queryCommentsByBlogId(blog_id , success){
    var querySql = 'select * from comments where blog_id = ? order by id desc;';
    var params = [blog_id];

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

function queryCommentsCountByBlogId(blog_id , success){
    var querySql = 'select count(1) as count from comments where blog_id = ?;';
    var params = [blog_id];

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

function queryNewComments (size, success) {
    var querySql = 'select * from comments order by id desc limit ?;';
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

module.exports = {
    insertComment,
    queryCommentsByBlogId,
    queryCommentsCountByBlogId,
    queryNewComments
}