/* ============================================================
   YAM YAM BERLIN — sheets.js
   Single source of truth: Google Sheets as CMS
   ============================================================ */

const YYSheets = (() => {

  async function fetchTab(tabName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${YY_CONFIG.SHEET_ID}/values/${encodeURIComponent(tabName)}?key=${YY_CONFIG.API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sheets error: ${res.status} for tab "${tabName}"`);
    const json = await res.json();
    return (json.values || []).slice(1); // skip header row
  }

  /* ── MENU ─────────────────────────────────────────────── */
  async function getMenuItems() {
    const rows = await fetchTab(YY_CONFIG.TABS.MENU);
    const C = YY_CONFIG.COL;
    const seen = new Map();
    for (const row of rows) {
      if (!row[C.KATEGORIE]) continue;
      const item = {
        kategorie: (row[C.KATEGORIE] || '').trim(),
        id:        (row[C.ID]        || '').trim(),
        name:      (row[C.NAME]      || '').trim(),
        zusatz:    (row[C.ZUSATZ]    || '').trim(),
        desc_de:   (row[C.DESC_DE]   || '').trim(),
        desc_en:   (row[C.DESC_EN]   || '').trim(),
        allergene: (row[C.ALLERGENE] || '').trim(),
        preis:     (row[C.PREIS]     || '').trim(),
        img:       (row[C.IMG]       || '').trim(),
      };
      const key = `${item.kategorie}|${item.name}|${item.zusatz}`;
      seen.set(key, item);
    }
    return Array.from(seen.values());
  }

  function groupByNavCategory(items) {
    return YY_CONFIG.MENU_CATEGORIES.map(cat => {
      const catItems = items.filter(item =>
        cat.types.some(t => t.toLowerCase() === item.kategorie.toLowerCase())
      );
      const subGroups = {};
      for (const item of catItems) {
        if (!subGroups[item.kategorie]) subGroups[item.kategorie] = [];
        subGroups[item.kategorie].push(item);
      }
      return { ...cat, subGroups, items: catItems };
    });
  }

  function getIcons(item) {
    const icons = [];
    const text = `${item.name} ${item.zusatz} ${item.desc_en} ${item.desc_de}`.toLowerCase();
    if (item.zusatz.toLowerCase() === 'vegan' || text.includes('vegan')) icons.push('vegan');
    else if (text.includes('vegetari') || item.zusatz.toLowerCase() === 'veggie') icons.push('veg');
    if (item.zusatz.toLowerCase() === 'spicy' || text.includes('spicy')) icons.push('spicy');
    return icons;
  }

  /* ── HOME ─────────────────────────────────────────────── */
  // Cols: Kategorie | Bezeichnung/Tag | Details/Wert | Zusatzinfo
  async function getHomeData() {
    const rows = await fetchTab(YY_CONFIG.TABS.HOME);
    const data = { hours: [], contact: {}, menuTeaser: '', jobs: [] };
    for (const row of rows) {
      const [kat, tag, val, extra] = row.map(c => (c || '').trim());
      if (!kat && !tag) continue;
      if (kat === 'Öffnungszeiten') {
        data.hours.push({ day: tag, time: val, kitchen: extra });
      } else if (kat === 'Kontakt') {
        if (tag === 'Name')    data.contact.name   = val;
        if (tag === 'Adresse') data.contact.street = val, data.contact.city = extra;
        if (tag === 'Telefon') data.contact.phone  = val;
      } else if (kat === 'Menü') {
        data.menuTeaser = val;
      } else if (kat === 'Jobs') {
        data.jobs.push({ title: tag, employment: val, hours: extra });
      }
    }
    return data;
  }

  /* ── ABOUT ────────────────────────────────────────────── */
  // Cols: Section Headline (H) | Section Text (P) | CTA
  async function getAboutData() {
    const rows = await fetchTab(YY_CONFIG.TABS.ABOUT);
    return rows.map(row => ({
      headline: (row[0] || '').trim(),
      text:     (row[1] || '').trim(),
      cta:      (row[2] || '').trim(),
    })).filter(r => r.headline || r.text);
  }

  /* ── JOBS ─────────────────────────────────────────────── */
  // Cols: Job Titel | Anstellungsart & Zeit | Vollständiger Ausschreibungstext
  async function getJobsData() {
    const rows = await fetchTab(YY_CONFIG.TABS.JOBS);
    return rows.map(row => ({
      title:       (row[0] || '').trim(),
      employment:  (row[1] || '').trim(),
      description: (row[2] || '').trim(),
    })).filter(r => r.title);
  }

  /* ── DATENSCHUTZ ──────────────────────────────────────── */
  // Cols: H1 | h2 | P Strong | P
  async function getDatenschutzData() {
    const rows = await fetchTab(YY_CONFIG.TABS.DATENSCHUTZ);
    return rows.map(row => ({
      h1:     (row[0] || '').trim(),
      h2:     (row[1] || '').trim(),
      strong: (row[2] || '').trim(),
      p:      (row[3] || '').trim(),
    }));
  }

  return {
    getMenuItems, groupByNavCategory, getIcons,
    getHomeData, getAboutData, getJobsData, getDatenschutzData,
  };
})();
