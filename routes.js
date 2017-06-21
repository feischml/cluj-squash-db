var clubRouter = require('./Clubs/clubs.routes');
var userRouter = require('./Users/users.routes');

function initRoutes(app){
    // Add Club router to Express App
    app.use('/clubs', clubRouter);
    // Add User router to Express App
    app.use('/users', userRouter);
}

module.exports.initRoutes = initRoutes;