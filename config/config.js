const config = {
    development: {
        url: "mongodb+srv://admin:admin@cluster0-znwk6.mongodb.net/parkingSlot?retryWrites=true",
        tokensecret: 'parkingSlot',
        sessionsecret: 'parkingSlot'
    }
}

module.exports = config[process.env.ENV] || config.development