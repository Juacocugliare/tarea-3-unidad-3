var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/" , async (req, res, next) => {

  console.log(req.body);

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "flavia.ursino@gmail.com",
    subject: "Contacto web",
    html: nombre + "Joaquin: " + email + ". <br> Ademas, hizo el siguiente comentario : " + mensaje + ". <br> Su tel es :" + telefono
   }

    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
      }
    });

    var info = await transport.sendMail(obj);

    res.render("index", {
      mensaje: "mensaje enviado correctamente"
    });
});


module.exports = router;
