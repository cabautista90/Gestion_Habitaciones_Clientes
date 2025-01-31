# 📘 Gestión de Reservas

Este proyecto es una aplicación web para gestionar reservas de habitaciones en un hotel, permitiendo administrar clientes, habitaciones y reservas con validaciones integradas.

Integrantes:

-Carlos Bautista
-Cinthya Guzman
-Bryan Jumbo

---

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/cabautista90/Gestion_Habitaciones_Clientes.git
cd gestion-reservas
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar la aplicación
```bash
npm start
```
Esto iniciará un servidor de desarrollo en `http://localhost:3000`.

---

## 🛠 Funcionalidades Implementadas

### 📌 Gestión de Clientes
- Agregar nuevos clientes con validación de correo y nombre.
- Editar y eliminar clientes.
- Persistencia de datos con `localStorage`.

### 📌 Gestión de Habitaciones
- Listado de habitaciones con tipo y precio.
- Agregar nuevas habitaciones y tipos personalizados.
- Editar y eliminar habitaciones.

### 📌 Gestión de Reservas
- Crear reservas seleccionando un cliente, una habitación y un rango de fechas.
- Validación de fechas para evitar solapamientos en habitaciones reservadas.
- Editar y eliminar reservas.

---

## 📄 Notas
- La aplicación almacena los datos en `localStorage`.
- Se recomienda utilizar un backend para almacenamiento persistente en producción.

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT.

---

## 🤝 Contribuciones
Las contribuciones son bienvenidas. ¡Siéntete libre de abrir un issue o pull request!

