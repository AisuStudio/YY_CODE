/* ============================================================
   YAM YAM BERLIN — menu.js
   Menu rendering, category navigation, scrollspy
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const menuRoot = document.getElementById('menu-root');
  const navInner = document.getElementById('menu-nav-inner');

  // --- Loading state
  menuRoot.innerHTML = '<div class="menu-loading" role="status" aria-live="polite">Loading menu…</div>';

  try {
    const allItems = await YYSheets.getMenuItems();
    const categories = YYSheets.groupByNavCategory(allItems);

    renderNav(categories);
    renderMenu(categories, menuRoot);
    initScrollspy(categories);
    initMobileNav();

  } catch (err) {
    menuRoot.innerHTML = `<div class="menu-loading" style="color:var(--black)">
      Could not load menu. Please try again later.<br>
      <small style="font-size:12px;color:var(--gray-mid)">${err.message}</small>
    </div>`;
    console.error('Menu load error:', err);
  }
});

/* ---- Nav -------------------------------------------------- */
function renderNav(categories) {
  const navInner = document.getElementById('menu-nav-inner');
  navInner.innerHTML = categories.map((cat, i) => `
    <button
      class="menu-nav__btn${i === 0 ? ' active' : ''}"
      data-cat="${cat.id}"
      aria-label="${cat.label} Menükategorie"
      onclick="scrollToSection('${cat.id}')"
    >${cat.label}</button>
  `).join('');
}

function scrollToSection(id) {
  const el = document.getElementById(`section-${id}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- Scrollspy -------------------------------------------- */
function initScrollspy(categories) {
  const sections = categories.map(cat =>
    document.getElementById(`section-${cat.id}`)
  ).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('section-', '');
        document.querySelectorAll('.menu-nav__btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.cat === id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---- Mobile nav toggle ------------------------------------ */
function initMobileNav() {
  const toggle = document.querySelector('.site-nav__toggle');
  const links  = document.querySelector('.site-nav__links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

/* ---- Main render ------------------------------------------ */
function renderMenu(categories, root) {
  root.innerHTML = categories.map(cat => renderSection(cat)).join('');
}

function renderSection(cat) {
  const subGroupKeys = Object.keys(cat.subGroups);
  const isInfo = YY_CONFIG.INFO_TYPES.includes(cat.id);

  const content = subGroupKeys.map(key => {
    const items = cat.subGroups[key];
    const heroItems = items.filter(i => i.id && i.id.toUpperCase() === 'HERO');
    const infoItems = items.filter(i => !i.id || i.id.length === 0);
    const dishItems = items.filter(i => i.id && i.id.length > 0 && i.id.toUpperCase() !== 'HERO');

    const infoHtml = infoItems.map(renderInfoBox).join('');

    let dishHtml = '';
    if (cat.layout === 'list') {
      dishHtml = dishItems.length
        ? `<div class="drink-list">${dishItems.map(renderDrinkRow).join('')}</div>`
        : '';
    } else {
      const firstKategorie = items[0]?.kategorie || '';
      const isCompact = cat.compactCategories && cat.compactCategories.includes(firstKategorie);
      const gridClass = isCompact ? 'menu-grid menu-grid--compact' : 'menu-grid';
      dishHtml = dishItems.length
        ? `<div class="${gridClass}">${dishItems.map(renderDishCard).join('')}</div>`
        : '';
    }

    // Subheader appears when:
    //   (a) Sheet's subheader column is filled, OR
    //   (b) the parent nav-section groups multiple kategorien together
    const hasExplicitSubheader = items.some(i => i.subheader && i.subheader.length > 0);
    const hasMultipleKategorien = subGroupKeys.length > 1;
    const showSubHeader = hasExplicitSubheader || hasMultipleKategorien;
    const subHeader = showSubHeader
      ? `<h3 class="menu-subcategory-title">${formatSubGroupLabel(key)}</h3>`
      : '';

    const heroHtml = heroItems.map(renderHeroBox).join('');
    return `${subHeader}${heroHtml}${infoHtml}${dishHtml}`;
  }).join('');

  return `
    <section class="menu-section" id="section-${cat.id}">
      <div class="menu-section__header">
        <h2 class="menu-section__title">${cat.label}</h2>
      </div>
      ${content}
    </section>
  `;
}

/* ---- Info box --------------------------------------------- */
function renderInfoBox(item) {
  const priceHtml = item.preis
    ? `<span class="dish-card__price">${item.preis}</span>`
    : '';
  return `
    <div class="menu-info-box">
      ${item.name ? `<p class="t-body"><strong>${item.name}</strong></p>` : ''}
      ${item.desc_en ? `<p class="t-body">${item.desc_en}</p>` : ''}
      ${item.desc_de ? `<p class="t-body t-body--muted">${item.desc_de}</p>` : ''}
      ${priceHtml}
    </div>
  `;
}

/* ---- Hero Box (intro with image) -------------------------- */
function renderHeroBox(item) {
  const imgSrc = YY_CONFIG.getImgSrc(item.img);
  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${item.alt || item.name + ' – Yam Yam Berlin'}" loading="lazy" onerror="this.style.display='none'">`
    : '';

  return `
    <div class="menu-hero-box">
      ${imgHtml ? `<div class="menu-hero-box__img">${imgHtml}</div>` : ''}
      <div class="menu-hero-box__body">
        ${item.name ? `<p class="t-body"><strong>${item.name}</strong></p>` : ''}
        ${item.desc_en ? `<p class="t-body">${item.desc_en}</p>` : ''}
        ${item.desc_de ? `<p class="t-body t-body--muted">${item.desc_de}</p>` : ''}
      </div>
    </div>
  `;
}

/* ---- Dish Card -------------------------------------------- */
function renderDishCard(item) {
  const icons  = YYSheets.getIcons(item);
  const imgSrc = YY_CONFIG.getImgSrc(item.img)
    ? YY_CONFIG.getImgSrc(item.img)
    : null;

  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${item.alt || item.name + ' – Yam Yam Berlin'}" loading="lazy" onerror="this.parentElement.style.display='none'">`
    : '';

  const idLabel = (item.id && item.id.toUpperCase() !== 'ITEM')
    ? `${item.id} ${item.name}`
    : item.name;

  const isNew = item.zusatz.trim().toLowerCase() === 'new';
  const iconsHtml = icons.map(i => `<span class="icon icon-${i}"></span>`).join('');
  const zusatzHtml = item.zusatz && !isNew
    ? `<span class="dish-card__zusatz">${item.zusatz}</span>`
    : '';
  const badgeHtml = isNew
    ? `<span class="dish-card__badge">New</span>`
    : '';
  const allergenHtml = item.allergene
    ? `<p class="dish-card__allergene t-body t-body--muted">${item.allergene}</p>`
    : '';
  const priceHtml = item.preis
    ? `<span class="dish-card__price">${item.preis}</span>`
    : '';

  return `
    <article class="dish-card">
      ${badgeHtml}
      <div class="dish-card__img-wrap${imgHtml ? '' : ' dish-card__img-wrap--empty'}">${imgHtml}</div>
      <div class="dish-card__body">
        <div class="dish-card__title-row">
          <span class="dish-card__title">${idLabel}</span>
          ${zusatzHtml}
          <span class="dish-card__icons">${iconsHtml}</span>
        </div>
        ${item.desc_en ? `<p class="t-body">${item.desc_en}</p>` : ''}
        ${item.desc_de ? `<p class="t-body t-body--muted">${item.desc_de}</p>` : ''}
        ${allergenHtml}
        <div class="dish-card__footer">
          ${priceHtml}
        </div>
      </div>
    </article>
  `;
}

/* ---- Drink Row -------------------------------------------- */
function renderDrinkRow(item) {
  const icons  = YYSheets.getIcons(item);
  const iconsHtml = icons.map(i => `<span class="icon icon-${i}"></span>`).join('');

  const descHtml = item.desc_en
    ? `<div class="drink-row__desc t-body t-body--muted">${item.desc_en}${item.desc_de ? ` · ${item.desc_de}` : ''}</div>`
    : '<div class="drink-row__desc"></div>';
  const allergenHtml = item.allergene
    ? `<span class="drink-row__allergene t-body t-body--muted">${item.allergene}</span>`
    : '';

  const hasSecond = item.zusatz_2 && item.preis_2;
  const volume2Html = hasSecond
    ? `<span class="drink-row__volume drink-row__volume--2 t-body t-body--muted">${item.zusatz_2}</span>`
    : '<span class="drink-row__volume drink-row__volume--2"></span>';
  const price2Html = hasSecond
    ? `<span class="drink-row__price drink-row__price--2">${item.preis_2}</span>`
    : '<span class="drink-row__price drink-row__price--2"></span>';

  return `
    <div class="drink-row">
      <div class="drink-row__name t-body t-body--strong">
        ${item.name}
        ${iconsHtml}
        ${allergenHtml}
      </div>
      ${descHtml}
      <span class="drink-row__volume t-body t-body--muted">${item.zusatz || ''}</span>
      <span class="drink-row__price">${item.preis || ''}</span>
      ${volume2Html}
      ${price2Html}
    </div>
  `;
}

/* ---- Helpers ---------------------------------------------- */
function formatSubGroupLabel(key) {
  return key;
}
