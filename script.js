// ============================================
// script.js — Bootstrap KB homepage
// ============================================

const CATS = [
  { id: 'powerapps',     label: 'Power Apps',     icon: 'bi-lightning-charge-fill' },
  { id: 'powerautomate', label: 'Power Automate', icon: 'bi-arrow-repeat' },
  { id: 'powerbi',       label: 'Power BI',       icon: 'bi-bar-chart-fill' },
  { id: 'sharepoint',    label: 'SharePoint',     icon: 'bi-diamond-fill' },
  { id: 'other',         label: 'Other',          icon: 'bi-circle' }
];

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}

function noteItemHTML(note) {
  return `
    <a href="viewer.html?note=${note.id}" class="kb-note-item">
      <div class="kb-note-left">
        <div class="kb-note-icon icon-${note.category}">
          <i class="bi bi-file-text"></i>
        </div>
        <div>
          <div class="kb-note-title">${note.title}</div>
          ${note.subcategory ? `<div class="kb-note-subcat">${note.subcategory}</div>` : ''}
        </div>
      </div>
      <div class="kb-note-right">
        <span class="kb-note-date">${formatDate(note.date)}</span>
        <i class="bi bi-chevron-right kb-note-arrow"></i>
      </div>
    </a>`;
}

// ─── BUILD CATEGORY SECTIONS ─────────────────
function buildCategorySections() {
  const container = document.getElementById('categorySections');
  container.innerHTML = '';

  CATS.forEach(cat => {
    const notes = NOTES.filter(n => n.category === cat.id)
                       .sort((a, b) => new Date(b.date) - new Date(a.date));

    const preview = notes.slice(0, 6);
    const hasMore = notes.length > 6;

    const section = document.createElement('div');
    section.className = 'kb-cat-section';
    section.id = `cat-${cat.id}`;

    section.innerHTML = `
      <div class="kb-cat-header cat-bg-${cat.id}">
        <span><i class="bi ${cat.icon}"></i>${cat.label}</span>
        <span class="kb-cat-count">${notes.length} note${notes.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="kb-note-list">
        ${preview.length === 0
          ? `<div class="kb-empty-cat"><i class="bi bi-journal-plus me-2"></i>No notes yet — <a href="new-note.html">add one</a>!</div>`
          : preview.map(noteItemHTML).join('')
        }
        ${hasMore ? `<a href="#" class="kb-view-all" data-cat="${cat.id}" onclick="showAll(event, '${cat.id}')">View all ${notes.length} notes <i class="bi bi-chevron-down ms-1"></i></a>` : ''}
      </div>`;

    container.appendChild(section);
  });
}

function showAll(e, catId) {
  e.preventDefault();
  const notes = NOTES.filter(n => n.category === catId)
                     .sort((a, b) => new Date(b.date) - new Date(a.date));
  const section = document.getElementById(`cat-${catId}`);
  const list = section.querySelector('.kb-note-list');
  list.innerHTML = notes.map(noteItemHTML).join('');
}

// ─── SIDEBAR ─────────────────────────────────
function buildSidebar() {
  // Recent notes
  const recent = [...NOTES].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const recentEl = document.getElementById('recentNotes');
  if (recent.length === 0) {
    recentEl.innerHTML = '<li class="text-muted small py-2">No notes yet</li>';
  } else {
    recentEl.innerHTML = recent.map(n => `
      <li>
        <a href="viewer.html?note=${n.id}">
          <i class="bi bi-file-text"></i>${n.title}
        </a>
      </li>`).join('');
  }

  // Category list
  const catEl = document.getElementById('catList');
  catEl.innerHTML = CATS.map(cat => {
    const count = NOTES.filter(n => n.category === cat.id).length;
    return `<li><a href="#cat-${cat.id}"><span><i class="bi ${cat.icon} me-2" style="color:var(--accent)"></i>${cat.label}</span><span class="cat-badge">${count}</span></a></li>`;
  }).join('');

  // Tags
  const tagMap = {};
  NOTES.forEach(n => n.tags.forEach(t => { tagMap[t] = (tagMap[t] || 0) + 1; }));
  const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]).slice(0, 20);
  const tagsEl = document.getElementById('popularTags');
  if (sortedTags.length === 0) {
    tagsEl.innerHTML = '<span class="text-muted small">No tags yet</span>';
  } else {
    tagsEl.innerHTML = sortedTags.map(([tag]) =>
      `<span class="kb-tag" onclick="searchByTag('${tag}')">${tag}</span>`
    ).join('');
  }
}

function searchByTag(tag) {
  document.getElementById('searchInput').value = tag;
  doSearch(tag);
}

// ─── SEARCH ──────────────────────────────────
function doSearch(q) {
  const query = q.trim().toLowerCase();
  const categorySections = document.getElementById('categorySections');
  const searchResults = document.getElementById('searchResults');
  const searchResultsList = document.getElementById('searchResultsList');

  if (!query) {
    categorySections.style.display = 'block';
    searchResults.style.display = 'none';
    return;
  }

  categorySections.style.display = 'none';
  searchResults.style.display = 'block';

  const matches = NOTES.filter(n =>
    n.title.toLowerCase().includes(query) ||
    n.excerpt.toLowerCase().includes(query) ||
    n.tags.some(t => t.toLowerCase().includes(query)) ||
    n.categoryLabel.toLowerCase().includes(query) ||
    (n.subcategory && n.subcategory.toLowerCase().includes(query))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (matches.length === 0) {
    searchResultsList.innerHTML = `<div class="kb-no-results"><i class="bi bi-search fs-2 d-block mb-2 opacity-25"></i>No results for "<strong>${q}</strong>"</div>`;
    return;
  }

  searchResultsList.innerHTML = matches.map(n => `
    <a href="viewer.html?note=${n.id}" class="kb-search-result">
      <div class="kb-note-left">
        <div class="kb-note-icon icon-${n.category}"><i class="bi bi-file-text"></i></div>
        <div>
          <div class="kb-note-title">${n.title}</div>
          <div class="kb-search-result-excerpt">${n.excerpt}</div>
        </div>
      </div>
      <div class="kb-note-right">
        <span class="kb-badge kb-badge-${n.category}">${n.categoryLabel}</span>
        <i class="bi bi-chevron-right kb-note-arrow"></i>
      </div>
    </a>`).join('');
}

document.getElementById('searchInput').addEventListener('input', e => doSearch(e.target.value));

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') {
    document.getElementById('searchInput').value = '';
    doSearch('');
  }
});

// ─── INIT ─────────────────────────────────────
buildCategorySections();
buildSidebar();
