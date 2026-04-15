# Documentación de Decisiones de CI/CD

## ¿Qué es este archivo?

Este documento explica las decisiones técnicas que tomaste para configurar
el pipeline CI/CD de tu app. Es parte del entregable del proyecto.

---

## Información del Proyecto

- **Dominio asignado**: TODO: escribe aquí tu dominio (ej. Biblioteca, Farmacia)
- **App slug**: TODO: tu slug de Expo
- **Fecha de configuración**: TODO: fecha

---

## Decisiones del Pipeline

### 1. Plataformas de Build en CI

**Decisión**: TODO: ¿builds para `ios`, `android` o `all`?

**Justificación**: TODO: ¿Por qué elegiste esas plataformas?

Ejemplos:
- "Sólo Android porque el dominio (taxis) tiene más usuarios Android en LATAM"
- "Ambas plataformas porque el dominio (hospital) requiere cobertura total"

---

### 2. Configuración de Canales

**Canal `staging`**: para builds de tipo `preview`
- URL: `https://u.expo.dev/TU-PROJECT-ID` (canal: staging)
- Caso de uso: QA interno, pruebas del instructor

**Canal `production`**: para builds de tipo `production`
- URL: `https://u.expo.dev/TU-PROJECT-ID` (canal: production)
- Caso de uso: usuarios finales en App Store / Google Play

---

### 3. Estrategia de Promoción Staging → Production

**Decisión**: TODO: ¿cuándo promueves un update de staging a production?

Ejemplo:
- "Después de 24h en staging sin reportes de error del instructor"
- "Después de validación manual en simulador y 2 dispositivos físicos"

---

### 4. Tipos de Cambios: OTA vs Nuevo Build Nativo

En mi dominio (TODO), los cambios que usaría OTA serían:

| Cambio | OTA | Nuevo Build | Razón |
|--------|-----|-------------|-------|
| TODO: ejemplo 1 | ✅ | | Solo JS |
| TODO: ejemplo 2 | | ✅ | Afecta código nativo |

Ejemplos para completar:
- Actualizar lista de productos/items: **OTA** (solo datos JS)
- Cambiar icono de la app: **nuevo build** (asset nativo)
- Corregir error de validación en formulario: **OTA**
- Agregar nueva permiso (cámara): **nuevo build**

---

### 5. Rollback — Plan de Contingencia

**Situación problema**: un update OTA rompe la app en staging.

**Mi plan de rollback**:
```bash
# Opción 1: Revertir al update anterior
eas update:roll-back-to-embedded --channel staging

# Opción 2: git revert + nuevo update
git revert HEAD
git push origin main
# El CI publicará automáticamente el update revertido
```

---

## Evidencia de Updates Publicados

Lista aquí los updates que publicaste durante el proyecto:

| Fecha | Canal | Mensaje | Resultado |
|-------|-------|---------|-----------|
| TODO | staging | TODO | TODO |
