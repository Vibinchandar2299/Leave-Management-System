const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/hod", require("./routes/hodRoutes"));

const parsedPort = parseInt(process.env.PORT, 10);
const PORT = Number.isInteger(parsedPort) && parsedPort >= 0 && parsedPort < 65536 ? parsedPort : 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
