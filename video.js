async function getCaptions(url) {
  const raw = await fetch(url);
  const text = await raw.json();
  const events = await text.events;
  return events;
}

async function getText(url, wrap) {
  const text = await getCaptions(url);
  const segundos = Object.entries(text).map((event) => {
    let segs = event[1].segs;
    return segs;
  });
  
  let legendas = '';
  segundos.map((seg) => {
    if (seg !== undefined) {
      seg.forEach(element => {
        let part = element.utf8;
        if (wrap == false) {
          if (part == '\n') part = ' ';
        }
        legendas = legendas + part;
      });
    }
  });
  return legendas;
}

async function searchCaptions() {
  let wrap = document.getElementById('wrap').checked;
  let legendas = await getText(document.getElementById('link').value, wrap);
  document.getElementById('texto').innerText = legendas;
}

document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('link').value = '';
});

document.getElementById('try').addEventListener('click', searchCaptions);

document.getElementById('wrap').addEventListener('change', searchCaptions);