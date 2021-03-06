import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true}));

app.use(
    session({
        secret: process.env.COOKIE_SECRET, 
        resave: false,      //  false: 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않음  // true: 세션 데이터가 바뀌던 안바뀌던 세션 저장소에 값을 계속 저장을 함
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 3 }, // session의 쿠키 만료 시간을 3시간으로 설정
        store: MongoStore.create({ mongoUrl: process.env.DB_URL}),
      }),
);

app.use((req, res, next) => {
  // console.log('request의 키들', Object.keys(req)),
  // console.log('req.headers.cookie: ', req.headers.cookie )
  // console.log('req.session :  ', req.session),
  // console.log('req.session.cookie : ', req.session.cookie)
  // console.log('req.sessionID :  ', req.sessionID),
  // console.log('req.sessionStore :  ', req.sessionStore),
    next();
});
  





app.use(localsMiddleware) // 만약  localsMiddleware가 session 미들웨어보다 먼저 읽히면 session이 req객체에 저장되지 않음 즉, 현재 순서로 되어 있으면 localMiddleware가 session 객체에 접근 할 수 있음 
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;