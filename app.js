const restify = require('restify');

const configfile = require('./config');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');








const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// protecting routes
/*
server.use(rjwt({
    secret: require('./config').JWT_SECRET
}).unless({ path: ['./auth'] }))
*/
server.listen(configfile.PORT, () => {
    console.log('server is started listening in the ' + configfile.PORT + '=====');

    mongoose.connect(configfile.MONGODB_URI, {
        useNewUrlParser: true
    })
})

const db = mongoose.connection;
db.on('error', (error) => {
    console.log('error')
})

db.once('open', () => {
    require('./routes/users')(server);
    require('./routes/customers')(server);
    console.log(`server started on the port ${configfile.PORT}`)

})