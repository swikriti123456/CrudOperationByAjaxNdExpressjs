var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'demoProject',
    ssl      : false
  });
  connection.connect();
function findById(aid){
    for(let i=0;i<person.length;i++){
        if(person[i].id == aid){
            return i;
        }
    }
    return -1;
}
module.exports=function(app){
    app.route('/person')
        .get(function(req,res){
            connection.query('SELECT * FROM person',function(err,result,fields){
                if(err)
                    console.log(err);
                if(result){
                    res.send(result);
                }
            });
        })
        .post(function(req,res){
            var data= req.body;
            
            connection.query("insert into person value("+data.id+",'"+data.name+"','"+data.email+"')",function(err,result,fields){
                if(err)
                    console.log(err);
                if(result){
                    if(result.affectedRows>0)
                        res.send({message:"Inserted.."});
                    else
                        res.status(501).send({message:"error"});
                }
            });
        })
    app.route('/person/:id')
        .get(function(req,res){
            var eid=req.params.id;
            connection.query('SELECT * FROM person where id='+eid,function(err,result,fields){
                if(err)
                    console.log(err);
                if(result){
                    res.send(result);
                }
            });
        })
        .delete(function(req,res){
            var eid=req.params.id;
            connection.query('delete from person where id='+eid,function(err,result,fields){
                if(err)
                    console.log(err);
                if(result){
                    if(result.affectedRows>0)
                    res.send({message:"Deleted.."});
                else
                    res.status(501).send({message:"error"});
                }
            });
        })
        .put(function(req,res){
            var eid=req.params.id;
            var data = req.body;
            connection.query("update person set id="+data.id+",name='"+data.name+"',email='"+data.email+"' where id="+eid,function(err,result,fields){
                if(err)
                    console.log(err);
                if(result){
                    if(result.affectedRows>0)
                    res.send({message:"Updated.."});
                else
                    res.status(501).send({message:"error"});
                }
            });
           
        })
    
}




