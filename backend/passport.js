const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const User = require("./Models/user");
const GOOGLE_CLIENT_ID = "451412350838-khbv8dvibqhhj5n3hekhcidmk4r61a8k.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope:["profile","email"]
  },
  async function (accessToken, refreshToken, profile, done)  {
    try {
      
      const user = await User.findOne({  email: profile.emails[0].value   });
             if(!user){
            newUser=   new User({
                 email: profile.emails[0].value,
                 name: profile.displayName,
                 image:profile.photos[0].value,
                 provider: "google",
                })
                await newUser.save();
                return done(null, newUser);
              }
              else 
                return done(null, user);
              
            } catch (error) {
              return done(error);
             }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

