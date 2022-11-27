# Resume-app

Small app built with Angular, Node and Express to act as a digital resume. App and backend are deployed on Heroku. Live app can be viewed at [raphaelg.tech](https://raphaelg.tech)

Tools used:

* Angular
* NodeJS
* ExpressJS
* Nodemailer
* Google Recaptcha V2

## NodeJS backend server

The app uses a backend to send emails to my inbox, which I'm including here as it isn't large or complex enough to merit its own repository:
### server.js
```
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/sendmail", (req, res) => {
    let { name, email, message } = req.body;

    console.log('trying to send email...');
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    const details = {
      from: email,
      to: process.env.RECIPIENT,
      subject: 'From my resume app',
      html: `<h1>${name} - ${email}</h1><div>${message}</div>`
    };

    transporter.sendMail(details)
    .then(msg => {
      res.send({ message: 'ok' });
    })
    .catch(err => {
      res.send({ message: 'error' });
    });
});

app.get("/", (req, res) => {
  res.send({});
});

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening");
});
```
