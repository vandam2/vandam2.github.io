// ============================================
// script.js — Search, filter, render
// ============================================

const cardGrid    = document.getElementById('cardGrid');
const searchInput = document.getElementById('searchInput');
const emptyState  = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');
const totalCount  = document.getElementById('totalCount');
const tabs        = document.querySelectorAll('.tab');
const navItems    = document.querySelectorAll('.nav-item[data-filter]');
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

let currentFilter = 'all';
let currentSearch = '';

// ─── THEME ──────────────────────────────────

const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeIcon.textContent = saved === 'dark' ? '☀' : '☾';

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.textContent = next === 'dark' ? '☀' : '☾';
});

// ─── HELPERS ────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
}

function buildCard(note) {
  const card = document.createElement('a');
  card.className = `note-card cat-${note.category}`;
  card.href = `viewer.html?note=${note.id}`;
  const tagsHTML = note.tags.map(t => `<span class="tag">${t}</span>`).join('');
  card.innerHTML = `
    <div class="card-top">
      <span class="card-category">${note.categoryLabel}</span>
      <span class="card-date">${formatDate(note.date)}</span>
    </div>
    <div class="card-title">${note.title}</div>
    <div class="card-excerpt">${note.excerpt}</div>
    <div class="card-tags">${tagsHTML}</div>
  `;
  return card;
}

// ─── RENDER CARDS ───────────────────────────

function renderCards(notes) {
  cardGrid.innerHTML = '';

  if (notes.length === 0) {
    emptyState.style.display = 'block';
    resultCount.textContent = '0 results';
    return;
  }

  emptyState.style.display = 'none';
  resultCount.textContent = `${notes.length} note${notes.length !== 1 ? 's' : ''}`;

  // If filtering by a specific category AND not searching, group by subcategory
  const groupBySubcat = currentFilter !== 'all' && !currentSearch.trim();

  if (groupBySubcat) {
    // Group notes by subcategory
    const groups = {};
    notes.forEach(note => {
      const sub = note.subcategory || 'General';
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(note);
    });

    // Sort subcategory names alphabetically
    const sortedKeys = Object.keys(groups).sort();

    sortedKeys.forEach(subcat => {
      // Subcategory heading
      const heading = document.createElement('div');
      heading.className = 'subcat-heading';
      heading.innerHTML = `<span class="subcat-label">${subcat}</span><span class="subcat-count">${groups[subcat].length}</span>`;
      cardGrid.appendChild(heading);

      // Cards for this subcategory
      const row = document.createElement('div');
      row.className = 'subcat-grid';
      groups[subcat].forEach(note => row.appendChild(buildCard(note)));
      cardGrid.appendChild(row);
    });

  } else {
    // Flat grid (all notes or search results)
    const flatGrid = document.createElement('div');
    flatGrid.className = 'subcat-grid';
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    notes.forEach(note => flatGrid.appendChild(buildCard(note)));
    cardGrid.appendChild(flatGrid);
  }
}

// ─── FILTER + SEARCH ────────────────────────

function applyFilters() {
  let filtered = [...NOTES];

  if (currentFilter !== 'all') {
    filtered = filtered.filter(n => n.category === currentFilter);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.tags.some(t => t.toLowerCase().includes(q)) ||
      n.categoryLabel.toLowerCase().includes(q) ||
      (n.subcategory && n.subcategory.toLowerCase().includes(q))
    );
  }

  if (!currentSearch.trim()) {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  renderCards(filtered);
}

// ─── TABS ────────────────────────────────────

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    syncNavHighlight();
    applyFilters();
  });
});

// ─── SIDEBAR NAV ────────────────────────────

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    currentFilter = item.dataset.filter;
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.filter === currentFilter);
    });
    applyFilters();
  });
});

function syncNavHighlight() {
  navItems.forEach(i => {
    i.classList.toggle('active', i.dataset.filter === currentFilter);
  });
}

// ─── SEARCH ─────────────────────────────────

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  applyFilters();
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape') {
    searchInput.blur();
    searchInput.value = '';
    currentSearch = '';
    applyFilters();
  }
});

// ─── INIT ────────────────────────────────────

totalCount.textContent = `${NOTES.length} notes`;
applyFilters();
