const nodemailer = require('nodemailer');

// Renderiza la página de contacto
exports.renderContactPage = (req, res) => {
    res.render('contact');
};

// Maneja el envío del formulario de contacto
exports.handleContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Validar los datos del formulario
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        

        // Configura el transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Tu correo electrónico
                pass: process.env.EMAIL_PASS // Tu contraseña o clave de aplicación
            },
            debug: true, // Habilita el modo de depuración
            logger: true // Habilita el registro detallado
        });

        

        // Configura el correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USER, // Tu correo configurado en .env
            to: process.env.EMAIL_USER, // Correo del destinatario (proporcionado en el formulario)
            subject: `Nuevo mensaje de contacto: ${subject}`,
            text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
        };

        

        // Envía el correo
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info);

        res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error.message);
        console.error('Detalles del error:', error);
        res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
    }
};