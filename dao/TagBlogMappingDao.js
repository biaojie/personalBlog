var dbutil = require('./dbutil');

function insertTagBlogMapping (tagId, blogId, ctime, utime, success) {
    var insertSql = 'insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?,?,?,?);';
    var params = [tagId, blogId, ctime, utime];
    
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
function queryByTags (tagId,page, pageSize, success) {
    var querySql = 'select * from tag_blog_mapping where tag_id = ? order by id desc limit ?, ?;';
    var params = [tagId, page*pageSize, pageSize];
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
function queryByTagsCount (tagId, success) {
    var iquerySql = 'select count(1) as count from tag_blog_mapping where tag_id = ?;';
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(iquerySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}
module.exports = {
    insertTagBlogMapping,
    queryByTagsCount,
    queryByTags
}