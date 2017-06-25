var clubRouter = require('./Clubs/clubs.routes');
var userRouter = require('./Users/users.routes');
var roleRouter = require('./Roles/roles.routes');
var playerRouter = require('./Players/players.routes');
var coachRouter = require('./Coaches/coaches.routes');

function initRoutes(app){
    // Add Club router to Express App
    app.use('/clubs', clubRouter);
    // Add User router to Express App
    app.use('/users', userRouter);
    // Add Role router to Express App
    app.use('/roles', roleRouter);
    // Add Players router to Express App
    app.use('/players', playerRouter);
    // Add Coaches routes to Express App
    app.use('/coaches', coachRouter);
}

module.exports.initRoutes = initRoutes;