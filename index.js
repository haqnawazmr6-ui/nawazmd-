//═══════════════════════════════//
//           NAWAZ-MD            //
//═══════════════════════════════//

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//═══════════════════════════════//
//          BOT START            //
//═══════════════════════════════//

async function startBot() {

    console.log(`
╔════════════════════════════╗
║        NAWAZ-MD            ║
║      BOT STARTED           ║
╚════════════════════════════╝
`);

    //═══════════════════════════//
    //     LOAD PLUGINS         //
    //═══════════════════════════//

    const pluginsPath = path.join(__dirname, "./plugins");

    if (fs.existsSync(pluginsPath)) {

        fs.readdirSync(pluginsPath).forEach((file) => {

            if (file.endsWith(".js")) {

                require(path.join(pluginsPath, file));

                console.log(`Loaded Plugin → ${file}`);
            }

        });

    } else {

        console.log("Plugins folder not found");

    }

    //═══════════════════════════//
    //      BOT ONLINE          //
    //═══════════════════════════//

    console.log("Bot Connected Successfully");

}

//═══════════════════════════════//
//          WEB SERVER           //
//═══════════════════════════════//

app.get("/", (req, res) => {
    res.send(`
    <h2>NAWAZ-MD BOT RUNNING ✅</h2>
    `);
});

app.listen(PORT, () => {

    console.log(`Web Server Running On Port ${PORT}`);

    startBot();

});

//═══════════════════════════════//
//           ERROR LOG           //
//═══════════════════════════════//

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:");
    console.log(err);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:");
    console.log(err);
});
