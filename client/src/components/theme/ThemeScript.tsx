// Inlined before paint to set the initial theme with zero flash. Reads the
// saved preference; falls back to the OS setting. Runs on the server render,
// executes on the client synchronously in <head>.
const script = `(function(){try{var t=localStorage.getItem('acronix-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
