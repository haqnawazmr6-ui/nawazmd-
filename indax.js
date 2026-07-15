// ===============================
// NAWAZ MD - WhatsApp Bot
// Main Index.js
// Powered By Nawaz MD
// ===============================

require('dotenv').config();

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const path = require("path");
const pino = require("pino");
const chalk = require("chalk");
const NodeCache = require("node-cache");

const config = require("./config");

const msgRetryCounterCache = new NodeCache();

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState(
        "./session"
    );

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        browser: [
            "NAWAZ MD",
            "Chrome",
            "1.0.0"
        ],
        msgRetryCounterCache
    });


    // Save Session
    sock.ev.on(
        "creds.update",
        saveCreds
    );


    // Connection Update
    sock.ev.on(
        "connection.update",
        async (update) => {

            const {
                connection,
                lastDisconnect
            } = update;


            if(connection === "open") {

                console.log(
                    chalk.green(
                    `
╭━━━〔 🚀 NAWAZ MD 〕━━━⬣
┃ ✅ BOT CONNECTED
┃ ⚡ STATUS : ONLINE
┃ 🔥 POWER BY NAWAZ MD
╰━━━━━━━━━━━━━━⬣
                    `
                    )
                );

            }


            if(connection === "close") {

                let reason =
                lastDisconnect?.error?.output?.statusCode;


                if(reason === DisconnectReason.loggedOut){

                    console.log(
                        chalk.red(
                        "❌ Logged Out. Delete session and pair again."
                        )
                    );

                } else {

                    console.log(
                        chalk.yellow(
                        "♻️ Reconnecting..."
                        )
                    );

                    startBot();

                }
            }

        }
    );

}

startBot();

process.on(
    "uncaughtException",
    console.log
);

process.on(
    "unhandledRejection",
    console.log
);
// ===============================
// Plugins Loader
// ===============================

const pluginsPath = path.join(__dirname, "plugins");

if (!fs.existsSync(pluginsPath)) {
    fs.mkdirSync(pluginsPath);
}


let commands = [];


function loadPlugins() {

    fs.readdirSync(pluginsPath)
    .filter(file => file.endsWith(".js"))
    .forEach(file => {

        try {

            let plugin = require(
                path.join(
                    pluginsPath,
                    file
                )
            );

            if(plugin.command){

                commands.push(plugin);

                console.log(
                    chalk.green(
                    `✅ Loaded Plugin : ${file}`
                    )
                );

            }

        } catch(err){

            console.log(
                chalk.red(
                `Plugin Error ${file}`
                ),
                err
            );

        }

    });

}


loadPlugins();


// ===============================
// Message Handler
// ===============================

sock.ev.on(
"messages.upsert",
async ({messages})=>{

    try {

        let msg = messages[0];

        if(!msg.message) return;

        let text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";


        let prefix =
        config.PREFIX || ".";


        if(!text.startsWith(prefix))
        return;


        let args =
        text.slice(prefix.length)
        .trim()
        .split(/ +/);


        let command =
        args.shift()
        .toLowerCase();


        let plugin =
        commands.find(
        (cmd)=>
        cmd.command.includes(command)
        );


        if(!plugin)
        return;


        await plugin.function(
            sock,
            msg,
            args
        );


    } catch(error){

        console.log(
            "Message Error:",
            error
        );

    }

});
// ===============================
// Owner System
// ===============================

function isOwner(jid){

    let owners = [
        config.OWNER_NUMBER
    ];

    return owners.includes(
        jid.split("@")[0]
    );

}


// ===============================
// Auto Settings
// ===============================

sock.ev.on(
"messages.upsert",
async ({messages})=>{

    let msg = messages[0];

    if(!msg.message) return;


    let jid = msg.key.remoteJid;


    // Auto View Status
    if(config.AUTO_VIEW_STATUS){

        if(jid === "status@broadcast"){

            await sock.readMessages(
                [msg.key]
            );

        }

    }


    // Auto Typing
    if(config.AUTO_TYPING){

        await sock.sendPresenceUpdate(
            "composing",
            jid
        );

    }


    // Auto Recording
    if(config.AUTO_RECORDING){

        await sock.sendPresenceUpdate(
            "recording",
            jid
        );

    }

});


// ===============================
// Startup Info
// ===============================

console.log(
chalk.cyan(
`
╭━━━〔 🚀 NAWAZ MD 〕━━━⬣
┃ 🤖 WhatsApp Bot Started
┃ ⚡ Baileys Engine Active
┃ 🔌 Plugins Ready
┃ 🔥 Power By NAWAZ MD
╰━━━━━━━━━━━━━━⬣
`
)
);
// ===============================
// Pairing Code Support
// ===============================

sock.ev.on(
"connection.update",
async(update)=>{

    const {
        connection,
        qr
    } = update;


    if(
        connection === "connecting" &&
        !sock.authState?.creds?.registered
    ){

        try {

            let phone =
            config.PAIR_NUMBER ||
            process.env.PAIR_NUMBER;


            if(phone){

                let code =
                await sock.requestPairingCode(
                    phone
                );

                console.log(
                    chalk.yellow(
                    `
╭━━━〔 🔐 PAIR CODE 〕━━━⬣
┃ ${code}
┃ NAWAZ MD
╰━━━━━━━━━━━━━━⬣
                    `
                    )
                );

            }

        } catch(e){

            console.log(
                "Pair Error:",
                e
            );

        }

    }

});


// ===============================
// MongoDB Session (Optional)
// ===============================

if(config.MONGODB_URL){

    console.log(
        chalk.green(
        "✅ MongoDB Session Enabled"
        )
    );

}else{

    console.log(
        chalk.yellow(
        "⚠️ MongoDB Not Connected - Using Local Session"
        )
    );

}


// ===============================
// Anti Crash System
// ===============================

process.on(
"uncaughtException",
(err)=>{

console.log(
chalk.red(
"⚠️ Uncaught Exception:"
),
err
);

});


process.on(
"unhandledRejection",
(err)=>{

console.log(
chalk.red(
"⚠️ Unhandled Rejection:"
),
err
);

});


// ===============================
// Auto Garbage Collection
// ===============================

setInterval(()=>{

if(global.gc){

    global.gc();

    console.log(
    chalk.blue(
    "♻️ Memory Cleaned"
    )
    );

}

}, 30 * 60 * 1000);


// ===============================
// Final Ready Message
// ===============================

console.log(
chalk.green(
`
╭━━━〔 🚀 NAWAZ MD 〕━━━⬣
┃ ✅ SYSTEM READY
┃ ⚡ BAILEYS ONLINE
┃ 🔌 PLUGINS LOADED
┃ 🔐 SESSION ACTIVE
┃ 🔥 POWER BY NAWAZ MD
╰━━━━━━━━━━━━━━⬣
`
)
);