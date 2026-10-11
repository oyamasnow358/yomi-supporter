  /* ============================================================
     よみ サポーター
     ぶんしょうを はりつける → ぶんせつで わける（わかちがき）・ふりがな・1ぎょうずつ ひかる・よみあげ・もじの おおきさ／いろ／たてがき
     ※ ことばの くぎりは ブラウザの きのう（Intl.Segmenter）で この たんまつの なかで おこなう。ぶんしょうは そとに おくらない。
     ============================================================ */
  const SAMPLES = [
    { id: 's1', title: 'はるの こうえん', text: 'はるに なりました。\nこうえんに さくらが さいて います。\nわたしは おかあさんと いっしょに ブランコに のりました。\nかぜが ふくと、はなびらが ひらひら おちて きました。\nとても きれいでした。' },
    { id: 's2', title: '動物園《どうぶつえん》に 行《い》った 日《ひ》', text: '日曜日《にちようび》に、家族《かぞく》で 動物園《どうぶつえん》に 行《い》きました。\n入口《いりぐち》の 近《ちか》くに、大《おお》きな ゾウが いました。\nゾウは 長《なが》い 鼻《はな》で 水《みず》を あびて いました。\nキリンは 首《くび》を のばして、木《き》の 葉《は》を 食《た》べて いました。\nまた 行《い》きたいです。' },
    { id: 's3', title: 'おにぎりの 作《つく》りかた', text: 'おにぎりの 作《つく》りかたを せつめいします。\nはじめに、手《て》を きれいに あらいます。\nつぎに、手《て》に 水《みず》を つけて、しおを すこし つけます。\nそれから、ごはんを 手《て》に のせて、三角《さんかく》に にぎります。\nさいごに、のりを まいたら できあがりです。' }
  ];
  const THEMES = { white: ['#FFFFFF', '#212529', '#FFE066', 'しろ'], cream: ['#FFF8E1', '#3E2723', '#FFD43B', 'クリーム'], blue: ['#E7F5FF', '#1B1B1B', '#FFE066', 'みずいろ'], green: ['#EBFBEE', '#1B1B1B', '#FFE066', 'みどり'], gray: ['#E9ECEF', '#111', '#FFE066', 'グレー'], dark: ['#212529', '#F1F3F5', '#F59F00', 'くろ'] };
  const FONTS = { ud: ["'BIZ UDPGothic','BIZ UDゴシック','Hiragino Sans','Yu Gothic UI','Meiryo',sans-serif", 'UD ゴシック'], kyo: ["'UD デジタル 教科書体 N-R','UD Digi Kyokasho N-R','UDDigiKyokashoN-R','Klee','YuKyokasho','Yu Mincho',serif", 'きょうかしょ'], maru: ["'Hiragino Maru Gothic ProN','Zen Maru Gothic','Meiryo',sans-serif", 'まる'] };
  const VDEF = { fs: 34, lh: 2.2, ls: .06, theme: 'cream', font: 'kyo', wk: true, ruby: true, focus: false, vert: false, mode: 'sent', rate: 1 };
  const APP = {
    id: 'yomi-supporter', title: 'よみ サポーター', ls: 'yomi.v1', db: false, sw: true, color: '#3B5BDB',
    defaults: {},
    newProfile: (name, icon) => ({ id: 'p' + Math.random().toString(36).slice(2, 9), name, icon, v: Object.assign({}, VDEF), last: null }),
    normProfile(p) { p.v = Object.assign({}, VDEF, p.v || {}); },
    normStore(o) { if (!Array.isArray(o.texts)) o.texts = []; if (!o.dict || typeof o.dict !== 'object') o.dict = {}; },
    childScreens: ['read'], topScreens: ['home', 'read'],
    renderHome: () => renderHome(),
    profileNote: p => 'もじ ' + p.v.fs + 'px・' + (THEMES[p.v.theme] || THEMES.white)[3],
    onCloseSettings(sc) { if (sc === 'home') renderHome(); else if (sc === 'read') renderRead(); },
    helpNote: 'もじを よむのが にがてな 子の ための「よむ ための めがね」です。ぶんせつごとに すきまを あける（わかちがき）、ふりがな、いま よむ 1ぎょうだけ みせる、よみあげに あわせて ひかる、もじの おおきさ・いろ・フォント・たてがき を 子どもごとに おぼえます。ふりがなは「漢字《かんじ》」と かくか、よむ がめんの Aa →「ふりがなを つける」で ことばを タッチ して つけます（この たんまつが おぼえて、つぎからも つきます）。きょうかしょの ぶんしょうを うちこんで つかう ことが できます。ぶんしょうは この たんまつの なかだけに ほぞん します。'
  };
/*BASE_HERE*/

  /* ============================================================
     ぶんしょうを くぎる
       para = [{ t:'みえる もじ', parts:[[もじ, よみ|null]], s:ぶんの ばんごう }]
     ============================================================ */
  const KJ = /[一-龯々〆ヵヶ]/;
  const FUNC = new Set('は が を に で と も の へ や か ね よ な わ ぞ さ から まで より など だけ しか ので のに けど けれど けれども ば て た だ ます ました ません ましょう です でした でしょう ない なかった なく れる られる せる させる う よう たい たかった たら たり ながら てる って した して しました します そう みたい らしい っ ん ー こと ね。'.split(' '));
  const AFTER_TE = new Set('いる いた います いました いて ある あります しまう しまった みる みた みます くる きた きます いく いった おく おいた ください'.split(' '));
  const SEG = (window.Intl && Intl.Segmenter) ? new Intl.Segmenter('ja', { granularity: 'word' }) : null;
  function parseLine(line) {
    // 漢字《かんじ》・漢字(かんじ) を よみに する
    let plain = '', ann = [];
    const re = /([一-龯々〆ヵヶ]+)[《(（]([ぁ-ゖァ-ヺー]+)[》)）]/g; let m, last = 0;
    while ((m = re.exec(line))) { plain += line.slice(last, m.index); ann.push([plain.length, plain.length + m[1].length, m[2]]); plain += m[1]; last = re.lastIndex; }
    plain += line.slice(last);
    return { plain, ann };
  }
  function tokens(plain) {
    if (/[ 　]/.test(plain.trim())) return plain.split(/[ 　]+|(?<=、)/).filter(x => x).map(x => ({ t: x, sp: true }));
    if (!SEG) return plain.split(/(?<=[、。！？])/).filter(Boolean).map(t => ({ t }));
    return Array.from(SEG.segment(plain)).map(x => ({ t: x.segment }));
  }
  const isHira = s => /^[ぁ-ゖー]+$/.test(s), isPunct = s => /^[、。！？!?,.・「」『』（）()…ー〜\s]+$/.test(s);
  function chunkLine(line, sIdx) {
    const { plain, ann } = parseLine(line);
    const tk = tokens(plain), out = [];
    let pos = 0;
    tk.forEach(o => {
      const t = o.t, start = plain.indexOf(t, pos); pos = start + t.length;
      const prev = out[out.length - 1];
      let merge = false;
      if (prev && /[「『（(]$/.test(prev.t)) merge = true;
      else if (prev && !o.sp) {
        if (/^[「『（(]/.test(t)) merge = false;
        else if (isPunct(t) || /^[っゃゅょー]/.test(t)) merge = true;
        else if (AFTER_TE.has(t)) merge = /[てで]$/.test(prev.t);
        else if (/^[はがをにへ]$/.test(t) && /[はがをにでともへや]$/.test(prev.t)) merge = false; // 「いぬが」＋「は」 → 「は」から あたらしい ことば
        else if (/^[はがをにへ]$/.test(prev.t) && isHira(t)) merge = true;
        else if (FUNC.has(t)) merge = true;
        else if (isHira(t) && t.length <= 3 && /[一-龯々ァ-ヺ0-9A-Za-z]$/.test(prev.t) && !/^(お|ご)/.test(t)) merge = true;
        // ひらがなの ぶんが こまかく きれた とき（あ・そ・び・ま）は まえに つなぐ
        else if (isHira(t) && t.length === 1 && !/[はがをにでともへやの、。]$/.test(prev.t)) merge = true;
        else if (isHira(t) && /^[てで]/.test(t) && t.length <= 3 && /[っしいきりちびみんぎに]$/.test(prev.t)) merge = true;
      }
      if (!t.trim()) { if (prev) prev.t += t; return; }
      if (merge) { prev.t += t; prev.e = pos; } else out.push({ t, b: start, e: pos });
    });
    // ぶんの ばんごう と ふりがな
    let s = sIdx;
    out.forEach(c => {
      c.s = s; if (/[。！？!?]/.test(c.t)) s++;
      const parts = []; let i = c.b;
      while (i < c.e) {
        const a = ann.find(x => x[0] <= i && x[1] > i);
        if (a) { parts.push([plain.slice(Math.max(a[0], i), Math.min(a[1], c.e)), a[0] >= i && a[1] <= c.e ? a[2] : null]); i = Math.min(a[1], c.e); continue; }
        let j = i; const kj = KJ.test(plain[i]);
        while (j < c.e && KJ.test(plain[j]) === kj && !ann.some(x => x[0] === j && j > i)) j++;
        const str = plain.slice(i, j);
        parts.push([str, kj && store.dict[str] ? store.dict[str] : null]);
        i = j;
      }
      c.parts = parts;
    });
    return { chunks: out, next: s };
  }
  function build(text) {
    const paras = []; let s = 0;
    String(text || '').replace(/\r/g, '').split('\n').forEach(line => { if (!line.trim()) return; const r = chunkLine(line.trim(), s); paras.push(r.chunks); s = r.next; });
    return paras;
  }
  const chunkHTML = (c, ruby) => c.parts.map(([t, r]) => r && ruby ? '<ruby>' + esc(t) + '<rt>' + esc(r) + '</rt></ruby>' : esc(t)).join('');
  const allTexts = () => store.texts.concat(SAMPLES);
  const textById = id => allTexts().find(x => x.id === id);
  const titleOf = t => parseLine(t.title).plain;

  /* ============================================================
     ホーム
     ============================================================ */
  function renderHome() {
    screen = 'home'; stopRead();
    const card = (t, tag) => h('button', { type: 'button', class: 'tcard', onclick: () => { if (tapOk()) { sfx.tap(); openRead(t.id); } } }, tag ? h('span', { class: 'tg' }, tag) : null, h('b', null, titleOf(t)), h('small', null, parseLine(t.text.split('\n').join(' ')).plain.slice(0, 60)));
    setView('home', [
      h('h1', { class: 'title' }, '📏 よみ サポーター', h('small', null, 'よみやすく して、いっしょに よもう')),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'big-btn blue', onclick: () => { if (tapOk()) renderEdit(null); } }, '＋ ぶんしょうを いれる')),
      store.texts.length ? h('div', { class: 'tlist' }, store.texts.slice().reverse().map(t => card(t))) : null,
      h('div', { class: 'tlist' }, SAMPLES.map(t => card(t, 'れい'))),
      h('div', { class: 'note-box' }, '🔒 いれた ぶんしょうは この たんまつの なかだけに ほぞん します。')
    ]);
  }

  /* ============================================================
     いれる・なおす
     ============================================================ */
  function renderEdit(id) {
    screen = 'edit';
    const t = id ? store.texts.find(x => x.id === id) : null;
    const ti = h('input', { type: 'text', placeholder: 'だいめい', value: t ? t.title : '' });
    const ta = h('textarea', { placeholder: 'ここに ぶんしょうを はりつけるか、うちこみます。\nれい：日曜日《にちようび》に 公園《こうえん》へ 行《い》きました。' }); ta.value = t ? t.text : '';
    setView('ed', [h('h1', { class: 'title' }, t ? '✏️ ぶんしょうを なおす' : '＋ ぶんしょうを いれる'), ti, ta,
      h('div', { class: 'tip' }, '💡 ふりがなは「漢字《かんじ》」または「漢字(かんじ)」と かくと つきます。よむ がめんで ことばを タッチして つける ことも できます。ことばの あいだに スペースを いれると、その とおりに くぎります（いれなければ じどうで くぎります）。'),
      h('div', { class: 'actions' },
        t ? h('button', { type: 'button', class: 'mid-btn', onclick: () => { if (confirm('「' + t.title + '」を けしますか？')) { store.texts = store.texts.filter(x => x !== t); persist(); renderHome(); } } }, '🗑 けす') : null,
        h('button', { type: 'button', class: 'mid-btn', onclick: () => { if (tapOk()) renderHome(); } }, '◀ やめる'),
        h('button', { type: 'button', class: 'big-btn go', onclick: () => {
          if (!tapOk()) return;
          const text = ta.value.trim(); if (!text) { toast('ぶんしょうを いれて ください'); return; }
          const title = ti.value.trim() || parseLine(text.split('\n')[0]).plain.slice(0, 16);
          let x = t; if (!x) { x = { id: 't' + uid(), title, text, at: Date.now() }; store.texts.push(x); } else { x.title = title; x.text = text; }
          persist(); openRead(x.id);
        } }, '✓ よむ'))]);
    if (!t) setTimeout(() => ta.focus(), 100);
  }

  /* ============================================================
     よむ
     ============================================================ */
  let RD = null;
  function openRead(id) { const p = cur(); p.last = id; persist(); RD = { id, cur: 0, playing: false, opt: false, rubyEdit: false }; keepAwake(); renderRead(); }
  const V = () => cur().v;
  function renderRead() {
    screen = 'read';
    if (!RD) { renderHome(); return; }
    const t = textById(RD.id); if (!t) { renderHome(); return; }
    const v = V(), th = THEMES[v.theme] || THEMES.white;
    const paras = build(t.text); RD.flat = [].concat(...paras); RD.nS = RD.flat.length ? RD.flat[RD.flat.length - 1].s + 1 : 0;
    RD.cur = Math.min(RD.cur, Math.max(0, RD.flat.length - 1));
    let k = 0;
    const html = paras.map(pa => '<p>' + pa.map(c => '<span class="ck' + (c.parts.some(x => KJ.test(x[0])) ? ' kj' : '') + '" data-i="' + (k++) + '">' + chunkHTML(c, v.ruby) + '</span>').join('') + '</p>').join('');
    const txt = h('div', { class: 'txt' + (v.wk ? ' wk' : '') + (v.ruby ? '' : ' noruby'), html, style: '--fs:' + v.fs + 'px;--lh:' + v.lh + ';--ls:' + v.ls + 'em;--ff:' + FONTS[v.font][0] });
    const page = h('div', { class: 'page' + (v.vert ? ' vert' : '') + (v.focus ? ' focus' : '') + (RD.rubyEdit ? ' redit' : ''), style: '--pbg:' + th[0] + ';--pfg:' + th[1] + ';--hl:' + th[2] }, h('div', { class: 'ruler', hidden: !v.focus }), txt);
    page.addEventListener('click', e => { const c = e.target.closest('.ck'); if (!c) return; const i = Number(c.getAttribute('data-i')); if (RD.rubyEdit) { editRuby(i); return; } stopRead(); RD.cur = i; mark(); speak(RD.flat[i].t); });
    const btn = (icon, label, fn, cls) => h('button', { type: 'button', class: cls || '', 'aria-label': label, onclick: fn }, icon, h('small', null, label));
    setView('rd', [page, h('div', { class: 'bar' },
      btn('⏮', 'まえの ぶん', () => jumpS(-1)),
      btn(RD.playing ? '⏸' : '▶', RD.playing ? 'とめる' : 'よむ', () => RD.playing ? stopRead(true) : startRead(), 'play' + (RD.playing ? ' on' : '')),
      btn('⏭', 'つぎの ぶん', () => jumpS(1)),
      btn('🔦', '1ぎょう', () => { v.focus = !v.focus; persist(); renderRead(); }, v.focus ? 'on' : ''),
      btn('Aa', 'みかた', () => { RD.opt = !RD.opt; renderRead(); }, RD.opt ? 'on' : ''),
      store.texts.some(x => x.id === RD.id) ? btn('✏️', 'なおす', () => { stopRead(); renderEdit(RD.id); }) : null),
      RD.opt ? optPanel() : null]);
    requestAnimationFrame(() => { measureLines(); mark(true); });
  }
  // ぎょうを しらべる（よこがき：うえからの いち／たてがき：みぎからの いち）
  function measureLines() {
    const page = $('.page'); if (!page) return;
    const vert = V().vert, cks = [...page.querySelectorAll('.ck')];
    RD.lines = []; let lastKey = null, ln = -1;
    cks.forEach(c => { const r = c.getClientRects()[0] || c.getBoundingClientRect(); const key = vert ? r.left : r.top; if (lastKey === null || Math.abs(key - lastKey) > (vert ? r.width : r.height) * .6) { ln++; lastKey = key; } c.dataset.l = ln; RD.lines[ln] = (RD.lines[ln] || []).concat(c); });
  }
  function mark(noScroll) {
    const page = $('.page'); if (!page || !RD) return;
    page.querySelectorAll('.ck.now').forEach(x => x.classList.remove('now'));
    const c = page.querySelector('.ck[data-i="' + RD.cur + '"]'); if (!c) return;
    c.classList.add('now');
    page.querySelectorAll('.ck').forEach(x => x.classList.toggle('read', Number(x.dataset.i) < RD.cur && RD.playing));
    const ln = Number(c.dataset.l), v = V();
    if (v.focus && RD.lines) {
      page.querySelectorAll('.ck.ln').forEach(x => x.classList.remove('ln'));
      (RD.lines[ln] || []).forEach(x => x.classList.add('ln'));
      const rs = (RD.lines[ln] || []).map(x => x.getBoundingClientRect()), pr = page.getBoundingClientRect(), ru = page.querySelector('.ruler');
      if (rs.length && ru) {
        const top = Math.min(...rs.map(r => r.top)), bot = Math.max(...rs.map(r => r.bottom)), lef = Math.min(...rs.map(r => r.left)), rig = Math.max(...rs.map(r => r.right));
        if (v.vert) ru.style.cssText = 'top:0;bottom:0;height:auto;left:' + (lef - pr.left + page.scrollLeft - 6) + 'px;width:' + (rig - lef + 12) + 'px;right:auto';
        else ru.style.cssText = 'left:0;right:0;top:' + (top - pr.top + page.scrollTop - 6) + 'px;height:' + (bot - top + 12) + 'px';
      }
    }
    if (!noScroll || v.focus) c.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  }
  function jumpS(d) {
    if (!RD.flat.length) return;
    const s = RD.flat[RD.cur].s + d; if (s < 0 || s >= RD.nS) return;
    const was = RD.playing; stopRead(); RD.cur = RD.flat.findIndex(c => c.s === s); mark(); sfx.tap();
    if (was) startRead();
  }
  // よみあげ：1ぶんずつ。ブラウザが いち（boundary）を おしえて くれれば それに あわせ、だめなら じかんで すすめる
  let rdGen = 0;
  function startRead() {
    if (!RD.flat.length) return;
    if (RD.cur >= RD.flat.length - 1 && RD.flat.length > 1 && RD.doneAll) RD.cur = 0;
    RD.doneAll = false; RD.playing = true; const g = ++rdGen;
    const b = $('.bar .play'); if (b) { b.classList.add('on'); b.firstChild.textContent = '⏸'; b.lastChild.textContent = 'とめる'; }
    const one = () => {
      if (g !== rdGen || screen !== 'read') return;
      const s = RD.flat[RD.cur].s, list = RD.flat.map((c, i) => [c, i]).filter(x => x[0].s === s && x[1] >= RD.cur);
      if (!list.length) { stopRead(true); return; }
      const nextOne = () => { if (g !== rdGen) return; const last = list[list.length - 1][1]; if (last >= RD.flat.length - 1) { RD.doneAll = true; stopRead(true); RD.cur = last; mark(true); sfx.clear(); return; } RD.cur = last + 1; mark(); after(250, one); };
      if (V().mode === 'chunk') {
        let k = 0; const step = () => { if (g !== rdGen) return; if (k >= list.length) { nextOne(); return; } RD.cur = list[k][1]; mark(); const w = list[k][0].t; k++; if (S().voice) speak(w, { rate: V().rate, end: () => after(120, step) }); else after(300 + w.length * 190, step); };
        step(); return;
      }
      const text = list.map(x => x[0].t).join(''), offs = []; let o = 0; list.forEach(x => { offs.push(o); o += x[0].t.length; });
      let gotB = false, k = 0; RD.cur = list[0][1]; mark();
      const u = S().voice ? speak(text, { rate: V().rate, end: () => { if (g === rdGen) nextOne(); } }) : null;
      if (u) u.onboundary = e => { if (g !== rdGen || e.charIndex == null) return; gotB = true; let j = 0; while (j + 1 < offs.length && offs[j + 1] <= e.charIndex) j++; if (list[j][1] !== RD.cur) { RD.cur = list[j][1]; mark(); } };
      const per = 190 / ((Number(S().rate) || .95) * V().rate);
      const tick = () => { if (g !== rdGen || gotB) return; k++; if (k < list.length) { RD.cur = list[k][1]; mark(); after(list[k][0].t.length * per, tick); } };
      after(list[0][0].t.length * per, tick);
      if (!u) after(text.length * per + 400, nextOne);
    };
    one();
  }
  function stopRead(keep) { rdGen++; stopSpeak(); if (RD) { RD.playing = false; const b = $('.bar .play'); if (b) { b.classList.remove('on'); b.firstChild.textContent = '▶'; b.lastChild.textContent = 'よむ'; } if (!keep) RD.doneAll = false; } }
  function editRuby(i) {
    const c = RD.flat[i]; const runs = c.parts.filter(x => KJ.test(x[0]));
    if (!runs.length) { toast('かんじが ない ことばです'); return; }
    runs.forEach(([kj, r]) => { const v = prompt('「' + kj + '」の よみかた（ひらがな）。けす ときは からっぽ', store.dict[kj] || r || ''); if (v === null) return; const y = v.trim(); if (y) store.dict[kj] = y; else delete store.dict[kj]; });
    persist(); renderRead();
  }
  function optPanel() {
    const v = V(), set = (k, x) => { v[k] = x; persist(); renderRead(); };
    const row = (label, ctl) => h('div', { class: 'row2' }, h('span', null, label), ctl);
    return h('div', { class: 'opt' },
      row('おおきさ', seg(v.fs, [[22, 'S'], [28, 'M'], [34, 'L'], [44, 'XL'], [58, 'XXL']], x => set('fs', Number(x)))),
      row('ぎょうかん', seg(v.lh, [[1.8, 'せまい'], [2.2, 'ふつう'], [2.8, 'ひろい']], x => set('lh', Number(x)))),
      row('もじかん', seg(v.ls, [[0, 'せまい'], [.06, 'ふつう'], [.18, 'ひろい']], x => set('ls', Number(x)))),
      row('フォント', seg(v.font, Object.keys(FONTS).map(k => [k, FONTS[k][1]]), x => set('font', x))),
      row('いろ', h('div', { style: 'display:flex;gap:6px;flex-wrap:wrap' }, Object.keys(THEMES).map(k => h('button', { type: 'button', class: 'thm' + (v.theme === k ? ' on' : ''), title: THEMES[k][3], style: 'background:' + THEMES[k][0] + ';color:' + THEMES[k][1], onclick: () => set('theme', k) }, 'あ')))),
      row('わかちがき', seg(v.wk ? 1 : 0, [[1, 'あける'], [0, 'あけない']], x => set('wk', x === 1 || x === '1'))),
      row('ふりがな', seg(v.ruby ? 1 : 0, [[1, 'つける'], [0, 'つけない']], x => set('ruby', x === 1 || x === '1'))),
      row('かきかた', seg(v.vert ? 1 : 0, [[0, 'よこがき'], [1, 'たてがき']], x => set('vert', x === 1 || x === '1'))),
      row('よみあげ', seg(v.mode, [['sent', '1ぶんずつ'], ['chunk', 'ことばごと']], x => set('mode', x))),
      row('はやさ', seg(v.rate, [[.75, 'ゆっくり'], [1, 'ふつう'], [1.2, 'はやい']], x => set('rate', Number(x)))),
      h('div', { class: 'row2' }, h('button', { type: 'button', class: 'mid-btn' + (RD.rubyEdit ? ' on' : ''), onclick: () => { RD.rubyEdit = !RD.rubyEdit; toast(RD.rubyEdit ? 'ふりがなを つけたい ことばを タッチ' : 'ふりがな づけ おわり'); renderRead(); } }, RD.rubyEdit ? '✓ ふりがな づけ おわり' : 'あ ふりがなを つける')));
  }
  window.addEventListener('resize', () => { if (screen === 'read' && RD) { measureLines(); mark(true); } });

  /* ============================================================
     プリント：みた めの せっていで いんさつ（はいる ぶんだけ ページを わける）
     ============================================================ */
  const PF = '<div class="pf">© MieeL　よみ サポーター　www.mieel-support-school.com</div>';
  const HD = t => '<div class="phd"><h1>' + t + '</h1><div class="nm">なまえ ＿＿＿＿＿＿＿＿</div></div>';
  function buildPages(type, o) {
    o = o || {};
    const t = textById(o.t) || allTexts()[0], fs = Number(o.fs) || 8, vert = o.vert === 'on', wk = o.wk !== 'off', ruby = o.ruby !== 'off';
    const paras = build(t.text), title = esc(titleOf(t));
    // じっさいに ならべて、はいりきらない ところで つぎの ページへ
    const host = h('div', { style: 'position:absolute;left:-9999px;top:0;visibility:hidden' }); document.body.append(host);
    const mk = () => { host.innerHTML = '<div class="ppage">' + HD(title) + '<div class="pt' + (vert ? ' vert' : '') + '"><div class="txt' + (wk ? ' wk' : '') + '" style="font-size:' + fs + 'mm;font-family:' + FONTS.kyo[0].replace(/"/g, "'") + '"></div></div>' + PF + '</div>'; return host.querySelector('.txt'); };
    const pages = []; let box = mk(), p = null;
    const full = () => { const pt = host.querySelector('.pt'); return vert ? pt.scrollWidth > pt.clientWidth + 1 : pt.scrollHeight > pt.clientHeight + 1; };
    const flush = () => { pages.push(host.innerHTML); box = mk(); p = null; };
    paras.forEach(pa => {
      p = h('p'); box.append(p);
      pa.forEach(c => {
        const sp = h('span', { class: 'ck', html: chunkHTML(c, ruby) }); p.append(sp);
        if (full()) { sp.remove(); if (!p.childNodes.length) p.remove(); flush(); p = h('p'); box.append(p); p.append(sp); }
      });
    });
    pages.push(host.innerHTML); host.remove();
    return pages;
  }
  window.MieelPrintAPI = {
    version: 1, fixed: true,
    app: { id: 'yomi-supporter', title: 'よみ サポーター', icon: '📏' },
    list() {
      const ts = allTexts().map(t => [t.id, titleOf(t)]);
      return [{ id: 'text', name: 'よみやすい プリント', icon: '📄', params: [{ key: 't', label: 'ぶんしょう', opts: ts, def: (RD && textById(RD.id) ? RD.id : ts[0][0]) }, { key: 'fs', label: 'もじ', opts: [[6, 'ちゅう'], [8, 'だい'], [11, 'とくだい']], def: 8 }, { key: 'wk', label: 'わかちがき', opts: [['on', 'あける'], ['off', 'あけない']], def: 'on' }, { key: 'ruby', label: 'ふりがな', opts: [['on', 'つける'], ['off', 'つけない']], def: 'on' }, { key: 'vert', label: 'かきかた', opts: [['off', 'よこがき'], ['on', 'たてがき']], def: 'off' }] }];
    },
    build(id, params) { return Promise.resolve({ pages: buildPages(id, params), css: document.querySelector('style').textContent }); }
  };

  /* ============================================================
     先生用せってい
     ============================================================ */
  APP.renderSettings = function (add, st, vp, pidSel) {
    add(h('h3', null, '📏 みかたの せってい'), pidSel(),
      h('p', { class: 'note' }, vp.name + '：もじ ' + vp.v.fs + 'px・' + (THEMES[vp.v.theme] || THEMES.white)[3] + '・' + FONTS[vp.v.font][1] + '・' + (vp.v.wk ? 'わかちがき' : '') + (vp.v.ruby ? '・ふりがな' : '') + (vp.v.vert ? '・たてがき' : '') + '（よむ がめんの Aa で かえると、子どもごとに おぼえます）'),
      h('div', { class: 'btns' }, h('button', { type: 'button', class: 'btn', onclick: () => { vp.v = Object.assign({}, VDEF); persist(); refreshSettings(); } }, 'はじめの せっていに もどす')));
    const keys = Object.keys(store.dict);
    add(h('h3', null, 'あ おぼえた ふりがな（' + keys.length + '）'),
      keys.length ? h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px' }, keys.map(k => h('span', { class: 'mini-btn', style: 'cursor:default' }, k + '（' + store.dict[k] + '）', h('button', { type: 'button', style: 'border:none;background:none;margin-left:4px', onclick: () => { delete store.dict[k]; persist(); refreshSettings(); } }, '✕')))) : h('p', { class: 'note' }, 'まだ ありません。'),
      SEG ? null : h('p', { class: 'note' }, '⚠ この ブラウザは じどうで くぎる きのうが ありません。スペースで くぎって いれて ください。'));
  };
  if (TEST) window.__ys = { store: () => store, build, openRead, RD: () => RD, persist };
  startApp();
