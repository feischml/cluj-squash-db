var clubRouter = require('./Clubs/clubs.routes');

module.exports.initRoutes = function (app){
    // Add Club router to Express App
    app.use('/clubs', clubRouter);
}