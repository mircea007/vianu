//daca autorul are cv dubio in loc de un nume => nu exista
//nu inchide browserul
//alege directoru-ul unde se descarca
//pt separarea exemplelor.... split('\n');
//node ./pages/api/fetchProblem

const puppeteer = require('puppeteer');
const fs = require('fs');

let problema = {
  titlu: '',
  enunt: '',
  intrare: '',
  iesire: '',
  sursa: '',
  autor: '',
  timp: '',
  memorie: '',
  dificultate: '',
  teste: [],
  expl: [],
};

const copyTest = (testName, dir) => {
  fs.readFile(dir, 'utf8', function (err, data) {
    if (err) throw err;
    problema.teste.push([testName, data]);
    //console.log(data)
  });
};

const deleteTest = (testName, dir) => {
  fs.unlink(dir, function (err) {
    if (err) return console.log(err)
  });
};

const date = async (nume) => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(`https://www.nerdarena.ro/problema/${nume}`);


  problema.titlu = nume;

  const name = '.wiki_text_block table';
  await page.waitForSelector(name);

  const t = (await page.$eval(name, e => e.firstChild.innerHTML));
  const arr = t.toString();
  let poz = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr.substring(i, i + 2) == 'td')
      poz.push(i);
  }

  const sursa = arr.substring(poz[6] + 3, poz[7] - 2);
  //console.log(sursa);
  problema.sursa = sursa;

  const autor = arr.substring(poz[10] + 40, poz[11] - 6)
  //console.log(autor)
  problema.autor = autor;

  const timp = arr.substring(poz[18] + 3, poz[19] - 6)
  //console.log(timp)
  problema.timp = timp;

  const memorie = arr.substring(poz[22] + 3, poz[23] - 9)
  //console.log(memorie)
  problema.memorie = memorie;


  await page.waitForSelector('p');
  const text = await page.$$eval('p', text => {
    return text.map(text => text.textContent);
  });
  problema.enunt = text[4];
  problema.intrare = text[5];
  problema.iesire = text[6];


  await page.waitForSelector('tr');
  const options = await page.$$eval('tr', options => {
    return options.map(option => option.innerHTML);
  });
  // console.log(options)

  const enunt = '.example tbody';
  await page.waitForSelector(enunt);
  const size = await page.$eval(enunt, e => e.children.length)
  //console.log(size);

  let exemple = [];
  for (let i = options.length - size - 1; i < options.length - 1; i++) {
    exemple.push(options[i]);
  }

  for (let exemplu of exemple) {
    var eachLine = exemplu.split('</td>');
    var array = [];
    for (var i = 0, l = eachLine.length; i < l; i++) {
      array.push(eachLine[i] + '</td>');
    }
    problema.expl.push(array);
  }

  await page.waitForSelector('.star-rating');
  const stars = await page.$eval('.star-rating', stars => {
    return stars.textContent;
  });

  problema.dificultate = stars;

  await browser.close();
};

const teste = async (nume, dir) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();


  await page.goto(`https://www.nerdarena.ro/problema/${nume}?action=attach-list`);

  const container = '.fill-screen';
  await page.waitForSelector(container);

  const table = '.fill-screen tbody'
  await page.waitForSelector(container);

  const length = (await page.$eval(table, e => e.children.length));
  console.log(length);

  for (let i = 1; i <= length; i++) {
    const text = `#link_${i} a`;
    await page.waitForSelector(text);

    const name = (await page.$eval(text, e => e.innerText));
    console.log(name);
    if (name.endsWith('.in') || name.endsWith(".ok")) {
      await page.click(text);
      //page.click(text);
      await page.evaluate(async () => {
        await new Promise(function (resolve) {
          setTimeout(resolve, 2000)
        });
      });
      copyTest(name, dir + name);
    }

  }

  for (let i = 1; i <= length; i++) {
    const text = `#link_${i} a`;
    await page.waitForSelector(text);

    const name = (await page.$eval(text, e => e.innerText));
    if (name.endsWith('.in') || name.endsWith(".ok")) {
      deleteTest(name, dir + name);
    }

  }
  //console.log(problema)
  await browser.close();
};

const fura = async (nume, dir) => {
  await date(nume);
  await teste(nume, dir);

}

fura('permutari', '/Users/raresferaru/Downloads/').then(() => {
  console.log(problema);
})







