import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube",{   //rooturl 슬래시 이후에는 db를 자동으로 생성해주며 있는 경우 접속을 뜻함
    useNewUrlParser: true,       // To use the new parser,to MongoClient.js driver rewrote the tool it uses to parse MongoDB connection string
    useUnifiedTopology: true,   // mongoose의 드라이버와 MongoDB의 드라이버는 같은 소켓에서 데이터가 왔다갔다 할 수 있다는 점
    useFindAndModify: false,    // true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
    useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ Connected to DB");

db.on("error", handleError); // db연결 실패시 에러 메시지 출력
db.once("open", handleOpen); // 디비 연결 성공시 메시지 출력