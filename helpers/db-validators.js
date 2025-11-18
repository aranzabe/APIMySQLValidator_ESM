import { Conexion } from '../database/Conexion.js';

export const dniExiste = (dni = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.dniExisteValidator(dni)
        .then(msg => {
          console.log('Existe');
          resolve(true);
        })
        .catch(err => {
          console.log('No existe');
          reject(new Error('DNI NO existe'));
        });
    });
   };

   
export const edadCorrecta = async (edad)=>{
    if (edad <0){
        throw new Error('Edad incorrecta desde método');
    }
}


