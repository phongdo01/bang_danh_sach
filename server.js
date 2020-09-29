var express = require("express");
const kafka = require('kafka-node');
const config = require('./config');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT ||3000);
var Mang = []
io.on("connection", function(socket){
	io.sockets.emit("server-send-danhsach-Users",Mang);
	
try {
	const Consumer = kafka.Consumer;
   const client = new kafka.KafkaClient({idleConnection: 24 * 60 * 60 * 1000,  kafkaHost: config.KafkaHost});
  
   let consumer = new Consumer(
	  client,
	  [{ topic: config.KafkaTopic, partition: 0 }],
	  {
		autoCommit: true,
		fetchMaxWaitMs: 1000,
		fetchMaxBytes: 1024 * 1024,
		encoding: 'utf8',
		// fromOffset: false
	  }
	);
	consumer.on('message', async function(message) {
      const par = JSON.parse(message.value)
      console.log('par : ' ,par) 
      Mang.push(par.after)
    let  uniqueArray = Mang.filter(function(item, pos) {
        return Mang.indexOf(item) == pos;
    })
    Mang = uniqueArray
	  io.sockets.emit("server-send-message",par.after);

	  console.log(
		'kafka ',
		Mang
	  );
	})
	consumer.on('error', function(error) {
	  //  handle error 
	  console.log('error', error);
	});
  }
  catch(error) {
	// catch error trace
	console.log(error);
  }

})
app.get("/", function(req,res){
	res.render("trangchu");
});