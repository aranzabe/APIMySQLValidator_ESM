import { response, request } from 'express';
import { pool } from '../database/Conexion.js';

const controlador = {
    usuariosGet: async (req, res = response) => {
        try {
            const [rows] = await pool.query('SELECT * FROM personas');
            return res.status(200).json(rows);
        } catch (err) {
            if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
                return res.status(500).json({ error: 'Error de conexión a la Base de Datos (credenciales incorrectas)' });
            }
            if (err && err.code === 'ECONNREFUSED') {
                return res.status(500).json({ error: 'No se puede conectar al servidor MySQL' });
            }
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    usuarioGet: async (req, res = response) => {
        try {
            const [rows] = await pool.query('SELECT * FROM personas WHERE DNI = ?', [req.params.dni]);
            if (!rows || rows.length === 0) {
                return res.status(404).json({ msg: 'No se han encontrado registros' });
            }
            return res.status(200).json(rows);
        } catch (err) {
            if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
                return res.status(500).json({ error: 'Error de conexión a la Base de Datos (credenciales incorrectas)' });
            }
            if (err && err.code === 'ECONNREFUSED') {
                return res.status(500).json({ error: 'No se puede conectar al servidor MySQL' });
            }
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    usuariosPost: async (req = request, res = response) => {
        try {
            const [result] = await pool.query(
                'INSERT INTO personas VALUES (?,?,?,?)',
                [req.body.dni, req.body.nombre, req.body.clave, req.body.tfno]
            );
            return res.status(201).json(result);
        } catch (err) {
            if (err && err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'El usuario ya existe' });
            }
            if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
                return res.status(500).json({ error: 'Error de conexión a la Base de Datos (credenciales incorrectas)' });
            }
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    usuariosDelete: async (req, res = response) => {
        try {
            const [result] = await pool.query('DELETE FROM personas WHERE DNI = ?', [req.params.dni]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: 'No se ha encontrado el usuario' });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    usuariosPut: async (req, res = response) => {
        try {
            const [result] = await pool.query(
                'UPDATE personas SET Nombre=?,Clave=?,Tfno=? WHERE DNI = ?',
                [req.body.nombre, req.body.clave, req.body.tfno, req.params.dni]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: 'No se ha encontrado el usuario' });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default controlador