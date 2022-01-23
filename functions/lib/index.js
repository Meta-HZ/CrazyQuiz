"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
// import * as express from 'express'
const firebase_1 = require("./config/firebase");
const cors = require("cors");
// Create firebase function to add a score to the database
exports.addScore = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        const name = req.query.name;
        const score = req.query.score;
        await firebase_1.db
            .collection("scores")
            .doc(name)
            .set({
            name,
            score,
        });
        res.status(200).send({
            status: "success",
            message: "entry added successfully",
        });
    });
});
// Create firebase function to increment the score of the player
exports.incrementScore = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        const name = req.query.name;
        await firebase_1.db
            .collection("scores")
            .doc(name)
            .update({
            score: firebase_admin_1.firestore.FieldValue.increment(1),
        });
        res.status(200).send({
            status: "success",
            message: "score incremented successfully",
        });
    });
});
// Create firebase function to decrement the score of the player
exports.decrementScore = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        const name = req.query.name;
        await firebase_1.db
            .collection("scores")
            .doc(name)
            .update({
            score: firebase_admin_1.firestore.FieldValue.increment(-1),
        });
        res.status(200).send({
            status: "success",
            message: "score decremented successfully",
        });
    });
});
// Get scores from the database
exports.getScores = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        const scores = await firebase_1.db.collection("scores").get();
        const data = scores.docs.map((doc) => doc.data());
        res.status(200).send({
            status: "success",
            message: "scores retrieved successfully",
            data,
        });
    });
});
//# sourceMappingURL=index.js.map