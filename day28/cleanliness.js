// Load libraries
const { MongoClient } = require('mongodb')

const MONGO_URL = 'mongodb://localhost:27017'
const MONGO_DB = 'airbnb'
const MONGO_COLLECTION = 'listingsAndReviews'

const avgCleanliness = async (propertyType, client) => {
    return client.db(MONGO_DB).collection(MONGO_COLLECTION)
        .aggregate([
            {
                $match: {
                    property_type: propertyType
                }
            },
            {
                $group: {
                    _id: '$address.country',
                    cleanliness: {
                        $push: '$review_scores.review_scores_cleanliness'
                    }
                }
            },
            {
                $project: {
                    avg_cleanliness: {
                        $avg: '$cleanliness'
                    }
                }
            },
            {
                $sort: {
                    avg_cleanliness: -1
                }
            }
        ])
        .toArray()
}

const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

client.connect()
    .then(async () => {
        const result = await avgCleanliness('Condominium', client)

        // list the result
        for (let r of result)
            console.info(r)

        // stop the client
        client.close()
    })