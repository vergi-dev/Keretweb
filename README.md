# Verge3D x Next.js 3D Web Framework

Ez a projekt egy modern keretrendszert biztosít Verge3D alapú 3D webes alkalmazásokhoz. A Next.js (React) felel a felhasználói felületért, a routingért és az üzleti logikáért, míg a Verge3D végzi a 3D renderelést.

## 🚀 Gyorsindítás

1. **Telepítés:**
   ```bash
   npm install
   ```

2. **Fejlesztői szerver indítása:**
   ```bash
   npm run dev
   ```
   A projekt elérhető a [http://localhost:3000](http://localhost:3000) címen.

## 📁 Projekt Struktúra

- **`src/app`**: A weboldal oldalai (Next.js App Router).
- **`src/components`**: React UI komponensek.
  - `VergeViewer.tsx`: A 3D teret magába foglaló komponens.
- **`public/v3d-app`**: IDE KERÜLNEK a Verge3D exportált fájljai.
- **`docs/`**: Részletes dokumentáció.

## 🛠️ Fejlesztői Tudnivalók

- A 3D alkalmazás egy izolált `iframe`-ben fut a maximális kompatibilitás érdekében.
- A stílusokért a **Tailwind CSS** felel.
- További részletek a 3D integrációról: [docs/VERGE3D_WORKFLOW.md](docs/VERGE3D_WORKFLOW.md).

## 📝 Teendők / Roadmap

- [x] Projekt inicializálás (Next.js + TS + Tailwind)
- [x] Alap `VergeViewer` komponens
- [x] Dokumentáció alapjai
- [ ] Kommunikációs híd kiépítése (PostMessage API)
- [ ] UI vezérlők bekötése
- [ ] Loading state kezelése