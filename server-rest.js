var express = require('express');
var mysql = require('mysql');
var connectionPool = mysql.createPool({
  host     : 'localhost',
  port	   : '3306',
  user     : 'root',
  password : 'root',
  database : 'SMUR_REST'
});

var app = express();
app.use(express.bodyParser());

app.use(express.static(__dirname + '/app'));

app.get('/missions', function(req, res){
	var data;
	connectionPool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			res.send("500", "Could not get connection. "+err)
		}
		else {
			connection.query('SELECT * FROM missions, responsibles WHERE missions.responsible_id = responsibles.id', function(err, rows){
				res.send(rows);
			});
			connection.end();	
		}
	});
});
/*
app.get('/api/person/:id', function(req, res){
	var id = req.params.id;
	connectionPool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			res.send("500", "Could not get connection. "+err);
			return;
		}
	
		connection.query('SELECT * FROM persons WHERE id = ?', id, function(err, rows){
			res.send(rows[0]); // should not return more than one result.
		});

		connection.end();
	});
});
app.post('/mission', function(req, res){
	var mission = req.body;
	mission.created_at = new Date();
	mission.created_at.setMilliseconds(0); // saving as datetime, msec have no meaning
	mission.modified_at = mission.created_at;
	connectionPool.getConnection(function(err, connection){
		if(err) {
			console.log(err);
			res.send("500", "Could not get connection. "+err);
			return;
		}
		var query = connection.query('INSERT INTO missions SET ?', mission, function(err, result){
			if(err){
				console.log(err);
				res.send(500, err);
				return;
			}
			res.send(mission); 
		});
		connection.end();	
	});
});/*
app.put('/api/person/:id', function(req, res){
	var person = req.body;
	person.modified_at = new Date();
	person.modified_at.setMilliseconds(0); // saving as datetime, msec have no meaning
	var id = req.params.id;
	connectionPool.getConnection(function(err, connection){
		if(err) {
			console.log(err);
			res.send("500", "Could not get connection. "+err);
			return;
		}
		
		connection.query('UPDATE persons SET ? WHERE id = ?', [ person, id ], function(err, result){
			if(err){
				console.log(err);
				res.send(500, err);
				return;
			}
			res.send(person);
		});

		connection.end();	
	});
});
app.delete('/api/person/:id', function(req, res){
	var id = req.params.id;
	connectionPool.getConnection(function(err, connection){
		if(err) {
			console.log(err);
			res.send("500", "Could not get connection. "+err);
			return;
		}
		
		connection.query('DELETE FROM persons WHERE id = ?', id, function(err, result){
			if(err){
				console.log(err);
				res.send(500, err);
				return;
			}
			res.send({ "status": "Sucessfully deleted" });
		});

		connection.end();	
	});
});
app.get('/restricted/test', function(req, res){
	res.send(200, "Hello world");
});*/
app.listen(3000);
console.log('Listening on port 3000...');