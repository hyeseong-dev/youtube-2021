import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

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
    })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;