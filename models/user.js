const {connection, pool} = require('./config');

const Users = {
    auth: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, column1, value1, column2, value2} = filtr;
                connection.query("SELECT * FROM ?? WHERE ?? = ? AND ?? = ?", [table, column1, value1, column2, value2], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result){
                        callback(null, result[0]);
                    }else{
                        callback(null, false);
                    }
                })
            }
            connection.release();
        })
    }
}

module.exports = Users;