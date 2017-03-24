var mongoose = require('mongoose')
var fixtures = require('pow-mongoose-fixtures')
var db = require('../db')

/// Connect to mongodb and init the db
mongoose.connect(db.url)

mongoose.connection.on('error', function () {
    console.log('Failed to connect to the db.')
    process.exit(-1)
})

mongoose.connection.once('open', function () {
    process.stdout.write('Loading fixtures ... ')
    fixtures.load(__dirname + '/fixtures.js', mongoose, function(err) {
        process.stdout.write('done.\n'.green)
        process.exit()
    })
})
