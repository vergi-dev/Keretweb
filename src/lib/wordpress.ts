// Ez a fájl kezeli a kommunikációt a WordPress API-val

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || '';

export interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

export async function getLatestPosts(): Promise<WPPost[]> {
  // Élesben itt fetch-elnénk a WP API-t
  // const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=3`);
  // return res.json();

  // DEMO ADATOK (amíg nincs bekötve az igazi API)
  return [
    {
      id: 1,
      title: { rendered: 'Hogyan használjuk a 3D konfigurátort?' },
      content: { rendered: '<p>Ez az útmutató segít eligazodni...</p>' },
      slug: 'hogyan-hasznaljuk'
    },
    {
      id: 2,
      title: { rendered: 'Új textúrák érkeztek' },
      content: { rendered: '<p>Mostantól elérhető a diófa borítás...</p>' },
      slug: 'uj-texturak'
    }
  ];
}

export async function getPageContent(slug: string) {
  // Specifikus oldal tartalmának lekérése (pl. Rólunk, Kapcsolat)
  // const res = await fetch(`${WP_API_URL}/pages?slug=${slug}`);
  // ...
  return {
    title: 'Verge3D Bemutató',
    content: 'Ez a szöveg a WordPress-ből jön dinamikusan.'
  };
}
