/**
 * OBS Bible Verse Plugin — Shared Communication Layer
 * Handles BroadcastChannel (OBS 28+) with localStorage polling fallback.
 */

const BibleApp = (() => {
  const CHANNEL_NAME  = 'obs-bible-verse';
  const STATE_KEY     = 'obs-bible-verse-state';
  const SETTINGS_KEY  = 'obs-bible-verse-settings';
  const API_BASE      = 'https://bolls.life';
  const TRANSLATION_MAP = {
    'kjv': 'KJV', 'asv': 'ASV', 'web': 'WEB',
    'webbe': 'WEBBE', 'bbe': 'BBE', 'darby': 'DARBY',
    'ylt': 'YLT', 'dra': 'DRB', 'nkjv': 'NKJV',
    'niv': 'NIV', 'niv2011': 'NIV2011', 'esv': 'ESV',
    'nlt': 'NLT', 'nasb': 'NASB', 'rsv': 'RSV',
    'amp': 'AMP', 'msg': 'MSG', 'csb17': 'CSB17',
    'net': 'NET', 'gnv': 'GNV', 'lsv': 'LSV',
    'bsb': 'BSB', 'mev': 'MEV', 'cev': 'CEVD',
    'isv': 'ISV', 'erv': 'ERV', 'nlv': 'NLV',
    'gnt': 'GNT', 'almeida': 'ALM21',
    'synodal': 'SYNOD', 'cuv': 'CUV'
  };
  const POLL_INTERVAL = 80;

  // ── Bible book data: [fullName, abbreviation, chapterCount] ──────────────
  const BIBLE_BOOKS = [
    ['Genesis','Gen',50],['Exodus','Exo',40],['Leviticus','Lev',27],
    ['Numbers','Num',36],['Deuteronomy','Deu',34],['Joshua','Jos',24],
    ['Judges','Jdg',21],['Ruth','Rut',4],['1 Samuel','1Sa',31],
    ['2 Samuel','2Sa',24],['1 Kings','1Ki',22],['2 Kings','2Ki',25],
    ['1 Chronicles','1Ch',29],['2 Chronicles','2Ch',36],['Ezra','Ezr',10],
    ['Nehemiah','Neh',13],['Esther','Est',10],['Job','Job',42],
    ['Psalms','Psa',150],['Proverbs','Pro',31],['Ecclesiastes','Ecc',12],
    ['Song of Solomon','Son',8],['Isaiah','Isa',66],['Jeremiah','Jer',52],
    ['Lamentations','Lam',5],['Ezekiel','Eze',48],['Daniel','Dan',12],
    ['Hosea','Hos',14],['Joel','Joe',3],['Amos','Amo',9],
    ['Obadiah','Oba',1],['Jonah','Jon',4],['Micah','Mic',7],
    ['Nahum','Nah',3],['Habakkuk','Hab',3],['Zephaniah','Zep',3],
    ['Haggai','Hag',2],['Zechariah','Zec',14],['Malachi','Mal',4],
    ['Matthew','Mat',28],['Mark','Mar',16],['Luke','Luk',24],
    ['John','Joh',21],['Acts','Act',28],['Romans','Rom',16],
    ['1 Corinthians','1Co',16],['2 Corinthians','2Co',13],['Galatians','Gal',6],
    ['Ephesians','Eph',6],['Philippians','Phi',4],['Colossians','Col',4],
    ['1 Thessalonians','1Th',5],['2 Thessalonians','2Th',3],['1 Timothy','1Ti',6],
    ['2 Timothy','2Ti',4],['Titus','Tit',3],['Philemon','Phm',1],
    ['Hebrews','Heb',13],['James','Jam',5],['1 Peter','1Pe',5],
    ['2 Peter','2Pe',3],['1 John','1Jo',5],['2 John','2Jo',1],
    ['3 John','3Jo',1],['Jude','Jud',1],['Revelation','Rev',22],
  ];

  // ── Church-appropriate Google Fonts ──────────────────────────────────────
  const CHURCH_FONTS = [
    { label: 'Open Sans (Default)',    value: 'Open Sans',               google: true  },
    { label: 'Atkinson Hyperlegible', value: 'Atkinson Hyperlegible',   google: true  },
    { label: 'Georgia',                value: 'Georgia',                 google: false },
    { label: 'EB Garamond',            value: 'EB Garamond',             google: true  },
    { label: 'Cinzel',                 value: 'Cinzel',                  google: true  },
    { label: 'Playfair Display',       value: 'Playfair Display',        google: true  },
    { label: 'Lora',                   value: 'Lora',                    google: true  },
    { label: 'Cormorant Garamond',     value: 'Cormorant Garamond',      google: true  },
    { label: 'Crimson Text',           value: 'Crimson Text',            google: true  },
  ];

  const DEFAULTS = Object.freeze({
    action:       'show',
    reference:    '',
    text:         '',
    theme:        'gold',
    position:     'bottom',
    fontSize:     'md',
    animation:    'fade',
    visible:      false,
    timestamp:    0,
    opacity:      90,
    font:         'Open Sans',
    italic:       false,
    bgMode:       'color',
    bgImage:      null,
    customColors: { bg: '#080810', text: '#f0e6c4', ref: '#c9a84c' },
  });

  let _channel       = null;
  let _lastTimestamp = 0;
  let _onMessage     = null;

  function initChannel(role, onMessage) {
    _onMessage = onMessage;

    try {
      _channel = new BroadcastChannel(CHANNEL_NAME);
      _channel.onmessage = (e) => _dispatch(e.data);
    } catch (_) {
      _channel = null;
    }

    window.addEventListener('storage', (e) => {
      if (e.key === STATE_KEY && e.newValue) {
        try { _dispatch(JSON.parse(e.newValue)); } catch (_) {}
      }
    });

    setInterval(() => {
      try {
        const raw = localStorage.getItem(STATE_KEY);
        if (!raw) return;
        const state = JSON.parse(raw);
        if (state.timestamp !== _lastTimestamp) {
          _lastTimestamp = state.timestamp;
          _dispatch(state);
        }
      } catch (_) {}
    }, POLL_INTERVAL);

    if (role === 'overlay') {
      try {
        const raw = localStorage.getItem(STATE_KEY);
        if (raw) {
          const state = JSON.parse(raw);
          if (state.visible) {
            _lastTimestamp = state.timestamp;
            _dispatch(state);
          }
        }
      } catch (_) {}
    }
  }

  function send(state) {
    const payload = { ...DEFAULTS, ...state, timestamp: Date.now() };
    // Preserve nested customColors properly
    if (state.customColors) payload.customColors = { ...DEFAULTS.customColors, ...state.customColors };
    const json = JSON.stringify(payload);
    if (_channel) { try { _channel.postMessage(payload); } catch (_) {} }
    try { localStorage.setItem(STATE_KEY, json); } catch (_) {}
    _lastTimestamp = payload.timestamp;
  }

  async function fetchVerse(reference, translation) {
    if (!reference || !reference.trim()) {
      return { error: 'Please enter a verse reference.' };
    }

    try {
      const parsed = BibleApp.parseReference(reference.trim());
      if (!parsed) {
        return { error: 'Could not understand that reference. Try "John 3:16".' };
      }

      const { book, chapter, verse, endVerse } = parsed;

      const bookIndex = BIBLE_BOOKS.findIndex(b =>
        b[0].toLowerCase() === book.toLowerCase() ||
        (b[1] && b[1].toLowerCase() === book.toLowerCase())
      );

      if (bookIndex === -1) {
        return { error: `Book "${book}" not found.` };
      }

      const bookId = bookIndex + 1;
      const translationCode = TRANSLATION_MAP[translation.toLowerCase()]
        || translation.toUpperCase();

      let verses = [];

      if (endVerse && endVerse > verse) {
        // Multi-verse range — fetch each verse individually
        for (let v = verse; v <= endVerse; v++) {
          const url = `${API_BASE}/get-verse/${translationCode}/${bookId}/${chapter}/${v}/`;
          const res = await fetch(url);
          if (!res.ok) {
            return { error: `Verse not found. Check the reference and translation.` };
          }
          const data = await res.json();
          verses.push(data);
        }
      } else {
        // Single verse
        const url = `${API_BASE}/get-verse/${translationCode}/${bookId}/${chapter}/${verse}/`;
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 404) {
            return { error: `"${reference}" not found. Check the book name, chapter and verse.` };
          }
          return { error: `API error ${res.status}. Please try again.` };
        }
        const data = await res.json();
        verses.push(data);
      }

      // Combine text from all verses
      const combinedText = verses
        .map(v => buildDisplayText(v.text))
        .join(' ');

      // Build reference string locally
      const bookName = BIBLE_BOOKS[bookIndex][0];
      const verseRef = endVerse && endVerse > verse
        ? `${chapter}:${verse}-${endVerse}`
        : `${chapter}:${verse}`;
      const displayRef = `${bookName} ${verseRef}`;
      const formattedRef = `${displayRef} — ${translationCode}`;

      return {
        reference: formattedRef,
        text: combinedText,
        rawRef: displayRef
      };

    } catch (err) {
      if (err instanceof TypeError) {
        return { error: 'Network error. Check your internet connection.' };
      }
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  }

  function buildDisplayText(raw) {
    if (!raw) return '';
    return raw
      .replace(/<S>\d+<\/S>/g, '')  // Strip Strong's numbers
      .replace(/<[^>]+>/g, '')       // Strip all HTML tags
      .replace(/\n\d+\s*/g, ' ')    // Strip verse numbers
      .replace(/\s+/g, ' ')          // Collapse whitespace
      .trim();
  }

  /** Parse "John 3:16" or "1 Corinthians 13:4" into parts. */
  function parseReference(str) {
    const m = str.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
    if (!m) return null;
    return {
      book:     m[1].trim(),
      chapter:  parseInt(m[2], 10),
      verse:    parseInt(m[3], 10),
      endVerse: m[4] ? parseInt(m[4], 10) : null,
    };
  }

  function buildReference(book, chapter, verse) {
    return `${book} ${chapter}:${verse}`;
  }

  /** Filter books by prefix — returns array of full names. */
  function searchBooks(query) {
    if (!query) return [];
    const q = query.toLowerCase();
    return BIBLE_BOOKS
      .filter(([name, abbr]) =>
        name.toLowerCase().startsWith(q) ||
        abbr.toLowerCase().startsWith(q) ||
        name.toLowerCase().includes(q)
      )
      .map(([name]) => name)
      .slice(0, 8);
  }

  function saveSettings(settings) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULTS,
          ...parsed,
          customColors: { ...DEFAULTS.customColors, ...(parsed.customColors || {}) },
        };
      }
    } catch (_) {}
    return { ...DEFAULTS, customColors: { ...DEFAULTS.customColors } };
  }

  function _dispatch(state) {
    if (typeof _onMessage === 'function') { try { _onMessage(state); } catch (_) {} }
  }

  function _formatReference(raw, translation) {
    if (!raw) return '';
    if (raw.includes(' — ')) return raw;
    return `${raw} — ${translation}`;
  }

  return {
    initChannel, send, fetchVerse, buildDisplayText,
    parseReference, buildReference, searchBooks,
    saveSettings, loadSettings,
    DEFAULTS, BIBLE_BOOKS, CHURCH_FONTS,
  };
})();
