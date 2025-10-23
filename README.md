# CITT Learn

**Sistema de aprendizaje colaborativo para el Centro de Innovación en Tecnología y Transformación (CITT) de DuocUC Sede Puente Alto**

---

## 📋 Descripción del Proyecto

CITT Learn es una plataforma web fullstack desarrollada para fomentar la colaboración entre estudiantes del CITT y apoyar su proceso de aprendizaje hacia el mundo profesional. La aplicación integra diferentes tracks tecnológicos, sistema de autenticación robusto, gestión de perfiles, sistema de posts colaborativo y panel de administración completo.

## 🎯 Objetivos

- Crear una plataforma accesible y responsiva para la comunidad CITT
- Implementar un sistema de autenticación seguro con gestión de roles
- Facilitar la colaboración entre estudiantes de diferentes tracks
- Proporcionar un sistema de posts y interacciones sociales
- Implementar un panel de administración para gestión de usuarios
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
├── components/
│   ├── common/              # Componentes reutilizables
│   │   ├── ui/              # Componentes de interfaz
│   │   │   ├── Avatar.tsx   # Avatar con fallback
│   │   │   ├── Button.tsx   # Botón reutilizable
│   │   │   ├── Card.tsx     # Tarjeta contenedora
│   │   │   ├── TrackBadge.tsx # Badge de track
│   │   │   └── TrackIcons.tsx # Iconos SVG de tracks
│   │   ├── forms/           # Componentes de formularios
│   │   │   └── TrackSelector.tsx # Selector de tracks
│   │   └── layout/          # Componentes de layout
│   │       ├── Footer.tsx   # Pie de página
│   │       ├── Layout.tsx   # Layout principal
│   │       └── Navbar.tsx   # Barra de navegación
│   └── domain/              # Componentes por dominio
│       ├── auth/            # Autenticación
│       │   ├── Login.tsx    # Página de login
│       │   └── Register.tsx # Página de registro
│       ├── dashboard/       # Panel de administración
│       │   └── DashboardLayout.tsx # Layout del dashboard
│       ├── feed/            # Sistema de posts
│       │   ├── Banner.tsx   # Banner del feed
│       │   ├── FeedNavbar.tsx # Navegación del feed
│       │   ├── UserInfo.tsx # Información del usuario
│       │   ├── PostsSection.tsx # Sección de posts
│       │   ├── MediaSection.tsx # Sección multimedia
│       │   └── LikesSection.tsx # Sección de likes
│       ├── home/            # Página principal
│       │   ├── Hero.tsx     # Sección hero
│       │   ├── SobreCittLearn.tsx # Información sobre CITT
│       │   └── Tracks.tsx   # Sección de tracks
│       ├── projects/        # Proyectos
│       │   ├── ProyectoItem.tsx # Item de proyecto
│       │   └── Proyectos.tsx # Lista de proyectos
│       └── tracks/          # Tracks
│           └── TrackItem.tsx # Item de track
├── pages/                   # Páginas principales
│   ├── dashboard/           # Páginas del dashboard
│   │   ├── DashboardHome.tsx # Inicio del dashboard
│   │   ├── DashboardUsers.tsx # Gestión de usuarios
│   │   └── DashboardPosts.tsx # Gestión de posts
│   ├── Feed.tsx            # Página del feed
│   ├── Home.tsx            # Página principal
│   └── Profile.tsx         # Página de perfil
├── guards/                  # Protección de rutas
│   └── ProtectedRoute.tsx  # Componente de ruta protegida
├── hooks/                   # Custom hooks
│   ├── useAuth.ts          # Hook de autenticación
│   ├── useAvatarUpdate.ts  # Hook para avatares
│   └── useTrackResolution.ts # Hook para resolución de tracks
├── services/                # Servicios y APIs
│   └── api.ts              # Cliente API completo
├── context/                 # Contextos de React
│   └── AuthContext.tsx     # Contexto de autenticación
├── constants/               # Constantes
│   ├── avatar.ts           # Constantes de avatares
│   └── tracks.ts           # Constantes de tracks
├── config/                  # Configuración
│   └── env.ts              # Variables de entorno
└── assets/                  # Recursos estáticos
    ├── icons/
    │   ├── tracks/         # Iconos de tracks (PNG)
    │   └── ui/             # Iconos de interfaz (SVG)
    └── images/             # Imágenes del proyecto
```

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticación Completo

- **Login** con email y contraseña
- **Registro** con selección de track
- **Gestión de tokens** (access token y refresh token)
- **Rutas protegidas** que requieren autenticación
- **Logout** con limpieza de sesión
- **Persistencia de sesión** en localStorage
- **Sistema de roles** (user, captain, admin)
- **Validación de formularios** en tiempo real

### 👤 Gestión de Perfiles Avanzada

- **Página de perfil** completa del usuario
- **Sistema de avatares** con subida de imágenes
- **Vista previa** de imágenes antes de subir
- **Validación de archivos** (tipos y tamaño)
- **Eliminación de avatares** con fallback a imagen por defecto
- **Actualización en tiempo real** del avatar en toda la aplicación
- **Información de track** del usuario
- **Badges de roles** (Admin, Capitán)

### 📱 Sistema de Posts Colaborativo

- **Feed principal** con posts de la comunidad
- **Creación de posts** con selección de track
- **Sistema de likes** interactivo
- **Filtrado por tracks** en el feed
- **Información del autor** con avatar y rol
- **Navegación del feed** intuitiva
- **Sección multimedia** para contenido visual

### 🎛️ Panel de Administración

- **Dashboard completo** para administradores y capitanes
- **Gestión de usuarios** con tabla completa
- **Filtros avanzados** (rol, track, estado, búsqueda)
- **Edición de usuarios** con modal interactivo
- **Asignación de roles** (admin, captain, user)
- **Gestión de tracks** para capitanes
- **Estadísticas** del sistema
- **Paginación** y búsqueda en tiempo real

### 🎨 Interfaz de Usuario Moderna

- **Diseño responsivo** con TailwindCSS
- **Navegación intuitiva** con React Router
- **Componentes reutilizables** (Button, Card, Avatar, TrackBadge)
- **Estados de carga** y manejo de errores
- **Animaciones suaves** y transiciones
- **Navbar adaptativo** con efecto de scroll
- **Iconos SVG personalizados** para cada track
- **Sistema de colores** representativo por track

### 📱 Páginas Principales

- **Home** - Página principal con información del CITT
- **Login/Register** - Autenticación completa de usuarios
- **Profile** - Gestión de perfil y avatares
- **Feed** - Sistema de posts colaborativo
- **Dashboard** - Panel de administración completo
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

### Endpoints Implementados

#### Autenticación

- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuario con track
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario
- `POST /api/auth/avatar` - Subir avatar
- `DELETE /api/auth/avatar` - Eliminar avatar
- `GET /api/auth/tracks` - Obtener tracks disponibles

#### Posts

- `GET /api/posts` - Obtener posts del feed
- `POST /api/posts` - Crear nuevo post
- `DELETE /api/posts/:id` - Eliminar post
- `POST /api/posts/:id/like` - Dar like a un post

#### Administración

- `GET /api/admin/users` - Obtener usuarios (admin)
- `PUT /api/admin/users/:id` - Actualizar usuario (admin)
- `DELETE /api/admin/users/:id` - Eliminar usuario (admin)
- `GET /api/admin/stats` - Obtener estadísticas (admin)

#### Capitanes

- `GET /api/captain/users` - Obtener usuarios del track (capitán)
- `PUT /api/captain/users/:id` - Actualizar usuario del track (capitán)

### Sistema de Roles

- **Admin**: Acceso completo al sistema, gestión de usuarios y roles
- **Captain**: Gestión de usuarios de su track específico
- **User**: Usuario normal con acceso al feed y perfil

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
- **Sin verificación de dominio**: No se valida que el email sea de @duocuc.cl
- **Registro abierto**: Cualquier usuario puede registrarse sin restricciones

> 🎯 **Objetivo**: Implementar autenticación completa con validación institucional y asignación de tracks.

## 🏗️ Arquitectura del Proyecto

### Patrón de Organización

El proyecto utiliza un patrón híbrido que combina **Domain-Driven Design (DDD)** con **Feature-Based Organization**:

- **`components/common/`**: Componentes reutilizables (UI, forms, layout)
- **`components/domain/`**: Componentes organizados por dominio de negocio
- **`pages/`**: Páginas principales organizadas por feature
- **`guards/`**: Protección de rutas
- **`hooks/`**: Custom hooks por funcionalidad
- **`services/`**: Servicios de API por dominio
- **`constants/`**: Constantes por categoría
- **`types/`**: Tipos TypeScript por dominio

### Beneficios de la Arquitectura

- **Escalabilidad**: Fácil agregar nuevos dominios/features
- **Mantenibilidad**: Código organizado y fácil de encontrar
- **Reutilización**: Componentes comunes accesibles
- **Separación de responsabilidades**: Cada carpeta tiene un propósito claro

## 📈 Estado Actual del Desarrollo

### ✅ Completado

- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación completo
- [x] Gestión de perfiles y avatares
- [x] Sistema de roles (admin, captain, user)
- [x] Sistema de posts colaborativo
- [x] Panel de administración completo
- [x] Interfaz responsiva moderna
- [x] Navegación y enrutamiento
- [x] Integración completa con backend
- [x] Componentes reutilizables
- [x] Manejo de estados globales
- [x] Sistema de tracks con iconos personalizados
- [x] Filtros y búsqueda avanzada
- [x] Gestión de usuarios y roles
- [x] Sistema de likes y interacciones

### 🚧 En Desarrollo

- [ ] **Sistema de notificaciones**
- [ ] **Chat en tiempo real**
- [ ] **Sistema de badges y logros**
- [ ] **Integración con herramientas de desarrollo**
- [ ] **API de integración con sistemas DuocUC**

### 📋 Próximas Funcionalidades

- [ ] Sistema de comentarios en posts
- [ ] Notificaciones push
- [ ] Sistema de seguimiento entre usuarios
- [ ] Integración con GitHub/GitLab
- [ ] Sistema de proyectos colaborativos
- [ ] Dashboard de estadísticas avanzadas

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
