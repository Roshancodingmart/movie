const Client = require('pg').Client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432,   
})
client.connect(function(err) {
  if (err) console.log(err, "not connected");
  else console.log("Connected!");
});
module.exports={
    client
}
