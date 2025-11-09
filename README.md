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

### 2. Preparar tu Google Sheet

#### Estructura de la hoja de cálculo

Tu Google Sheet debe tener las siguientes columnas (A-J):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Marca temporal | ¿Participar en seminario? | 氏名 Full Name | 会社名 Company Name | メールアドレス E-mail Address | Columna 5 | Columna 6 | QR Code UUID | Status | Attendance |

### 3. Configurar Google Apps Script

Google Apps Script permite que la aplicación lea y actualice los datos de tu hoja de cálculo de forma segura, sin necesidad de configurar APIs adicionales.

1. Abre tu Google Sheet
2. Ve a **Extensiones > Apps Script**
3. Borra el código predeterminado
4. Copia todo el contenido del archivo `google-apps-script/Code.gs` de este repositorio
5. Pégalo en el editor de Apps Script
6. **Importante**: Actualiza la variable `SHEET_NAME` en la línea 17 si tu hoja tiene un nombre diferente a "Sheet1"
7. Guarda el proyecto (Ctrl+S o Cmd+S)
8. Haz clic en **Implementar > Nueva implementación**
9. Haz clic en el ícono de engranaje ⚙️ junto a "Tipo" y selecciona **Aplicación web**
10. Configura los siguientes parámetros:
    - **Descripción**: "Event Management API" (opcional)
    - **Ejecutar como**: **Yo** (tu cuenta de Google)
    - **Quién tiene acceso**: **Cualquier persona**
11. Haz clic en **Implementar**
12. La primera vez te pedirá autorización:
    - Haz clic en **Autorizar acceso**
    - Selecciona tu cuenta de Google
    - Haz clic en **Avanzado** (si aparece una advertencia)
    - Haz clic en **Ir a [nombre del proyecto] (no seguro)**
    - Haz clic en **Permitir**
13. Copia la **URL de la aplicación web** que aparece
14. Guarda esta URL, la necesitarás en el siguiente paso

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y pega la URL de tu Google Apps Script:

```env
# Google Apps Script Web App URL
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
```

Reemplaza `https://script.google.com/macros/s/XXXXX/exec` con la URL que copiaste en el paso anterior.

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

### Error: "Apps Script URL not configured"

- Verifica que hayas desplegado el Google Apps Script correctamente
- Confirma que la variable `VITE_APPS_SCRIPT_URL` esté configurada en `.env`
- Asegúrate que la URL sea la correcta (debe terminar en `/exec`)

### Error: "Failed to fetch participants"

- Verifica que el Google Apps Script esté implementado correctamente
- Confirma que hayas autorizado los permisos cuando se solicitó
- Asegúrate que el nombre de la hoja (`SHEET_NAME`) sea correcto en Code.gs
- Revisa la consola del Apps Script para ver si hay errores (Executions en el menú lateral)

### Error: "Sheet not found"

- Verifica que la variable `SHEET_NAME` en `google-apps-script/Code.gs` coincida con el nombre de tu hoja
- El nombre debe ser exactamente igual (distingue mayúsculas/minúsculas)

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

1. **HTTPS**: Despliega siempre en HTTPS para:
   - Acceso a cámara (requerido por los navegadores)
   - Seguridad de datos
   - Mejores prácticas web

2. **Variables de Entorno**: Nunca commitees el archivo `.env` al repositorio
   - El archivo `.env` está incluido en `.gitignore`
   - Usa variables de entorno en tu plataforma de deploy

3. **Apps Script - Acceso**:
   - Si es un evento interno/privado, cambia "Cualquier persona" a "Cualquier usuario de [tu organización]" al implementar
   - Considera usar un dominio personalizado para mayor profesionalismo

4. **Datos Sensibles**:
   - Ten cuidado con la información personal en tu Google Sheet
   - Revisa regularmente quién tiene acceso a la hoja de cálculo

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
