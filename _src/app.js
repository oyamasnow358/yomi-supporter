  /* ============================================================
     よみ サポーター
     ぶんしょうを はりつける → ぶんせつで わける（わかちがき）・ふりがな・1ぎょうずつ ひかる・よみあげ・もじの おおきさ／いろ／たてがき
     ※ ことばの くぎり・よみがなは アプリに いれた じしょ（kuromoji.js / IPA じしょ）で この たんまつの なかで しらべる。ぶんしょうは そとに おくらない。
     ============================================================ */
  const SAMPLES = [
    { id: 's1', g: 'ひらがな', title: 'はるの こうえん', text: 'はるに なりました。\nこうえんに さくらが さいて います。\nわたしは おかあさんと いっしょに ブランコに のりました。\nかぜが ふくと、はなびらが ひらひら おちて きました。\nとても きれいでした。' },
    { id: 's2', g: '1・2ねん', title: '動物園に 行った 日', text: '日曜日に、家族で 動物園に 行きました。\n入口の 近くに、大きな ゾウが いました。\nゾウは 長い 鼻で 水を あびて いました。\nキリンは 首を のばして、木の 葉を 食べて いました。\nかえりに、ライオンの 絵が かいて ある ハンカチを 買って もらいました。\nまた 行きたいです。' },
    { id: 's3', g: 'せつめい', title: 'おにぎりの 作り方', text: 'おにぎりの 作り方を 説明します。\nはじめに、手を きれいに あらいます。\nつぎに、手に 水を つけて、塩を 少し つけます。\nそれから、ご飯を 手に のせて、三角に にぎります。\nさいごに、のりを まいたら できあがりです。\n中に うめぼしや さけを 入れても おいしいです。' },
    { id: 's4', g: 'にっき', title: '雨の 日', text: '今日は 朝から 雨が ふって いました。\n外で 遊べなかったので、教室で 友だちと パズルを しました。\nむずかしい ところは、二人で 考えて 見つけました。\n全部 できた とき、とても うれしかったです。\n明日は 晴れると いいな と 思いました。' },
    { id: 's5', g: 'せつめい', title: '消防車の 仕事', text: '消防車は、火事の 時に 火を 消しに 行く 車です。\n119番に 電話が かかると、消防署から すぐに 出発します。\n車には、長い ホースや はしごが のって います。\n高い ビルの 火事では、はしごを のばして 人を 助けます。\n消防士さんは、毎日 訓練を して、いつでも 出動できるように じゅんびを して います。' },
    { id: 's6', g: 'むかしばなし', title: 'うさぎと かめ', text: 'ある 日、足の 速い うさぎが、かめに 言いました。\n「かめさんは のろいね。山の 上まで きょうそうしよう。」\nスタートすると、うさぎは どんどん 先へ 行きました。\nとちゅうで うさぎは「まだまだ 大丈夫。」と、木の 下で ねむって しまいました。\nかめは 休まずに、こつこつ 歩きつづけました。\nうさぎが 目を さました 時、かめは もう 山の 上に ついて いました。' },
    { id: 's7', g: 'せいかつ', title: 'スーパーで 買い物', text: 'お母さんに たのまれて、スーパーへ 買い物に 行きました。\nメモには「にんじん 三本、牛乳 一本、パン 一ふくろ」と 書いて ありました。\nかごを 持って、野菜売り場から 順番に 回りました。\nレジで 店員さんに「ふくろは いりますか。」と 聞かれたので、「いりません。」と 答えました。\nおつりを 受け取って、「ありがとうございました。」と 言いました。' },
    { id: 's8', g: 'あんぜん', title: '地震が おきたら', text: '地震で 教室が ゆれたら、すぐに 机の 下に 入ります。\n机の あしを しっかり 持って、頭を 守ります。\nゆれが 止まったら、先生の 話を よく 聞きます。\n外に にげる 時は、「おさない・はしらない・しゃべらない・もどらない」を 守ります。\nこわい 時は、近くの 先生に「こわい」と 言って いいです。' },
    { id: 's9', g: 'しごと', title: '職場の 一日', text: '朝 八時半に 職場に 着いたら、「おはようございます。」と あいさつを します。\n作業着に 着がえて、今日の 仕事を 確認します。\n午前中は、商品を ふくろに 入れて、数を かぞえる 仕事を しました。\n分からない ことが あった 時は、近くの 先輩に 質問しました。\n仕事が 終わったら、使った 道具を 片づけて、「お先に 失礼します。」と 言って 帰ります。' },
    { id: 's10', g: 'ぎょうじ', title: '七夕', text: '七月七日は 七夕です。\n昔の お話では、おりひめと ひこぼしが、一年に 一回 天の川で 会えると 言われて います。\n七夕の 日には、ささの 葉に 短冊を かざります。\n短冊には、自分の ねがいごとを 書きます。\nわたしは「字が 上手に なりますように。」と 書きました。' }
  ];
  const THEMES = { white: ['#FFFFFF', '#212529', '#FFE066', 'しろ'], cream: ['#FFF8E1', '#3E2723', '#FFD43B', 'クリーム'], blue: ['#E7F5FF', '#1B1B1B', '#FFE066', 'みずいろ'], green: ['#EBFBEE', '#1B1B1B', '#FFE066', 'みどり'], gray: ['#E9ECEF', '#111', '#FFE066', 'グレー'], dark: ['#212529', '#F1F3F5', '#F59F00', 'くろ'] };
  const FONTS = { ud: ["'BIZ UDPGothic','BIZ UDゴシック','Hiragino Sans','Yu Gothic UI','Meiryo',sans-serif", 'UD ゴシック'], kyo: ["'UD デジタル 教科書体 N-R','UD Digi Kyokasho N-R','UDDigiKyokashoN-R','Klee','YuKyokasho','Yu Mincho',serif", 'きょうかしょ'], maru: ["'Hiragino Maru Gothic ProN','Zen Maru Gothic','Meiryo',sans-serif", 'まる'] };
  const VDEF = { fs: 34, lh: 2.3, ls: .06, theme: 'cream', font: 'kyo', wk: true, ruby: 'all', rt: .5, focus: 'off', vert: false, mode: 'sent', rate: 1 };
  const APP = {
    id: 'yomi-supporter', title: 'よみ サポーター', ls: 'yomi.v1', db: false, sw: true, color: '#3B5BDB',
    defaults: {},
    newProfile: (name, icon) => ({ id: 'p' + Math.random().toString(36).slice(2, 9), name, icon, v: Object.assign({}, VDEF), last: null }),
    normProfile(p) { p.v = Object.assign({}, VDEF, p.v || {}); if (p.v.ruby === true) p.v.ruby = 'all'; if (p.v.ruby === false) p.v.ruby = 'none'; if (p.v.focus === true) p.v.focus = 'line'; if (p.v.focus === false) p.v.focus = 'off'; },
    normStore(o) { if (!Array.isArray(o.texts)) o.texts = []; if (!o.dict || typeof o.dict !== 'object') o.dict = {}; },
    childScreens: ['read'], topScreens: ['home', 'read'],
    renderHome: () => renderHome(),
    profileNote: p => 'もじ ' + p.v.fs + 'px・' + (THEMES[p.v.theme] || THEMES.white)[3],
    onCloseSettings(sc) { if (sc === 'home') renderHome(); else if (sc === 'read') renderRead(); },
    helpNote: 'もじを よむのが にがてな 子の ための「よむ ための めがね」です。ぶんせつごとに すきまを あける（わかちがき）、ふりがな、いま よむ 1ぎょうだけ みせる、よみあげに あわせて ひかる、もじの おおきさ・いろ・フォント・たてがき を 子どもごとに おぼえます。ふりがなは アプリに いれた じしょ（IPA じしょ）で じどうで つきます。「1ねんの かんじは つけない」「ひらがなに する」も えらべます。よみが ちがう ときは Aa →「ふりがなを なおす」で ことばを タッチ（この たんまつが おぼえます）、または「漢字《かんじ》」と かいて ください。きょうかしょの ぶんしょうを うちこんで つかう ことが できます。ぶんしょうは この たんまつの なかだけに ほぞん します。'
  };
/*BASE_HERE*/

  /* ============================================================
     ぶんしょうを くぎる・よみがなを つける
       para = [{ t:'みえる もじ', parts:[[もじ, よみ|null]], s:ぶんの ばんごう }]
     ・じしょ（kuromoji.js ＋ IPA じしょ。この アプリと おなじ ばしょに おいて あり、ぶんしょうは そとに おくらない）で
       ことばの しゅるい（品詞）と よみを しらべて、ぶんせつに まとめ、かんじに ふりがなを つける
     ・じしょを よみこむ まえ／よみこめない ときは ブラウザの くぎり（Intl.Segmenter）で かわりに くぎる
     ============================================================ */
  const KJ = /[一-龯々〆ヵヶ]/;
  // 1ねん・2ねんで ならう かんじ（ふりがなを つけない せってい よう）
  const G1 = '一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六';
  const G2 = '引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話';
  const RUBY = { all: 'ぜんぶ', g1: '1ねんの かんじは なし', g2: '2ねんまでは なし', none: 'つけない', kana: 'ひらがなに する' };
  const needRuby = (kj, mode) => mode === 'all' || mode === 'kana' ? true : mode === 'none' ? false : Array.from(kj).some(c => (mode === 'g1' ? G1 : G1 + G2).indexOf(c) < 0);
  const kata2hira = s => String(s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  // じしょ（さいしょに いちど だけ よみこむ）
  let TK = null, tkState = 'idle'; const tkWait = [];
  function loadDict(cb) {
    if (TK) { cb && cb(); return; }
    if (cb) tkWait.push(cb);
    if (tkState !== 'idle') return;
    tkState = 'loading';
    const go = () => window.kuromoji.builder({ dicPath: 'kuromoji/dict/' }).build((err, t) => { if (err) { tkState = 'error'; tkWait.length = 0; return; } TK = t; tkState = 'ready'; tkWait.splice(0).forEach(f => f()); });
    if (window.kuromoji) { go(); return; }
    const s = document.createElement('script'); s.src = 'kuromoji/kuromoji.js'; s.onload = go; s.onerror = () => { tkState = 'error'; }; document.head.appendChild(s);
  }
  // じしょだけでは よみが ずれやすい ことば（ひとり・ふつか・おかあさん など）
  const SPECIAL = { '一人': 'ひとり', '二人': 'ふたり', '一つ': ['一', 'ひと'], '二つ': ['二', 'ふた'], '三つ': ['三', 'みっ'], '四つ': ['四', 'よっ'], '五つ': ['五', 'いつ'], '六つ': ['六', 'むっ'], '七つ': ['七', 'なな'], '八つ': ['八', 'やっ'], '九つ': ['九', 'ここの'], '十日': 'とおか', '二日': 'ふつか', '三日': 'みっか', '四日': 'よっか', '五日': 'いつか', '六日': 'むいか', '七日': 'なのか', '八日': 'ようか', '九日': 'ここのか', '二十日': 'はつか', '今日': 'きょう', '明日': 'あした', '昨日': 'きのう', '今年': 'ことし', '今朝': 'けさ', '今夜': 'こんや', '大人': 'おとな', '上手': 'じょうず', '下手': 'へた', '友達': 'ともだち', '七夕': 'たなばた', '眼鏡': 'めがね', '部屋': 'へや', '時計': 'とけい', '果物': 'くだもの', '野菜': 'やさい', '一年生': 'いちねんせい', '何人': 'なんにん', '何回': 'なんかい', '何時': 'なんじ', '一番': 'いちばん', '母さん': ['母', 'かあ'], '父さん': ['父', 'とう'], '兄さん': ['兄', 'にい'], '姉さん': ['姉', 'ねえ'], '一緒': 'いっしょ', '真っ赤': ['真', 'ま'], '真っ白': ['真', 'ま'], '一生懸命': 'いっしょうけんめい', '博士': 'はかせ', '迷子': 'まいご', '景色': 'けしき', '日本': 'にほん' };
  const SPKEYS = Object.keys(SPECIAL).sort((a, b) => b.length - a.length);
  function parseLine(line) {
    // 漢字《かんじ》・漢字(かんじ) は かいた よみを つかう
    let plain = '', ann = [];
    const re = /([一-龯々〆ヵヶ]+)[《(（]([ぁ-ゖァ-ヺー]+)[》)）]/g; let m, last = 0;
    while ((m = re.exec(line))) { plain += line.slice(last, m.index); ann.push([plain.length, plain.length + m[1].length, kata2hira(m[2])]); plain += m[1]; last = re.lastIndex; }
    plain += line.slice(last);
    SPKEYS.forEach(w => { let i = plain.indexOf(w); while (i >= 0) { const v = SPECIAL[w]; const st = Array.isArray(v) ? i + w.indexOf(v[0]) : i, en = Array.isArray(v) ? st + v[0].length : i + w.length; if (!ann.some(a => a[0] < en && a[1] > st) && !(plain[i - 1] && KJ.test(plain[i - 1]) && !Array.isArray(v) && w !== '一人')) ann.push([st, en, Array.isArray(v) ? v[1] : v]); i = plain.indexOf(w, i + w.length); } });
    return { plain, ann };
  }
  // 「言わ」＋「いわ」→ 言＝い。おくりがなを てがかりに かんじごとの よみを わりだす
  function alignReading(surface, reading) {
    const hs = kata2hira(surface), hr = kata2hira(reading);
    const runs = []; let cur = null;
    Array.from(hs).forEach(c => { const k = KJ.test(c); if (!cur || cur.k !== k) { cur = { k, s: '' }; runs.push(cur); } cur.s += c; });
    if (!runs.some(r => r.k)) return null;
    const rx = new RegExp('^' + runs.map(r => r.k ? '(.+?)' : r.s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('') + '$');
    const m = hr.match(rx);
    const out = {}; let g = 1, pos = 0;
    runs.forEach(r => { if (r.k) out[pos] = m ? m[g++] : null; pos += r.s.length; });
    if (!m) { out.whole = hr; }
    return out;
  }
  const isIndep = t => {
    const p = t.pos, d = t.pos_detail_1;
    if (p === '名詞') return d !== '非自立' && d !== '接尾';
    if (p === '動詞' || p === '形容詞') return d !== '非自立' && d !== '接尾';
    return ['副詞', '連体詞', '接続詞', '感動詞', '接頭詞', 'フィラー'].indexOf(p) >= 0;
  };
  // じしょで くぎる
  function chunksByDict(plain) {
    const toks = TK.tokenize(plain), out = [];
    let pos = 0, prevTok = null;
    toks.forEach(t => {
      const s = t.surface_form, b = pos; pos += s.length;
      const prev = out[out.length - 1];
      let start;
      if (!prev) start = true;
      else if (/[「『（(【]$/.test(prev.t) && prev.onlyOpen) start = false;
      else if (/^[「『（(【]/.test(s)) start = true;
      else if (t.pos === '記号') start = false;
      else if (/^\s+$/.test(s)) start = false;
      else if (prevTok && prevTok.pos === '接頭詞') start = false;
      else if (t.pos === '名詞' && prevTok && prevTok.pos === '名詞' && prevTok.pos_detail_1 !== '代名詞' && t.pos_detail_1 !== '代名詞' && !/[ 　]/.test(plain.slice(b - 1, b))) start = false; // ふくごうご（どうぶつ＋えん）
      else if (t.pos === '動詞' && t.basic_form === 'する' && prevTok && prevTok.pos === '名詞' && prevTok.pos_detail_1 === 'サ変接続') start = false;
      else start = isIndep(t);
      if (start) out.push({ t: s, b, e: pos, toks: [{ t, b }], onlyOpen: /^[「『（(【]+$/.test(s) });
      else { prev.t += s; prev.e = pos; prev.toks.push({ t, b }); prev.onlyOpen = false; }
      prevTok = t.pos === '記号' ? prevTok : t;
    });
    return out;
  }
  // じしょが ない ときの くぎり
  const SEG = (window.Intl && Intl.Segmenter) ? new Intl.Segmenter('ja', { granularity: 'word' }) : null;
  const FUNC = new Set('は が を に で と も の へ や か ね よ な わ ぞ さ から まで より など だけ しか ので のに けど ば て た だ ます ました ません です でした ない なかった れる られる せる させる う よう たい たら たり ながら って した して そう'.split(' '));
  function chunksBySeg(plain) {
    const toks = /[ 　]/.test(plain.trim()) ? plain.split(/[ 　]+|(?<=、)/).filter(Boolean).map(t => ({ t, sp: 1 })) : SEG ? Array.from(SEG.segment(plain)).map(x => ({ t: x.segment })) : [{ t: plain }];
    const out = []; let pos = 0;
    toks.forEach(o => {
      const t = o.t, b = plain.indexOf(t, pos); pos = b + t.length;
      const prev = out[out.length - 1];
      const merge = prev && !o.sp && (/^[、。！？!?」』）)ー]/.test(t) || FUNC.has(t) || (/^[ぁ-ゖ]{1,3}$/.test(t) && /[一-龯々ァ-ヺ]$/.test(prev.t)) || (/^[ぁ-ゖ]$/.test(t) && !/[はがをにでともへやの、。]$/.test(prev.t)));
      if (!t.trim()) { if (prev) { prev.t += t; prev.e = pos; } return; }
      if (merge) { prev.t += t; prev.e = pos; } else out.push({ t, b, e: pos, toks: null });
    });
    return out;
  }
  function chunkLine(line, sIdx) {
    const { plain, ann } = parseLine(line);
    const out = TK ? chunksByDict(plain) : chunksBySeg(plain);
    // かんじの ばしょ → よみ
    const rd = {};
    if (TK) out.forEach(c => c.toks.forEach(({ t, b }) => {
      if (!KJ.test(t.surface_form) || !t.reading || t.reading === '*') return;
      const al = alignReading(t.surface_form, t.reading); if (!al) return;
      if (al.whole) { rd[b] = { len: t.surface_form.length, r: al.whole, whole: true }; return; }
      const te = b + t.surface_form.length; Object.keys(al).forEach(k => { const i = b + Number(k); let j = i; while (j < te && KJ.test(plain[j])) j++; if (al[k]) rd[i] = { len: j - i, r: al[k] }; });
    }));
    let s = sIdx;
    out.forEach(c => {
      c.s = s; if (/[。！？!?]/.test(c.t)) s++;
      const parts = []; let i = c.b;
      while (i < c.e) {
        const a = ann.find(x => x[0] <= i && x[1] > i);
        if (a) { parts.push([plain.slice(Math.max(a[0], i), Math.min(a[1], c.e)), a[0] >= i && a[1] <= c.e ? a[2] : null]); i = Math.min(a[1], c.e); continue; }
        if (rd[i] && rd[i].whole && i + rd[i].len <= c.e) { parts.push([plain.slice(i, i + rd[i].len), rd[i].r, 1]); i += rd[i].len; continue; }
        let j = i; const kj = KJ.test(plain[i]);
        while (j < c.e && KJ.test(plain[j]) === kj && !(j > i && (rd[j] || ann.some(x => x[0] === j)))) j++;
        const str = plain.slice(i, j);
        parts.push([str, kj ? (store.dict[str] || (rd[i] && rd[i].len === str.length ? rd[i].r : null)) : null]);
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
  // ruby：ふりがなの つけかた（all / g1 / g2 / none / kana）
  const chunkHTML = (c, ruby) => c.parts.map(([t, r]) => {
    if (!r || !KJ.test(t) || !needRuby(t, ruby)) return esc(t);
    if (ruby === 'kana') return '<span class="kn">' + esc(r) + '</span>';
    return '<ruby>' + esc(t) + '<rt>' + esc(r) + '</rt></ruby>';
  }).join('');
  // よみあげる ときの ことば（かいた よみが ある ときは それを よむ）
  const sayOf = c => c.parts.map(([t, r]) => r && KJ.test(t) && store.dict[t] ? r : t).join('');

  const allTexts = () => store.texts.concat(SAMPLES);
  const textById = id => allTexts().find(x => x.id === id);
  const titleOf = t => parseLine(t.title).plain;

  /* ============================================================
     ホーム
     ============================================================ */
  function renderHome() {
    screen = 'home'; stopRead();
    const card = (t, tag) => h('button', { type: 'button', class: 'tcard', onclick: () => { if (tapOk()) { sfx.tap(); openRead(t.id); } } }, tag || t.g ? h('span', { class: 'tg' }, tag || t.g) : null, h('b', null, titleOf(t)), h('small', null, parseLine(t.text.split('\n').join(' ')).plain.slice(0, 60)));
    setView('home', [
      h('h1', { class: 'title' }, '📏 よみ サポーター', h('small', null, 'よみやすく して、いっしょに よもう')),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'big-btn blue', onclick: () => { if (tapOk()) renderEdit(null); } }, '＋ ぶんしょうを いれる')),
      store.texts.length ? h('div', { class: 'tlist' }, store.texts.slice().reverse().map(t => card(t))) : null,
      h('div', { class: 'sec2' }, '📚 れいの ぶんしょう'), h('div', { class: 'tlist' }, SAMPLES.map(t => card(t))),
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
    const ta = h('textarea', { placeholder: 'ここに ぶんしょうを はりつけるか、うちこみます。\nれい：日曜日に 公園へ 行きました。' }); ta.value = t ? t.text : '';
    setView('ed', [h('h1', { class: 'title' }, t ? '✏️ ぶんしょうを なおす' : '＋ ぶんしょうを いれる'), ti, ta,
      h('div', { class: 'tip' }, '💡 きょうかしょや プリントの ぶんしょうを そのまま はりつければ、ふりがな と くぎりは じどうで つきます。よみが ちがう ときは「漢字《かんじ》」と かくか、よむ がめんで なおせます。ことばの あいだに スペースを いれると、その とおりに くぎります。'),
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
    if (!TK && tkState !== 'error') loadDict(() => { if (screen === 'read' && RD) renderRead(); });
    const paras = build(t.text); RD.flat = [].concat(...paras); RD.nS = RD.flat.length ? RD.flat[RD.flat.length - 1].s + 1 : 0;
    RD.cur = Math.min(RD.cur, Math.max(0, RD.flat.length - 1));
    let k = 0;
    const html = paras.map(pa => '<p>' + pa.map(c => '<span class="ck' + (c.parts.some(x => KJ.test(x[0])) ? ' kj' : '') + '" data-i="' + (k++) + '">' + chunkHTML(c, v.ruby) + '</span>').join('') + '</p>').join('');
    const txt = h('div', { class: 'txt' + (v.wk ? ' wk' : ''), html, style: '--fs:' + v.fs + 'px;--lh:' + v.lh + ';--ls:' + v.ls + 'em;--ff:' + FONTS[v.font][0] + ';--rt:' + v.rt + 'em' });
    const page = h('div', { class: 'page' + (v.vert ? ' vert' : '') + (v.focus !== 'off' ? ' focus' : '') + (RD.rubyEdit ? ' redit' : ''), style: '--pbg:' + th[0] + ';--pfg:' + th[1] + ';--hl:' + th[2] }, h('div', { class: 'ruler', hidden: v.focus !== 'line' }), txt);
    page.addEventListener('click', e => { const c = e.target.closest('.ck'); if (!c) return; const i = Number(c.getAttribute('data-i')); if (RD.rubyEdit) { editRuby(i); return; } stopRead(); RD.cur = i; mark(); speak(sayOf(RD.flat[i])); });
    const loading = !TK && tkState === 'loading' ? h('div', { class: 'ldg' }, '📖 じしょを よみこみ ちゅう…（はじめて の ときだけ すこし じかんが かかります）') : null;
    const btn = (icon, label, fn, cls) => h('button', { type: 'button', class: cls || '', 'aria-label': label, onclick: fn }, icon, h('small', null, label));
    setView('rd', [loading, page, h('div', { class: 'bar' },
      btn('⏮', 'まえの ぶん', () => jumpS(-1)),
      btn(RD.playing ? '⏸' : '▶', RD.playing ? 'とめる' : 'よむ', () => RD.playing ? stopRead(true) : startRead(), 'play' + (RD.playing ? ' on' : '')),
      btn('⏭', 'つぎの ぶん', () => jumpS(1)),
      btn(v.focus === 'sent' ? '📌' : '🔦', v.focus === 'sent' ? '1ぶん' : '1ぎょう', () => { v.focus = { off: 'line', line: 'sent', sent: 'off' }[v.focus] || 'off'; persist(); toast({ line: '🔦 いまの 1ぎょう だけ', sent: '📌 いまの 1ぶん だけ', off: 'ぜんぶ みせる' }[v.focus]); renderRead(); }, v.focus !== 'off' ? 'on' : ''),
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
    if (v.focus === 'sent') {
      const sn = RD.flat[RD.cur].s;
      page.querySelectorAll('.ck').forEach(x => x.classList.toggle('ln', RD.flat[Number(x.dataset.i)].s === sn));
    }
    if (v.focus === 'line' && RD.lines) {
      page.querySelectorAll('.ck.ln').forEach(x => x.classList.remove('ln'));
      (RD.lines[ln] || []).forEach(x => x.classList.add('ln'));
      const rs = (RD.lines[ln] || []).map(x => x.getBoundingClientRect()), pr = page.getBoundingClientRect(), ru = page.querySelector('.ruler');
      if (rs.length && ru) {
        const top = Math.min(...rs.map(r => r.top)), bot = Math.max(...rs.map(r => r.bottom)), lef = Math.min(...rs.map(r => r.left)), rig = Math.max(...rs.map(r => r.right));
        if (v.vert) ru.style.cssText = 'top:0;bottom:0;height:auto;left:' + (lef - pr.left + page.scrollLeft - 6) + 'px;width:' + (rig - lef + 12) + 'px;right:auto';
        else ru.style.cssText = 'left:0;right:0;top:' + (top - pr.top + page.scrollTop - 6) + 'px;height:' + (bot - top + 12) + 'px';
      }
    }
    if (!noScroll || v.focus !== 'off') c.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
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
        let k = 0; const step = () => { if (g !== rdGen) return; if (k >= list.length) { nextOne(); return; } RD.cur = list[k][1]; mark(); const w = sayOf(list[k][0]); k++; if (S().voice) speak(w, { rate: V().rate, end: () => after(120, step) }); else after(300 + w.length * 190, step); };
        step(); return;
      }
      const text = list.map(x => sayOf(x[0])).join(''), offs = []; let o = 0; list.forEach(x => { offs.push(o); o += sayOf(x[0]).length; });
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
    runs.forEach(([kj, r]) => { const v = prompt('「' + kj + '」の よみかた（ひらがな）。からっぽ に すると じしょの よみに もどります', store.dict[kj] || r || ''); if (v === null) return; const y = kata2hira(v.trim()); if (y) store.dict[kj] = y; else delete store.dict[kj]; });
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
      row('みせかた', seg(v.focus, [['off', 'ぜんぶ'], ['line', '1ぎょう'], ['sent', '1ぶん']], x => set('focus', x))),
      row('ふりがな', seg(v.ruby, Object.keys(RUBY).map(k => [k, RUBY[k]]), x => set('ruby', x))),
      row('ふりがなの おおきさ', seg(v.rt, [[.42, 'ちいさい'], [.5, 'ふつう'], [.62, 'おおきい']], x => set('rt', Number(x)))),
      row('かきかた', seg(v.vert ? 1 : 0, [[0, 'よこがき'], [1, 'たてがき']], x => set('vert', x === 1 || x === '1'))),
      row('よみあげ', seg(v.mode, [['sent', '1ぶんずつ'], ['chunk', 'ことばごと']], x => set('mode', x))),
      row('はやさ', seg(v.rate, [[.75, 'ゆっくり'], [1, 'ふつう'], [1.2, 'はやい']], x => set('rate', Number(x)))),
      h('div', { class: 'row2' }, h('button', { type: 'button', class: 'mid-btn' + (RD.rubyEdit ? ' on' : ''), onclick: () => { RD.rubyEdit = !RD.rubyEdit; toast(RD.rubyEdit ? 'よみを なおしたい ことばを タッチ' : 'なおし おわり'); renderRead(); } }, RD.rubyEdit ? '✓ なおし おわり' : 'あ ふりがなを なおす')));
  }
  window.addEventListener('resize', () => { if (screen === 'read' && RD) { measureLines(); mark(true); } });

  /* ============================================================
     プリント：みた めの せっていで いんさつ（はいる ぶんだけ ページを わける）
     ============================================================ */
  const PF = '<div class="pf">© MieeL　よみ サポーター　www.mieel-support-school.com</div>';
  const HD = t => '<div class="phd"><h1>' + t + '</h1><div class="nm">なまえ ＿＿＿＿＿＿＿＿</div></div>';
  function buildPages(type, o) {
    o = o || {};
    const t = textById(o.t) || allTexts()[0], fs = Number(o.fs) || 8, vert = o.vert === 'on', wk = o.wk !== 'off', ruby = RUBY[o.ruby] ? o.ruby : 'all';
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
      return [{ id: 'text', name: 'よみやすい プリント', icon: '📄', params: [{ key: 't', label: 'ぶんしょう', opts: ts, def: (RD && textById(RD.id) ? RD.id : ts[0][0]) }, { key: 'fs', label: 'もじ', opts: [[6, 'ちゅう'], [8, 'だい'], [11, 'とくだい']], def: 8 }, { key: 'wk', label: 'わかちがき', opts: [['on', 'あける'], ['off', 'あけない']], def: 'on' }, { key: 'ruby', label: 'ふりがな', opts: Object.keys(RUBY).map(k => [k, RUBY[k]]), def: cur().v.ruby || 'all' }, { key: 'vert', label: 'かきかた', opts: [['off', 'よこがき'], ['on', 'たてがき']], def: 'off' }] }];
    },
    // じしょを よみこんでから つくる（ふりがなの ため）
    build(id, params) { return new Promise(res => { const go = () => res({ pages: buildPages(id, params), css: document.querySelector('style').textContent }); if (TK || tkState === 'error') go(); else { loadDict(go); setTimeout(() => { if (!TK) go(); }, 20000); } }); }
  };

  /* ============================================================
     先生用せってい
     ============================================================ */
  APP.renderSettings = function (add, st, vp, pidSel) {
    add(h('h3', null, '📏 みかたの せってい'), pidSel(),
      h('p', { class: 'note' }, vp.name + '：もじ ' + vp.v.fs + 'px・' + (THEMES[vp.v.theme] || THEMES.white)[3] + '・' + FONTS[vp.v.font][1] + '・' + (vp.v.wk ? 'わかちがき' : '') + '・ふりがな：' + (RUBY[vp.v.ruby] || '') + (vp.v.vert ? '・たてがき' : '') + '（よむ がめんの Aa で かえると、子どもごとに おぼえます）'),
      h('div', { class: 'btns' }, h('button', { type: 'button', class: 'btn', onclick: () => { vp.v = Object.assign({}, VDEF); persist(); refreshSettings(); } }, 'はじめの せっていに もどす')));
    const keys = Object.keys(store.dict);
    add(h('h3', null, 'あ おぼえた ふりがな（' + keys.length + '）'),
      keys.length ? h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px' }, keys.map(k => h('span', { class: 'mini-btn', style: 'cursor:default' }, k + '（' + store.dict[k] + '）', h('button', { type: 'button', style: 'border:none;background:none;margin-left:4px', onclick: () => { delete store.dict[k]; persist(); refreshSettings(); } }, '✕')))) : h('p', { class: 'note' }, 'まだ ありません。'),
      h('p', { class: 'note' }, 'じしょ：' + ({ ready: '✅ よみこみ ずみ', loading: '⏳ よみこみ ちゅう', error: '⚠ よみこめません でした（くぎりは ブラウザの きのう、ふりがなは「漢字《かんじ》」で つけて ください）', idle: 'まだ よみこんで いません' }[tkState])),
      h('p', { class: 'note' }, 'ふりがな・ことばの くぎりには kuromoji.js（Apache License 2.0）と IPA じしょ を つかって います（kuromoji/NOTICE.md）。'));
  };
  if (TEST) window.__ys = { store: () => store, build, openRead, RD: () => RD, persist, loadDict, ready: () => !!TK, alignReading };
  startApp();
