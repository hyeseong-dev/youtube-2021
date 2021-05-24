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
        secret: "Hello!", 
        resave: true,      //  false: 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않음  // true: 세션 데이터가 바뀌던 안바뀌던 세션 저장소에 값을 계속 저장을 함
        saveUninitialized:true,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/youtube"}),
      })
);
app.use((req, res, next) => {
  console.log(Object.keys(req.session));
  next();
})
app.use(localsMiddleware) // 만약  localsMiddleware가 session 미들웨어보다 먼저 읽히면 session이 req객체에 저장되지 않음 즉, 현재 순서로 되어 있으면 localMiddleware가 session 객체에 접근 할 수 있음 
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;