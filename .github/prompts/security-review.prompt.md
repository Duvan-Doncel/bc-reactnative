---
description: "Revisa código React Native / Expo en busca de vulnerabilidades del OWASP Top 10 adaptadas al contexto mobile. Devuelve un informe con severidad, descripción y corrección concreta. Usar antes de hacer commit de código de seguridad crítica."
name: "Revisión de seguridad OWASP Top 10 (Mobile)"
argument-hint: "Pega o describe el código a revisar, o usa #selection para revisar el código seleccionado"
mode: "agent"
---

# Revisión de seguridad OWASP Top 10 — Bootcamp React Native

Realiza una auditoría de seguridad del código indicado, enfocada en el
**OWASP Top 10** (2021) adaptado al contexto de aplicaciones React Native + Expo.

## Categorías OWASP a evaluar

### A01 — Broken Access Control

- ¿Se accede a rutas protegidas sin verificar autenticación?
- ¿El token JWT se valida correctamente antes de cada operación sensible?
- ¿Las rutas de navegación protegidas verifican el estado de auth antes de renderizar?
- ¿Se exponen datos de otros usuarios sin validar ownership en la lógica de negocio?

### A02 — Cryptographic Failures

- ¿Se almacenan tokens en `AsyncStorage` en vez de `expo-secure-store`?
- ¿Se almacenan passwords o secretos en texto plano?
- ¿Se usan algoritmos de hash débiles (MD5, SHA-1)?
- ¿Se transmiten datos sensibles sin HTTPS en producción?
- ¿Aparecen secrets, API keys o credenciales hardcodeadas en el código fuente?
- ¿Las variables de entorno sensibles están expuestas via `app.json` o en el bundle?

### A03 — Injection

- ¿Se construyen queries concatenando strings con input del usuario?
- ¿Se usa `dangerouslySetInnerHTML` o equivalente en WebView sin sanitizar?
- ¿Los inputs del usuario se validan con Zod antes de usarse en lógica crítica?
- ¿Hay riesgo de SQL injection en llamadas a base de datos local (SQLite/MMKV)?

### A04 — Insecure Design

- ¿Los mensajes de error de auth revelan si un email existe o no?
- ¿Hay rate limiting en las llamadas de autenticación a la API?
- ¿Los tokens de reset/verificación tienen expiración corta (máx 1 hora)?
- ¿Se manejan adecuadamente los estados de error sin exponer stack traces al usuario?

### A05 — Security Misconfiguration

- ¿El modo debug de Expo está desactivado en builds de producción?
- ¿Las variables de entorno sensibles están en `.env` y en `.gitignore`?
- ¿Se usa `.env.example` como plantilla sin valores reales?
- ¿Los certificados y keystores están excluidos del repositorio (excepto debug.keystore)?
- ¿Las configuraciones de EAS exponen secretos en `eas.json`?

### A06 — Vulnerable and Outdated Components

- ¿Las versiones en `package.json` están pineadas sin `^`, `~` ni `*`?
- ¿`pnpm audit` reporta 0 vulnerabilidades críticas o altas?
- ¿Las dependencias nativas de Expo SDK están en la versión recomendada por `expo install`?
- ¿Se usan librerías abandonadas (sin mantenimiento en +2 años)?

### A07 — Identification and Authentication Failures

- ¿Los refresh tokens tienen duración máx 7 días?
- ¿Se invalidan los tokens al cerrar sesión (logout)?
- ¿Se invalidan los tokens al cambiar/resetear contraseña?
- ¿El flujo de login no revela si el error es "email incorrecto" vs "password incorrecto"?
- ¿Se implementa logout automático ante token expirado?

### A08 — Software and Data Integrity Failures

- ¿Los tokens JWT son verificados con la firma (no solo decodificados)?
- ¿Se valida el tipo de token (`access` vs `refresh`) antes de aceptarlo?
- ¿Los updates OTA (EAS Update) provienen solo de canales verificados?
- ¿Se valida la integridad de datos descargados de APIs externas antes de renderizar?

### A09 — Security Logging and Monitoring Failures

- ¿Se loggean intentos de autenticación fallidos en el backend?
- ¿Los logs NO contienen passwords, tokens completos ni datos personales sensibles?
- ¿Se usan herramientas de crash reporting (Sentry) sin capturar datos sensibles?

### A10 — Server-Side Request Forgery (SSRF)

- ¿La app hace requests HTTP a URLs controladas por el usuario sin validación?
- ¿Se valida y sanitiza cualquier URL recibida como input antes de usarla?
- ¿Los deep links son validados antes de procesarse?

## Formato del informe

Para cada hallazgo, reportar:

````
## [CRÍTICO/ALTO/MEDIO/BAJO] — <Nombre corto del hallazgo>

**Categoría OWASP:** A0X — Nombre
**Archivo/línea:** src/screens/LoginScreen.tsx:42
**¿Qué ocurre?** Descripción del problema en 1-2 líneas.
**¿Por qué es peligroso?** Impacto concreto si se explota.
**Corrección:**
```código corregido```
````

Si no se encuentran vulnerabilidades, indicar explícitamente:

```
✅ No se encontraron vulnerabilidades del OWASP Top 10 en el código revisado.
```

## Código a revisar

$input
