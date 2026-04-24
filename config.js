/* ============================================================
   YAM YAM BERLIN — config.js
   Central config: API credentials, Sheet tabs, image mapping
   ============================================================ */

const YY_CONFIG = {
  SHEET_ID: '1np-pFIEK8PD8OdEOArdllTTmqnhBj2Pf4ELICj1PXMU',
  API_KEY:  'AIzaSyB4AzCvPNmzaksMLPL5zpJcRX6czyQcyK8',

  TABS: {
    MENU:        'Menue',
    HOME:        'Home',
    ABOUT:       'About',
    JOBS:        'Jobs',
    DATENSCHUTZ: 'Datenschutz',
  },

  // Image base path — relative to __CODE root
  IMG_BASE: 'images/menu/',

  // Semantic mapping: Sheet IMG field → actual filename
  // Filenames without extension (we try .png first, .jpg fallback)
  IMG_MAP: {
    // Lunch & Daily Specials
    'Bulgogi_Dobbab':          'P1133312-bab_bulgogi_240',
    'Dubu_Bokum':              'P1133312-bab_dubu_240',
    'Zapzeh_Dobbab':           'P1133312-bab_zapzeh_240',
    'Mul_Nengmyun':            null,
    'Yangnyeom_Tongdak':       null,
    'Sogogi_Sehu_Bokum_Myun':  null,

    // Small Soups
    'Kimchi_Soup_Small':       'P1133264-kimchi_tchigeh_klein_240',
    'Miyok_Guk_Small':         'P1133264-miyokguk_klein_240',

    // Banzan
    'Kimchi':                  'P1133020_banzan_kimchi_240',
    'Kkakdugi':                'P1133020_banzan_kkakdugi_240',
    'Shigeumchi_Namul':        'P1133020_banzan_shigeumchi_240',
    'Odeng_Bokum_Spicy':       'P1133020_banzan_odengbokum_240',
    'Odeng_Bokum_Mild':        'P1133020_banzan_odengbokuM_mild_240',
    'Oi_Muzim':                'P1133020_banzan_oi_muzim_240',
    'Mul_Kimchi':              'P1133020_banzan_mulkimchi_240',
    'Gim':                     'P1133020_banzan_gim_240',
    'Djang_Djorim':            'P1133020_banzan_djangdjorim_240',
    'Gochu_Muzim':             'P1133020_banzan_pepper_240',
    'Jangpa_Jangajji':         'P1133020_banzan_onions_240',
    'Ssam_Mu':                 'P1133020_banzan_rettich_240',
    'Dubu_Jorim':              null,
    'Banzan_Set':              'P1133122-banzan_240',

    // Ssam
    'Classic_Ssam':            'P1133127_ssam_240',
    'Gogi_Ssam':               'P1133127_ssam_240',

    // Gimbab
    'Classic_Gimbab':          'P1133321-gimbab_classic_240',
    'Gogi_Gimbab':             'P1133321-gimbab_gogi_240',
    'Zamtzi_Gimbab':           'P1133321-gimbab_zamtzi_240',
    'Odeng_Gimbab':            'P1133321-gimbab_eumok_240',

    // Mandu Steamed
    'Jazeh_Mandu_Steamed':     'P1133227-mandu_dampf_jazeh_240',
    'Gogi_Mandu_Steamed':      'P1133227-mandu_dampf_gogi_240',
    'Sehu_Mandu_Steamed':      'P1133227-mandu_dampf_zamtzi_240',

    // Mandu Fried
    'Jazeh_Mandu_Fried':       'P1133246-mandu_fried_jazeh_240',
    'Gogi_Mandu_Fried':        'P1133246-mandu_fried_gogi',
    'Sehu_Mandu_Fried':        'P1133246-mandu_fried_sehu_240',

    // Soups
    'Miyok_Guk_Beef':          'P1133299-miyuk_guk_gross_240',
    'Miyok_Guk_Vegan':         'P1133299-miyuk_guk_gross_240',
    'Kimchi_Tchigeh_Classic':  'P1133271-tchigeh_kimchi_240',
    'Kimchi_Tchigeh_Vegan':    'P1133271-tchigeh_kimchi_240',
    'Kimchi_Tchigeh_Pork':     'P1133271-tchigeh_bulgogi_240',
    'Kimchi_Tchigeh_Tuna':     'P1133271-tchigeh_bulgogi_240',
    'Jukgaejang':              'P1133271-tchigeh_jukgaejang',
    'Zampong':                 'P1133293-zampong_240',
    'Chajangmyun_Vegan':       'P1133312-chajangmyun_240',
    'Chajangmyun_Pork':        'P1133312-chajangmyun_240',

    // Bibimbab
    'Bibimbab_Vegan':          'P1133147-bibimbab_240',
    'Bibimbab_Beef':           'P1133147-bibimbab_240',
    'Bibimbab_Tuna':           'P1133147-bibimbab_240',
    'Bibimbab_Avocado':        'P1133147-bibimbab_240',
    'Bibimbab_Tofu':           'P1133147-bibimbab_240',

    // Rice Bowls
    'Bulgogi_Dobbab_Bowl':     'P1133312-bab_bulgogi_240',
    'Dubu_Bokum_Bowl':         'P1133312-bab_dubu_240',
    'Zapzeh_Dobbab_Bowl':      'P1133312-bab_zapzeh_240',
    'Zejuk_Bokum':             'P1133312-bab_zejuk_240',
    'Ozinger_Bokum':           'P1133312-bab_ozinger_240',
    'Dak_Bokum':               'P1133312-bab_dak_240',
    'Dubu_Bokum_Spicy':        'P1133312-bab_dubu_bokum_240',

    // Nokdu Choen
    'Classic_Nokdu_Choen':     'P1133177-choen_classic_240',
    'Haemul_Nokdu_Choen':      'P1133177-choen_haemul_240',
    'Kimchi_Nokdu_Choen':      'P1133177-choen_kimchi_240',

    // Bindae Tteok
    'Pa_Choen':                'P1133177-choen_pa_240',
    'Haemul_Choen':            'P1133177-choen_haemul_wheat_240',
    'Kimchi_Choen':            'P1133177-choen_kmichi_wheat_240',

    // Kids
    'Kids_Gyeran_Mari':        'P1133102_kids_menu_gueran_240',
    'Kids_Dak_Gang_Jeong':     'P1133102_kids_menu_gogi_240',

    // Desserts
    'Yamyam_Subak':            'P1133409-subak_240',
    'Hot_Ddok':                'P1133409-hotdogg_240',
    'Tarte_Chocolat':          null,
    'Apple_Crumble':           null,

    // Icecream
    'Matcha_Ice':              'P1133416-eiscremes_matcha',
    'Popcorn_Ice':             'P1133416-eiscremes_pop_240',
    'Basil_Ice':               'P1133416-eiscremes_basil_240',
    'Sesame_Ice':              'P1133416-eiscremes_sesam_240',
  },

  // Navigation categories
  MENU_CATEGORIES: [
    {
      id: 'lunch',
      label: 'Lunch & Dailies',
      types: ['Lunch Selection', 'Lunch', 'Daily Specials Info', 'Daily Specials', 'Lunch Info'],
      layout: 'cards',
    },
    {
      id: 'starters',
      label: 'Soups & Starters',
      types: ['Small Soups', 'Banzan', 'Yamyam Ssam', 'Gimbab', 'Mandu Steamed', 'Mandu Fried'],
      layout: 'cards',
    },
    {
      id: 'mains',
      label: 'Mains',
      types: ['Soups', 'Bibimbab', 'Rice Bowls', 'Nokdu Choen', 'Bindae T Teok', 'Kids Doshirak', 'Extras'],
      layout: 'cards',
    },
    {
      id: 'desserts',
      label: 'Desserts',
      types: ['Desserts', 'Icecream'],
      layout: 'cards',
    },
    {
      id: 'beverages',
      label: 'Beverages',
      types: [
        'Vital Water', 'Vital Water Info',
        'Homemades', 'Cold Drinks', 'Korean Beverages',
        'Wine', 'Beer', 'Longdrinks', 'Spirits',
        'Coffee', 'Tea',
        'Premium Liquor Info', 'Premium Liquor',
      ],
      layout: 'list',
    },
  ],

  // Sheet column indices (0-based)
COL: {
    VISIBILITY: 0,
    KATEGORIE:  1,
    ID:         2,
    NAME:       3,
    ZUSATZ:     4,
    DESC_DE:    5,
    DESC_EN:    6,
    ALLERGENE:  7,
    PREIS:      8,
    ALT:        9,
    IMG:        10,
  },

  // Info-only row types
  INFO_TYPES: [
    'Info', 'Lunch Selection', 'Lunch Info',
    'Daily Specials Info', 'General Info',
    'Vital Water Info', 'Premium Liquor Info',
  ],

  // Helper: resolve image src from Sheet IMG field
  getImgSrc(imgField) {
    if (!imgField) return null;
    const mapped = this.IMG_MAP[imgField];
    if (!mapped) return null;
    return `${this.IMG_BASE}${mapped}.png`;
  },
};
