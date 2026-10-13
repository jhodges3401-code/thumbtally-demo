/* Thumbtally embeddable widget. <script src="https://YOU.github.io/feedback/widget.js" defer></script>
   No cookies, no tracking, no third-party calls: it only reads board.json next to this file. */
(function () {
  var me = document.currentScript; if (!me) return;
  var base = me.getAttribute('data-board') || me.src.replace(/widget\.js(\?.*)?$/, '');
  var label = me.getAttribute('data-label') || 'Feedback';
  var color = me.getAttribute('data-color') || '#7c3aed';
  function el(tag, attrs, text) { var e = document.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; }
  var host = el('div', { id: 'thumbtally-widget' }); var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  var style = el('style', {}, ':host{all:initial}.b{position:fixed;right:18px;bottom:18px;z-index:2147483000;background:' + color + ';color:#fff;border:0;border-radius:99px;padding:11px 16px;font:600 14px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.2)}' +
    '.p{position:fixed;right:18px;bottom:70px;z-index:2147483000;width:320px;max-height:70vh;overflow:auto;background:#fff;color:#0f172a;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.18);font:14px/1.4 system-ui,sans-serif;padding:12px}' +
    '.p[hidden]{display:none}.p h4{margin:4px 0 8px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:.04em}.r{display:flex;gap:10px;align-items:center;padding:6px 0;border-top:1px solid #f1f5f9}.r:first-of-type{border-top:0}' +
    '.v{min-width:40px;text-align:center;font-weight:700;border:1px solid #e2e8f0;border-radius:6px;padding:2px 0;color:#0f172a;text-decoration:none}a{color:' + color + '}.s{display:block;text-align:center;margin-top:10px;background:' + color + ';color:#fff;border-radius:8px;padding:8px;text-decoration:none;font-weight:600}.m{color:#64748b;font-size:12px}');
  var btn = el('button', { class: 'b', type: 'button', 'aria-expanded': 'false' }, label);
  var panel = el('div', { class: 'p', hidden: '', role: 'dialog', 'aria-label': label });
  root.appendChild(style); root.appendChild(panel); root.appendChild(btn);
  var loaded = false;
  function render(d) {
    panel.textContent = '';
    panel.appendChild(el('h4', {}, 'Top requests'));
    (d.items || []).slice(0, 5).forEach(function (i) {
      var r = el('div', { class: 'r' }); var v = el('a', { class: 'v', href: i.url, target: '_blank', rel: 'noopener', title: 'Vote with 👍 on GitHub' }, String(i.votes));
      var t = el('div'); var a = el('a', { href: i.url, target: '_blank', rel: 'noopener' }, i.title); t.appendChild(a); t.appendChild(el('div', { class: 'm' }, (d.statuses && d.statuses[i.status]) || i.status));
      r.appendChild(v); r.appendChild(t); panel.appendChild(r);
    });
    if (!(d.items || []).length) panel.appendChild(el('div', { class: 'm' }, 'No requests yet.'));
    if ((d.changelog || []).length) { panel.appendChild(el('h4', {}, 'Latest update')); var c = d.changelog[0]; panel.appendChild(el('a', { href: c.url, target: '_blank', rel: 'noopener' }, c.title)); }
    panel.appendChild(el('a', { class: 's', href: d.newUrl, target: '_blank', rel: 'noopener' }, 'Suggest a feature'));
    panel.appendChild(el('a', { href: base + 'index.html', target: '_blank', rel: 'noopener', class: 'm' }, 'See all requests →'));
  }
  btn.onclick = function () {
    var open = panel.hasAttribute('hidden'); if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', String(open));
    if (open && !loaded) { loaded = true; panel.textContent = 'Loading…';
      fetch(base + 'board.json', { credentials: 'omit' }).then(function (r) { return r.json(); }).then(render).catch(function () { panel.textContent = 'Could not load feedback.'; loaded = false; }); }
  };
  (document.body || document.documentElement).appendChild(host);
  window.Thumbtally = { render: render, root: root };
})();
