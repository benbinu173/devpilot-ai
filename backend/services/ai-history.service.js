const AiHistory = require("../models/ai-history.model");

async function createHistory(userId, history) {

    return await AiHistory.create({

        user: userId,

        ...history

    });

}

async function getHistory(userId) {

    return await AiHistory.find({

        user: userId

    })

    .sort({

        createdAt: -1

    });

}

module.exports = {

    createHistory,

    getHistory

};