const os = require('os')

// RAM Cleaner
setInterval(() => {
    if (global.gc) {
        global.gc()
    }
}, 60000)

// Anti Crash
process.on('uncaughtException', err => {
    console.log(err)
})

process.on('unhandledRejection', err => {
    console.log(err)
})

// Speed Status
setInterval(() => {
    const memory = process.memoryUsage()

    console.clear()

    console.log(`
╭━━〔 NAWAZ MD SPEED 〕━━⬣
┃ RAM Used : ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB
┃ RAM Total: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB
┃ CPU Load : ${os.loadavg()[0].toFixed(2)}
╰━━━━━━━━━━━━━━⬣
`)
}, 120000)

require('events').EventEmitter.defaultMaxListeners = 50
