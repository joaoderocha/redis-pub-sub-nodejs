const puppetter = require('puppeteer');

const browserPromise = puppetter.launch({args: ['--no-sandbox']});

async function getTweetData(page) {
  await Promise.all([page.waitForSelector('article div[lang]')]);

  let data = [];
  let count = 0;
  do {
    if (count > 4) count = 0;
    else count += 1;
    data = await page.evaluate(async (count) => {
      const html = Array.from(document.querySelectorAll('article'));

      window.scroll({top: 0, behavior: 'smooth'});
      await new Promise((r) => setTimeout(r, 1000));
      window.scroll({
        top: count * document.body.offsetHeight,
        behavior: 'smooth',
      });

      const tweetData = html.map((value) => {
        const elements = value.querySelectorAll('span');
        const date = value.querySelector('a > time').getAttribute('datetime');
        const reply = value.querySelector('div[data-testid=reply]').innerText;
        const retweet = value.querySelector('div[data-testid=retweet]').innerText;
        const like = value.querySelector('div[data-testid=like]').innerText;

        const isRetweet = elements[0].innerText.includes('Retweeted');
        const shift = isRetweet ? 3 : 0;

        return {
          isRetweet,
          name: elements[1 + shift].innerText,
          user: elements[2 + shift].innerText,
          tweet: elements[4 + shift].innerText,
          date,
          reply,
          retweet,
          like,
        };
      });
      return tweetData;
    }, count);
  } while (data.length < 5);

  return data;
}

module.exports = async (user) => {
  const browser = await browserPromise;
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto(`https://twitter.com/${user}`, {waitUntil: 'networkidle0'});
  const tweetData = await getTweetData(page);

  return tweetData;
};
