
module.exports = (queue, interval) => {
	console.info(`Starting poller at ${interval}ms interval...`);
	setTimeout(
		async function poller() {

			if (queue.length > 0) {
				// Get a job from the queue
				const work = queue.shift()

				console.info(`Running job at ${new Date()}`)
				// schedule to run next tick after interval elapsed
				process.nextTick(async () => {
					await work()
				})
			}


			// schedule the next call
			setTimeout(poller, interval)
		},
		interval
	)
}
