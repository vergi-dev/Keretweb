# Verge3D Integrációs Munkafolyamat

Ez a dokumentum leírja, hogyan integrálható egy Verge3D projekt ebbe a Next.js webes keretrendszerbe.

## 1. Mappaszerkezet

A rendszer a következő struktúrát várja el a statikus fájlokhoz:

```
/public
  /v3d-app
    ├── index.html       (A Verge3D által generált belépési pont)
    ├── v3d.js           (A motor)
    ├── visual_logic.js  (A Puzzles logika)
    ├── scene.glb        (Maga a 3D modell/jelenet)
    └── ...egyéb textúrák és assetek
```

## 2. Exportálás Blenderből/Maxból/Maya-ból

Amikor a Verge3D-ben exportálsz:
1. Válaszd a **"Web Application"** exportálási módot (vagy a sima exportot, ha már megvan a HTML sablon).
2. Győződj meg róla, hogy a fő HTML fájl neve `index.html`.
3. Az exportálás után a keletkezett fájlokat másold be a projekt **`public/v3d-app/`** mappájába.

> **Fontos:** Ha felülírod a fájlokat, a Next.js automatikusan érzékeli a változást, de néha egy böngésző frissítés (F5) szükséges a `VergeViewer` komponens újratöltéséhez.

## 3. A `VergeViewer` Komponens

A 3D megjelenítésért a `src/components/VergeViewer.tsx` felel.
Technikai megoldás: **Iframe alapú izoláció**.

**Miért Iframe?**
- **Biztonság:** A Verge3D saját JavaScript környezete (változók, event loop) nem akad össze a React/Next.js állapotkezelésével.
- **CSS Függetlenség:** A 3D app stíluslapjai nem törik szét a weboldal UI-ját.

## 4. Kommunikációs Protokoll (React <-> Verge3D)

A rendszer a `postMessage` API-t használja. A Verge3D oldalon (Puzzles-ben) figyelni kell az eseményeket.

### Üzenet formátuma (TypeScript definíció)

```typescript
type V3DMessageAction = 'LOAD_SCENE' | 'CHANGE_MATERIAL' | 'PLAY_ANIMATION' | 'APP_LOADED' | 'OBJECT_CLICKED';

interface V3DMessage {
  action: V3DMessageAction;
  payload?: any;
}
```

### Példa Verge3D Puzzles implementációra

Ahhoz, hogy a Verge3D reagáljon a React gombokra:
1. Használd az **"event"** puzzle-t a HTML kategóriából.
2. Figyeld a `message` eseményt a `window` objektumon.
3. Olvasd ki az adatot: `event.data`.
4. Egy **"dict get"** puzzle-lel nézd meg az `action` kulcsot.
5. Ha az `action` == `'CHANGE_MATERIAL'`, hajtsd végre a változtatást.

### Üzenet küldése React-nek

Ha a felhasználó rákattint valamire a 3D térben:
1. Használd az **"exec script"** puzzle-t.
2. Kód:
   ```javascript
   window.parent.postMessage({
       action: 'OBJECT_CLICKED',
       payload: { objectName: 'Red_Sofa' }
   }, '*');
   ```