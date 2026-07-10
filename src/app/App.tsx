import { useEffect, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";

const CSS = `
:root{
  --paper:#FBFCFE; --white:#FFFFFF;
  --ink:#0C1526; --ink-2:#101C32; --ink-3:#17243F;
  --blue:#1188CD; --blue-600:#0D6FA8; --blue-700:#0A5A8E;
  --blue-300:#7CC5E8; --blue-bright:#34AADF; --blue-glow:#47B6E8;
  --sky:#E0F4FC; --sky-2:#F0FAFD; --mist:#F4F7FC;
  --line:#E6EBF3; --line-2:#D9E2F0;
  --tx:#13203A; --tx-2:#41567B; --slate:#5A6C8C; --slate-2:#8290AC;
  --green:#1FA563; --green-bg:#E7F5EE;
  --amber:#D9820B; --amber-bg:#FAF0DC;
  --red:#E0483D; --red-bg:#FBE9E7;
  --violet:#7A5AF0; --violet-bg:#EEEAFE;
  --sh-xs:0 1px 2px rgba(16,27,48,.05);
  --sh-sm:0 2px 6px -1px rgba(20,40,90,.08), 0 1px 2px rgba(20,40,90,.05);
  --sh-md:0 14px 34px -16px rgba(20,40,90,.22), 0 3px 10px -4px rgba(20,40,90,.10);
  --sh-lg:0 40px 80px -28px rgba(14,30,78,.34), 0 10px 26px -10px rgba(14,30,78,.16);
  --r-xs:8px; --r-sm:10px; --r:14px; --r-lg:20px; --r-xl:26px;
  --serif:"Source Serif 4", Georgia, "Times New Roman", serif;
  --sans:"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --mono:"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
  --wrap:1200px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0; background:var(--paper); color:var(--tx); font-family:var(--sans); font-size:16.5px; line-height:1.6; -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; overflow-x:hidden;}
a{color:inherit; text-decoration:none}
img,svg{display:block; max-width:100%}
svg{fill:none}
h1,h2,h3,h4{font-family:var(--serif); font-weight:600; color:var(--tx); margin:0; letter-spacing:-.012em; line-height:1.08}
p{margin:0}
::selection{background:#C2E8F7; color:var(--ink)}
.wrap{max-width:var(--wrap); margin:0 auto; padding:0 28px; position:relative}
.section{padding:clamp(74px,9.2vw,132px) 0; position:relative}
.section--tight{padding:clamp(54px,6vw,84px) 0}
.ic{width:20px; height:20px; stroke:currentColor; fill:none; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; flex:none}
.ic--sm{width:16px; height:16px}
.ic--lg{width:26px; height:26px}
.eyebrow{font-family:var(--mono); font-size:12px; font-weight:500; letter-spacing:.16em; text-transform:uppercase; color:var(--blue-600); display:inline-flex; align-items:center; gap:10px;}
.eyebrow::before{content:""; width:22px; height:1px; background:linear-gradient(90deg,var(--blue),transparent); display:inline-block}
.eyebrow--center{justify-content:center}
.eyebrow--light{color:var(--blue-300)}
.eyebrow--light::before{background:linear-gradient(90deg,var(--blue-300),transparent)}
.sec-head{max-width:760px}
.sec-head .h2{font-size:clamp(30px,4.1vw,52px); margin:18px 0 0; line-height:1.04}
.sec-head .lede{font-family:var(--sans); color:var(--tx-2); font-size:clamp(16px,1.6vw,19px); margin-top:18px; line-height:1.55; max-width:620px}
.center{text-align:center; margin-left:auto; margin-right:auto}
.center .lede{margin-left:auto; margin-right:auto}
.btn{display:inline-flex; align-items:center; gap:9px; font-family:var(--sans); font-weight:600; font-size:15px; padding:13px 20px; border-radius:11px; cursor:pointer; border:1px solid transparent; transition:transform .18s cubic-bezier(.2,.7,.3,1), box-shadow .2s, background .2s, color .2s, border-color .2s; white-space:nowrap}
.btn .ic{width:17px;height:17px;stroke-width:2}
.btn-primary{background:var(--ink); color:#fff; box-shadow:var(--sh-sm)}
.btn-primary:hover{background:var(--ink-3); transform:translateY(-2px); box-shadow:var(--sh-md)}
.btn-blue{background:var(--blue); color:#fff; box-shadow:0 8px 20px -8px rgba(17,136,205,.6)}
.btn-blue:hover{background:var(--blue-600); transform:translateY(-2px); box-shadow:0 12px 26px -8px rgba(17,136,205,.65)}
.btn-ghost{background:transparent; color:var(--tx); border-color:var(--line-2)}
.btn-ghost:hover{border-color:var(--blue-300); color:var(--blue-600); background:#fff; transform:translateY(-2px)}
.btn-ghost .ic{transition:transform .2s}
.btn-ghost:hover .ic{transform:translateX(3px)}
.btn-light{background:rgba(255,255,255,.1); color:#fff; border-color:rgba(255,255,255,.18); backdrop-filter:blur(6px)}
.btn-light:hover{background:rgba(255,255,255,.18); transform:translateY(-2px)}
.btn-lg{padding:16px 26px; font-size:16px}
.contact-overlay{position:fixed;inset:0;z-index:100;background:rgba(12,21,38,.62);backdrop-filter:blur(9px);display:grid;place-items:center;padding:20px}
.contact-modal{width:min(100%,620px);max-height:calc(100vh - 40px);overflow:auto;background:#fff;border-radius:var(--r-xl);box-shadow:0 40px 100px -30px rgba(6,17,38,.7);padding:36px;position:relative}
.contact-close{position:absolute;top:18px;right:18px;width:40px;height:40px;border:0;border-radius:10px;background:var(--mist);color:var(--tx-2);display:grid;place-items:center;cursor:pointer;transition:.18s}
.contact-close:hover{background:var(--sky);color:var(--blue-600)}
.contact-close:focus-visible{outline:3px solid rgba(17,136,205,.28);outline-offset:2px}
.contact-close svg{width:18px;height:18px;stroke:currentColor;stroke-width:1.8}
.contact-kicker{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-600);margin-bottom:12px}
.contact-modal h2{font-size:clamp(30px,4vw,42px);max-width:470px;padding-right:40px}
.contact-intro{font-size:15px;line-height:1.58;color:var(--tx-2);max-width:500px;margin-top:12px}
.contact-form{display:grid;gap:16px;margin-top:26px}
.contact-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.contact-field{display:grid;gap:7px}
.contact-field label{font-size:12.5px;font-weight:600;color:var(--tx)}
.contact-field label span{font-weight:400;color:var(--slate);margin-left:4px}
.contact-field input,.contact-field textarea{width:100%;border:1px solid var(--line-2);border-radius:10px;background:#fff;color:var(--tx);font:inherit;font-size:14px;line-height:1.45;padding:11px 13px;outline:none;transition:border-color .18s,box-shadow .18s,background .18s}
.contact-field input::placeholder,.contact-field textarea::placeholder{color:#8a96ab}
.contact-field input:hover,.contact-field textarea:hover{border-color:#c5d2e5}
.contact-field input:focus,.contact-field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(17,136,205,.12);background:#fcfeff}
.contact-field textarea{min-height:118px;resize:vertical}
.contact-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:2px}
.contact-actions .btn{width:100%;justify-content:center;padding-left:14px;padding-right:14px}
.contact-copy-status{min-height:18px;font-size:12px;line-height:1.5;text-align:center;color:var(--green)}
.contact-copy-status.failed{color:var(--red)}
.contact-note{font-size:12px;line-height:1.5;color:var(--slate);text-align:center}
.contact-email{color:var(--blue-600);font-weight:600}
.pill{display:inline-flex; align-items:center; gap:7px; font-family:var(--sans); font-weight:600; font-size:12.5px; padding:5px 11px; border-radius:999px; border:1px solid var(--line-2); background:#fff; color:var(--tx-2)}
.dot{width:7px; height:7px; border-radius:50%; flex:none; background:var(--green)}
.dot--g{background:var(--green)} .dot--a{background:var(--amber)} .dot--r{background:var(--red)}
.dot--b{background:var(--blue)} .dot--v{background:var(--violet)}
.pill--green{color:#0f7a47; background:var(--green-bg); border-color:#cfeaDB}
.pill--amber{color:#9a5c06; background:var(--amber-bg); border-color:#f0dcb6}
.pill--red{color:#b5362c; background:var(--red-bg); border-color:#f3cdc8}
.tag{font-family:var(--mono); font-size:10.5px; font-weight:500; letter-spacing:.08em; text-transform:uppercase; padding:3px 8px; border-radius:6px}
.tag--blue{color:var(--blue-600); background:var(--sky)}
.tag--gray{color:var(--slate); background:var(--mist)}
.tag--green{color:#0f7a47; background:var(--green-bg)}
.brand{display:inline-flex; align-items:center; gap:11px}
.spark{width:34px; height:34px; border-radius:10px; background:linear-gradient(150deg,#34AADF,#1188CD 55%,#0A5A8E); display:grid; place-items:center; box-shadow:0 6px 16px -6px rgba(17,136,205,.7), inset 0 1px 0 rgba(255,255,255,.4); flex:none}
.spark svg{width:19px;height:19px;stroke:#fff;fill:none;stroke-width:1.9}
.spark--sm{width:28px;height:28px;border-radius:8px}.spark--sm svg{width:16px;height:16px}
.spark--lg{width:46px;height:46px;border-radius:13px}.spark--lg svg{width:25px;height:25px}
.brand-name{font-family:var(--serif); font-weight:600; font-size:21px; letter-spacing:-.02em; color:var(--tx)}
.brand-name b{color:var(--blue-600); font-weight:600}
.nav{position:fixed; top:0; left:0; right:0; z-index:50; transition:.3s}
.nav-inner{max-width:1280px; margin:0 auto; padding:14px 28px; display:flex; align-items:center; justify-content:space-between; gap:24px}
.nav.scrolled{background:rgba(251,252,254,.82); backdrop-filter:saturate(150%) blur(14px); border-bottom:1px solid var(--line)}
.nav.scrolled .nav-inner{padding:11px 28px}
.nav-links{display:flex; align-items:center; gap:6px}
.nav-links a{font-family:var(--sans); font-size:14.5px; font-weight:500; color:var(--tx-2); padding:8px 13px; border-radius:9px; transition:.18s}
.nav-links a:hover{color:var(--tx); background:rgba(17,136,205,.07)}
.nav-cta{display:flex; align-items:center; gap:6px}
.nav-cta .signin{font-size:14.5px; font-weight:500; color:var(--tx-2); padding:9px 12px; border-radius:9px}
.nav-cta .signin:hover{color:var(--tx)}
.nav-burger{display:none; width:42px; height:42px; border:1px solid var(--line-2); border-radius:10px; background:#fff; cursor:pointer; align-items:center; justify-content:center; flex-direction:column; gap:4px}
.nav-burger span{width:17px; height:1.8px; background:var(--tx); border-radius:2px; transition:.25s}
.hero{position:relative; padding-top:148px; padding-bottom:80px; overflow:hidden}
.hero-grid{display:grid; grid-template-columns:1.02fr 1.18fr; gap:54px; align-items:center}
.hero-eyebrow{margin-bottom:22px}
.hero h1{font-size:clamp(40px,5.6vw,72px); line-height:1.0; letter-spacing:-.022em; font-weight:600}
.hero h1 .em{font-style:italic; color:var(--blue-600); font-weight:600}
.hero-sub{font-family:var(--sans); font-size:clamp(16.5px,1.65vw,20px); color:var(--tx-2); line-height:1.55; margin-top:24px; max-width:540px}
.hero-link{font-weight:700;color:var(--blue-600);letter-spacing:.04em}
.hero-cta{display:flex; gap:13px; margin-top:34px; flex-wrap:wrap}
.hero-trust{display:flex; align-items:center; gap:18px; margin-top:40px; flex-wrap:wrap; font-family:var(--mono); font-size:11.5px; letter-spacing:.07em; color:var(--slate); text-transform:uppercase}
.hero-trust .tdot{width:4px;height:4px;border-radius:50%;background:var(--blue-300)}
.hero-trust span{display:inline-flex;align-items:center;gap:8px}
.hero-bg{position:absolute; inset:0; z-index:-1; pointer-events:none}
.hero-grid-lines{position:absolute; inset:0; background-image:radial-gradient(circle at 1px 1px, rgba(17,136,205,.10) 1px, transparent 0); background-size:30px 30px; -webkit-mask-image:radial-gradient(120% 90% at 78% 30%, #000 0%, transparent 62%); mask-image:radial-gradient(120% 90% at 78% 30%, #000 0%, transparent 62%); opacity:.7}
.hero-glow{position:absolute; width:760px; height:760px; right:-160px; top:-220px; border-radius:50%; background:radial-gradient(circle, rgba(52,170,223,.22), rgba(52,170,223,.06) 45%, transparent 70%); filter:blur(8px)}
.hero-glow.two{left:-220px; top:240px; width:520px; height:520px; right:auto; background:radial-gradient(circle, rgba(17,136,205,.12), transparent 70%)}
#heroCanvas{position:absolute; inset:0; width:100%; height:100%; opacity:.55}
.hero-visual{position:relative}
.app-window{position:relative; background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); box-shadow:var(--sh-lg); overflow:hidden; z-index:3; animation:floaty 7s ease-in-out infinite}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.app-top{display:flex; align-items:center; justify-content:space-between; padding:13px 16px; border-bottom:1px solid var(--line); background:linear-gradient(180deg,#fff,#fcfdff)}
.app-bread{display:flex; align-items:center; gap:9px; font-size:13px; color:var(--slate); font-weight:500}
.app-bread .cur{color:var(--tx); font-weight:600}
.app-bread .sl{color:var(--line-2)}
.app-status{display:flex; gap:8px}
.app-body{display:grid; grid-template-columns:1fr 232px}
.app-chat{padding:20px 20px 18px; min-height:330px; border-right:1px solid var(--line)}
.msg{display:flex; gap:11px; margin-bottom:16px}
.msg .av{width:30px; height:30px; border-radius:8px; background:linear-gradient(150deg,#34AADF,#1188CD 60%,#0A5A8E); display:grid; place-items:center; flex:none; box-shadow:0 4px 10px -4px rgba(17,136,205,.6)}
.msg .av svg{width:16px;height:16px;stroke:#fff;fill:none;stroke-width:1.9}
.msg-name{font-family:var(--mono); font-size:10px; letter-spacing:.13em; color:var(--slate); font-weight:600; margin-bottom:5px}
.msg-text{font-family:var(--serif); font-size:15px; line-height:1.5; color:var(--tx)}
.msg-text .hl{background:linear-gradient(180deg,transparent 62%, #C2E8F7 62%); padding:0 1px}
.src-chips{display:flex; gap:6px; flex-wrap:wrap; margin-top:9px}
.src-chip{font-size:11px; font-weight:500; color:var(--tx-2); border:1px solid var(--line-2); border-radius:7px; padding:3px 8px; display:inline-flex; align-items:center; gap:5px; background:#fff}
.src-chip svg{width:11px;height:11px;stroke:var(--blue-600)}
.msg-user{justify-content:flex-end}
.bubble{background:var(--sky); border:1px solid #C0E3F5; border-radius:13px 13px 4px 13px; padding:9px 13px; font-size:13.5px; color:var(--tx); max-width:78%; font-weight:500}
.idx{margin-top:4px}
.idx-row{display:flex; justify-content:space-between; font-size:12px; margin-bottom:7px}
.idx-row .l{color:var(--tx-2); font-weight:500}
.idx-row .pc{color:var(--blue-600); font-weight:700; font-family:var(--mono); font-size:12px}
.bar{height:7px; border-radius:5px; background:#eef2f8; overflow:hidden; position:relative}
.bar i{position:absolute; left:0; top:0; bottom:0; width:72%; border-radius:5px; background:linear-gradient(90deg,#16243f,#1188CD); animation:fill 3.4s ease-in-out infinite}
.bar i::after{content:""; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent); transform:translateX(-100%); animation:shimmer 1.8s ease-in-out infinite}
@keyframes fill{0%{width:8%}55%{width:72%}100%{width:72%}}
@keyframes shimmer{0%{transform:translateX(-100%)}60%,100%{transform:translateX(220%)}}
.idx-note{font-size:11px; color:var(--slate-2); margin-top:8px}
.app-rail{padding:15px 14px; background:linear-gradient(180deg,#fcfdff,#fff)}
.rail-head{display:flex; align-items:center; justify-content:space-between; margin-bottom:13px}
.rail-tabs{display:flex; gap:5px}
.rail-tab{font-size:11.5px; font-weight:600; padding:4px 9px; border-radius:7px; color:var(--slate)}
.rail-tab.on{background:var(--ink); color:#fff}
.rail-meta{font-size:10.5px; color:var(--slate-2); margin-bottom:11px; font-family:var(--mono); letter-spacing:.04em}
.src-row{display:flex; align-items:center; gap:9px; padding:8px 6px; border-radius:9px; transition:.15s}
.src-row:hover{background:var(--mist)}
.src-ic{width:26px; height:26px; border-radius:7px; background:var(--mist); display:grid; place-items:center; flex:none; border:1px solid var(--line)}
.src-ic svg{width:14px;height:14px;stroke:var(--slate)}
.src-info{flex:1; min-width:0}
.src-name{font-size:12.5px; font-weight:600; color:var(--tx); display:flex; align-items:center; gap:6px}
.src-name .dot{width:6px;height:6px}
.src-desc{font-size:10.5px; color:var(--slate-2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.src-time{font-size:10px; color:var(--slate-2); font-family:var(--mono)}
.pulse-dot{animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1; box-shadow:0 0 0 0 rgba(31,165,99,.5)}50%{opacity:.55; box-shadow:0 0 0 4px rgba(31,165,99,0)}}
.float-chip{position:absolute; z-index:4; background:#fff; border:1px solid var(--line); border-radius:11px; padding:9px 13px; box-shadow:var(--sh-md); display:flex; align-items:center; gap:9px; font-size:12.5px; font-weight:600; color:var(--tx); animation:floaty 6s ease-in-out infinite}
.float-chip svg{width:16px; height:16px; stroke:var(--blue-600)}
.float-chip .mini-dot{width:6px;height:6px;border-radius:50%;background:var(--green)}
.fc1{top:-22px; left:-30px; animation-delay:.4s}
.fc2{bottom:34px; left:-54px; animation-delay:1.4s}
.fc3{bottom:64px; right:-46px; animation-delay:.9s}
.problem-sec{border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:linear-gradient(180deg,#fff,#f8fbff); position:relative; overflow:hidden}
.problem-sec::after{content:"";position:absolute;width:520px;height:520px;right:-240px;top:-260px;border-radius:50%;background:radial-gradient(circle,rgba(52,170,223,.11),transparent 70%);pointer-events:none}
.problem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px;position:relative;z-index:1}
.problem-card{background:#fff;border:1px solid var(--line);border-radius:var(--r-lg);padding:28px;box-shadow:var(--sh-sm);position:relative;overflow:hidden}
.problem-num{font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:var(--blue-600);margin-bottom:18px}
.problem-card h3{font-size:22px;margin-bottom:10px}
.problem-card p{color:var(--tx-2);font-size:14.5px;line-height:1.58}
.op-journey{background:linear-gradient(180deg,#fff,#fafcff);border-radius:var(--r-xl);box-shadow:var(--sh-md);position:relative;overflow:hidden}
.op-journey::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(17,136,205,.065) 1px,transparent 0);background-size:24px 24px;opacity:.52;pointer-events:none}
.op-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;align-items:stretch;position:relative;z-index:2;padding:32px 18px 34px;margin:0}
.op-step{position:relative;list-style:none;padding:0 22px;min-width:0}
.op-arrow{position:absolute;right:-9px;top:8px;width:18px;height:18px;stroke:var(--blue-600);stroke-width:1.8;z-index:3}
.op-num{width:32px;height:32px;border-radius:50%;background:var(--sky);color:var(--blue-600);display:grid;place-items:center;font-family:var(--mono);font-size:10.5px;font-weight:600;margin-bottom:17px}
.op-step h3{font-size:20px;margin-bottom:9px}
.op-step p{font-size:14.5px;line-height:1.58;color:var(--tx-2)}
.op-principles{display:flex;justify-content:center;gap:24px 34px;margin-top:26px;flex-wrap:wrap}
.op-principle{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--tx-2)}
.op-principle svg{width:14px;height:14px;stroke:var(--green);stroke-width:2.2}
.bento{display:grid; grid-template-columns:repeat(6,1fr); gap:18px; margin-top:48px}
.card{background:#fff; border:1px solid var(--line); border-radius:var(--r-lg); box-shadow:var(--sh-sm); overflow:hidden; position:relative; transition:transform .25s cubic-bezier(.2,.7,.3,1), box-shadow .25s, border-color .25s}
.card:hover{transform:translateY(-5px); box-shadow:var(--sh-md); border-color:var(--line-2)}
.card-pad{padding:24px}
.cap-ic{width:42px; height:42px; border-radius:11px; background:var(--sky); display:grid; place-items:center; margin-bottom:16px}
.cap-ic svg{width:21px; height:21px; stroke:var(--blue-600)}
.cap-title{font-family:var(--serif); font-weight:600; font-size:19px; color:var(--tx); margin-bottom:7px; letter-spacing:-.01em}
.cap-desc{font-size:14px; color:var(--tx-2); line-height:1.5}
.sp3{grid-column:span 3}.sp2{grid-column:span 2}.sp4{grid-column:span 4}.sp6{grid-column:span 6}
.cap-flex{display:flex; gap:0; height:100%}
.cap-text{padding:24px; flex:1; min-width:0}
.cap-visual{padding:22px 22px 0; background:linear-gradient(180deg,#f7faff,#fff); border-left:1px solid var(--line); width:48%; position:relative; overflow:hidden}
.mini-chat{display:flex; flex-direction:column; gap:9px}
.mini-msg{font-family:var(--serif); font-size:13px; color:var(--tx); background:#fff; border:1px solid var(--line); border-radius:10px; padding:9px 11px; box-shadow:var(--sh-xs)}
.mini-msg.u{background:var(--sky); border-color:#C0E3F5; align-self:flex-end; font-family:var(--sans); font-weight:500; font-size:12.5px}
.mini-cite{display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); font-size:9.5px; color:var(--blue-600); background:var(--sky); padding:2px 6px; border-radius:5px; margin-top:6px; letter-spacing:.04em}
.steps{position:relative}
.step{display:flex; gap:12px; padding-bottom:16px; position:relative}
.step:last-child{padding-bottom:0}
.step::before{content:""; position:absolute; left:13px; top:28px; bottom:-2px; width:1.5px; background:var(--line-2)}
.step:last-child::before{display:none}
.step-num{width:27px; height:27px; border-radius:50%; background:var(--ink); color:#fff; display:grid; place-items:center; font-size:12px; font-weight:600; font-family:var(--sans); flex:none; z-index:2}
.step-num.done{background:var(--green)}
.step-info b{font-size:13.5px; font-weight:600; color:var(--tx); display:flex; align-items:center; gap:8px}
.step-info .stag{font-family:var(--mono); font-size:9px; letter-spacing:.08em; color:var(--blue-600); text-transform:uppercase; background:var(--sky); padding:2px 6px; border-radius:5px}
.step-info .stag.dec{color:var(--violet); background:var(--violet-bg)}
.step-info small{font-size:11.5px; color:var(--slate); display:block; margin-top:2px}
.pack{display:flex; align-items:center; justify-content:space-between; padding:11px 13px; border:1px solid var(--line); border-radius:11px; background:#fff; margin-bottom:9px; box-shadow:var(--sh-xs)}
.pack-l{display:flex; align-items:center; gap:10px}
.pack-l .pic{width:28px; height:28px; border-radius:8px; background:var(--mist); display:grid; place-items:center; border:1px solid var(--line)}
.pack-l .pic svg{width:15px;height:15px;stroke:var(--blue-600)}
.pack-l b{font-size:13px; font-weight:600; color:var(--tx)}
.pack-l small{font-size:10.5px; color:var(--slate-2); display:block; font-family:var(--mono)}
.sw{width:34px; height:20px; border-radius:999px; background:var(--blue); position:relative; flex:none; transition:.2s}
.sw.off{background:#d6deea}
.sw::after{content:""; position:absolute; width:15px; height:15px; border-radius:50%; background:#fff; top:2.5px; right:2.5px; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:.2s}
.sw.off::after{right:auto; left:2.5px}
.log{font-family:var(--mono); font-size:11px; line-height:1.7; height:148px; overflow:hidden; position:relative; -webkit-mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent); mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)}
.log-scroll{animation:logscroll 14s linear infinite}
.log-line{display:flex; gap:9px; padding:3px 0; color:var(--tx-2)}
.log-line .ts{color:var(--slate-2); flex:none}
.log-line .ok{color:var(--green)}
.log-line .bl{color:var(--blue-600)}
@keyframes logscroll{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
.ny{display:flex; flex-direction:column; gap:10px}
.ny-card{border:1px solid var(--line); border-radius:11px; padding:12px 13px; background:#fff; box-shadow:var(--sh-xs)}
.ny-top{display:flex; justify-content:space-between; align-items:baseline}
.ny-card b{font-size:13px; font-weight:600; color:var(--tx)}
.ny-card .ago{font-size:10px; color:var(--slate-2); font-family:var(--mono)}
.ny-card small{font-size:11px; color:var(--slate); display:block; margin:2px 0 9px}
.ny-bot{display:flex; align-items:center; justify-content:space-between}
.ny-act{font-size:11.5px; font-weight:600; color:var(--tx); border:1px solid var(--line-2); border-radius:8px; padding:5px 10px; display:inline-flex; gap:5px; align-items:center}
.ny-act svg{width:12px;height:12px}
.ny-act.blue{background:var(--blue); color:#fff; border-color:var(--blue)}
.report-vis{display:flex; flex-direction:column; gap:10px; align-items:center; justify-content:center; padding:6px 0 14px}
.doc-card{width:120px; background:#fff; border:1px solid var(--line); border-radius:10px; padding:13px; box-shadow:var(--sh-sm); position:relative}
.doc-card .dh{height:7px;width:60%;background:var(--ink);border-radius:3px;margin-bottom:8px}
.doc-card .dl{height:5px;background:#e7ecf4;border-radius:3px;margin-bottom:5px}
.doc-card .dl.s{width:80%}.doc-card .dl.m{width:95%}
.doc-badge{position:absolute; top:-8px; right:-8px; background:var(--green); color:#fff; font-size:9px; font-weight:700; font-family:var(--mono); padding:3px 7px; border-radius:6px; box-shadow:var(--sh-sm)}
.doc-flow{display:flex; align-items:center; gap:8px; font-size:11px; font-family:var(--mono); color:var(--slate)}
.doc-flow svg{width:13px;height:13px;stroke:var(--blue-600)}
.alert-card{background:#fff; border:1px solid var(--line); border-radius:10px; padding:12px 13px; box-shadow:var(--sh-xs); display:flex; gap:11px}
.alert-card .ai{width:30px;height:30px;border-radius:8px;background:var(--amber-bg);display:grid;place-items:center;flex:none}
.alert-card .ai svg{width:16px;height:16px;stroke:var(--amber)}
.alert-card b{font-size:12.5px;color:var(--tx);font-weight:600}
.alert-card small{font-size:11px;color:var(--slate);display:block;margin-top:2px;line-height:1.45}
.vs-grid{display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:46px}
.vs-card{background:#fff; border:1px solid var(--line); border-radius:var(--r-xl); padding:32px; box-shadow:0 18px 44px -28px rgba(14,30,78,.30), 0 3px 10px -5px rgba(14,30,78,.14); position:relative; overflow:hidden; transition:transform .25s cubic-bezier(.2,.7,.3,1), box-shadow .25s, border-color .25s}
.vs-card:hover{transform:translateY(-4px); border-color:var(--line-2); box-shadow:0 26px 58px -30px rgba(14,30,78,.36), 0 7px 18px -10px rgba(14,30,78,.18)}
.vs-card::after{content:""; position:absolute; top:-86px; right:-82px; width:270px; height:270px; background:radial-gradient(circle, rgba(52,170,223,.10) 0%, rgba(124,197,232,.075) 38%, rgba(224,244,252,.055) 58%, rgba(255,255,255,0) 76%); pointer-events:none; z-index:0}
.vs-card > *{position:relative; z-index:1}
.vs-eyebrow{font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--slate)}
.vs-card h3{font-size:25px; margin:10px 0 22px; font-weight:600}
.vs-list{display:flex; flex-direction:column; gap:15px; padding:0}
.vs-list li{list-style:none; display:flex; gap:12px; align-items:flex-start}
.vs-check{width:24px;height:24px;border-radius:7px;background:var(--green-bg);display:grid;place-items:center;flex:none;margin-top:1px}
.vs-check svg{width:14px;height:14px;stroke:var(--green);stroke-width:2.3}
.vs-list b{font-weight:600; color:var(--tx); font-size:15px}
.vs-list span{color:var(--tx-2); font-size:14px}
.dark-sec{background:radial-gradient(120% 130% at 80% -10%, #1a2c4e 0%, #0c1526 55%); color:#fff; position:relative; overflow:hidden}
.dark-sec .eyebrow{color:var(--blue-300)}
.dark-sec .eyebrow::before{background:linear-gradient(90deg,var(--blue-300),transparent)}
.dark-sec h2{color:#fff}
.dark-grid-bg{position:absolute; inset:0; background-image:radial-gradient(circle at 1px 1px, rgba(134,171,255,.10) 1px, transparent 0); background-size:32px 32px; opacity:.5; -webkit-mask-image:radial-gradient(100% 80% at 60% 0%,#000,transparent 70%); mask-image:radial-gradient(100% 80% at 60% 0%,#000,transparent 70%)}
.trust-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:46px}
.trust-card{background:rgba(255,255,255,.035); border:1px solid rgba(124,197,232,.16); border-radius:var(--r-lg); padding:26px; transition:.25s; backdrop-filter:blur(4px)}
.trust-card:hover{background:rgba(255,255,255,.07); border-color:rgba(134,171,255,.32); transform:translateY(-4px)}
.trust-ic{width:46px; height:46px; border-radius:12px; background:rgba(52,170,223,.16); display:grid; place-items:center; margin-bottom:18px}
.trust-ic svg{width:23px; height:23px; stroke:#86abff}
.trust-card h4{color:#fff; font-size:18px; font-weight:600; margin-bottom:6px}
.trust-card p{color:#9fb0cc; font-size:13.5px; line-height:1.5}
.trust-card .badge{font-family:var(--mono); font-size:10px; letter-spacing:.08em; color:#86abff; margin-top:13px; display:inline-block; border:1px solid rgba(134,171,255,.25); padding:3px 8px; border-radius:6px}
.lines{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:46px}
.line-card{background:linear-gradient(155deg,#fff 58%,#f6fbfe); border:0; border-radius:var(--r-xl); padding:28px; box-shadow:0 18px 44px -32px rgba(14,30,78,.35),0 2px 8px rgba(14,30,78,.06); transition:.25s; position:relative; overflow:hidden; display:flex; flex-direction:column}
.line-card:hover{box-shadow:0 24px 54px -34px rgba(14,30,78,.42),0 4px 12px rgba(14,30,78,.08); transform:translateY(-3px)}
.line-glow{position:absolute; width:200px; height:200px; border-radius:50%; right:-60px; top:-60px; background:radial-gradient(circle,rgba(52,170,223,.12),transparent 70%)}
.line-ic{width:52px; height:52px; border-radius:14px; background:linear-gradient(150deg,#34AADF,#1188CD 60%,#0A5A8E); display:grid; place-items:center; margin-bottom:20px; box-shadow:0 10px 22px -10px rgba(17,136,205,.6)}
.line-ic svg{width:26px; height:26px; stroke:#fff}
.line-card h3{font-size:21px; font-weight:600; line-height:1.22; margin:0}
.eco-head{display:flex; align-items:center; gap:14px; margin-bottom:24px}
.eco-head .line-ic{margin:0; width:46px; height:46px; border-radius:12px; flex:none}
.eco-head .line-ic svg{width:23px; height:23px}
.eco-block{margin:0 0 20px}
.eco-label{display:flex;align-items:center;gap:5px;font-family:var(--mono);font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--blue-600);margin-bottom:10px}
.eco-workflows{display:flex;flex-wrap:wrap;gap:6px}
.eco-workflow{font-size:12.5px;color:var(--tx-2);background:var(--mist);border:1px solid var(--line);padding:5px 11px;border-radius:8px;line-height:1.3}
.eco-sources{margin-bottom:22px}
.eco-tags{display:flex;flex-wrap:wrap;gap:6px}
.eco-tag{font-family:var(--mono);font-size:10.5px;color:var(--blue-700);background:var(--sky-2);border:1px solid #D7ECF7;padding:4px 9px;border-radius:6px}
.eco-result{margin-top:auto;background:linear-gradient(150deg,#F0F8FD,#E6F3FB);border:1px solid #D7ECF7;border-radius:13px;padding:14px 16px}
.eco-result .eco-label{color:var(--blue-700);margin-bottom:6px}
.eco-result .eco-label svg{width:12px;height:12px;stroke:var(--blue-600);stroke-width:2.2}
.eco-output{font-size:13px;line-height:1.5;color:var(--ink-2);font-weight:500;margin:0}
.ecosystem-note{display:flex;align-items:center;justify-content:center;gap:10px;width:fit-content;text-align:left;font-size:13.5px;line-height:1.45;color:#fff;margin:24px auto 0;max-width:900px;padding:13px 18px;border-radius:11px;background:linear-gradient(120deg,#16243f,#22386a);box-shadow:0 14px 28px -20px rgba(14,30,78,.72)}
.ecosystem-note svg{width:18px;height:18px;flex:none;stroke:var(--blue-300)}
.tech-grid{display:grid; grid-template-columns:1.1fr 1fr; gap:54px; align-items:center}
.spec{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-lg); overflow:hidden}
.spec-item{background:#fff; padding:20px 22px}
.spec-label{font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--slate); margin-bottom:9px}
.spec-val{font-family:var(--serif); font-size:18px; font-weight:600; color:var(--tx); line-height:1.25}
.spec-val small{font-family:var(--mono); font-size:12px; color:var(--tx-2); font-weight:400; display:block; margin-top:3px; letter-spacing:0}
.tech-side h3{font-size:clamp(26px,3.2vw,38px); margin-bottom:16px}
.tech-side p{color:var(--tx-2); font-size:16px; line-height:1.6; margin-bottom:14px}
.affil{display:flex; gap:10px; flex-wrap:wrap; margin-top:14px}
.affil-chip{display:inline-flex; align-items:center; gap:8px; padding:9px 14px; border:1px solid var(--line-2); border-radius:11px; background:#fff; box-shadow:var(--sh-xs); font-weight:600; font-size:13px; color:var(--tx)}
.affil-chip .ac-ic{width:22px;height:22px;border-radius:6px;display:grid;place-items:center}
.affil-chip .ac-ic svg{width:13px;height:13px;stroke:#fff}
.cta-sec{position:relative; overflow:hidden; background:radial-gradient(120% 140% at 50% -20%, #1a2c4e 0%, #0c1526 60%); color:#fff; text-align:center; padding:clamp(80px,10vw,140px) 0}
#ctaCanvas{position:absolute; inset:0; width:100%; height:100%; opacity:.6}
.cta-glow{position:absolute; width:600px; height:400px; left:50%; top:0; transform:translateX(-50%); background:radial-gradient(circle,rgba(52,170,223,.25),transparent 65%); pointer-events:none}
.cta-inner{position:relative; z-index:2; max-width:680px; margin:0 auto}
.cta-inner h2{color:#fff; font-size:clamp(34px,5vw,58px); line-height:1.04; font-weight:600}
.cta-inner h2 .em{font-style:italic; color:var(--blue-300)}
.cta-inner p{color:#aebfde; font-size:clamp(16px,1.7vw,19px); margin:22px auto 0; max-width:500px}
.cta-cta{display:flex; gap:13px; justify-content:center; margin-top:36px; flex-wrap:wrap}
.cta-note{font-family:var(--mono); font-size:11.5px; letter-spacing:.07em; color:#7e90b4; margin-top:26px; text-transform:uppercase}
.footer{background:var(--ink); color:#fff; padding:74px 0 34px}
.foot-grid{display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,.1)}
.foot-brand .brand-name{color:#fff}
.foot-tag{color:#9fb0cc; font-size:14.5px; line-height:1.55; margin-top:18px; max-width:300px; font-family:var(--serif)}
.foot-col h5{font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:#86abff; margin:0 0 18px; font-weight:500}
.foot-col a{display:block; color:#aebccf; font-size:14px; margin-bottom:11px; transition:.15s}
.foot-col a:hover{color:#fff}
.foot-contact-button{display:block;border:0;background:none;padding:0;color:#aebccf;font:inherit;font-size:14px;margin:0 0 11px;cursor:pointer;transition:.15s}
.foot-contact-button:hover{color:#fff}
.foot-bot{display:flex; justify-content:space-between; align-items:center; padding-top:26px; flex-wrap:wrap; gap:14px}
.foot-bot .cp{color:#7e90b4; font-size:13px; font-family:var(--mono); letter-spacing:.02em}
.foot-bot .soc{display:flex; gap:10px}
.foot-bot .soc a{width:36px;height:36px;border:1px solid rgba(255,255,255,.14);border-radius:9px;display:grid;place-items:center;transition:.2s}
.foot-bot .soc a:hover{background:rgba(255,255,255,.08); border-color:rgba(134,171,255,.4)}
.foot-bot .soc svg{width:17px;height:17px;stroke:#aebccf}
.reveal{opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1)}
.reveal.in{opacity:1; transform:none}
.reveal.d1{transition-delay:.08s}.reveal.d2{transition-delay:.16s}.reveal.d3{transition-delay:.24s}.reveal.d4{transition-delay:.32s}.reveal.d5{transition-delay:.40s}
@media (max-width:1080px){
  .bento{grid-template-columns:repeat(4,1fr)}
  .sp3{grid-column:span 4}.sp2{grid-column:span 2}.sp4{grid-column:span 4}
  .trust-grid{grid-template-columns:repeat(2,1fr)}
  .lines{grid-template-columns:repeat(2,1fr)}
  .line-card:last-child{grid-column:1/-1}
  .op-flow{grid-template-columns:repeat(2,minmax(0,1fr))}
  .op-step{padding:18px 24px}
  .op-arrow{display:none}
  .cap-flex{flex-direction:column}.cap-visual{width:100%; border-left:none; border-top:1px solid var(--line)}
}
@media (max-width:880px){
  .nav-links{display:none}
  .nav-cta .signin{display:none}
  .hero-grid{grid-template-columns:1fr; gap:48px}
  .hero{padding-top:120px}
  .hero-visual{max-width:560px; margin:0 auto}
  .tech-grid{grid-template-columns:1fr; gap:40px}
  .problem-grid,.vs-grid,.lines{grid-template-columns:1fr}
  .line-card:last-child{grid-column:auto}
  .foot-grid{grid-template-columns:1fr 1fr; gap:32px}
  .op-flow{grid-template-columns:1fr;gap:28px;padding:28px 22px 30px}
  .op-step{padding:0}
}
@media (max-width:560px){
  body{font-size:15.5px}
  .nav-inner{padding:12px 20px}
  .nav.scrolled .nav-inner{padding:10px 20px}
  .nav-cta{display:none}
  .wrap{padding:0 20px}
  .hero{padding-top:112px; padding-bottom:60px}
  .hero-grid{gap:34px}
  .hero-copy,.hero-visual{min-width:0; width:100%}
  .hero-eyebrow{font-size:10px; letter-spacing:.12em; gap:8px; line-height:1.5}
  .hero-eyebrow::before{width:16px}
  .hero h1{font-size:32px; line-height:1.06; overflow-wrap:normal}
  .hero-sub{max-width:100%; font-size:16px; line-height:1.55}
  .hero-cta{flex-direction:column; gap:10px}
  .hero-cta .btn{width:100%; justify-content:center; white-space:normal; text-align:center}
  .hero-trust{gap:9px 12px; font-size:10.5px; letter-spacing:.05em; line-height:1.5}
  .bento{grid-template-columns:1fr 1fr; gap:14px}
  .sp3,.sp2,.sp4,.sp6{grid-column:span 2}
  .trust-grid{grid-template-columns:1fr}
  .app-window{width:100%; max-width:100%}
  .app-top{align-items:flex-start; flex-direction:column; gap:10px}
  .app-status{flex-wrap:wrap}
  .app-body{grid-template-columns:1fr}.app-rail{display:none}
  .app-chat{border-right:none; min-height:auto; padding:18px 16px}
  .msg-text{font-size:14px}
  .src-chips{gap:5px}
  .src-chip{max-width:100%; white-space:normal}
  .float-chip{display:none}
  .problem-card,.line-card{padding:24px}
  .op-flow{padding:24px 20px 26px}
  .op-principles{justify-content:flex-start;gap:12px 22px}
  .contact-overlay{padding:10px;align-items:end}
  .contact-modal{max-height:calc(100vh - 20px);border-radius:22px 22px 14px 14px;padding:30px 22px 24px}
  .contact-row{grid-template-columns:1fr}
  .contact-actions{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important; animation-iteration-count:1!important}
  .reveal{opacity:1; transform:none}
  .app-window,.float-chip{animation:none}
}
`;

const LinktonMark = ({ color = "#0C1526", size = 36 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="248 124 540 406"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* dot */}
    <path fill={color} d="M367.696045,186.416595 C364.547058,213.422363 341.210968,233.734680 314.368225,233.200577 C287.450104,232.664993 264.918854,211.252533 262.839233,184.230255 C260.647095,155.745712 279.686523,132.291641 309.510315,128.176361 C333.227020,124.903786 359.546570,139.577850 366.585236,167.669586 C368.083466,173.649033 368.709991,179.788589 367.696045,186.416595 z" />
    {/* arch / right form */}
    <path fill={color} d="M570.187988,133.884644 C594.844421,130.618668 618.941345,131.653519 642.504578,137.887619 C696.386902,152.143127 737.669373,183.171524 764.591858,232.327240 C779.700867,259.913574 786.179199,289.729889 786.125732,321.124573 C786.013428,387.119293 786.087830,453.114349 786.078430,519.109253 C786.077393,526.299377 786.055420,526.316284 778.955139,526.317078 C748.124084,526.320618 717.293030,526.321960 686.461975,526.303345 C679.885254,526.299377 679.787292,526.165649 679.786865,519.554077 C679.782166,454.725586 679.111267,389.887756 680.018921,325.072052 C680.591003,284.221863 645.393372,239.988846 595.891113,238.140472 C551.873962,236.496918 513.516296,265.323700 502.980316,307.944092 C501.448212,314.141754 500.959717,320.436584 501.270966,326.776703 C501.456146,330.548859 500.159851,332.213104 496.172791,332.201569 C465.175415,332.112091 434.177338,332.085480 403.180298,332.221222 C398.195404,332.243073 398.041290,329.415161 397.997589,325.769257 C397.518646,285.784973 409.397919,249.630722 432.334564,217.149872 C465.414764,170.304581 510.774719,143.203674 567.312317,134.511993 C568.133789,134.385712 568.937622,134.145020 570.187988,133.884644 z" />
    {/* left bar + bottom arc */}
    <path fill={color} d="M633.933105,408.764954 C607.868469,469.005585 564.688721,510.061523 500.401306,524.328430 C432.988434,539.288940 372.130585,522.986755 320.154297,477.013153 C282.042511,443.302917 261.485443,400.259338 255.529495,349.961578 C252.382889,323.388733 253.966141,296.716736 253.681580,270.086517 C253.560486,258.753693 251.951782,259.759705 264.102417,259.754974 C294.432220,259.743195 324.762054,259.753662 355.091858,259.768036 C361.628387,259.771149 361.904053,259.981140 361.948700,266.452362 C362.096954,287.947876 361.199158,309.503052 362.492950,330.927216 C365.056915,373.384613 395.602570,411.038300 438.356567,419.708008 C483.499084,428.862030 527.653687,404.309052 544.664246,361.256897 C548.076538,352.620758 549.361511,343.594879 550.329651,334.498016 C550.648682,331.499756 551.803772,330.603241 554.707031,330.609253 C584.036865,330.669983 613.367126,330.674652 642.696655,330.545258 C646.615723,330.527985 647.311340,332.250702 647.401794,335.695404 C648.063843,360.884155 642.932495,384.980164 633.933105,408.764954 z" />
  </svg>
);

const LinktonLogo = () => (
  <span style={{ display: "inline-flex", alignItems: "center", flex: "none" }}>
    <LinktonMark color="#1188CD" size={34} />
  </span>
);

const LinktonLogoMini = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 34, height: 34, borderRadius: 9,
    background: "linear-gradient(150deg,#34AADF,#1188CD 60%,#0A5A8E)",
    flex: "none", boxShadow: "0 4px 10px -4px rgba(17,136,205,.6)"
  }}>
    <LinktonMark color="#ffffff" size={22} />
  </span>
);

const executionProblems = [
  {
    title: "Operations span too many systems",
    body: "Teams reconstruct the operating picture across records, files, models, and status updates before work can move forward."
  },
  {
    title: "Evidence moves by hand",
    body: "Information is repeatedly reconciled, reformatted, and reviewed before another team or organization can use it."
  },
  {
    title: "Know-how does not compound",
    body: "Procedures, corrections, and successful operating patterns remain trapped within individual teams."
  }
];

const ecosystems = [
  {
    title: "Pharma and biotech",
    icon: "#i-flask",
    workflows: ["Batch release", "Deviations & CAPA", "Stability & regulatory reporting"],
    systems: ["LIMS", "QMS", "ELN", "Data platforms", "Approved procedures"],
    output: "Evidence-backed quality decisions with a complete, reviewable trail."
  },
  {
    title: "Regulatory ecosystem",
    icon: "#i-doc",
    workflows: ["Evidence assembly", "Cross-document verification", "Response drafting & source-history review"],
    systems: ["Submission records", "Document repositories", "Evidence archives", "Review procedures"],
    output: "Review-ready evidence packages with expert approval and traceability."
  },
  {
    title: "Clinical operations and CROs",
    icon: "#i-route",
    workflows: ["Site & recruitment reconciliation", "Operational reporting", "Sponsor deliverables"],
    systems: ["CTMS", "EDC", "eTMF", "Trial records", "Sponsor requirements"],
    output: "Repeatable operational reporting and correctly structured sponsor deliverables."
  }
];

const operationSteps = [
  {
    title: "Connect",
    body: "Bring together the systems, files, and procedures needed for the work."
  },
  {
    title: "Check",
    body: "Build a clear picture and flag anything missing or conflicting."
  },
  {
    title: "Run",
    body: "Move the workflow forward with experts approving key decisions."
  },
  {
    title: "Reuse",
    body: "Keep the approved result and evidence so future work starts with trusted context."
  }
];

const buildContactDraft = (form: HTMLFormElement) => {
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const company = String(data.get("company") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = company ? `Get in touch request from ${company}` : `Get in touch request from ${name}`;
  const body = [
    "Hi LINK team,",
    "",
    "I'd like to get in touch.",
    "",
    `Name: ${name}`,
    `Work email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    "What I'd like to discuss:",
    message
  ].join("\n");
  return { subject, body };
};

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const openContact = () => {
    setCopyStatus("idle");
    setContactOpen(true);
  };

  useEffect(() => {
    if (!contactOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => document.getElementById("contact-name")?.focus({ preventScroll: true }), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const modal = document.querySelector(".contact-modal");
      const focusable = modal
        ? Array.from(modal.querySelectorAll<HTMLElement>("button, input, textarea, [href]"))
            .filter((element) => !element.hasAttribute("disabled"))
        : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [contactOpen]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { subject, body } = buildContactDraft(event.currentTarget);
    setContactOpen(false);
    window.location.href = `mailto:info@braingnosis.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyContact = async (event: ReactMouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const { subject, body } = buildContactDraft(form);
    const draft = `To: info@braingnosis.ai\nSubject: ${subject}\n\n${body}`;
    let copied = false;
    try {
      await navigator.clipboard.writeText(draft);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = draft;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }
    setCopyStatus(copied ? "copied" : "failed");
  };

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    function initGraph(canvas: HTMLCanvasElement | null, opts?: Record<string, unknown>) {
      if (!canvas) return () => {};
      const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
      const ctx = canvas.getContext("2d")!;
      let W = 0, H = 0, DPR = 1;
      interface Node { x: number; y: number; vx: number; vy: number; r: number }
      interface Pulse { e: [number, number]; t: number; sp: number }
      let nodes: Node[] = [], edges: [number, number][] = [], pulses: Pulse[] = [], raf = 0;
      const cfg = Object.assign({ count: 26, link: 150, nodeColor: "rgba(17,136,205,.55)", lineColor: "rgba(17,136,205,.16)", pulseColor: "#1188CD", dark: false }, opts || {});
      if (cfg.dark) { cfg.nodeColor = "rgba(124,197,232,.7)"; cfg.lineColor = "rgba(124,197,232,.16)"; cfg.pulseColor = "#7CC5E8"; }
      function size() {
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = canvas!.clientWidth; H = canvas!.clientHeight;
        canvas!.width = W * DPR; canvas!.height = H * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
      function build() {
        nodes = [];
        const n = Math.max(10, Math.round((cfg.count as number) * (W * H) / (1280 * 720)));
        for (let i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.6 + 1.2 });
        edges = [];
        for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.hypot(dx, dy);
          if (d < (cfg.link as number)) edges.push([i, j]);
        }
      }
      function spawn() { if (edges.length && pulses.length < 14) { const e = edges[(Math.random() * edges.length) | 0]; pulses.push({ e, t: Math.random() * .2, sp: .004 + Math.random() * .006 }); } }
      function frame() {
        ctx.clearRect(0, 0, W, H);
        for (const nd of nodes) { nd.x += nd.vx; nd.y += nd.vy; if (nd.x < 0 || nd.x > W) nd.vx *= -1; if (nd.y < 0 || nd.y > H) nd.vy *= -1; }
        ctx.strokeStyle = cfg.lineColor as string; ctx.lineWidth = 1;
        for (const [i, j] of edges) {
          const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < (cfg.link as number)) { ctx.globalAlpha = 1 - d / (cfg.link as number); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        ctx.globalAlpha = 1;
        for (const nd of nodes) { ctx.fillStyle = cfg.nodeColor as string; ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, 7); ctx.fill(); }
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k]; p.t += p.sp;
          if (p.t >= 1) { pulses.splice(k, 1); continue; }
          const a = nodes[p.e[0]], b = nodes[p.e[1]];
          if (!a || !b) { pulses.splice(k, 1); continue; }
          const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
          ctx.fillStyle = cfg.pulseColor as string; ctx.globalAlpha = Math.sin(p.t * Math.PI);
          ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        }
        if (Math.random() < .08) spawn();
        raf = requestAnimationFrame(frame);
      }
      function start() { size(); build(); cancelAnimationFrame(raf); if (!reduce) frame(); else { frame(); cancelAnimationFrame(raf); } }
      let to: ReturnType<typeof setTimeout>;
      const onResize = () => { clearTimeout(to); to = setTimeout(start, 200); };
      window.addEventListener("resize", onResize);
      start();
      return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
    }
    const c1 = initGraph(document.getElementById("heroCanvas") as HTMLCanvasElement, { count: 30, link: 140 });
    const c2 = initGraph(document.getElementById("ctaCanvas") as HTMLCanvasElement, { count: 30, link: 150, dark: true });
    return () => { c1(); c2(); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M18.5 4.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7L16 7.4l1.7-.6z" /></symbol>
        <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.8-5.5A8 8 0 1 1 21 12z" /></symbol>
        <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></symbol>
        <symbol id="i-nodes" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.7 7.7l3 8M16.3 7.7l-3 8M8 6h8" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /></symbol>
        <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></symbol>
        <symbol id="i-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3.5L14 9V3" /><path d="M7.5 14h9" /></symbol>
        <symbol id="i-micro" viewBox="0 0 24 24"><path d="M6 18h12M8 18l-2-3M11 6l3 5-4 2-3-5z" /><path d="M13 4l2 1M5 21h9a6 6 0 0 0 1-12" /></symbol>
        <symbol id="i-chip" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" /></symbol>
        <symbol id="i-db" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" /></symbol>
        <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M19 17H6a2 2 0 0 0-2 2" /></symbol>
        <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></symbol>
        <symbol id="i-vial" viewBox="0 0 24 24"><path d="M8 3h8M9 3v14a3 3 0 0 0 6 0V3" /><path d="M9 9h6" /></symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24"><path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z" /></symbol>
        <symbol id="i-route" viewBox="0 0 24 24"><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M6 16.5V9a3 3 0 0 1 3-3h6" /></symbol>
        <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.5" /></symbol>
        <symbol id="i-pulse" viewBox="0 0 24 24"><path d="M2 12h4l2-6 4 12 2-6h8" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 5 8-5" /></symbol>
        <symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.2a3.2 3.2 0 0 1 0 6M21 20c0-2.3-1.3-4.3-3.2-5.3" /></symbol>
        <symbol id="i-cpu" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M10 10h4v4h-4z" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></symbol>
        <symbol id="i-play" viewBox="0 0 24 24"><path d="M7 5l11 7-11 7z" /></symbol>
        <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.6-4-9s1.5-6.5 4-9z" /></symbol>
        <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></symbol>
        <symbol id="i-in" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" /></symbol>
      </svg>

      {/* NAV */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#top" className="brand">
            <LinktonLogo />
            <span className="brand-name">Linkton</span>
          </a>
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#how">How it works</a>
            <a href="#ecosystems">Ecosystems</a>
            <a href="#trust">Trust</a>
            <a href="#tech">Technology</a>
          </div>
          <div className="nav-cta">
            <button type="button" className="btn btn-primary" onClick={openContact}>Get in touch</button>
          </div>
        </div>
      </nav>

      <span id="top" />

      {contactOpen && (
        <div
          className="contact-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setContactOpen(false);
          }}
        >
          <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" aria-describedby="contact-description">
            <button type="button" className="contact-close" onClick={() => setContactOpen(false)} aria-label="Close contact form">
              <svg aria-hidden="true"><use href="#i-x" /></svg>
            </button>
            <div className="contact-kicker">Get in touch</div>
            <h2 id="contact-title">Tell us what you want to improve.</h2>
            <p className="contact-intro" id="contact-description">Share a little context and we&apos;ll prepare an email you can review before sending.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" autoFocus required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Work email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-company">Company <span>optional</span></label>
                <input id="contact-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">What would you like to improve?</label>
                <textarea id="contact-message" name="message" placeholder="Tell us about the workflow or problem you want to discuss." required />
              </div>
              <div className="contact-actions">
                <button type="submit" className="btn btn-primary btn-lg">Open email draft <svg className="ic" aria-hidden="true"><use href="#i-mail" /></svg></button>
                <button type="button" className="btn btn-ghost btn-lg" onClick={handleCopyContact}>{copyStatus === "copied" ? "Copied" : "Copy email and message"}<svg className="ic" aria-hidden="true"><use href={copyStatus === "copied" ? "#i-check" : "#i-doc"} /></svg></button>
              </div>
              <p className={`contact-copy-status${copyStatus === "failed" ? " failed" : ""}`} aria-live="polite">
                {copyStatus === "copied" ? "Email details copied to your clipboard." : copyStatus === "failed" ? "Copying was blocked. Use the email address below." : ""}
              </p>
              <p className="contact-note">This opens your default email app. Nothing is sent automatically. You can also email <span className="contact-email">info@braingnosis.ai</span>.</p>
            </form>
          </section>
        </div>
      )}

      {/* HERO */}
      <header className="hero">
        <div className="hero-bg">
          <div className="hero-grid-lines" />
          <div className="hero-glow" />
          <div className="hero-glow two" />
          <canvas id="heroCanvas" />
        </div>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">Built for pharma · regulatory · clinical operations</div>
              <h1>One intelligent platform <span className="em">behind every medicine.</span></h1>
              <p className="hero-sub"><strong className="hero-link">LINK</strong> connects your existing systems, data, documents, and procedures so your teams can run repeatable AI enabled workflows for batch release, regulatory review, and clinical operations. It works inside your environment, keeps experts in control, and makes every result traceable.</p>
              <div className="hero-cta">
                <button type="button" className="btn btn-primary btn-lg" onClick={openContact}>Get in touch <svg className="ic" aria-hidden="true"><use href="#i-mail" /></svg></button>
                <a href="#how" className="btn btn-ghost btn-lg">See how it works</a>
              </div>
              <div className="hero-trust">
                <span><span className="tdot" />Customer-controlled</span>
                <span><span className="tdot" />Deployed with top-10 pharma</span>
                <span><span className="tdot" />Human-reviewed and traceable</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="float-chip fc1"><svg className="ic"><use href="#i-doc" /></svg>Veeva Vault <span className="mini-dot" /></div>
              <div className="float-chip fc2"><svg className="ic"><use href="#i-file" /></svg>Deviation Log <span className="mini-dot" /></div>
              <div className="float-chip fc3"><svg className="ic"><use href="#i-db" /></svg>LIMS <span className="mini-dot" /></div>

              <div className="app-window">
                <div className="app-top">
                  <div className="app-bread"><span>Home</span><span className="sl">›</span><span className="cur">Chat</span></div>
                  <div className="app-status">
                    <span className="pill pill--green"><span className="dot dot--g" />3 sources verified</span>
                    <span className="pill pill--green"><span className="dot dot--g" />Evidence complete</span>
                  </div>
                </div>
                <div className="app-body">
                  <div className="app-chat">
                    <div className="msg msg-user">
                      <div className="bubble">Can we release Batch B-24017? Cross-check QC results, open deviations, and the approved SOP.</div>
                    </div>
                    <div className="msg">
                      <div className="av"><LinktonLogoMini /></div>
                      <div>
                        <div className="msg-name">LINKTON</div>
                        <div className="msg-text">Yes. Every QC result is <span className="hl">within specification</span>, no deviations remain open, and testing followed SOP-QC-104 v7.</div>
                        <div className="src-chips">
                          <span className="src-chip"><svg><use href="#i-db" /></svg>LIMS · Batch B-24017</span>
                          <span className="src-chip"><svg><use href="#i-doc" /></svg>Veeva · SOP-QC-104 v7</span>
                          <span className="src-chip"><svg><use href="#i-file" /></svg>Deviation Log</span>
                        </div>
                      </div>
                    </div>
                    <div className="msg msg-user">
                      <div className="bubble">Show me the complete evidence trail.</div>
                    </div>
                    <div className="msg">
                      <div className="av"><LinktonLogoMini /></div>
                      <div style={{ flex: 1 }}>
                        <div className="msg-name">LINKTON</div>
                        <div className="idx">
                          <div className="idx-row"><span className="l">Compiling evidence trail</span><span className="pc">72%</span></div>
                          <div className="bar"><i /></div>
                          <div className="idx-note">Linking QC, deviations &amp; SOP · traceable</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-rail">
                    <div className="rail-head">
                      <div className="rail-tabs"><span className="rail-tab on">Sources</span><span className="rail-tab">Decisions</span></div>
                    </div>
                    <div className="rail-meta">3 CONNECTED · 0 GAPS</div>
                    <div className="src-row">
                      <div className="src-ic"><svg><use href="#i-doc" /></svg></div>
                      <div className="src-info"><div className="src-name"><span className="dot dot--g pulse-dot" />Veeva Vault</div><div className="src-desc">Regulatory &amp; quality docs</div></div>
                      <div className="src-time">2m</div>
                    </div>
                    <div className="src-row">
                      <div className="src-ic"><svg><use href="#i-db" /></svg></div>
                      <div className="src-info"><div className="src-name"><span className="dot dot--g" />LIMS</div><div className="src-desc">Batch QC &amp; results</div></div>
                      <div className="src-time">4m</div>
                    </div>
                    <div className="src-row">
                      <div className="src-ic"><svg><use href="#i-file" /></svg></div>
                      <div className="src-info"><div className="src-name"><span className="dot dot--g" />Deviation Log</div><div className="src-desc">Quality events</div></div>
                      <div className="src-time">8m</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* EXECUTION GAP */}
      <section className="section problem-sec" id="problem">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">The execution gap</div>
            <h2 className="h2">The problem is not more AI. It is disconnected execution.</h2>
            <p className="lede">Drug-development work remains divided across systems, teams, formats, and handoffs, even when the individual tools are modern.</p>
          </div>
          <div className="problem-grid">
            {executionProblems.map((problem, i) => (
              <article key={problem.title} className={`problem-card reveal d${i + 1}`}>
                <div className="problem-num">0{i + 1} / OPERATIONAL FRICTION</div>
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEMS */}
      <section className="section" id="ecosystems">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Where Linkton operates</div>
            <h2 className="h2">One infrastructure. Three operational ecosystems.</h2>
            <p className="lede">Linkton adapts to the systems, workflows, and expert decisions unique to each operating environment.</p>
          </div>
          <div className="lines">
            {ecosystems.map((ecosystem, i) => (
              <article key={ecosystem.title} className={`line-card reveal d${i + 1}`}>
                <div className="line-glow" />
                <div className="eco-head">
                  <div className="line-ic"><svg><use href={ecosystem.icon} /></svg></div>
                  <h3>{ecosystem.title}</h3>
                </div>
                <div className="eco-block">
                  <div className="eco-label">Workflows</div>
                  <div className="eco-workflows">
                    {ecosystem.workflows.map((workflow) => <span key={workflow} className="eco-workflow">{workflow}</span>)}
                  </div>
                </div>
                <div className="eco-sources">
                  <div className="eco-label">Works across</div>
                  <div className="eco-tags">
                    {ecosystem.systems.map((system) => <span key={system} className="eco-tag">{system}</span>)}
                  </div>
                </div>
                <div className="eco-result">
                  <div className="eco-label"><svg aria-hidden="true"><use href="#i-check" /></svg>Result</div>
                  <p className="eco-output">{ecosystem.output}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="ecosystem-note reveal">
            <svg aria-hidden="true"><use href="#i-layers" /></svg>
            <span>One operational foundation, configured around each organization&apos;s systems, procedures, and expert decision points.</span>
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section--tight" id="how" style={{ background: "var(--mist)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head center reveal" style={{ marginBottom: 42 }}>
            <div className="eyebrow eyebrow--center">How it works</div>
            <h2 className="h2">From scattered information to work your team can act on.</h2>
            <p className="lede">Linkton brings the right information together, checks what is missing, runs the workflow, and keeps experts in charge of the final decision.</p>
          </div>
          <div className="reveal d2">
            <div className="op-journey">
              <ol className="op-flow">
                {operationSteps.map((step, i) => (
                  <li key={step.title} className="op-step">
                    <div className="op-num" aria-hidden="true">0{i + 1}</div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    {i < operationSteps.length - 1 && <svg className="op-arrow" aria-hidden="true"><use href="#i-arrow" /></svg>}
                  </li>
                ))}
              </ol>
            </div>
            <div className="op-principles" aria-label="How Linkton works">
              <span className="op-principle"><svg aria-hidden="true"><use href="#i-check" /></svg>Works with your current systems</span>
              <span className="op-principle"><svg aria-hidden="true"><use href="#i-check" /></svg>Experts approve key decisions</span>
              <span className="op-principle"><svg aria-hidden="true"><use href="#i-check" /></svg>Every result stays traceable</span>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="section" id="platform">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">The platform</div>
            <h2 className="h2">One operational surface for evidence, workflows, and action.</h2>
            <p className="lede">Inspect operational state, launch repeatable work, resolve exceptions, and preserve the evidence behind every outcome.</p>
          </div>

          <div className="bento">
            {/* Conversational operations */}
            <div className="card sp3 reveal">
              <div className="cap-flex">
                <div className="cap-text">
                  <div className="cap-ic"><svg><use href="#i-chat" /></svg></div>
                  <div className="cap-title">Conversational operations</div>
                  <div className="cap-desc">Query operational state, inspect evidence, start workflows, and investigate exceptions from one conversational surface.</div>
                </div>
                <div className="cap-visual">
                  <div className="mini-chat">
                    <div className="mini-msg u">Compare batch yields across Q1 stability runs.</div>
                    <div className="mini-msg">3 lots trending below spec at month 6.<span className="mini-cite"><svg className="ic ic--sm" style={{ width: 10, height: 10 }}><use href="#i-file" /></svg>LIMS · 412 results</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI-enabled workflows */}
            <div className="card sp3 reveal d1">
              <div className="cap-flex">
                <div className="cap-text">
                  <div className="cap-ic"><svg><use href="#i-route" /></svg></div>
                  <div className="cap-title">AI-enabled workflows</div>
                  <div className="cap-desc">Combine deterministic process steps with AI reasoning and defined human decision gates.</div>
                </div>
                <div className="cap-visual">
                  <div className="steps">
                    <div className="step"><div className="step-num done"><svg className="ic ic--sm" style={{ width: 13, height: 13, strokeWidth: 2.4 }}><use href="#i-check" /></svg></div><div className="step-info"><b>Intake &amp; classify <span className="stag">Action</span></b><small>System · SLA 2m</small></div></div>
                    <div className="step"><div className="step-num done"><svg className="ic ic--sm" style={{ width: 13, height: 13, strokeWidth: 2.4 }}><use href="#i-check" /></svg></div><div className="step-info"><b>Map impacted assets <span className="stag">Action</span></b><small>System · SLA 10m</small></div></div>
                    <div className="step"><div className="step-num">3</div><div className="step-info"><b>GxP impact <span className="stag dec">Decision</span></b><small>Reviewer · SLA 10m</small></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="card sp2 reveal">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-bolt" /></svg></div>
                <div className="cap-title">Skills</div>
                <div className="cap-desc">Reusable templates that capture organization-specific know-how.</div>
                <div style={{ marginTop: 15, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="pack" style={{ padding: "9px 11px", margin: 0 }}><span className="pack-l"><span className="pic"><svg><use href="#i-route" /></svg></span><b style={{ fontSize: 12.5 }}>Deviation investigation</b></span><span className="tag tag--blue">Skill</span></span>
                  <span className="pack" style={{ padding: "9px 11px", margin: 0 }}><span className="pack-l"><span className="pic"><svg><use href="#i-doc" /></svg></span><b style={{ fontSize: 12.5 }}>Stability report</b></span><span className="tag tag--blue">Skill</span></span>
                </div>
              </div>
            </div>

            {/* Resource Packs */}
            <div className="card sp2 reveal d1">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-grid" /></svg></div>
                <div className="cap-title">Resource Packs</div>
                <div className="cap-desc">Package the systems, procedures, and permissions an operational workflow needs.</div>
                <div style={{ marginTop: 15 }}>
                  <div className="pack"><span className="pack-l"><span className="pic"><svg><use href="#i-db" /></svg></span><span><b>System pack</b><small>records · files · APIs</small></span></span><span className="sw" /></div>
                  <div className="pack" style={{ marginBottom: 0 }}><span className="pack-l"><span className="pic"><svg><use href="#i-route" /></svg></span><span><b>Workflow pack</b><small>procedures · review gates</small></span></span><span className="sw" /></div>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="card sp2 reveal d2">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-eye" /></svg></div>
                <div className="cap-title">Evidence &amp; traceability</div>
                <div className="cap-desc">Exportable proof of exactly what the AI did.</div>
                <div className="log" style={{ marginTop: 14 }}>
                  <div className="log-scroll">
                    {[
                      ["09:42:01","bl","QUERY","release Batch B-24017"],
                      ["09:42:02","ok","SOURCE","LIMS · QC results"],
                      ["09:42:03","ok","SOURCE","Deviation Log · 0 open"],
                      ["09:42:05","ok","SOURCE","SOP-QC-104 v7"],
                      ["09:42:06","ok","APPROVE","QA reviewer"],
                      ["09:42:08","ok","EXPORT","evidence-B-24017"],
                      ["09:42:01","bl","QUERY","release Batch B-24017"],
                      ["09:42:02","ok","SOURCE","LIMS · QC results"],
                      ["09:42:03","ok","SOURCE","Deviation Log · 0 open"],
                      ["09:42:05","ok","SOURCE","SOP-QC-104 v7"],
                      ["09:42:06","ok","APPROVE","QA reviewer"],
                      ["09:42:08","ok","EXPORT","evidence-B-24017"],
                    ].map(([ts, cls, label, text], i) => (
                      <div key={i} className="log-line"><span className="ts">{ts}</span><span className={cls}>{label}</span> {text}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Operational work queue */}
            <div className="card sp2 reveal">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-bell" /></svg></div>
                <div className="cap-title">Operational work queue</div>
                <div className="cap-desc">Work requiring action, review, or a decision, grouped and prioritized.</div>
                <div className="ny" style={{ marginTop: 14 }}>
                  <div className="ny-card"><div className="ny-top"><b>QA approval gate</b><span className="ago">18m</span></div><small>Change Control · v1.4.0</small><div className="ny-bot"><span className="tag tag--green">Approval</span><span className="ny-act blue">Approve <svg><use href="#i-arrow" /></svg></span></div></div>
                  <div className="ny-card"><div className="ny-top"><b>Branch needs a choice</b><span className="ago">40m</span></div><small>run-7851 · Deviation</small><div className="ny-bot"><span className="tag" style={{ color: "var(--violet)", background: "var(--violet-bg)" }}>Decision</span><span className="ny-act">Choose <svg><use href="#i-arrow" /></svg></span></div></div>
                </div>
              </div>
            </div>

            {/* Regulatory drafting */}
            <div className="card sp2 reveal d1">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-doc" /></svg></div>
                <div className="cap-title">Regulatory drafting</div>
                <div className="cap-desc">Create controlled drafts from verified sources and templates, then route them through SME review before publication.</div>
                <div className="report-vis">
                  <div className="doc-card"><div className="doc-badge">Review-ready</div><div className="dh" /><div className="dl m" /><div className="dl s" /><div className="dl m" /><div className="dl s" /></div>
                  <div className="doc-flow">Controlled draft <svg><use href="#i-arrow" /></svg> SME review</div>
                </div>
              </div>
            </div>

            {/* Proactive operations */}
            <div className="card sp2 reveal d2">
              <div className="card-pad">
                <div className="cap-ic"><svg><use href="#i-pulse" /></svg></div>
                <div className="cap-title">Proactive operations</div>
                <div className="cap-desc">Surface downstream operational impact and the next action before delays compound.</div>
                <div className="alert-card" style={{ marginTop: 15 }}>
                  <div className="ai"><svg><use href="#i-bell" /></svg></div>
                  <div><b>Reagent delay predicted</b><small>Vendor slipped 3 weeks → impacts 2 stability workflows. Re-plan 3 dependent steps.</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY LINKTON */}
      <section className="section" style={{ background: "var(--mist)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Why Linkton</div>
            <h2 className="h2">Built to operate, not just answer questions.</h2>
            <p className="lede">Linkton works inside the customer&apos;s operational context, coordinating evidence, procedures, systems, and people to move work forward.</p>
          </div>
          <div className="vs-grid">
            <div className="vs-card reveal d1">
              <div className="vs-eyebrow">Beyond general AI</div>
              <h3>Operational context changes the answer.</h3>
              <ul className="vs-list">
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Works inside the operation.</b> <span>Uses the systems, records, procedures, and operating state relevant to the task.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Uses connected evidence.</b> <span>Grounds each action in the sources and approved procedures already in place.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Runs the work.</b> <span>Moves from recommendations into reusable, trackable operational workflows.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Keeps experts in control.</b> <span>Places human review at consequential decisions, exceptions, and approvals.</span></span></li>
              </ul>
            </div>
            <div className="vs-card reveal d2">
              <div className="vs-eyebrow">Beyond point solutions</div>
              <h3>Coordinate the stack instead of replacing it.</h3>
              <ul className="vs-list">
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Works above existing systems.</b> <span>Keeps established systems of record in place while coordinating work across them.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Bridges modern and legacy operations.</b> <span>Connects platforms, local files, segmented environments, and operational spreadsheets.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Turns know-how into Skills.</b> <span>Captures repeatable procedures as reusable operational workflows.</span></span></li>
                <li><span className="vs-check"><svg><use href="#i-check" /></svg></span><span><b>Produces reviewable outputs.</b> <span>Each run carries the evidence, approvals, and trace needed for regulated work.</span></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section dark-sec" id="trust">
        <div className="dark-grid-bg" />
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: 680 }}>
            <div className="eyebrow">Trust &amp; compliance</div>
            <h2 className="h2">Infrastructure for regulated environments.</h2>
            <p className="lede" style={{ color: "#9fb0cc" }}>Customer-controlled deployment, human review, source traceability, and exportable evidence make operational AI usable in regulated work.</p>
          </div>
          <div className="trust-grid">
            <div className="trust-card reveal d1"><div className="trust-ic"><svg><use href="#i-lock" /></svg></div><h4>Customer-controlled</h4><p>Designed for customer-hosted, on-prem, and air-gapped-capable environments. Data stays under your governance.</p></div>
            <div className="trust-card reveal d2"><div className="trust-ic"><svg><use href="#i-shield" /></svg></div><h4>SOC 2 Type 2</h4><p>Built compliance-first with continuous controls monitoring in place.</p><span className="badge">IN PROGRESS</span></div>
            <div className="trust-card reveal d3"><div className="trust-ic"><svg><use href="#i-globe" /></svg></div><h4>FedRAMP-ready</h4><p>Architected to meet federal authorization requirements for sensitive deployments.</p><span className="badge">TARGETING</span></div>
            <div className="trust-card reveal d1"><div className="trust-ic"><svg><use href="#i-eye" /></svg></div><h4>Full audit trail</h4><p>Every AI decision, source, and approval chain is logged and exportable for agency review.</p></div>
            <div className="trust-card reveal d2"><div className="trust-ic"><svg><use href="#i-chip" /></svg></div><h4>Encrypted &amp; signed</h4><p>Signed container images with decrypt-in-memory model protection. Security-scan compatible.</p></div>
            <div className="trust-card reveal d3"><div className="trust-ic"><svg><use href="#i-users" /></svg></div><h4>WCAG 2.2</h4><p>Accessible by design across the interface, so every operator can work without barriers.</p></div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section" id="tech">
        <div className="wrap">
          <div className="tech-grid">
            <div className="reveal">
              <div className="spec">
                <div className="spec-item"><div className="spec-label">Model hosting</div><div className="spec-val">Flexible<small>local, self-hosted, or cloud</small></div></div>
                <div className="spec-item"><div className="spec-label">Governed context</div><div className="spec-val">Provenance-bound<small>not raw RAG</small></div></div>
                <div className="spec-item"><div className="spec-label">Cost posture</div><div className="spec-val">Controlled<small>reduce per-answer cloud dependence</small></div></div>
                <div className="spec-item"><div className="spec-label">Deployment</div><div className="spec-val">Customer-controlled<small>customer-controlled runtime</small></div></div>
                <div className="spec-item"><div className="spec-label">Edge-ready</div><div className="spec-val">Local paths<small>supports local integration paths</small></div></div>
                <div className="spec-item"><div className="spec-label">Model-flexible</div><div className="spec-val">Upgradeable<small>upgrade intelligence, keep context</small></div></div>
              </div>
            </div>
            <div className="tech-side reveal d1">
              <div className="eyebrow">Technology</div>
              <h3 style={{ marginTop: 18 }}>Private intelligence, deployed where operations run.</h3>
              <p>Linkton is designed for customer-controlled environments, including on-prem, VPC, and air-gapped-capable deployments. Models can reason over operational context without making regulated work dependent on a public chatbot workflow.</p>
              <p>Because context is separated from intelligence, teams can upgrade models, change hosting modes, or tune cost and latency without rebuilding the knowledge layer.</p>
              <div className="affil">
                <span className="affil-chip"><span className="ac-ic" style={{ background: "linear-gradient(150deg,#76d275,#3a9e3a)" }}><svg><use href="#i-cpu" /></svg></span>NVIDIA Inception</span>
                <span className="affil-chip"><span className="ac-ic" style={{ background: "linear-gradient(150deg,#34AADF,#0A5A8E)" }}><svg><use href="#i-cloud" /></svg></span>Microsoft Azure</span>
                <span className="affil-chip"><span className="ac-ic" style={{ background: "linear-gradient(150deg,#f0932b,#d9820b)" }}><svg><use href="#i-cloud" /></svg></span>AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" id="demo">
        <canvas id="ctaCanvas" />
        <div className="cta-glow" />
        <div className="wrap">
          <div className="cta-inner reveal">
            <h2>Bring us one workflow <span className="em">that crosses too many systems.</span></h2>
            <p>We&apos;ll show how Linkton connects the evidence, places experts at the right decision points, and runs the work inside your environment.</p>
            <div className="cta-cta">
              <button type="button" className="btn btn-blue btn-lg" onClick={openContact}>Get in touch <svg className="ic" aria-hidden="true"><use href="#i-mail" /></svg></button>
              <a href="#platform" className="btn btn-light btn-lg">Explore the platform</a>
            </div>
            <div className="cta-note">Operational AI · Customer-controlled · Human-reviewed</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand">
                <LinktonLogo />
                <span className="brand-name">Linkton</span>
              </div>
              <p className="foot-tag">Operational AI infrastructure for pharma, regulatory, and clinical-operations environments.</p>
            </div>
            <div className="foot-col">
              <h5>Platform</h5>
              <a href="#platform">Conversational operations</a>
              <a href="#platform">AI-enabled workflows</a>
              <a href="#platform">Skills &amp; Resource Packs</a>
              <a href="#trust">Trust &amp; compliance</a>
              <a href="#tech">Technology</a>
            </div>
            <div className="foot-col">
              <h5>Ecosystems</h5>
              <a href="#ecosystems">Pharma &amp; biotech</a>
              <a href="#ecosystems">Regulatory</a>
              <a href="#ecosystems">Clinical operations &amp; CROs</a>
              <a href="mailto:info@braingnosis.ai">Contact</a>
            </div>
            <div className="foot-col">
              <h5>Get started</h5>
              <button type="button" className="foot-contact-button" onClick={openContact}>Get in touch</button>
            </div>
          </div>
          <div className="foot-bot">
            <span className="cp">© 2026 BrainGnosis Inc. · Built for regulated science.</span>
            <div className="soc">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn"><svg className="ic"><use href="#i-in" /></svg></a>
              <a href="mailto:info@braingnosis.ai" aria-label="Email"><svg className="ic"><use href="#i-mail" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
