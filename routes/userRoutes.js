import { Router } from 'express';
import controlador from '../controllers/userController.js'
export const router = Router();

import { check, body, param } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { edadCorrecta, dniExiste } from '../helpers/db-validators.js';
import { otroMiddleware } from '../middlewares/userMiddlewares.js';


//El segundo parámetro (optativo) son los middlewares.
router.get('/', controlador.usuariosGet)
router.get('/:dni', param('dni').matches(/^\d+[A-Za-z]$/)
                    .withMessage('DNI: debe terminar con una letra y estar compuesto por números seguidos de una letra.'),
                    otroMiddleware,
            controlador.usuarioGet);
/*
En el post pondremos:
{
    "dni": "999",
    "nombre": "DAW2",
    "email" : "daw2@gmail.com",
    "clave": 2324,
    "tfno": "661 0234234 22",
    "rol" : "Admin"
  }

  Aunque los campos de email y rol no se están guardando realmente, es solo para probar el validator.
*/
router.post('/', 
[
    check('dni').custom( dniExiste ).withMessage('Este usuario ya existe.'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 3 letras').isLength({ min: 3 }),
    check('email', 'El correo no es válido').isEmail(),
    body('clave','El campo clave no es correcto').isInt().isLength({ max:3 }),
    body('edad','Valores de edad no correctos').custom(edadCorrecta),
    check('tfno', 'Teléfono incorrecto').isMobilePhone(),
    check('rol', 'Rol incorrecto').isIn(['Admin','Mindundi']),
    validarCampos
 ],
controlador.usuariosPost);

router.put('/:dni',param('dni')
          // .matches(/^\d{8}[A-Za-z]$/)
          .matches(/^\d+[A-Za-z]$/)
          .withMessage('DNI: debe terminar con una letra y estar compuesto por números seguidos de una letra.'),
          controlador.usuariosPut);
router.delete('/:dni', check('dni')
          .matches(/^\d+[A-Za-z]$/)
          .withMessage('DNI: debe terminar con una letra y estar compuesto por números seguidos de una letra.'), 
          [otroMiddleware,validarCampos],
          controlador.usuariosDelete);

//Formas de agrupar rutas. Lo del middleware podría ir en la clase server pero quizá sea más entendible aquí, justo antes de la agrupación de rutas.
// router.use('/acceso',[mids.otroMiddleware, mids.esMayor]); //Para agrupar rutas y aplicarles middlewares.
// router.route('/acceso') 
//     .get( (req, res) => { 
//         res.status(200).json({'msg':'Acceso con get!!'});
//     })
//     .post( (req, res) => {
//         res.status(202).json({'msg':'Acceso con post!!'});
//     });
