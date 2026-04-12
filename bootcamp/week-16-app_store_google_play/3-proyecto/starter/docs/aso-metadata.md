# Metadatos ASO — [Tu Dominio Asignado]

> Completa esta plantilla con los metadatos reales para publicar tu app.
> Esta documentación es parte del entregable del proyecto semana 16.

---

## Información de la App

- **Dominio asignado**: [ej. Farmacia]
- **Nombre de la app**: [ej. FarmaStock]
- **Público objetivo**: [ej. Auxiliares de farmacia y farmacéuticos]

---

## App Store (iOS)

### Name (máx. 30 chars)
```
[Tu app · keyword principal]
```
Caracteres: __/30

### Subtitle (máx. 30 chars)
```
[Propuesta de valor]
```
Caracteres: __/30

### Description (máx. 4000 chars)
```
[Párrafo introducción — 3-4 líneas]

✅ [Funcionalidad 1]
✅ [Funcionalidad 2]
✅ [Funcionalidad 3]

[Beneficio diferencial — 2-3 líneas]

Descarga [nombre] hoy y [call to action].
```

### Keywords (máx. 100 chars, sin espacios tras coma)
```
keyword1,keyword2,keyword3
```
Caracteres: __/100

### Category
- Primary: [Categoría]
- Secondary (optional): [Categoría]

### Age Rating
- Rating: [4+ / 12+ / 17+]
- Reason: [Sin contenido sensible / etc.]

---

## Google Play (Android)

### App name (máx. 30 chars)
```
[Tu App — keyword]
```
Caracteres: __/30

### Short description (máx. 80 chars)
```
[Frase directa + beneficio]
```
Caracteres: __/80

### Full description (máx. 4000 chars)
```
[Misma descripción que iOS — ambas tiendas aceptan el mismo texto]
```

### Category
- Category: [Categoría]

### Content Rating (IARC)
- Rating: [Everyone / Teen / Mature]
- Questionnaire completed: [ ] Yes / [ ] No

### Data Safety
- Data collected: [ ] None / [ ] Email / [ ] Location / [ ] Other: ___
- Data shared with third parties: [ ] Yes / [ ] No

---

## Shares & Assets

### Privacy Policy
- URL: [https://...]
- Hosted on: [ ] Notion / [ ] GitHub Pages / [ ] Other: ___

### Screenshots
- iOS 6.5" (1284×2778): [ ] Pantalla 1 / [ ] Pantalla 2 / [ ] Pantalla 3
- Android phone: [ ] Pantalla 1 / [ ] Pantalla 2 / [ ] Pantalla 3

### App Icon
- iOS 1024×1024 PNG: [ ] Listo
- Android 512×512 PNG: [ ] Listo
- Feature Graphic 1024×500 (Android): [ ] Listo

---

## Submit Configuration

### eas.json — ios section
```json
"ios": {
  "appleId": "___",
  "ascAppId": "___"
}
```

### eas.json — android section
```json
"android": {
  "serviceAccountKeyPath": "./secrets/service-account.json",
  "track": "internal"
}
```

---

## Checklist final pre-publicación

- [ ] bundleIdentifier único en app.json
- [ ] package único compatible en Android
- [ ] Versión semver en app.json (1.0.0)
- [ ] Nombre de la app ≤ 30 chars
- [ ] Subtítulo iOS ≤ 30 chars
- [ ] Descripción corta Android ≤ 80 chars
- [ ] Keywords iOS ≤ 100 chars sin repetir título
- [ ] URL de política de privacidad activa y accesible
- [ ] Screenshots no están en blanco ni muestran TODOs
- [ ] Sección submit en eas.json configurada
- [ ] secrets/ en .gitignore
