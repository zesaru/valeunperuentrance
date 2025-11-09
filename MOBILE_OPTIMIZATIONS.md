# Optimizaciones Móviles - Gestión de Eventos

Este documento detalla todas las optimizaciones móviles implementadas en la aplicación.

## Características Móviles Implementadas

### 1. Diseño Mobile-First Responsive

#### Header Optimizado
- **Sticky header** que permanece visible al hacer scroll
- Menú hamburguesa en móvil con animación suave
- Botones táctiles de mínimo 44x44px (Apple HIG)
- Tipografía adaptativa según tamaño de pantalla

#### Navegación Inferior (Bottom Navigation Bar)
- Barra fija en la parte inferior solo en móvil
- Acceso rápido a "Escanear QR" y "Actualizar"
- Iconos grandes con labels descriptivos
- Feedback visual al tocar

#### Componentes Optimizados
- **StatsCard**: Grid 2x2 en móvil, 1x4 en desktop
- **ParticipantCard**: Diseño vertical optimizado con áreas táctiles grandes
- **SearchBar**: Input con tamaño de 16px para prevenir zoom en iOS

### 2. Modales y Bottom Sheets

#### CheckInModal - Bottom Sheet
- Aparece desde abajo en móvil (patrón nativo)
- Gesture de swipe-down para cerrar
- Handle visual de arrastre
- Animaciones suaves con easing natural
- Bloqueo de scroll del body cuando está abierto

#### ScannerModal - Full Screen
- Full screen en móvil para mejor UX de cámara
- Guías visuales del área de escaneo
- Animación de línea de escaneo
- Controles grandes y accesibles

### 3. Progressive Web App (PWA)

#### Manifest.json
Configurado con:
- Nombre corto y largo de la app
- Iconos en múltiples tamaños (72, 96, 128, 144, 152, 192, 384, 512px)
- Modo `standalone` para experiencia de app nativa
- Color de tema (#2563eb - azul)
- Orientación preferida: portrait
- Shortcuts para acciones rápidas

#### Service Worker
Funcionalidades:
- Cache de assets estáticos
- Estrategia Network First para APIs
- Estrategia Cache First para recursos estáticos
- Soporte para modo offline básico
- Auto-actualización cada 5 minutos

### 4. Animaciones y Transiciones

#### Animaciones Implementadas
```css
- slideInFromTop: Para notificaciones
- slideInFromBottom: Para bottom sheets
- fadeIn: Para overlays
- scaleIn: Para modales
- pulse-soft: Para estados de carga
- shimmer: Para skeleton screens
```

#### Optimizaciones de Rendimiento
- Aceleración por hardware (transform: translateZ(0))
- Backface visibility hidden
- Will-change en elementos animados
- Respeto a prefers-reduced-motion

### 5. Gestos Táctiles

#### Implementados
- **Tap feedback**: Escala 0.97 en active state
- **Swipe down**: Cerrar CheckInModal
- **Pull to refresh**: En desarrollo
- **Long press**: Potencial para acciones secundarias

#### Áreas Táctiles
- Mínimo 44x44px en todos los elementos interactivos
- Padding adicional invisible en botones pequeños
- Prevención de doble-tap zoom con `touch-action: manipulation`

### 6. Meta Tags Móviles

```html
<!-- Viewport optimizado -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />

<!-- PWA -->
<meta name="theme-color" content="#2563eb" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Safe Area (iPhone X+) -->
viewport-fit=cover en viewport
```

### 7. Optimizaciones de Rendimiento

#### CSS
- `-webkit-tap-highlight-color: transparent` (eliminar highlight azul)
- `-webkit-font-smoothing: antialiased`
- `user-select: none` en UI, `text` en contenido
- Safe area insets para iPhone X+

#### JavaScript
- Lazy loading de componentes pesados
- Debounce en búsqueda
- Throttle en scroll events
- Prevención de scroll cuando modales abiertos

### 8. Accesibilidad Móvil

- Contraste de colores AA o superior
- Tamaños de texto escalables
- Labels ARIA en botones de iconos
- Focus visible para navegación por teclado
- Soporte para lectores de pantalla

## Generar Iconos de PWA

Los iconos de PWA aún no están generados. Aquí tienes las instrucciones:

### Opción 1: Usando un generador online

1. Visita [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)
2. Sube tu logo (mínimo 512x512px, fondo transparente PNG)
3. Descarga el paquete de iconos
4. Copia los archivos a `/public/`:
   - icon-72.png
   - icon-96.png
   - icon-128.png
   - icon-144.png
   - icon-152.png
   - icon-192.png
   - icon-384.png
   - icon-512.png

### Opción 2: Usando ImageMagick (Linux/Mac)

```bash
# Instalar ImageMagick si no lo tienes
brew install imagemagick  # Mac
sudo apt-get install imagemagick  # Ubuntu

# Generar iconos desde un logo de 512x512px
cd public
convert logo-512.png -resize 72x72 icon-72.png
convert logo-512.png -resize 96x96 icon-96.png
convert logo-512.png -resize 128x128 icon-128.png
convert logo-512.png -resize 144x144 icon-144.png
convert logo-512.png -resize 152x152 icon-152.png
convert logo-512.png -resize 192x192 icon-192.png
convert logo-512.png -resize 384x384 icon-384.png
convert logo-512.png -resize 512x512 icon-512.png
```

### Opción 3: Diseño Manual

Si quieres diseñar los iconos manualmente:

**Recomendaciones:**
- Usar colores sólidos y alto contraste
- Evitar detalles muy pequeños (se verán mal en 72x72)
- Incluir padding interno (safe area)
- Probar en diferentes fondos (claro/oscuro)
- Formato PNG con transparencia

**Ejemplo de diseño:**
- Fondo: Azul #2563eb (color tema)
- Icono: Blanco con símbolo de QR o ticket
- Border radius: 20% para look moderno
- Padding: 15% del tamaño total

## Testing en Dispositivos Móviles

### Desarrollo Local

```bash
# Ejecutar en tu red local
npm run dev -- --host

# Tu app estará disponible en:
# http://[tu-ip]:5173
# Ejemplo: http://192.168.1.100:5173
```

Luego abre esta URL en tu móvil (conectado a la misma red WiFi).

### Herramientas de Testing

1. **Chrome DevTools**
   - F12 → Toggle device toolbar
   - Probar diferentes tamaños: iPhone SE, iPhone 12, Pixel 5, iPad
   - Network throttling para simular 3G/4G

2. **Safari Responsive Design Mode** (Mac)
   - Develop → Enter Responsive Design Mode
   - Probar Safari en iPhone/iPad

3. **BrowserStack / LambdaTest**
   - Testing en dispositivos reales
   - Plan gratuito disponible

### Checklist de Testing Móvil

- [ ] Todas las áreas táctiles mínimo 44x44px
- [ ] No hay zoom accidental en inputs
- [ ] Bottom sheet se puede cerrar con swipe
- [ ] Scanner QR funciona en cámara móvil
- [ ] App se instala como PWA
- [ ] Funciona offline (básico)
- [ ] Animaciones suaves sin lag
- [ ] Safe area respetada en iPhone X+
- [ ] Notificaciones visibles y legibles
- [ ] Botones de navegación accesibles con pulgar

## Próximas Mejoras Sugeridas

### 1. Gestos Adicionales
- Swipe left/right en ParticipantCard para quick actions
- Pull to refresh en lista de participantes
- Long press en tarjeta para opciones

### 2. Modo Offline Avanzado
- Queue de check-ins offline
- Sincronización automática al recuperar conexión
- Indicador visual de modo offline

### 3. Notificaciones Push
- Notificar al staff sobre nuevos participantes
- Recordatorios de tareas pendientes
- Confirmar si el check-in se registró correctamente en el servidor

### 4. Modo Oscuro
- Auto-detección según sistema
- Toggle manual
- Colores optimizados para OLED

### 5. Haptic Feedback
- Vibración al escanear QR exitosamente
- Feedback táctil en botones importantes
- Vibraciones diferentes según tipo de acción

### 6. Mejoras de Rendimiento
- Virtual scrolling en listas largas
- Image optimization con webp
- Code splitting más agresivo
- Lazy loading de rutas

## Recursos y Referencias

### Guías de Diseño Móvil
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design Mobile](https://material.io/design)
- [PWA Best Practices](https://web.dev/pwa-checklist/)

### Testing y Debugging
- [Chrome DevTools Mobile](https://developer.chrome.com/docs/devtools/device-mode/)
- [Safari Web Inspector](https://webkit.org/web-inspector/)
- [Can I Use](https://caniuse.com/) - Compatibilidad de features

### Performance
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Soporte

Si encuentras algún problema con las optimizaciones móviles, por favor reporta un issue indicando:
- Dispositivo y versión de OS
- Navegador y versión
- Pasos para reproducir el problema
- Screenshots si es posible

---

**Última actualización:** 2025-11-09
**Versión:** 1.0.0
