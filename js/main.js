/* =========================================================
   ПРЕДЕЛ ПРОЧНОСТИ — main.js
   ========================================================= */
(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IMG = 'assets/images/buildings/';

  /* ----------------------------------------------------------
     Единый источник данных: используется и картой, и карточками
     x / y — координаты точки на SVG-карте (viewBox 1000×1000)
     ---------------------------------------------------------- */
  const BUILDINGS = [
    { n: 1, year: '1892', x: 528, y: 446,
      map: 'Переходные мостики в ГУМе',
      title: 'Переходные мостики в ГУМе',
      then: IMG + 'gum-then.jpg', now: IMG + 'gum-now.jpg',
      tip: 'Зонтообразный свод и мостики Верхних торговых рядов.',
      desc: 'Молодой 24-летний инженер самостоятельно разработал методику расчётов для создания переходных мостиков и зонтообразного свода пролётом 14,5 м в здании Верхних торговых рядов (ныне ГУМ). Изящные, лёгкие арочные конструкции соединяют галереи на разных уровнях. Мостики давно стали одним из символов ГУМа.<q>Русский инженер зарекомендовал себя и смелостью взгляда, и распорядительностью, и беспримерною быстротою исполнения</q>— говорил об А. Ф. Лолейте инженер Н. А. Белелюбский.' },

    { n: 2, year: '1902', x: 626, y: 392,
      map: 'Мастерские АО, Девкин пер., 4',
      title: 'Мастерские Акционерного общества, Девкин переулок, 4',
      then: IMG + 'masterskie-then.webp', now: IMG + 'masterskie-now.jpg',
      tip: 'Пустотелые железобетонные конструкции, «окна под потолок».',
      desc: 'При возведении стен мастерских Лолейт применил пустотелые железобетонные конструкции, подвергнутые затем испытаниям на прочность и теплозащитные свойства. Здесь же он спроектировал «окна под потолок», совместив надоконные перемычки с крайними рёбрами перекрытия. Железобетон здесь также применялся для устройства водяных ванн и вытяжных колпаков у кузнечных горнов.' },

    { n: 3, year: '1903', x: 470, y: 322,
      map: 'Никольская церковь на Долгоруковской',
      title: 'Никольская церковь на Долгоруковской',
      then: IMG + 'nikolskaya-then.jpg', now: IMG + 'nikolskaya-now.jpg',
      tip: 'Своды двоякой кривизны новой трапезной в неорусском стиле.',
      desc: 'По проекту Лолейта сооружены в неорусском стиле своды двоякой кривизны в новой трапезной Никольской церкви. Лолейт проектировал и рассчитывал железобетонные конструкции.<q>Исполняла мои постройки лучшая фирма по бетонным работам — „Юлий Гук“; её инженер А. Ф. Лолейт приезжал ко мне. Подслеповатыми глазами с неизменными несколькими очками отыскивал он на счётной круглой, в виде часов, линейке нужные данные и затем постепенно подводил конструктивный скелет под мои рисунки архитектурных форм. Рождалась архитектура цельная</q>— вспоминал архитектор Илья Евграфович Бондаренко.' },

    { n: 4, year: '1909', x: 360, y: 452,
      map: 'Трёхгорный пивоваренный завод',
      title: 'Трёхгорный пивоваренный завод',
      then: IMG + 'trekhgorny-then.jpg', now: IMG + 'trekhgorny-now.jpg',
      tip: 'Первое воплощение идеи безбалочных перекрытий.',
      desc: 'Проектируя элеватор на 3,5 тыс. тонн, Лолейт впервые воплотил идею безбалочных перекрытий. Пятиэтажный корпус был с ограниченной строительной высотой — требовалось равномерно передавать давление от колонн на грунт.' },

    { n: 5, year: '1909', x: 700, y: 610,
      map: 'Егорьевская мануфактура',
      title: 'Безбалочные перекрытия Егорьевской мануфактуры',
      then: IMG + 'egorievsk-then.jpg', now: IMG + 'egorievsk-now.jpg',
      tip: 'Россия — родина безбалочных перекрытий, а не Америка.',
      desc: 'Отличительной чертой его системы была жёсткая плита без балок, опирающаяся прямо на колонны. В 1926 году Лолейт писал, что именно Россия, а не Америка, является родиной безбалочных перекрытий:<q>Начиная с 1909 года нами построено много десятков тысяч квадратных метров таких перекрытий — и притом на основе совершенно иных принципов, чем американские. Само название „безбалочные перекрытия“ введено нами, в то время как в Америке аналогичные перекрытия известны под именем так называемой „грибовидной системы“</q>' },

    { n: 6, year: '1910', x: 556, y: 358,
      map: 'Молочный завод Чичкина',
      title: 'Молочный завод Чичкина',
      then: IMG + 'moloko-then.jpg', now: IMG + 'moloko-now.jpg',
      tip: 'Первое массовое применение безбалочной плиты в России.',
      desc: 'Именно в этом здании впервые в России была использована безбалочная плита в широком масштабе — для перекрытий всех этажей трёхэтажного здания. Тогда конструкция здания была передовой по техническому оснащению.' },

    { n: 7, year: '1915', x: 614, y: 700,
      map: 'Корпуса завода АМО — будущий ЗИЛ',
      title: 'Корпуса завода АМО — будущий ЗИЛ',
      then: IMG + 'zil-then.webp', now: IMG + 'zil-now.jpg',
      tip: 'Конструктивная часть проекта корпусов АМО.',
      desc: 'Лолейт курировал конструктивную часть проекта корпусов АМО. В создании участвовали как опытные мастера промышленной архитектуры (А. В. Кузнецов), так и молодые архитекторы-дипломники. Из-за революции 1917 года, инфляции и транспортного коллапса стройка не уложилась в сроки. После национализации в 1918 году завод ремонтировал иностранные грузовики и выпускал моторы; послереволюционные корпуса возводились почти непрерывно с 1920-х. Большинство первых зданий не сохранились.' },

    { n: 8, year: '1925', x: 432, y: 486,
      map: 'Дом Моссельпрома',
      title: 'Дом Моссельпрома',
      then: IMG + 'mosselprom-then.jpeg', now: IMG + 'mosselprom-now.jpg',
      tip: 'Башня-корона со световой рекламой над Арбатской площадью.',
      desc: 'Шестиугольная башня Моссельпрома — символ конструктивизма. Артур Лолейт рассчитал её железобетонный каркас, усилил угловую часть и создал своеобразную башню-корону со световой рекламой и часами, хорошо заметными с Арбатской площади.' },

    { n: 9, year: '1925', x: 506, y: 392,
      map: 'Дом «Известий»',
      title: 'Дом «Известий»',
      then: IMG + 'izvestia-then.webp', now: IMG + 'izvestia-now.jpg',
      tip: 'Замысел 12-этажной башни ограничили 7 этажами.',
      desc: 'Изначально здание планировалось в виде 12-этажной башни, но запрет на высоту выше 7 этажей в пределах Садового кольца вынудил инженера отказаться от этой идеи.' },

    { n: 10, year: '1927', x: 470, y: 566,
      map: '2-й Дом милиции на Большой Полянке',
      title: '2-й Дом милиции на Большой Полянке',
      then: IMG + 'milicia-then.jpg', now: IMG + 'milicia-now.jpg',
      tip: 'Первый в СССР сборный железобетонный каркас из крупных блоков.',
      desc: 'В 1927 году Лолейт спроектировал для 2-го Дома милиции первый в СССР сборный железобетонный каркас из крупных блоков с авторской сеткой армирования. Именно этот проект положил начало совместной работе А. Ф. Лолейта и А. А. Гвоздева.' }
  ];

  /* ----------------------------------------------------------
     Универсальный before/after слайдер
     ---------------------------------------------------------- */
  function buildSlider(then, now, alt) {
    const ba = document.createElement('div');
    ba.className = 'ba';
    ba.tabIndex = 0;
    ba.setAttribute('role', 'slider');
    ba.setAttribute('aria-label', 'Сравнение «тогда / сейчас»: ' + alt);
    ba.setAttribute('aria-valuemin', '0');
    ba.setAttribute('aria-valuemax', '100');
    ba.setAttribute('aria-valuenow', '50');
    ba.style.setProperty('--pos', '50%');
    ba.innerHTML =
      '<img class="ba__img ba__after" src="' + now + '" alt="' + alt + ', современный вид" loading="lazy" onerror="this.dataset.err=1">' +
      '<div class="ba__before"><img class="ba__img" src="' + then + '" alt="' + alt + ', исторический вид" loading="lazy" onerror="this.dataset.err=1"></div>' +
      '<span class="ba__label ba__label--then">тогда</span>' +
      '<span class="ba__label ba__label--now">сейчас</span>' +
      '<div class="ba__handle"><span class="ba__grip"></span></div>';

    let dragging = false;
    const setPos = (clientX) => {
      const r = ba.getBoundingClientRect();
      let p = ((clientX - r.left) / r.width) * 100;
      p = Math.max(0, Math.min(100, p));
      ba.style.setProperty('--pos', p + '%');
      ba.setAttribute('aria-valuenow', Math.round(p));
    };
    ba.addEventListener('pointerdown', (e) => {
      dragging = true; ba.setPointerCapture(e.pointerId); setPos(e.clientX);
    });
    ba.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    ba.addEventListener('pointerup', (e) => { dragging = false; try { ba.releasePointerCapture(e.pointerId); } catch (_) {} });
    ba.addEventListener('pointercancel', () => { dragging = false; });
    ba.addEventListener('keydown', (e) => {
      const cur = parseFloat(ba.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { e.preventDefault(); const v = Math.max(0, cur - 3); ba.style.setProperty('--pos', v + '%'); ba.setAttribute('aria-valuenow', v); }
      if (e.key === 'ArrowRight') { e.preventDefault(); const v = Math.min(100, cur + 3); ba.style.setProperty('--pos', v + '%'); ba.setAttribute('aria-valuenow', v); }
    });
    return ba;
  }

  /* ----------------------------------------------------------
     Рендер карточек «Наследие Лолейта»
     ---------------------------------------------------------- */
  function renderCards() {
    const host = document.getElementById('cards');
    if (!host) return;
    BUILDINGS.forEach((b) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.n = b.n;

      const head = document.createElement('div');
      head.className = 'card__head';
      head.innerHTML = '<span class="card__year">' + b.year + '</span>' +
        '<h3 class="card__title">' + b.title + '</h3>';

      const slider = buildSlider(b.then, b.now, b.title);

      const descWrap = document.createElement('div');
      descWrap.className = 'card__desc';
      const text = document.createElement('div');
      text.className = 'card__text';
      text.innerHTML = b.desc;
      const more = document.createElement('button');
      more.className = 'card__more';
      more.type = 'button';
      more.hidden = true;
      more.textContent = 'Читать подробнее';
      descWrap.append(text, more);

      card.append(head, slider, descWrap);
      host.appendChild(card);

      // Зажим длинного текста без скачков layout
      requestAnimationFrame(() => {
        const fs = parseFloat(getComputedStyle(text).fontSize) || 14;
        const clampPx = fs * 8.4;
        if (text.scrollHeight > clampPx + 12) {
          card.classList.add('is-clamped');
          text.style.transition = 'max-height .45s cubic-bezier(.22,.61,.36,1)';
          text.style.maxHeight = clampPx + 'px';
          more.hidden = false;
          more.addEventListener('click', () => {
            const expanded = card.classList.toggle('is-expanded');
            if (expanded) {
              text.style.maxHeight = text.scrollHeight + 'px';
              more.textContent = 'Свернуть';
            } else {
              text.style.maxHeight = clampPx + 'px';
              more.textContent = 'Читать подробнее';
              card.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
            }
          });
        }
      });
    });
  }

  /* ----------------------------------------------------------
     Интерактивная SVG-карта Москвы
     ---------------------------------------------------------- */
  function renderMap() {
    const svg = document.getElementById('mapSvg');
    const decor = document.getElementById('mapDecor');
    const markersG = document.getElementById('mapMarkers');
    const list = document.getElementById('mapList');
    const tooltip = document.getElementById('mapTooltip');
    const canvas = document.getElementById('mapCanvas');
    if (!svg || !decor || !markersG || !list) return;

    const NS = 'http://www.w3.org/2000/svg';
    const cx = 500, cy = 470;

    // Концентрические кольца (бульварное, садовое и далее)
    const rings = [70, 150, 232, 320, 410, 480];
    rings.forEach((r, i) => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
      if (i === 1 || i === 2) c.setAttribute('class', 'ringMain');
      decor.appendChild(c);
    });
    // Радиальные «лучи» улиц
    for (let a = 0; a < 360; a += 15) {
      const rad = (a * Math.PI) / 180;
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', cx + Math.cos(rad) * 60);
      l.setAttribute('y1', cy + Math.sin(rad) * 60);
      l.setAttribute('x2', cx + Math.cos(rad) * 480);
      l.setAttribute('y2', cy + Math.sin(rad) * 480);
      decor.appendChild(l);
    }
    // Москва-река
    const river = document.createElementNS(NS, 'path');
    river.setAttribute('class', 'river');
    river.setAttribute('d', 'M 250,300 C 410,430 470,420 510,540 C 545,640 690,650 800,760');
    decor.appendChild(river);

    const items = [];

    BUILDINGS.forEach((b) => {
      // --- маркер на карте ---
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'marker');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', b.n + '. ' + b.title + ', ' + b.year);
      const halo = document.createElementNS(NS, 'circle');
      halo.setAttribute('class', 'halo'); halo.setAttribute('cx', b.x); halo.setAttribute('cy', b.y); halo.setAttribute('r', 34);
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', b.x - 16); rect.setAttribute('y', b.y - 16);
      rect.setAttribute('width', 32); rect.setAttribute('height', 32);
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', b.x); t.setAttribute('y', b.y + 1); t.textContent = b.n;
      g.append(halo, rect, t);
      markersG.appendChild(g);

      // --- строка списка ---
      const li = document.createElement('li');
      li.tabIndex = 0;
      li.innerHTML = '<span class="num">' + b.n + '</span>' +
        '<span class="info"><span class="name">' + b.map + '</span>' +
        '<span class="year">' + b.year + '</span></span>';
      list.appendChild(li);

      items.push({ b, g, li });
    });

    function activate(idx, fromMarker) {
      items.forEach((it, i) => {
        const on = i === idx;
        it.g.classList.toggle('is-active', on);
        it.li.classList.toggle('is-active', on);
      });
      if (idx == null) { tooltip.hidden = true; return; }
      const b = items[idx].b;
      tooltip.innerHTML = '<b>' + b.title + '</b><span>' + b.tip + '</span><em>' + b.year + '</em>';
      // позиция тултипа относительно canvas
      const cr = canvas.getBoundingClientRect();
      tooltip.hidden = false;
      const px = (b.x / 1000) * cr.width;
      const py = (b.y / 1000) * cr.height;
      tooltip.style.left = px + 'px';
      tooltip.style.top = py + 'px';
    }
    function clear() { activate(null); }

    items.forEach((it, i) => {
      const enter = () => activate(i, true);
      it.g.addEventListener('mouseenter', enter);
      it.g.addEventListener('focus', enter);
      it.g.addEventListener('click', enter);
      it.li.addEventListener('mouseenter', enter);
      it.li.addEventListener('focus', enter);
      it.li.addEventListener('click', enter);
      it.li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); } });
      it.g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); } });
    });
    canvas.addEventListener('mouseleave', clear);
    list.addEventListener('mouseleave', clear);
  }

  /* ----------------------------------------------------------
     Интерактив «Что остаётся от инженеров?» — сердце
     ---------------------------------------------------------- */
  function initHeart() {
    const scene = document.getElementById('heartScene');
    const plate = document.getElementById('heartPlate');
    const msgEl = document.getElementById('heartMessage');
    const counter = document.getElementById('heartCounter');
    const finalEl = document.getElementById('heartFinal');
    const hint = document.getElementById('heartHint');
    const imgs = scene ? Array.from(scene.querySelectorAll('.heart__img')) : [];
    if (!scene || !msgEl) return;

    const MESSAGES = [
      '«Мою биографию ищите в моих работах». — А. Ф. Лолейт. Вы коснулись наследия. Оно не треснуло — оно выдержало тонны непонимания.',
      '«Не всегда полезно пересаживать на нашу почву плоды иностранного творчества» (1926). Вы коснулись наследия. Оно не треснуло — оно выдержало тонны непонимания.',
      'Вы постучали по бетонному сердцу. Оно отозвалось глухим эхом времени. Вы коснулись наследия. Оно не треснуло — оно выдержало тонны непонимания.',
      '«Бетон в присутствии железа насыщается его свойствами» — гипотеза Консидера. Вы коснулись наследия. Оно не треснуло — оно выдержало тонны непонимания.',
      'Сердце инженера холодное на ощупь, но хранит огонь расчётов. Вы коснулись наследия. Оно не треснуло — оно выдержало тонны непонимания.'
    ];
    // Какая стадия разрушения (индекс изображения 0-2) на каждом шаге 1..5
    const STAGE_BY_STEP = [0, 1, 1, 2, 2];

    let step = 0;
    let finalTimer = null;
    let done = false;

    function showImage(idx) {
      imgs.forEach((im, i) => im.classList.toggle('is-active', i === idx));
    }
    function revealFinal() {
      if (done) return;
      done = true;
      clearTimeout(finalTimer);
      showImage(2);
      counter.textContent = '05 / 05';
      if (finalEl) {
        finalEl.hidden = false;
        requestAnimationFrame(() => finalEl.classList.add('is-in'));
        if (!reduceMotion) finalEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    function advance() {
      if (hint) hint.classList.add('is-hidden');
      if (done) return;
      if (step >= MESSAGES.length) { revealFinal(); return; }

      step += 1;
      const stage = STAGE_BY_STEP[step - 1];

      // эффект «удара»
      if (!reduceMotion) {
        scene.classList.remove('is-hit');
        void scene.offsetWidth;
        scene.classList.add('is-hit');
      }
      showImage(stage);

      // смена сообщения с лёгким затуханием
      msgEl.classList.add('is-fading');
      counter.textContent = String(step).padStart(2, '0') + ' / 05';
      setTimeout(() => {
        msgEl.textContent = MESSAGES[step - 1];
        msgEl.classList.remove('is-fading');
      }, reduceMotion ? 0 : 220);

      // после последней стадии — финальная цитата
      if (step === MESSAGES.length) {
        finalTimer = setTimeout(revealFinal, 1600);
      }
    }

    scene.addEventListener('click', advance);
    scene.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
    });
    const caption = document.getElementById('toolCaption');
    const showFlavor = (btn) => {
      const f = btn.getAttribute('data-flavor') || '';
      if (caption) { caption.textContent = f; caption.classList.toggle('is-on', !!f); }
    };
    document.querySelectorAll('[data-tool]').forEach((btn) => {
      btn.addEventListener('click', () => { showFlavor(btn); advance(); });
      btn.addEventListener('mouseenter', () => showFlavor(btn));
      btn.addEventListener('focus', () => showFlavor(btn));
    });
  }

  /* ----------------------------------------------------------
     Валидация email-формы (без backend)
     ---------------------------------------------------------- */
  function initForm() {
    const form = document.getElementById('subscribeForm');
    const input = document.getElementById('emailInput');
    const msg = document.getElementById('subscribeMsg');
    if (!form) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      msg.classList.remove('is-ok', 'is-error');
      if (!re.test(val)) {
        form.classList.add('is-invalid');
        msg.textContent = 'Проверьте адрес: похоже, в e-mail есть ошибка.';
        msg.classList.add('is-error');
        input.focus();
        setTimeout(() => form.classList.remove('is-invalid'), 400);
        return;
      }
      msg.textContent = 'Спасибо. Мы сообщим вам о премьере фильма.';
      msg.classList.add('is-ok');
      form.reset();
    });
    input.addEventListener('input', () => { msg.textContent = ''; msg.classList.remove('is-ok', 'is-error'); });
  }

  /* ----------------------------------------------------------
     Появление секций, прогресс, wordmark, параллакс
     ---------------------------------------------------------- */
  function initMotion() {
    // reveal
    const reveals = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-in'));
    }

    const bar = document.getElementById('progressBar');
    const wordmark = document.getElementById('wordmark');
    const hero = document.getElementById('hero');
    const parallax = Array.from(document.querySelectorAll('[data-parallax]'));
    let ticking = false;

    function onScroll() {
      const st = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
      if (wordmark && hero) wordmark.classList.toggle('is-visible', st > hero.offsetHeight * 0.66);

      if (!reduceMotion) {
        const vh = window.innerHeight;
        parallax.forEach((el) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const off = (center - vh / 2) / vh;            // -1..1 примерно
          const f = parseFloat(el.dataset.parallax) || 0.1;
          el.style.transform = 'translate3d(0,' + (-off * f * 100).toFixed(2) + 'px,0)';
        });
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- init ---------- */
  function init() {
    renderCards();
    renderMap();
    initHeart();
    initForm();
    initMotion();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
