const qrcode = require('qrcode-terminal');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.options('*', cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<a href="/">Test API</a>')
})

app.post('/send-message', (req, res) => {
    client.destroy()
    const phone = req.body.phone + '@c.us';
    const message = req.body.message;

    client.on('ready', () => {
        try {
            client.sendMessage(phone, message);
            res.json({
                status : 200,
                phone : phone.split('@')[0],
                message : message
            })
        } catch (err) {
            res.json({
                status : 400,
                phone : phone.split('@')[0],
                message : message
            })
        }
    });
    
    client.initialize()
})

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const content = message.body;
	if(content === 'ping') {
		// message.reply('pong');
        // client.sendMessage('6282131096091@c.us', 'pong')
        client.sendMessage(message.from, 'Hello World!')
	}
});

client.initialize()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
