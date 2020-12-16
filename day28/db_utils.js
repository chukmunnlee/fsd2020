const mkQuery = (sql, pool) => {
    return async (args) => {
        const conn = await pool.getConnection()
        try {
            const [ result, _ ] = await conn.query(sql, args)
            return result
        } catch(e) {
            console.error('ERROR: ', e)
            throw e
        } finally {
            conn.release()
        }
    }
}

const gameReviews = async (gameId, collection) => 
    (await collection.aggregate([
        {
            $match: {
                ID: gameId
            }
        },
        {
            $limit: 30
        },
        {
            $group: {
                _id: '$ID',
                reviews: {
                    $push: '$_id'
                },
                ratings: {
                    $push: '$rating'
                }
            }
        },
        {
            $project: {
                _id: 0,
                reviews: 1,
                avg_ratings: {
                    $avg: '$ratings'
                }
            }

        }
    ]).toArray())

module.exports = {
    mkQuery, gameReviews
}