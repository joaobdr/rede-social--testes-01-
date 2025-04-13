const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { port } = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static("assets"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rotas
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);

app.get("/", (req, res) => res.status(200).json({ msg: "ok" }));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
