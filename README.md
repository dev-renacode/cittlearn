# CITT Learn

**Sistema de aprendizaje colaborativo para el Centro de Innovación en Tecnología y Transformación (CITT) de DuocUC Sede Puente Alto**

---

## 📋 Descripción del Proyecto

CITT Learn es una plataforma web fullstack desarrollada para fomentar la colaboración entre estudiantes del CITT y apoyar su proceso de aprendizaje hacia el mundo profesional. La aplicación integra diferentes tracks tecnológicos, sistema de autenticación robusto, gestión de perfiles y funcionalidades de colaboración.

## 🎯 Objetivos

- Crear una plataforma accesible y responsiva para la comunidad CITT
- Implementar un sistema de autenticación seguro con correo institucional DuocUC
- Facilitar la colaboración entre estudiantes de diferentes tracks
- Proporcionar recursos y herramientas de aprendizaje especializadas

## 🛠️ Stack Tecnológico

### Frontend

- **React 19.1.1** - Framework principal
- **TypeScript 5.8.3** - Tipado estático
- **TailwindCSS 4.1.12** - Framework de estilos
- **React Router DOM 7.9.4** - Enrutamiento
- **Axios 1.12.2** - Cliente HTTP
- **Vite 7.1.2** - Build tool y dev server

### Backend (Conectado)

- **Node.js** - Runtime de servidor
- **Express.js** - Framework web
- **MongoDB** - Base de datos (en desarrollo)

### Herramientas de Desarrollo

- **ESLint** - Linter y formateador
- **TypeScript ESLint** - Reglas específicas para TS
- **React Hooks ESLint Plugin** - Reglas para hooks
- **Vite React SWC Plugin** - Compilador rápido

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd cittlearn
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_UPLOADS_URL=http://localhost:3000/uploads
VITE_APP_NAME=CITT Learn
VITE_APP_VERSION=1.0.0
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── auth/            # Componentes de autenticación
│   │   ├── Login.tsx    # Página de inicio de sesión
│   │   └── Register.tsx # Página de registro
│   ├── home/            # Componentes de la página principal
│   │   ├── Hero.tsx     # Sección hero
│   │   ├── SobreCittLearn.tsx # Información sobre CITT
│   │   └── Tracks.tsx   # Sección de tracks disponibles
│   ├── layout/          # Componentes de layout
│   │   ├── Footer.tsx   # Pie de página
│   │   ├── Layout.tsx   # Layout principal
│   │   └── Navbar.tsx   # Barra de navegación
│   ├── projects/        # Componentes de proyectos
│   │   ├── ProyectoItem.tsx # Item individual de proyecto
│   │   └── Proyectos.tsx    # Lista de proyectos
│   ├── tracks/          # Componentes de tracks
│   │   └── TrackItem.tsx    # Item individual de track
│   ├── ui/              # Componentes de UI
│   │   ├── Avatar.tsx   # Componente de avatar
│   │   ├── Button.tsx   # Componente de botón
│   │   └── Card.tsx     # Componente de tarjeta
│   └── ProtectedRoute.tsx # Componente de ruta protegida
├── config/              # Configuración
│   └── env.ts          # Variables de entorno
├── constants/           # Constantes de la aplicación
│   └── avatar.ts       # Constantes para avatares
├── context/            # Contextos de React
│   └── AuthContext.tsx # Contexto de autenticación
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Hook de autenticación
│   └── useAvatarUpdate.ts # Hook para actualización de avatares
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página principal
│   └── Profile.tsx     # Página de perfil de usuario
├── services/           # Servicios y APIs
│   └── api.ts          # Cliente API y utilidades
└── assets/             # Recursos estáticos
    ├── icons/          # Iconos
    └── images/         # Imágenes
```

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticación _(En Fase de Prueba)_

- **Login** con email y contraseña
- **Registro** con validación de formularios
- **Gestión de tokens** (access token y refresh token)
- **Rutas protegidas** que requieren autenticación
- **Logout** con limpieza de sesión
- **Persistencia de sesión** en localStorage

> ⚠️ **Nota**: La autenticación actualmente está en fase de prueba. Faltan implementar funcionalidades como la selección de track del usuario y la verificación con correo institucional de DuocUC.

### 👤 Gestión de Perfiles

- **Página de perfil** completa del usuario
- **Sistema de avatares** con subida de imágenes
- **Vista previa** de imágenes antes de subir
- **Validación de archivos** (tipos y tamaño)
- **Eliminación de avatares** con fallback a imagen por defecto
- **Actualización en tiempo real** del avatar en toda la aplicación

### 🎨 Interfaz de Usuario

- **Diseño responsivo** con TailwindCSS
- **Navegación intuitiva** con React Router
- **Componentes reutilizables** (Button, Card, Avatar)
- **Estados de carga** y manejo de errores
- **Animaciones suaves** y transiciones
- **Navbar adaptativo** con efecto de scroll

### 📱 Páginas Principales

- **Home** - Página principal con información del CITT
- **Login/Register** - Autenticación de usuarios
- **Profile** - Gestión de perfil y avatares
- **Tracks** - Visualización de tracks disponibles (8 tracks implementados)

### 🔧 Tracks Disponibles

1. **Ciberseguridad** - Protección de sistemas y datos
2. **Fullstack** - Desarrollo frontend y backend
3. **Robótica Lego** - Programación con kits Lego
4. **IoT (5G-6G)** - Internet de las cosas
5. **Cloud Computing** - Computación en la nube
6. **Robótica Kondo** - Robótica avanzada
7. **Inteligencia Artificial** - IA aplicada
8. **Metaverso y Realidad Aumentada** - Tecnologías inmersivas

## 🔌 Integración con Backend

### Endpoints Utilizados _(Fase de Prueba)_

- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuario _(sin validación de track)_
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario
- `POST /api/auth/avatar` - Subir avatar
- `DELETE /api/auth/avatar` - Eliminar avatar

> 📝 **Pendientes**: Endpoints para verificación de correo institucional y asignación de tracks

### Configuración de Proxy

```javascript
// vite.config.ts
server: {
  proxy: {
    "/uploads": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## 🎨 Características de UI/UX

### Diseño Responsivo

- **Mobile First** - Optimizado para dispositivos móviles
- **Breakpoints** - Adaptación a tablet y desktop
- **Navegación móvil** - Menú hamburguesa funcional

### Componentes Personalizados

- **Avatar** - Con fallback a iniciales y colores dinámicos
- **Button** - Variantes primary, secondary, outline
- **Card** - Contenedor versátil para contenido
- **ProtectedRoute** - Protección de rutas privadas

### Estados y Feedback

- **Loading states** - Indicadores de carga
- **Error handling** - Mensajes de error claros
- **Success feedback** - Confirmaciones de acciones
- **Form validation** - Validación en tiempo real

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_UPLOADS_URL=http://localhost:3000/uploads
VITE_API_TIMEOUT=10000
VITE_APP_NAME=CITT Learn
VITE_APP_VERSION=1.0.0
```

### Estructura de Componentes

- **Separación por dominio** - auth, home, layout, projects, tracks, ui
- **Componentes funcionales** - Hooks modernos de React
- **TypeScript estricto** - Tipado completo
- **Props interfaces** - Definición clara de props

## ⚠️ Limitaciones Actuales

### Sistema de Autenticación

- **Sin validación de correo institucional**: Actualmente acepta cualquier email
- **Sin selección de track**: Los usuarios no pueden elegir su track durante el registro
- **Sin verificación de dominio**: No se valida que el email sea de @duocuc.cl
- **Registro abierto**: Cualquier usuario puede registrarse sin restricciones

> 🎯 **Objetivo**: Implementar autenticación completa con validación institucional y asignación de tracks.

## 📈 Estado Actual del Desarrollo

### ✅ Completado

- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación básico _(en prueba)_
- [x] Gestión de perfiles y avatares
- [x] Interfaz responsiva principal
- [x] Navegación y enrutamiento
- [x] Integración con backend
- [x] Componentes reutilizables
- [x] Manejo de estados globales

### 🚧 En Desarrollo

- [ ] **Autenticación completa**
  - [ ] Selección de track en el registro
  - [ ] Verificación con correo institucional DuocUC
  - [ ] Validación de dominio @duocuc.cl
- [ ] Sistema de foros por track
- [ ] Sistema de notificaciones
- [ ] Panel de administración

### 📋 Próximas Funcionalidades

- [ ] Chat en tiempo real
- [ ] Sistema de badges y logros
- [ ] Integración con herramientas de desarrollo
- [ ] API de integración con sistemas DuocUC

## 👨‍💻 Desarrollador

**Renato Herrera**

- Estudiante de Ingeniería en Informática
- DuocUC Sede Puente Alto
- Centro de Innovación en Tecnología y Transformación (CITT)

## 📄 Licencia

Este proyecto es parte del programa académico del CITT de DuocUC y está destinado exclusivamente para fines educativos y de aprendizaje colaborativo.

---

## 🤝 Contribuciones

Este es un proyecto académico desarrollado como parte del programa CITT. Para contribuciones o sugerencias, contactar con el equipo del CITT DuocUC Sede Puente Alto.

## 📞 Contacto

- **CITT DuocUC Sede Puente Alto**
- **Email**: citt.pa@duocuc.cl
- **Desarrollador**: Renato Herrera

---

_Desarrollado con ❤️ para la comunidad CITT track Fullstack de DuocUC Sede Puente Alto_
