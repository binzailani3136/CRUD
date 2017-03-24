var mongoose = require('mongoose')
var fixtures = require('pow-mongoose-fixtures')
var path = require('path')
var db = require('../db')

/// Connect to mongodb and init the db
mongoose.connect(db.url)

mongoose.connection.on('error', function () {
    console.log('Failed to connect to the db.')
    process.exit(-1)
})

mongoose.connection.once('open', function () {
    process.stdout.write('Loading fixtures ... ')

    var fixture_path = path.resolve(__dirname + '/fixtures.js');
    if (process.platform == "win32"){
        fixture_path = fixture_path.substr(3);
    }

    fixtures.load(fixture_path, mongoose, function(err) {
        process.stdout.write('done.\n'.green)
        process.exit()
    });
})
