var dbutil = require('./dbutil');

function insertEveryDay (content, ctime, success) {
    var insertSql = 'insert into every_day (content, ctime) values (?,?);';
    var params = [content, ctime];
    
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

function queryEveryDay (success) {
    var querySql = 'select * from every_day order by id desc limit 1;';
    
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
    insertEveryDay,
    queryEveryDay
}