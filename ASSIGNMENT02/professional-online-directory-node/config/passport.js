const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'f3d7272ec5f36869e662',
    clientSecret: 'be382da84713100c6de93f07aff4fa9a281792a9',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Find or create user logic
    return done(null, profile);
  }
));

module.exports = passport;

