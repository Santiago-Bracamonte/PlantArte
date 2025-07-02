# PlantArte 🪴

Un proyecto de e-commerce de plantas desarrollado con React, que simula una tienda online con gestión de catálogo, carrito de compras, autenticación de usuarios (clientes y administradores), y un panel de administración para gestionar productos y usuarios.

## Características Principales

-   **Catálogo de Productos**: Explora una amplia variedad de plantas con filtros por categoría y búsqueda por nombre/descripción.
-   **Detalle de Producto**: Visualiza información detallada de cada planta, incluyendo stock y precio.
-   **Carrito de Compras**: Agrega y elimina productos, ajusta cantidades y calcula el total de la compra.
-   **Autenticación de Usuarios**:
    -   **Clientes**: Pueden navegar por el catálogo y gestionar su carrito.
    -   **Administradores**: Acceso a un panel de administración.
-   **Panel de Administración**:
    -   **Gestión de Productos**: Agregar, editar y eliminar plantas del catálogo.
    -   **Gestión de Usuarios**: Editar roles de usuarios existentes y eliminar usuarios (con restricción para no auto-eliminarse).
-   **Rutas Protegidas**: Acceso restringido al panel de administración solo para usuarios con rol 'admin'.
-   **Navegación Intuitiva**: Uso de React Router DOM para una experiencia de usuario fluida.

## Tecnologías Utilizadas

-   **React**: Biblioteca principal para la construcción de la interfaz de usuario.
-   **React Router DOM**: Para la gestión de rutas y navegación.
-   **HTML5 / CSS3**: Estructura y estilos de la aplicación.
-   **JavaScript**: Lógica de programación.
-   **Git / GitHub**: Control de versiones y alojamiento del proyecto.

## Instalación y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Santiago-Bracamonte/PlantArte.git](https://github.com/Santiago-Bracamonte/PlantArte.git)
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd PlantArte
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Inicia la aplicación en modo desarrollo:**
    ```bash
    npm start
    ```
    Esto abrirá la aplicación en tu navegador en http://localhost:3000.

## Datos de Acceso de Prueba

Puedes usar los siguientes datos para probar las funcionalidades de autenticación:

-   **Administrador:**
    -   **Usuario:** `admin`
    -   **Contraseña:** `admin123`
-   **Cliente:**
    -   **Usuario:** `cliente`
    -   **Contraseña:** `cliente123`
