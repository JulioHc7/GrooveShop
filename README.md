 GrooveShop - E-Commerce de Instrumentos Musicales

Este es un proyecto de comercio electrónico fullstack. El sistema
conecta un backend transaccional en Java Spring Boot con un cliente interactivo en React.

Características Clave:

Catálogo Dinámico: 
Visualización estética de instrumentos musicales segmentados por categorías,
con imágenes reales consumidas desde una base de datos PostgreSQL/MySQL.

Gestión de Carrito en Tiempo Real: 
Lógica fluida en el lado del cliente utilizando React Hooks para añadir, actualizar
cantidades y calcular totales de forma instantánea.

Transaccionalidad y Control de Inventario:
El backend valida rigurosamente el stock antes de procesar cada compra. Si un producto de la
orden no cuenta con suficientes existencias, la base de datos ejecuta un Rollback automático
(@Transactional) previniendo compras inconsistentes.

Arquitectura del Sistema:

El proyecto sigue una arquitectura dividida en capas para garantizar
escalabilidad y mantenibilidad
Backend (Spring Boot)
Capa de Entidad (Model): Definición de esquemas
relacionales y mapeo de bases de datos mediante JPA/Hibernate (tablas instrumentos, pedidos y la tabla
intermedia detalles_pedido).
Capa de Repositorio: Interfaces que heredan de JpaRepository abstrayendo la
interacción con SQL de forma nativa.
Capa de Servicio: Contiene el núcleo lógico y transaccional para
procesar las órdenes de venta.
Capa de Controlador (API REST): Expone los endpoints HTTP
(/api/instrumentos y /api/pedidos) configurando CORS para habilitar el consumo seguro desde
el frontend.Frontend (React + Vite)
Diseñado con componentes reutilizables (InstrumentCard)
y estructurado siguiendo principios de diseño responsivo.
Consumo asíncrono de APIs mediante
fetch de JavaScript ES6+.

Stack Tecnológico:
Área             Tecnologías
Backend          Java(LTS 17/21) , Spring Boot 3 , Spring Data JPA , Hibernate , Lombok.
Frontend         React, Vite , JavaScript ES6+ , CSS Autocontenido.
Base de Datos    PostgreSQL.
Herramientas     Git/GitHub , Postman.

Instrucciones para Ejecución Local

Requisitos Previos:
Java JDK 25 o superior.Node.js v18 o superior.Base de datos PostgreSQL.

Configurar el Backend:
1. Clona este repositorio.Configura tus credenciales de base de datos en src/main/resources/application.properties.
2. Crea la base de datos local vacía llamada grooveshop_db.
3. Ejecuta el proyecto desde tu IDE o consola (mvn spring-boot:run).
4. La aplicación cargará automáticamente datos semilla de prueba mediante el componente DataInitializer.

Configurar el Frontend:
1. Navega a la carpeta del frontend: cd grooveshop-frontend.
2. Instala las dependencias: npm install.
3. Inicia el entorno de desarrollo: npm run dev.
4. Abre http://localhost:5173 en tu navegador.

Contacto 
Email: JulioHerre123@gmail.com
