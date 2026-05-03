const express = require("express");
const app = express();

app.get("/wa-unban", (req, res) => {
    const number = req.query.number;

    if (!number) {
        return res.json({
            status: true,
            message: "Please provide number ?number=923087069523"
        });
    }

    const text = `Hello WhatsApp Support,

My phone number: +${923087069523}

My WhatsApp account has been banned. I believe this was a mistake. I have always followed WhatsApp's terms of service.

Kindly review my account and restore access as soon as possible.

Thank you.`;

    res.json({
        status: true,
        api_name: "WA UNBAN API",
        number: number,
        unban_link: "https://www.whatsapp.com/contact",
        message: text
    });
});

app.listen(3000, () => {
    console.log("WA Unban API running on port 3000");
});
