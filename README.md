# Apuntes sobre express-validator en Node.js / Express

## 1️⃣ Qué es `express-validator`

`express-validator` es un conjunto de middlewares para **validar y sanear datos** que llegan en `req.body`, `req.params` o `req.query` en Express.

- Permite definir reglas de validación fácilmente.
- Permite manejar errores de validación de forma centralizada.
- Es especialmente útil en aplicaciones REST donde recibimos datos del usuario.

---

## 2️⃣ Uso básico

1. **Importación de funciones**

```jsx
import { check, body, param } from 'express-validator';
```

- `check()` → valida campos de `body`, `query` o `params` (genérico).
- `body()` → valida específicamente campos del cuerpo de la petición.
- `param()` → valida parámetros de la ruta (`req.params`).
1. **Middleware de validación**

```jsx
import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}
```

- `validationResult(req)` devuelve los errores de las validaciones previas.
- Si hay errores, se detiene la petición y se devuelve `status 400`.
- Si todo está correcto, se llama a `next()` para continuar con el controlador.

## 3️⃣ Validaciones en el ejemplo

### a) Validar parámetros de ruta

```jsx
router.get('/:dni', 
    param('dni')
        .matches(/^\d+[A-Za-z]$/)
        .withMessage('DNI: debe terminar con una letra y estar compuesto por números seguidos de una letra.'),
    otroMiddleware,
    controlador.usuarioGet
);
```

- Se valida que `dni` siga un patrón: números seguidos de una letra.
- Se puede personalizar el mensaje de error con `.withMessage()`.
- Se pueden añadir middlewares adicionales antes del controlador (`otroMiddleware`).

### **b) Validar datos en `POST` y `PUT`**

```jsx
router.post('/', [
    check('dni').custom(dniExiste).withMessage('Este usuario ya existe.'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 3 letras').isLength({ min: 3 }),
    check('email', 'El correo no es válido').isEmail(),
    body('clave','El campo clave no es correcto').isInt().isLength({ max:3 }),
    body('edad','Valores de edad no correctos').custom(edadCorrecta),
    check('tfno', 'Teléfono incorrecto').isMobilePhone(),
    check('rol', 'Rol incorrecto').isIn(['Admin','Mindundi']),
    validarCampos
], controlador.usuariosPost);
```

### **c) Middleware adicional**

```jsx
export const esMayor = (req, res, next) => {
    if (req.body.edad < 18) {
        return res.status(403).json({ message: "No autorizado por menor de edad" });
    }
    next();
};
```

- Middleware propio que valida lógica adicional, por ejemplo, edad mínima.
- Se puede combinar con express-validator para control completo de la entrada de datos.

---

## **4️⃣ Validaciones asincrónicas con DB**

```jsx
export const dniExiste = (dni = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.dniExisteValidator(dni)
        .then(msg => resolve(true))
        .catch(err => reject(new Error('DNI NO existe')));
    });
};
```

- Permite verificar datos en la base de datos antes de procesarlos.
- Muy útil para evitar duplicados (ej. DNI o email).
- Debe devolver **Promise** o usar **async/await** para integrarse con express-validator.

---

---

## 5️⃣ Buenas prácticas

1. **Separar validaciones**:
    - Middleware de validación (`validarCampos`) separado del controlador.
    - Funciones de validación personalizadas (`dniExiste`, `edadCorrecta`) separadas en helpers.
2. **Errores claros**:
    - Siempre devolver mensajes descriptivos con `.withMessage()`.
    - Para validaciones DB, capturar errores y dar respuesta coherente.
3. **Reusar validaciones**:
    - Crear funciones personalizadas que puedas aplicar en POST/PUT, evitando repetir lógica.
4. **Middleware adicional**:
    - Combinable con express-validator, por ejemplo, `esMayor` o `otroMiddleware`.

---

## **6️⃣ Diferencias importantes**

| Concepto | Express-validator | Validaciones manuales en controlador |
| --- | --- | --- |
| Declarativo | ✅ reglas definidas en ruta | ❌ lógica manual dentro del controlador |
| Reutilizable | ✅ middleware y funciones custom | ❌ repetir código cada vez |
| Validación de DB | ✅ usando `custom()` con promesas | ✅ manual, requiere await y try/catch |
| Manejo de errores | ✅ centralizado con `validarCampos` | ❌ disperso en varios catch |

💡 **Resumen:**

> express-validator permite asegurar la calidad de los datos antes de que lleguen a la lógica de negocio, combinando reglas predefinidas, validaciones personalizadas y promesas/async para consultas a la base de datos. Además, separa responsabilidades: validación → middleware, lógica → controlador.
>