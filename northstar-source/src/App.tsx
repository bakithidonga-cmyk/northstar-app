import { useMemo, useState } from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Info,
  Play,
  Plus,
  Search,
  X,
} from 'lucide-react';

type Title = {
  id: string;
  name: string;
  kind: string;
  year: string;
  rating: string;
  synopsis: string;
  image: string;
  accent: string;
};

const titles: Title[] = [
  {
    id: 'glass-harbor',
    name: 'Glass Harbor',
    kind: 'LIMITED SERIES',
    year: '2025',
    rating: 'TV-MA',
    synopsis:
      'A remote coastal town keeps its secrets below the tide. When a stranger returns, the past comes ashore.',
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85',
    accent: 'Mystery',
  },
  {
    id: 'night-drive',
    name: 'Night Drive',
    kind: 'FILM',
    year: '2025',
    rating: 'R',
    synopsis:
      'One late shift. One impossible passenger. A city that never lets you leave.',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85',
    accent: 'Thriller',
  },
  {
    id: 'wild-earth',
    name: 'Wild Earth',
    kind: 'DOCUMENTARY',
    year: '2024',
    rating: 'TV-PG',
    synopsis:
      'An intimate journey into the places where life still follows its oldest rhythms.',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=85',
    accent: 'Nature',
  },
  {
    id: 'red-line',
    name: 'Red Line',
    kind: 'SERIES',
    year: '2025',
    rating: 'TV-14',
    synopsis:
      'A rookie investigator finds the one clue that connects every case.',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85',
    accent: 'Crime',
  },
  {
    id: 'orbit-nine',
    name: 'Orbit Nine',
    kind: 'FILM',
    year: '2025',
    rating: 'PG-13',
    synopsis:
      'The crew of a research station receives a message from somewhere impossible.',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=85',
    accent: 'Sci-Fi',
  },
  {
    id: 'blue-hour',
    name: 'Blue Hour',
    kind: 'FILM',
    year: '2024',
    rating: 'PG-13',
    synopsis:
      'Two strangers meet every evening at the edge of a changing city.',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85',
    accent: 'Drama',
  },
  {
    id: 'the-last-garden',
    name: 'The Last Garden',
    kind: 'SERIES',
    year: '2025',
    rating: 'TV-14',
    synopsis:
      'A botanist discovers a hidden greenhouse and a story that should not exist.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85',
    accent: 'Fantasy',
  },
  {
    id: 'high-country',
    name: 'High Country',
    kind: 'DOCUMENTARY',
    year: '2024',
    rating: 'TV-G',
    synopsis:
      'Above the clouds, a small community learns to live with the mountain.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85',
    accent: 'Nature',
  },
  {
    id: 'afterglow',
    name: 'Afterglow',
    kind: 'SERIES',
    year: '2025',
    rating: 'TV-MA',
    synopsis:
      'A radio host receives calls from a neighborhood that disappeared years ago.',
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=700&q=85',
    accent: 'Mystery',
  },
  {
    id: 'slow-burn',
    name: 'Slow Burn',
    kind: 'FILM',
    year: '2024',
    rating: 'R',
    synopsis:
      'A chef returns home to rebuild a restaurant and reconcile with her brother.',
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85',
    accent: 'Drama',
  },
];

const rows = [
  {
    title: 'Trending Now',
    ids: [
      'night-drive',
      'red-line',
      'orbit-nine',
      'afterglow',
      'wild-earth',
      'blue-hour',
    ],
  },
  {
    title: 'Only on Northstar',
    ids: [
      'glass-harbor',
      'the-last-garden',
      'slow-burn',
      'high-country',
      'night-drive',
      'red-line',
    ],
  },
  {
    title: 'Because You Watched Glass Harbor',
    ids: [
      'afterglow',
      'blue-hour',
      'orbit-nine',
      'the-last-garden',
      'wild-earth',
      'slow-burn',
    ],
  },
];

function App() {
  const [active, setActive] = useState('Home');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('northstar-saved') || '[]');
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState<Title | null>(null);
  const [notice, setNotice] = useState('');

  const toggleSaved = (id: string) => {    setSaved(current => {
      const next = current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id];
      localStorage.setItem('northstar-saved', JSON.stringify(next));
      return next;
    });
    setNotice(saved.includes(id) ? 'Removed from My List' : 'Added to My List');
    window.setTimeout(() => setNotice(''), 1800);
  };

  const visibleTitles = useMemo(
    () =>
      titles.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.accent.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const activeRows =
    active === 'My List'
      ? [
          {
            title: 'My List',
            ids: titles
              .filter(item => saved.includes(item.id))
              .map(item => item.id),
          },
        ]
      : active === 'Series'
        ? [
            {
              title: 'Series to explore',
              ids: titles
                .filter(item => item.kind.includes('SERIES'))
                .map(item => item.id),
            },
          ]
        : active === 'Films'
          ? [
              {
                title: 'Films to explore',
                ids: titles
                  .filter(item => item.kind === 'FILM')
                  .map(item => item.id),
              },
            ]
          : rows;

  const openTitle = (id: string) => {
    const item = titles.find(title => title.id === id);
    if (item) setSelected(item);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#"
          onClick={() => setActive('Home')}
          aria-label="Northstar home"
        >
          NORTHSTAR<span>+</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {['Home', 'Series', 'Films', 'New & Popular', 'My List'].map(item => (
            <button
              key={item}
              className={active === item ? 'nav-link active' : 'nav-link'}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className={searchOpen ? 'search-box open' : 'search-box'}>
            <button
              aria-label="Search titles"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} />
            </button>
            {searchOpen && (
              <input
                autoFocus
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event =>
                  event.key === 'Escape' && (setSearchOpen(false), setQuery(''))
                }
                placeholder="Titles, genres"
              />
            )}
            {searchOpen && (
              <button
                aria-label="Close search"
                onClick={() => {
                  setSearchOpen(false);
                  setQuery('');
                }}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={19} />
          </button>
          <button className="profile">
            <span className="avatar">
              <CircleUserRound size={21} />
            </span>
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="Featured title">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow">
              <span className="star-mark">✦</span> NORTHSTAR ORIGINAL
            </div>
            <div className="hero-title">
              <span className="title-kicker">A STORY BENEATH THE SURFACE</span>
              <h1>
                GLASS
                <br />
                HARBOR
              </h1>
            </div>
            <p className="hero-copy">Every secret leaves a trace.</p>
            <p className="hero-description">
              When a marine biologist returns to her island home, a discovery in
              the deep threatens to change everything she thought she knew.
            </p>
            <div className="hero-meta">
              <span className="match">98% Match</span>
              <span>2025</span>
              <span className="rating">TV-MA</span>
              <span>Limited Series</span>
              <span className="ultra">4K</span>
            </div>
            <div className="hero-buttons">
              <button
                className="play-button"
                onClick={() => openTitle('glass-harbor')}
              >
                <Play size={20} fill="currentColor" /> Play
              </button>
              <button
                className="more-button"
                onClick={() => openTitle('glass-harbor')}
              >
                <Info size={20} /> More Info
              </button>
            </div>
          </div>
          <div className="hero-caption">
            <span>NEW SERIES</span>
            <b>1 Season</b>
          </div>
          <button className="age-mark" aria-label="Mature audience rating">
            16+
          </button>
          <div className="hero-progress">
            <span />
          </div>
        </section>

        {searchOpen && query.trim() ? (
          <section className="search-results">
            <h2>Results for “{query}”</h2>
            <div className="search-grid">
              {visibleTitles.map(item => (
                <Poster
                  key={item.id}
                  item={item}
                  saved={saved.includes(item.id)}
                  onOpen={openTitle}
                  onSave={toggleSaved}
                />
              ))}
            </div>
            {visibleTitles.length === 0 && (
              <p className="empty-state">
                No titles found. Try another title or genre.
              </p>
            )}
          </section>
        ) : (
          <div className="browse-content">
            {activeRows.map(row => (
              <section className="title-row" key={row.title}>                <div className="row-heading">
                  <h2>{row.title}</h2>
                  <button aria-label={`Browse ${row.title}`}>
                    Explore all <ChevronRight size={16} />
                  </button>
                </div>
                {row.ids.length ? (
                  <div className="poster-track">
                    <button
                      className="scroll-control left"
                      aria-label="Scroll left"
                      onClick={event =>
                        event.currentTarget.parentElement
                          ?.querySelector('.poster-list')
                          ?.scrollBy({ left: -620, behavior: 'smooth' })
                      }
                    >
                      <ChevronLeft />
                    </button>
                    <div className="poster-list">
                      {row.ids.map(id => {
                        const item = titles.find(title => title.id === id);
                        return item ? (
                          <Poster
                            key={item.id}
                            item={item}
                            saved={saved.includes(item.id)}
                            onOpen={openTitle}
                            onSave={toggleSaved}
                          />
                        ) : null;
                      })}
                    </div>
                    <button
                      className="scroll-control right"
                      aria-label="Scroll right"
                      onClick={event =>
                        event.currentTarget.parentElement
                          ?.querySelector('.poster-list')
                          ?.scrollBy({ left: 620, behavior: 'smooth' })
                      }
                    >
                      <ChevronRight />
                    </button>
                  </div>
                ) : (
                  <p className="empty-state">
                    Your list is ready for its first title. Browse and tap + to
                    save something for later.
                  </p>
                )}
              </section>
            ))}
            <section className="membership-banner">
              <div>
                <span className="eyebrow">YOUR NEXT FAVORITE IS HERE</span>
                <h2>Stories worth staying in for.</h2>
                <p>Discover a new world tonight.</p>
              </div>
              <button onClick={() => setActive('New & Popular')}>
                Explore titles <ChevronRight size={17} />
              </button>
            </section>
            <footer>
              <span>Questions? Visit our Help Center</span>
              <span>© 2025 Northstar</span>
            </footer>
          </div>
        )}
      </main>

      {notice && (
        <div className="toast">
          <Check size={17} />
          {notice}
        </div>
      )}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close details"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <div
              className="modal-art"
              style={{
                backgroundImage: `linear-gradient(0deg, #141414 0%, transparent 68%), url("${selected.image}")`,
              }}
            >
              <div className="modal-title">
                <span className="eyebrow">NORTHSTAR ORIGINAL</span>
                <h2>{selected.name}</h2>
                <button
                  className="play-button small"
                  onClick={() => setNotice('Preview is ready to play')}
                >
                  <Play size={17} fill="currentColor" /> Play
                </button>
              </div>
            </div>
            <div className="modal-info">
              <div>
                <div className="hero-meta">
                  <span className="match">98% Match</span>
                  <span>{selected.year}</span>
                  <span className="rating">{selected.rating}</span>
                  <span>{selected.kind}</span>
                </div>
                <p>{selected.synopsis}</p>
              </div>
              <button
                className="save-button"
                onClick={() => toggleSaved(selected.id)}
                aria-label={
                  saved.includes(selected.id)
                    ? 'Remove from My List'
                    : 'Add to My List'
                }
              >
                {saved.includes(selected.id) ? <Check /> : <Plus />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Poster({
  item,
  saved,
  onOpen,
  onSave,
}: {
  item: Title;
  saved: boolean;
  onOpen: (id: string) => void;
  onSave: (id: string) => void;
}) {
  return (
    <article className="poster-card">
      <button
        className="poster-art"
        onClick={() => onOpen(item.id)}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.84), transparent 58%), url("${item.image}")`,
        }}
        aria-label={`View ${item.name}`}
      >
        <span className="poster-brand">
          N<span>+</span>
        </span>
        <span className="poster-caption">
          <small>{item.kind}</small>
          <b>{item.name}</b>
        </span>
      </button>
      <div className="poster-info">
        <div>
          <strong>{item.name}</strong>
          <span>
            {item.year} <i>{item.rating}</i>
          </span>
        </div>
        <button
          className={saved ? 'save-mini saved' : 'save-mini'}
          aria-label={
            saved
              ? `Remove ${item.name} from My List`
              : `Add ${item.name} to My List`
          }
          onClick={() => onSave(item.id)}
        >
          {saved ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>
      <p className="poster-synopsis">{item.synopsis}</p>
    </article>
  );
}

export default App;
