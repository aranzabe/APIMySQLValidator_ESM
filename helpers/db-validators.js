import { pool } from '../database/Conexion.js';

export const dniYaExiste = async (dni = '') => {
    const [rows] = await pool.query('SELECT DNI FROM personas WHERE DNI = ?', [dni]);
    if (rows.length > 0) {
        throw new Error('Este usuario ya existe');
    }
    return true;
};

export const edadCorrecta = (edad) => {
    if (edad < 0) {
        throw new Error('Edad incorrecta');
    }
};
