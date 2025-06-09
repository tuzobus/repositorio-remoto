# Convención de Código – VentaDB

Por Marco Iván Flores Villanueva y Oswaldo Isaías Hernández Santes

## Nombres de Archivos y Carpetas

- Los **nombres de archivos** deben estar en `kebab-case`.
  - Ej: `cuentas.controller.js`, `ventas.routes.js`, `formulario-importacion.ejs`
- Las **carpetas** deben estar también en `kebab-case`.
  - Ej: `/controllers`, `/routes`, `/views/dashboard-vendedor`

---

## Estructura del Proyecto

```
ventadb/
├── auth/
│   └── passport.js
├── controllers/
│   ├── admin.controllers.js
│   ├── archivos.controllers.js
│   ├── clientes.controllers.js
│   ├── importar.controllers.js
│   ├── plantillas.controllers.js
│   ├── usuario.controllers.js
│   └── ventas.controllers.js
├── middleware/
│   └── auth.middleware.js
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── scripts.js
├── routes/
│   ├── admin.routes.js
│   ├── archivos.routes.js
│   ├── clientes.routes.js
│   ├── importar.routes.js
│   ├── plantillas.routes.js
│   ├── usuario.routes.js
│   └── ventas.routes.js
├── views/
│   ├── includes/
│   │   └── head.ejs
│   ├── clientes/
│   │   └── index.ejs
│   ├── plantillas/
│   │   ├── crear.ejs
│   │   ├── detalle.ejs
│   │   └── guardadas.ejs
│   ├── ventas/
│   │   └── index.ejs
│   ├── contacto.ejs
│   ├── dashboard-vendedor.ejs
│   ├── dashboard.ejs
│   ├── form-csv.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── register.ejs
├── db.js
├── index.js
├── package.json
├── package-lock.json

```

---

## Convenciones Generales

### 1. Variables y Funciones

- **camelCase** para variables y funciones:
    
    ```js
    const nombreUsuario = req.session.user.nombre_usuario;
    function generarInvitacion() {}
    ```
    
- Constantes en **MAYUS_SNAKE_CASE**:
    
    ```js
    const SECRET = '...';
    ```

---

### 2. Controladores (`controllers/*.controllers.js`)

- Una función por acción lógica (vista, acción, API, etc.)
    
- Nombre de función clara y descriptiva: `vistaDashboardVendedor`, `generarPDFCuenta`, etc.
    
- Siempre usar `try / catch` si hay `await`.

---

### 3. Rutas (`routes/*.routes.js`)

- Importar middlewares en la parte superior.
    
- Agrupar rutas por recurso (ej: ventas, cuentas, plantillas).
    
- Ej. rutas restful:
    
    - `GET /ventas`
    - `POST /ventas`

---

### 4. Vistas (`views/*.ejs`)

- Archivos `.ejs` con nombres claros por función o vista.
    
    - Ej: `dashboard-vendedor.ejs`, `detalle-cuenta-cliente.ejs`
        
- Incluir cabecera con `<%- include('includes/head.ejs') %>`

---

### 5. Estilo de Código (JS)

- Indentación: 4 espacios (convención JS).
    
- Comillas: simples `'` para JS
    
- Siempre usar `const` por defecto, `let` solo si se reasigna.

---

### 6. Base de Datos

- Tablas en snake_case.
    
- Campos en snake_case.
    
- Claves primarias preferentemente como `id` (ej. `id_venta`).
    
- Uso de `utf8mb4_unicode_ci` como `COLLATE` por defecto (para compatibilidad con servidor AWS Ubuntu)
    
- Uso de `InnoDB` como `ENGINE` por defecto

---

## Seguridad

- Nunca dejar contraseñas o tokens en el código fuente.

- Manejar datos muestra del socio formador sólo en ambiente local.

---

## Comentarios

- Solo comentarios necesarios para clarificar bloques o decisiones especiales.

```js
// Verifica que el cliente haya comentado en el live
/* Limita el ancho de la columna de descripción */
```

---

## Buenas prácticas

- Validar todos los datos del usuario del lado del servidor.
    
- Reutilizar componentes EJS y funciones JS.
	
- Utilización de patrón de arquitectura MVC.

---

## A evitar

- Lógica compleja directamente en vistas `.ejs`.
	
- Variables con nombres ambiguos como `data`, `res`, `temp`, etc.

---

## Testing y Validación

- Toda ruta POST debe validar el cuerpo (`req.body`)
    
- Agregar mensajes de éxito/error en `req.flash`.
    
- Validar sesiones y roles con `ensureAuthenticated` y `checkRole`.

---

## UI

- UI basada en Bootstrap
	
- Botones con clases `main-btn` y `accent-btn` para estilos princpales.
    
- Tablas con `Grid.js` deben tener:
    
    - Paginación
        
    - Búsqueda
        
    - Estilo `table table-striped table-hover`
