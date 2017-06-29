function authenticationMiddleware(){  
  return function (req, res, next) {
    console.log('req  key:' + req.session.key );
    if (req.isAuthenticated()) {
      console.log('Logged in!');
      return next();
    }
    console.log('Not logged in');
  }
}

module.exports.authenticationMiddleware = authenticationMiddleware;