# Frontend del Proyecto Aplicación de gestión de tareas

Este es el frontend del proyecto desarrollado con **Vite**, **React**, **Redux Toolkit** y **Tailwind CSS**. Este frontend está conectado con un backend que gestiona la autenticación de usuarios y el manejo de tareas.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Estilos y Componentes](#estilos-y-componentes)
- [Reto del Proyecto](#reto-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Instalación

Para correr este proyecto en tu máquina local, sigue los siguientes pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio-frontend.git
cd tu-repositorio-frontend
```

### 2. Instalar dependencias
```bash
nvm use
npm install
```
## Variables de Entorno
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MiApp
```
Estas variables permiten al frontend comunicarse con el backend para realizar peticiones API y autenticación de usuarios.

## Scripts Disponibles
En este proyecto, puedes usar los siguientes scripts:
```npm run dev```: Inicia el servidor de desarrollo.

## Estilos y Componentes

### Estilos
El proyecto utiliza Tailwind CSS para el manejo de estilos, lo que permite una personalización rápida y eficiente. Los formularios de registro, inicio de sesión y la lista de tareas usan estilos reutilizables y están diseñados para ser responsivos y accesibles.

### Componentes
Los principales componentes son:
* **Formulario de Tareas:** Un formulario interactivo con campos de entrada resaltantes, optimizado para UX.
* **Lista de Tareas:** Organizada en forma de cartas, permite marcar tareas como completadas.

## Reto del Proyecto

Uno de los mayores retos fue integrar el sistema de autenticación basado en JWT en el frontend. Este proceso incluyó el manejo de tokens y asegurar que las peticiones API enviaran el token para crear y editar tareas protegidas.

El uso de **Redux Toolkit** permitió gestionar el estado global de la aplicación, especialmente para el manejo de tareas y la autenticación del usuario.

**Nota**: Este proyecto aún está en desarrollo, y estoy abierto a colaboraciones y sugerencias sobre cómo afrontar este desafío. Si tienes ideas o quieres contribuir, no dudes en contactarme.

## Tecnologías Utilizadas
* **Vite:** Como herramienta de desarrollo para un rendimiento óptimo.
* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **Redux Toolkit:** Manejo del estado de la aplicación.
* **Tailwind CSS:** Framework de utilidades CSS para el diseño.
* **Axios:** Para hacer peticiones HTTP.
* **JWT:** Para la autenticación de usuarios.




















