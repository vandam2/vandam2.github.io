// ============================================
// script.js — Search, filter, render (list style)
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
function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}

function buildCard(note) {
  const a = document.createElement('a');
  a.className = `note-card cat-${note.category}`;
  a.href = `viewer.html?note=${note.id}`;
  const tagsHTML = note.tags.map(t => `<span class="tag">${t}</span>`).join('');
  a.innerHTML = `
    <div class="note-card-left">
      <div class="card-top">
        <span class="card-category">${note.categoryLabel}</span>
        ${note.subcategory ? `<span class="card-subcat">· ${note.subcategory}</span>` : ''}
      </div>
      <div class="card-title">${note.title}</div>
      <div class="card-excerpt">${note.excerpt}</div>
      <div class="card-tags">${tagsHTML}</div>
    </div>
    <div class="note-card-right">
      <span class="card-date">${formatDate(note.date)}</span>
      <span class="card-arrow">→</span>
    </div>
  `;
  return a;
}

// ─── RENDER ─────────────────────────────────
function renderCards(notes) {
  cardGrid.innerHTML = '';

  if (notes.length === 0) {
    emptyState.style.display = 'block';
    resultCount.textContent = '0 results';
    return;
  }

  emptyState.style.display = 'none';
  resultCount.textContent = `${notes.length} note${notes.length !== 1 ? 's' : ''}`;

  const groupBySubcat = currentFilter !== 'all' && !currentSearch.trim();

  if (groupBySubcat) {
    const groups = {};
    notes.forEach(note => {
      const sub = note.subcategory || 'General';
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(note);
    });

    Object.keys(groups).sort().forEach(subcat => {
      const heading = document.createElement('div');
      heading.className = 'subcat-heading';
      heading.innerHTML = `<span class="subcat-label">${subcat}</span><span class="subcat-count">${groups[subcat].length}</span>`;
      cardGrid.appendChild(heading);
      groups[subcat].forEach(note => cardGrid.appendChild(buildCard(note)));
    });
  } else {
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    notes.forEach(note => cardGrid.appendChild(buildCard(note)));
  }
}

// ─── FILTERS ────────────────────────────────
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
  if (!currentSearch.trim()) filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
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
  item.addEventListener('click', e => {
    e.preventDefault();
    currentFilter = item.dataset.filter;
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.filter === currentFilter));
    applyFilters();
  });
});

function syncNavHighlight() {
  navItems.forEach(i => i.classList.toggle('active', i.dataset.filter === currentFilter));
}

// ─── SEARCH ─────────────────────────────────
searchInput.addEventListener('input', () => { currentSearch = searchInput.value; applyFilters(); });

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchInput.focus(); searchInput.select(); }
  if (e.key === 'Escape') { searchInput.blur(); searchInput.value = ''; currentSearch = ''; applyFilters(); }
});

// ─── INIT ────────────────────────────────────
totalCount.textContent = `${NOTES.length} notes`;
applyFilters();
