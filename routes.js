var clubRouter = require('./Clubs/clubs.routes');
var userRouter = require('./Users/users.routes');

module.exports.initRoutes = function (app){
    // Add Club router to Express App
    app.use('/clubs', clubRouter);
    // Add User router to Express App
    app.use('/users', userRouter);
}