// Import routes
var clubRouter = require('./clubs/clubs.routes');
var userRouter = require('./users/users.routes');
var roleRouter = require('./roles/roles.routes');
var playerRouter = require('./players/players.routes');
var coachRouter = require('./coaches/coaches.routes');
var associationRouter = require('./associations/associations.routes');
var authRouter = require('./authentication/auth.router');
var eventRouter = require('./events/events.routes');
var rankingRouter = require('./rankings/ranking.routes');
var seasonTypeRouter = require('./seasontype/seasontype.routes');

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
    app.use('/rankings', rankingRouter);
    app.use('/seasontype', seasonTypeRouter);
}

// Export function addin routes to App
module.exports.initRoutes = initRoutes;