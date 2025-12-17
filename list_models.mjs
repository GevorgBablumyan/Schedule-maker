import fs from 'fs/promises';

async function readKey(){
  try{ const k = await fs.readFile(new URL('./apikey.txt', import.meta.url),'utf8'); return k.trim(); }catch(e){return null}
}

async function main(){
  const key = await readKey();
  if(!key){ console.error('no key'); process.exit(1);} 
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(key)}`;
  try{
    const resp = await fetch(url);
    const txt = await resp.text();
    console.log('STATUS', resp.status);
    console.log(txt);
  }catch(e){ console.error('ERR', e); }
}

main();
