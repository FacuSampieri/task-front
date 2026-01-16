# 🧪 Guía de Testing - Integración con Telegram

## Verificación Rápida

### 1. Banner en Dashboard
```
✓ Navega a: http://localhost:3000/dashboard
✓ Debería ver un banner cyan con el ícono de MessageCircle
✓ El banner dice "Conecta con nuestro bot de Telegram"
✓ Debe haber un botón "Conectar Ahora" funcional
```

### 2. Ícono en Header
```
✓ En la barra superior (header) del dashboard
✓ A la derecha del logo "Tareas"
✓ Entre el botón de tema y el menú de usuario
✓ Visible en pantallas medianas (sm breakpoint) y superiores
✓ Click abre el bot en nueva ventana
```

### 3. Menú Dropdown del Usuario
```
✓ Click en el ícono de usuario (arriba a la derecha)
✓ Se abre un menú desplegable
✓ Debería haber una opción "Conectar Telegram Bot"
✓ Con ícono de MessageCircle
✓ Click abre el bot en nueva ventana
```

### 4. Página de Integraciones
```
✓ Navega a: http://localhost:3000/dashboard/integrations
✓ Página titulada "Integraciones"
✓ Una tarjeta destacada para "Telegram Bot"
✓ Muestra los beneficios (4 items listados)
✓ Botón cyan "Conectar con Telegram Bot"
✓ Información sobre futuras integraciones
```

---

## Checklist de Funcionalidad

- [ ] El banner aparece en `/dashboard`
- [ ] El ícono de Telegram aparece en el header
- [ ] El menú de usuario contiene la opción de Telegram
- [ ] Todos los botones abren `https://t.me/task_manager74_bot`
- [ ] Los links se abren en nueva ventana
- [ ] No aparecen errores en la consola del navegador
- [ ] Los colores cyan se muestran correctamente
- [ ] El diseño es responsive en mobile
- [ ] El diseño es responsive en tablet
- [ ] El diseño es responsive en desktop

---

## Testing en Diferentes Dispositivos

### Mobile (< 640px)
```
✓ El ícono de Telegram NO aparece en el header (hidden sm:flex)
✓ El menú de usuario sí contiene la opción
✓ El banner es completamente visible y funcional
✓ Los botones tienen tamaño apropiado para touch
```

### Tablet (640px - 1024px)
```
✓ El ícono de Telegram SÍ aparece en el header
✓ Todos los elementos son accesibles
✓ El layout se ve bien
```

### Desktop (> 1024px)
```
✓ Todo funciona como se esperaba
✓ Espaciados correctamente
✓ Hover effects funcionales
```

---

## Verificación de Seguridad

```
✓ Los links usan window.open() con flags noopener,noreferrer
✓ No hay exposición de tokens en URLs
✓ No hay datos sensibles en el localStorage respecto al bot
✓ El bot se abre en un contexto aislado (nueva ventana)
```

---

## Verificación de Código

### Componentes Creados
```
✓ /components/telegram-bot-link.tsx
✓ /components/telegram-promo-banner.tsx
✓ /app/dashboard/integrations/page.tsx
```

### Archivos Modificados
```
✓ /app/dashboard/layout.tsx
  - Import de MessageCircle
  - Botón en header
  - Opción en dropdown menu

✓ /app/dashboard/page.tsx
  - Import de TelegramPromoBanner
  - Banner agregado al inicio
```

---

## Debugging Tips

### Si el banner no aparece:
1. Verifica que `/app/dashboard/page.tsx` importa `TelegramPromoBanner`
2. Verifica que el componente se renderiza dentro del JSX
3. Verifica que no hay errores en la consola

### Si el ícono del header no aparece:
1. Verifica que `MessageCircle` está importado de `lucide-react`
2. Verifica la clase `hidden sm:flex` en el Button
3. Comprueba que estés en pantalla ≥ 640px

### Si los links no abren:
1. Verifica que `window.open()` no está bloqueado por pop-up blocker
2. Verifica la URL: `https://t.me/task_manager74_bot`
3. Comprueba que es una función click sin preventDefault

---

## Performance Check

```
✓ No hay imports innecesarios
✓ Los componentes usan "use client" apropiadamente
✓ Sin efectos secundarios en renders
✓ Sin re-renders innecesarios
```

---

## Notas de Testing

- El bot debe estar públicamente disponible en Telegram para que funcione
- La URL `https://t.me/task_manager74_bot` debe ser válida
- Los cambios son completamente frontend - no requieren backend modifications
- La integración es agnóstica al estado de autenticación del bot

---

## Resultado Esperado

Después de completar todos los checks, deberías poder:

1. ✅ Ver promoción del bot en múltiples lugares de la app
2. ✅ Hacer click desde cualquier botón/link de Telegram
3. ✅ Abrir el bot en una nueva ventana/pestaña
4. ✅ Completar la vinculación con el bot (fuera del scope de esta tarea)
5. ✅ Gestionar tareas desde Telegram sin entrar a la web

---

**Integración Lista para Producción** ✅
