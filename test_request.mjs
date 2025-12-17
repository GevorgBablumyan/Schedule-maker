// Use global fetch available in Node 18+
async function main(){
  try{
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ prompt: 'make a list of 5 books' })
    });
    const t = await res.text();
    console.log('STATUS', res.status);
    console.log(t);
  }catch(e){
    console.error('ERR', e);
  }
}

main();
