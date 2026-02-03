# Hibaelhárítási Útmutató (Verge3D Integráció)

Ha a 3D tartalom nem jelenik meg, vagy hibaüzenetet kapsz, kövesd ezt a listát.

## 1. A leggyakoribb hiba: A Fájlnév
A rendszer az **`index.html`** fájlt keresi a `public/v3d-app` mappában.
- **Hiba:** Ha a Verge3D-ből `my_project.html` néven exportáltál.
- **Megoldás:** Nevezd át a fájlt `index.html`-re a `public/v3d-app` mappában.

## 2. Rossz mappa szerkezet
A fájloknak **közvetlenül** a `public/v3d-app` alatt kell lenniük, nem egy almappában.

❌ **ROSSZ:** `public/v3d-app/export_mappa/index.html`  
✅ **JÓ:** `public/v3d-app/index.html`

## 3. Gyorsítótár (Cache)
Ha felülírtad a fájlokat, de még mindig a régit (vagy a "Várakozás..." képernyőt) látod:
- **Megoldás:** Nyomj egy kemény frissítést a böngészőben: `CTRL + F5` (Windows) vagy `CMD + SHIFT + R` (Mac).

## 4. Hiányzó "media" mappa
Néha a Verge3D külön `media` mappába teszi a hangokat vagy extra képeket.
- **Megoldás:** Ha van `media` mappa az exportban, azt is másold be a `public/v3d-app` alá.

## 5. Ellenőrző Lista
A `public/v3d-app` mappában ezeket kell látnod:
- [ ] `index.html` (NEM `projektneve.html`)
- [ ] `v3d.js`
- [ ] `visual_logic.js`
- [ ] `scene.glb` (vagy `.gltf`)
