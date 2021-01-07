const mqtt = require('async-mqtt')

const client = mqtt.connect('mqtt://test.mosquitto.org:1883')

const topic = process.argv[2]
const message = process.argv[3]

const publish = async () => {
    // publish a message
    await client.publish(topic, message)
    console.info('Published...')
    // client, close connection
    await client.end()
}

// wait for connection
client.on('connect', publish)