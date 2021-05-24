import "./db";
import Video from  "./models/Video";
import User from  "./models/User";
import app from "./server";

const PORT = 3000;

const handleListening = () =>
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);