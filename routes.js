var clubRouter = require('./Clubs/clubs.routes');
var userRouter = require('./Users/users.routes');
var roleRouter = require('./Roles/roles.routes');

function initRoutes(app){
    // Add Club router to Express App
    app.use('/clubs', clubRouter);
    // Add User router to Express App
    app.use('/users', userRouter);
    // Add Role router to Express App
    app.use('/roles', roleRouter);
}

module.exports.initRoutes = initRoutes;