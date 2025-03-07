// Ruta para listar propiedades activas y seleccionar una para editar
const { Owner } = require('../models');

const createOwner = async (req, res) => {
    try {
        const { nombre, apellido, tipo_documento, numero_documento, telefono, email, direccion, ciudad } = req.body;

        // Crear un nuevo propietario en la base de datos
        await Owner.create({
            nombre,
            apellido,
            tipo_documento,
            numero_documento,
            telefono,
            email,
            direccion,
            ciudad
        });

        // Redirigir a una página de éxito o lista de propietarios
        res.redirect('/admin/list-owners'); // Asegúrate de que esta ruta exista
    } catch (error) {
        console.error('Error al crear el propietario:', error);
        res.status(500).send('Error al crear el propietario');
    }
};

const showCreateForm = (req, res) => {
    res.render('owner/create-owner');
};

const listOwners = async (req, res) => {
    try {
        const owners = await Owner.findAll();
        res.render('owner/list-owner', { owners });
    } catch (error) {
        console.error('Error al listar los propietarios:', error);
        res.status(500).send('Error al listar los propietarios');
    }
};

module.exports = {
    createOwner,
    showCreateForm,
    listOwners,
};

