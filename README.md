# Event Management App

Aplicación web para gestión de eventos desarrollada con React, Tailwind CSS, Vite y Google Sheets API. Diseñada para que el staff del evento pueda realizar check-in de participantes mediante escaneo de códigos QR o búsqueda manual.

## Características

✅ **Dashboard de estadísticas** - Visualiza total de participantes, check-ins realizados y pendientes
✅ **Escaneo de códigos QR** - Check-in rápido mediante cámara del dispositivo
✅ **Búsqueda de participantes** - Filtrado por nombre, email o empresa
✅ **Lista de participantes** - Vista completa con información detallada
✅ **Actualización en tiempo real** - Sincronización con Google Sheets
✅ **Interfaz responsive** - Optimizada para móviles y tablets
✅ **Diseño moderno** - Interfaz intuitiva con Tailwind CSS

## Stack Tecnológico

- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **Google Sheets API** - Base de datos
- **html5-qrcode** - Escaneo de códigos QR
- **axios** - Cliente HTTP
- **date-fns** - Manejo de fechas
- **lucide-react** - Iconos

## Prerequisitos

- Node.js 16+ instalado
- Una cuenta de Google con acceso a Google Sheets
- Una Google Sheet con los datos del evento

## Configuración del Proyecto

### 1. Instalación

```bash
# Instalar dependencias
npm install
```

### 2. Configuración de Google Sheets

#### Estructura de la hoja de cálculo

Tu Google Sheet debe tener las siguientes columnas (A-J):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Marca temporal | ¿Participar en seminario? | 氏名 Full Name | 会社名 Company Name | メールアドレス E-mail Address | Columna 5 | Columna 6 | QR Code UUID | Status | Attendance |

#### Obtener Google API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google Sheets API"
4. Ve a "Credenciales" > "Crear credenciales" > "Clave de API"
5. Copia la API Key generada
6. (Opcional) Restringe la API Key solo para Google Sheets API

#### Obtener Spreadsheet ID

El ID del spreadsheet está en la URL de tu Google Sheet:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

#### Configurar permisos de la hoja

1. Abre tu Google Sheet
2. Haz clic en "Compartir"
3. Cambia el acceso a "Cualquier persona con el enlace puede ver"
4. Esto permite que la API lea los datos sin autenticación OAuth

### 3. Configuración de Google Apps Script (para escritura)

Para poder actualizar el estado y la asistencia en Google Sheets, necesitas desplegar un Google Apps Script:

1. Abre tu Google Sheet
2. Ve a **Extensions > Apps Script**
3. Copia el contenido del archivo `google-apps-script/Code.gs` en el editor
4. Actualiza la variable `SHEET_NAME` si tu hoja tiene un nombre diferente
5. Guarda el proyecto
6. Haz clic en **Deploy > New deployment**
7. Selecciona tipo: **Web app**
8. Configuración:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Haz clic en **Deploy**
10. Copia la **Web App URL** generada
11. Autoriza los permisos solicitados

### 4. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Google Sheets API Configuration
VITE_GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_SPREADSHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
VITE_SHEET_NAME=Sheet1

# Google Apps Script Web App URL (for write operations)
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
```

## Ejecución del Proyecto

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en el directorio `dist/`

### Preview del Build

```bash
npm run preview
```

## Uso de la Aplicación

### Panel Principal

1. **Dashboard de Estadísticas**
   - Total de participantes registrados
   - Número de check-ins realizados
   - Participantes pendientes
   - Porcentaje de asistencia

2. **Barra de Búsqueda**
   - Buscar por nombre completo
   - Buscar por email
   - Buscar por empresa

3. **Botones de Acción**
   - **Escanear QR**: Abre la cámara para escanear códigos QR
   - **Actualizar**: Sincroniza los datos con Google Sheets

### Check-in de Participantes

#### Método 1: Escaneo de QR

1. Haz clic en el botón **"Escanear QR"**
2. Permite el acceso a la cámara cuando se solicite
3. Apunta la cámara al código QR del participante
4. El sistema buscará automáticamente al participante
5. Confirma el check-in en el modal que aparece

#### Método 2: Check-in Manual

1. Usa la barra de búsqueda para encontrar al participante
2. Haz clic en el botón **"Check-in"** en la tarjeta del participante
3. Confirma la información en el modal
4. Haz clic en **"Confirmar"**

### Notificaciones

La aplicación mostrará notificaciones para:
- ✓ Check-in exitoso
- ✗ Errores (participante no encontrado, error de conexión, etc.)
- ℹ Información (participante ya registrado, etc.)

## Estructura del Proyecto

```
valeunperuentrance/
├── src/
│   ├── components/          # Componentes React
│   │   ├── CheckInModal.jsx
│   │   ├── ParticipantCard.jsx
│   │   ├── ParticipantList.jsx
│   │   ├── QRScanner.jsx
│   │   ├── ScannerModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── StatsCard.jsx
│   ├── context/            # Context API
│   │   └── EventContext.jsx
│   ├── services/           # Servicios y API
│   │   ├── googleSheets.js
│   │   └── googleSheetsWriter.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── google-apps-script/     # Scripts de Google Apps Script
│   └── Code.gs
├── .env.example            # Ejemplo de variables de entorno
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Solución de Problemas

### Error: "Failed to fetch participants"

- Verifica que la Google API Key sea correcta
- Confirma que el Spreadsheet ID es válido
- Asegúrate que la hoja sea accesible públicamente
- Verifica que Google Sheets API esté habilitada en Google Cloud Console

### Error: "Write operations not yet configured"

- Verifica que hayas desplegado el Google Apps Script
- Confirma que la variable `VITE_APPS_SCRIPT_URL` esté configurada en `.env`
- Asegúrate que el Apps Script tenga los permisos correctos

### La cámara no se activa para escanear QR

- Verifica que hayas dado permisos de cámara al navegador
- En producción, asegúrate de usar HTTPS (requerido para acceso a cámara)
- Prueba en un navegador diferente (Chrome/Firefox recomendados)

### Los datos no se actualizan

- Haz clic en el botón "Actualizar" para sincronizar
- Verifica tu conexión a Internet
- Revisa la consola del navegador para errores

## Seguridad

### Recomendaciones de Producción

1. **Restringir API Key**: En Google Cloud Console, restringe la API Key para:
   - Solo Google Sheets API
   - Solo dominios específicos (tu dominio de producción)

2. **HTTPS**: Despliega siempre en HTTPS para:
   - Acceso a cámara (requerido)
   - Seguridad de datos
   - Mejores prácticas

3. **Variables de Entorno**: Nunca commitees el archivo `.env` al repositorio

4. **Apps Script**: Considera cambiar el acceso de "Anyone" a "Anyone within your organization" si es un evento interno

## Deploy

### Opciones de Deploy Recomendadas

- **Vercel**: `npm run build` + deploy automático desde GitHub
- **Netlify**: Integración continua con GitHub
- **Firebase Hosting**: `firebase deploy`
- **GitHub Pages**: Requiere configuración adicional para SPA

### Configuración para Deploy

Asegúrate de configurar las variables de entorno en tu plataforma de deploy:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment
- Firebase: Firebase Console > Hosting > Environment Configuration

## Contribución

Este es un proyecto para gestión de eventos. Si encuentras algún bug o tienes sugerencias:

1. Abre un issue describiendo el problema
2. Haz un fork del proyecto
3. Crea una rama para tu feature
4. Haz commit de tus cambios
5. Abre un Pull Request

## Licencia

MIT License - Siéntete libre de usar este proyecto para tus eventos.

## Soporte

Para preguntas o problemas, abre un issue en el repositorio.

---

Desarrollado con ❤️ para facilitar la gestión de eventos
