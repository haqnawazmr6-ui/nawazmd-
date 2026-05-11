const os = require('os')
const http = require('http')

// Simple Web Server
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('NAWAZ MD BOT RUNNING')
}).listen(process.env.PORT || 8000)

// RAM Cleaner
setInterval(() => {
    try {
        if (global.gc) {
            global.gc()
        }
    } catch (e) {
        console.log(e)
    }
}, 60000)

// Anti Crash
process.on('uncaughtException', err => {
    console.log('Uncaught Exception:', err)
})

process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection:', err)
})

// Speed Status
setInterval(() => {
    try {
        const memory = process.memoryUsage()

        console.log(`
╭━━〔 NAWAZ MD SPEED 〕━━⬣
┃ RAM Used : ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB
┃ RAM Total: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB
┃ CPU Load : ${os.loadavg()[0].toFixed(2)}
╰━━━━━━━━━━━━━━⬣
`)
    } catch (e) {
        console.log(e)
    }
}, 120000)

require('events').EventEmitter.defaultMaxListeners = 50
