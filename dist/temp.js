var pg = require('pg');
console.log("process.env.DATABASE_URL=" + process.env.DATABASE_URL)
pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM country');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});
