// import express from 'express';
// import cors from 'cors';
// import db from './db';
// import routes from './routes';

// const app = express();
// const port = process.env.PORT || 4000;
// console.log(process.env.MONGO_URL);
// db.connect();
// app.use(cors());
// app.use(express.json());
// app.listen(port, () =>
//     console.log(`Example app listening on port ${port}!`),
// );
// app.use('/', routes);

import path from "path";

import express from "express";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}