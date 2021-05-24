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
        secret: "Helloffffffffffffffffffffffffffffffasdfasdfasdfffffff!",
        resave: true,      //  false: 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않음  // true: 세션 데이터가 바뀌던 안바뀌던 세션 저장소에 값을 계속 저장을 함
        saveUninitialized:true,
    })
);

app.use((req, res, next) =>{     // session 미들웨어
    req.sessionStore.all((error, sessions) => {
        console.log('===asdfasdfasdfasdfsdf', );
        next();
    })
})

app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    req.session.fuck += 1;
    return res.send(`${req.session.id}==${req.session.potato}==${req.session.fuck}`);
});

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;