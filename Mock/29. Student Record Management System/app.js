import "dotenv/config";
import { MongoClient } from "mongodb";
import express from "express";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/college";
const client = new MongoClient(uri);

const db = client.db(process.env.DB_NAME || "college");
const students = db.collection(process.env.COLLECTION_NAME || "students");
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/students", async (req, res) => {
  const { name = "", rollNo = "", branch = "" } = req.body || {};
  if (!name.trim() || !rollNo.trim() || !branch.trim()) {
    return res.status(400).json({ message: "Name, Roll No and Branch are required." });
  }
  try {
    const result = await students.updateOne(
      { rollNo: rollNo.trim() },
      {
        $set: { name: name.trim(), branch: branch.trim(), updatedAt: new Date() },
        $setOnInsert: { rollNo: rollNo.trim(), createdAt: new Date() }
      },
      { upsert: true }
    );
    if (result.upsertedCount) return res.status(201).json({ message: "Student saved." });
    return res.status(200).json({ message: "Student updated for this Roll No." });
  } catch (e) {
    return res.status(500).json({ message: "Failed to save student." });
  }
});

app.get("/api/students", async (_req, res) => {
  const list = await students.find({}, { projection: { _id: 0, createdAt: 0 } }).sort({ rollNo: 1 }).toArray();
  res.json(list);
});

app.get("/api/students/:rollNo", async (req, res) => {
  const rollNo = (req.params.rollNo || "").trim();
  const s = await students.findOne({ rollNo }, { projection: { _id: 0, createdAt: 0 } });
  if (!s) return res.status(404).json({ message: "Student not found." });
  res.json(s);
});

app.delete("/api/students/:rollNo", async (req, res) => {
  const rollNo = (req.params.rollNo || "").trim();
  const result = await students.deleteOne({ rollNo });
  if (!result.deletedCount) return res.status(404).json({ message: "Student not found." });
  res.json({ message: "Student deleted." });
});

async function main() {
  await client.connect();
  await students.createIndex({ rollNo: 1 }, { unique: true });

  const start = (p) => {
    const server = app.listen(p, () => console.log(`Open http://localhost:${p}`));
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${p} is busy, trying ${p + 1}...`);
        return start(p + 1);
      }
      throw err;
    });
  };

  start(port);
}

main()
  .catch((err) => {
    console.error("Startup error:", err.message);
    process.exit(1);
  });
