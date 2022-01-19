"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScore = void 0;
const firebase_1 = require("./config/firebase");
const addScore = async (req, res) => {
    const { name, score } = req.body;
    try {
        const entry = firebase_1.db.collection('scores').doc();
        const entryObject = {
            id: entry.id,
            name,
            score,
        };
        entry.set(entryObject);
        res.status(200).send({
            status: 'success',
            message: 'entry added successfully',
            data: entryObject
        });
    }
    catch (error) {
        //log error message
        res.status(500).json(error);
    }
};
exports.addScore = addScore;
//# sourceMappingURL=scoreController.js.map