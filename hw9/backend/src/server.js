import express from 'express';
import cors from 'cors';
import db from './db';
import routes from './routes';
import path from 'path';

const app = express();
console.log(process.env.MONGO_URL);
db.connect();
if (process.env.NODE_ENV === "development") {
    app.use(cors());
}
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get('/')
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
app.use(express.json());
app.use('/api', routes);
const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);