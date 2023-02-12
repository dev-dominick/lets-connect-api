const express = require('express');
const cors = require('cors');

const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

// const cwd = process.cwd();

const PORT = process.env.PORT ;
const app = express();

const corsOptions = {
	origin: function (origin, callback) {
		if (origin || whitelist.indexOf(origin) !== -1) {
		  callback(null, true)
		} else {
		  callback(new Error("Not allowed by CORS"))
		}
	  }
}



app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.on('error', (error) => {
  console.log(error)
})

db.once('open', () => {
  console.log('Database Connected');

});



app.listen(PORT, () => {
  console.log(`API server  running on port ${PORT}!`);
});
