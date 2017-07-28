const {connection, pool} = require('./config');

const Games = {
    select: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(err);
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
                });
            }
            connection.release();
        });
    },
    selectOR: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(err);
            }else{
                let {table, column1, value1,  column2, value2, column3, value3, column4, value4} = filtr;
                connection.query("SELECT * FROM ?? WHERE ?? = ? OR ?? = ? OR ?? = ? OR ?? = ?", [table, column1, value1,  column2, value2, column3, value3, column4, value4], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result){
                        callback(null, result[0]);
                    }else{
                        callback(null, false);
                    }
                });
            }
            connection.release();
        });
    },
    doubleSelect: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(err);
            }else{
                let {table1, column1, table2, column2, value2} = filtr;
                connection.query("SELECT * FROM ?? WHERE ?? = (SELECT id FROM ?? WHERE ?? = ?)", [table1, column1, table2, column2, value2], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result){
                        callback(null, result);
                    }else{
                        callback(null, false);
                    }
                });
            }
            connection.release();
        });
    },
    showAll: function(table, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                connection.query("SELECT * FROM ?? ", table, function(err, result){
                    callback(null, result);
                });
            }
            connection.release();
        });
    },
    showAllOrderByName: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, order} = filtr;
                connection.query("SELECT * FROM ?? ORDER BY ??", [table, order], function(err, result){
                    callback(null, result);
                });
            }
            connection.release();
        });
    },
    selectOrderByName: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, column, value, order} = filtr;
                connection.query("SELECT * FROM ?? WHERE ?? = ? ORDER BY ??", [table, column, value, order], function(err, result){
                    callback(null, result);
                });
            }
            connection.release();
        });
    },
    insert: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(err);
            }else{
                let {table, set} = filtr;
                connection.query("INSERT INTO ?? SET ?", [table, set], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result.affectedRows > 0){
                        callback(null, result.insertId);
                    }else{
                        callback(new Error ('Ошибка при записи в БД'));
                    }
                });
            }
            connection.release();
        });
    },
    update: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, set, column, value} = filtr;
                connection.query("UPDATE ?? SET ? WHERE ?? = ?", [table, set, column, value], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result.affectedRows > 0){
                        callback(null, true);
                    }else{
                        callback(new Error ('Запись не обновлена'));
                    }
                });
            }
            connection.release();
        });
    },
    updateOR: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, set, id1, id2, id3, id4} = filtr;
                connection.query("UPDATE ?? SET ? WHERE id = ? OR id = ? OR id = ? OR id = ?", [table, set, id1, id2, id3, id4], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result.affectedRows > 0){
                        callback(null, true);
                    }else{
                        callback(new Error ('Запись не обновлена'));
                    }
                });
            }
            connection.release();
        });
    },
    remove: function(filtr, callback){
        pool.getConnection(function(error, connection){
            if(error){
                console.log("Error", error);
                callback(error);
            }else{
                let {table, column, value} = filtr;
                connection.query("DELETE FROM ?? WHERE ?? = ? LIMIT 1", [table, column, value], function(err, result){
                    if(err){
                        console.log("Error", err);
                        callback(err);
                    }else if(result.affectedRows > 0){
                        callback(null, true);
                    }else{
                        callback(new Error ('Запись не удалена'));
                    }
                });
            }
            connection.release();
        });
    }
};

module.exports = Games;