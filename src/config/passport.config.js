import fetch from "node-fetch";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import local from "passport-local";
import { logger } from "../utils/main.js";
import { usersController } from "../controllers/users.controller.js";
import { UsersMongoose } from "../DAO/mongo/models/users.mongoose.js";
import { generateCartId } from "../utils/main.js";
import { cartService } from "../services/carts.service.js";
import { sessionsController } from "../controllers/sessions.controller.js";

const LocalStrategy = local.Strategy;

const githubCallbackURL =
  process.env.NODE_ENV === "production"
    ? "https://terceraentregasemprini-production.up.railway.app/api/sessions/githubcallback"
    : "http://localhost:8080/api/sessions/githubcallback";

export function iniPassport() {
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, username, password, done) => {
      try {
        const user = await usersController.loginUser(username, password);

        if (!user) {
          req.session.errorMsg = "Usuario inexistente o contraseña incorrecta";
          return done(null, false);
        } else {
          user.premium = user.premium || false;
          logger.info("User login succefull!");
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const userCreated = await usersController.registerUser(req);

          if (!userCreated) {
            return done(null, false);
          } else {
            logger.info("User registrarion succesfully!");
          }

          return done(null, userCreated);
        } catch (e) {
          logger.error("Error in register");
          return done(e);
        }
      },
    ),
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Ov23liaeimx2vJNn4ku4",
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: githubCallbackURL,
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find(email => email.verified == true);

          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;

          let user = await UsersMongoose.findOne({ email: profile.email });
          if (!user) {
            const cart = generateCartId();
            const cartId = await cartService.createCart(cart);
            const newUser = {
              email: profile.email,
              first_name: profile._json.name || profile._json.login || "noname",
              role: "user",
              password: "nopass",
              premium: "false",
              cartID: cartId,
              purchase_made: [],
            };
            let userCreated = await UsersMongoose.create(newUser);
            logger.info("User Registration succesful");
            return done(null, userCreated);
          } else {
            logger.error("User already exists");
            return done(null, user);
          }
        } catch (e) {
          logger.error("Error en auth github");
          return done(e);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UsersMongoose.findById(id);
    done(null, user);
  });
}
