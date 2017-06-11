module.exports = function(app) {
// Assign all route variables
var index  = require('./index/routes')
var directory = require('./directory/routes');

// Define all routes
app.use('/', index);
app.use('/v1/directory', directory);
};