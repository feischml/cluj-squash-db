// Import routes
var clubRouter = require('./clubs/clubs.routes');
var userRouter = require('./users/users.routes');
var roleRouter = require('./roles/roles.routes');
var playerRouter = require('./players/players.routes');
var coachRouter = require('./coaches/coaches.routes');
var associationRouter = require('./associations/associations.routes');
var authRouter = require('./authentication/auth.router');
var eventRouter = require('./events/events.routes');

function initRoutes(app){
    // Add the routes to the Express App
    app.use('/clubs', clubRouter);
    app.use('/users', userRouter);
    app.use('/roles', roleRouter);
    app.use('/players', playerRouter);
    app.use('/coaches', coachRouter);
    app.use('/associations', associationRouter);
    app.use('/auth', authRouter);
    app.use('/events', eventRouter);
}

// Export function addin routes to App
module.exports.initRoutes = initRoutes;