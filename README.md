# ChemReact — Tabla Periódica Interactiva

Aplicación web de página única (SPA) desarrollada con React para el Segundo Parcial de la materia de **Computación Web** en la Universidad de las Fuerzas Armadas ESPE.

## Descripción

ChemReact permite explorar los 118 elementos de la tabla periódica, calcular la masa molar de compuestos químicos, guardar elementos favoritos y consultar el historial de búsquedas. Los datos del usuario se persisten en una base de datos MySQL a través de un backend Node.js/Express.

## Equipo de Trabajo

| Integrante | Rol |
|---|---|
| Lisseth Torres | Desarrolladora de Software |
| Noelia Mendoza | Desarrolladora de Software |

## Funcionalidades

- Exploración interactiva de los 118 elementos de la tabla periódica
- Panel de detalle con propiedades de cada elemento (masa atómica, punto de fusión/ebullición, densidad, electronegatividad, configuración electrónica)
- Búsqueda por nombre, símbolo o número atómico
- **Calculadora de masa molar** — soporta fórmulas con paréntesis anidados (`H2O`, `Ca(OH)2`, `Al2(SO4)3`)
- Sistema de autenticación (registro e inicio de sesión)
- Gestión de elementos favoritos
- Historial de elementos consultados
- Historial de cálculos de masa molar

## Tecnologías Utilizadas

**Frontend**
- React 19
- React Router DOM 7
- CSS Modules
- React Icons

**Backend**
- Node.js
- Express
- bcryptjs

**Base de datos**
- MySQL (XAMPP)
- mysql2

**API Externa**
- [Periodic Table JSON](https://github.com/Bowserinator/Periodic-Table-JSON) — datos de los 118 elementos químicos

## Estructura del Proyecto

```
P2_Proyecto_CW_Torres_Mendoza/
├── backend/                    # Servidor Node.js/Express
│   ├── controllers/
│   │   ├── usuarios.controller.js
│   │   ├── favoritos.controller.js
│   │   ├── historial.controller.js
│   │   └── calculos.controller.js
│   ├── db.js                   # Conexión MySQL
│   ├── server.js               # Punto de entrada del servidor
│   └── package.json
├── database/
│   └── chemreact.sql           # Script de creación de tablas
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── element-card/       # Celda de la tabla periódica
│   │   ├── search-bar/         # Barra de búsqueda
│   │   ├── info-card/          # Tarjeta de característica
│   │   ├── miembro-card/       # Tarjeta de integrante
│   │   ├── molar-card/         # Tarjeta de resultado molar
│   │   ├── header/             # Barra de navegación
│   │   ├── footer/             # Pie de página
│   │   └── layout/             # Estructura base
│   ├── context/
│   │   └── ChemicalContext.jsx # Estado global (usuario, favoritos)
│   ├── hooks/
│   │   └── useCalculadora.js   # Lógica del parser de fórmulas
│   ├── pages/
│   │   ├── inicio/             # Página de bienvenida
│   │   ├── tabla/              # Tabla periódica interactiva
│   │   ├── calculadora/        # Calculadora de masa molar
│   │   ├── favoritos/          # Elementos favoritos del usuario
│   │   ├── historial/          # Historial de consultas
│   │   ├── acerca/             # Información del proyecto
│   │   ├── equipo/             # Equipo de trabajo
│   │   ├── login/              # Inicio de sesión
│   │   └── registro/           # Registro de usuario
│   └── services/
│       └── chemistry-service.js # Llamadas a la API y al backend
└── .env                        # Variables de entorno
```

## Instalación y Ejecución

### Requisitos previos
- Node.js v18+
- XAMPP (Apache + MySQL)

### 1. Base de datos

1. Inicia MySQL desde XAMPP
2. Abre `http://localhost/phpmyadmin`
3. Crea una base de datos llamada `chemreact`
4. Importa el archivo `database/chemreact.sql`

### 2. Backend

```bash
cd backend
npm install
node server.js
```

El servidor corre en `http://localhost:3001`

### 3. Frontend

```bash
npm install
npm run dev
```

La aplicación corre en `http://localhost:5173`

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_ELEMENTOS=https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json
VITE_API_PHP=http://localhost:3001/api
```

## Conceptos de React Aplicados

- **Componentes funcionales** — toda la UI está construida con funciones
- **Props** — comunicación entre componentes padre e hijo con PropTypes
- **useState** — manejo de estado local en formularios, listas y UI
- **useEffect** — carga de datos al montar componentes
- **useContext** — estado global con ChemicalContext (usuario, favoritos)
- **useCallback / useRef** — optimización del hook de la calculadora
- **React Router** — navegación entre páginas sin recarga
- **CSS Modules** — estilos encapsulados por componente
- **Custom Hook** — `useCalculadora` para separar lógica de negocio del JSX
