import mongoose from "mongoose";

mongoose.connect("mongodb//127.0.0.1:27017/youtube",{   //rooturl 슬래시 이후에는 db를 자동으로 생성해주며 있는 경우 접속을 뜻함
    useNewUrlParser: true,
    useUnifieldTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ Connected to DB");

db.on("error", handleError);
db.once("open", handleOpen);