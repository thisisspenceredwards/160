const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.get('/user', function(req, res) {
	//res.send('get a put request at /usr')

	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://dbUser:jG75hTqPR8uz0Uw1@groupprojectcluster-7fzhv.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true });
	client.connect(err => {
	  const collection = client.db("test").collection("users");
	  // perform actions on the collection object
	  //collection.countDocuments(function (err, count) {
	  		//console.log("Number of Items: ");
	  		//console.log(count);
	  		//res.send(count);
	  	//});
	  
	  collection.find({}).toArray(function(err, result){
	  	if (err) { 
	  		res.status(400).json({err});
	  	} else {
	  		//res.writeHead(200, {"Content-Type": "application/json"});
	  		//res.end(JSON.stringify(result));

	  		res.status(200).json({result});
	  	}	  	
	  });

	  client.close();
	});
})
