import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
const deleteDB = async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.json({ message: 'Database cleared' })
    } catch (e) { throw new Error("Database deletion failed"); }
};
const addDB = async (req, res) => {
    const existName = await ScoreCard.findOne({ name: req.body.name });
    const existSubject = await ScoreCard.findOne({ subject: req.body.subject });
    if (existName && existSubject) { res.json({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})` }); }
    else {
        const newScoreCard = new ScoreCard({ name: req.body.name, subject: req.body.subject, score: req.body.score });
        console.log("Created ScoreCard");
        newScoreCard.save()
        res.json({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: { newScoreCard } })
    }
}
const queryDB = async (req, res) => {
    if (req.query.type === 'name') {
        const results = await ScoreCard.find({ name: req.query.queryString })
        let ret = results.map((result) => {
            return (`Found card with ${req.query.type}: (${result.name},
                ${result.subject}, ${result.score})`)
        })
        if (results.length == 0) {
            res.json({ message: `${req.query.type} ${req.query.queryString} not found!` })
        }
        else {
            res.json({ messages: ret })
        }
    }
    else {
        const results = await ScoreCard.find({ subject: req.query.queryString })
        let ret = results.map((result) => {
            return (`Found card with ${req.query.type}: (${result.name},
                ${result.subject}, ${result.score})`)
        })
        if (results.length == 0) {
            res.json({ message: `${req.query.type} ${req.query.queryString} not found!` })
        }
        else {
            res.json({ messages: ret })
        }
    }
}
router.delete("/cards", deleteDB);
router.post("/card", addDB);
router.get("/cards", queryDB);
export default router;
