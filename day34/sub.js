const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://test.mosquitto.org:1883')

// wait for connection
client.on('connect', () => {
    console.info('Connected')
    //subscribe to a topic
    client.subscribe('mytopic', (err, granted) => {
        // check if there are any error
        if (null != err) {
            console.error('subscription error: ', err)
            process.exit(-1)
        }
        console.info('granted: ', granted)

        //listen to incoming messages from the topic
        client.on('message', (topic, payload) => {
            const data = payload.toString()
            console.info(`topic: ${topic}, payload: ${data}`)
        })
    })
})