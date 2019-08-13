var dbutil = require('./dbutil');

function insertTag (tag, ctime, utime, success) {
    
    var insertSql = 'insert into tag (tag, ctime, utime) values (?,?,?);';
    var params = [tag, ctime, utime];
    
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

function queryTag (tag, success) {
    var querySql = 'select * from tag where tag=?;';
    var params = [tag]
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

function queryAllTags (success) {
    var querySql = 'select * from tag;';
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
module.exports = {
    insertTag,
    queryTag,
    queryAllTags
}