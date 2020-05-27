import { getAmazonSentiment } from './sentimentProviders.mjs';
import afinn from "./AFINN.json";
import Parser from 'rss-parser';

let parser = new Parser();


const tokenize = (text) => text.toLowerCase().split(" ");

const deleteUselessChars = (word) => word.replace(/[^\w]/g, "");

const rateWord = (word) => (word in afinn ? parseInt(afinn[word]) : 0);

const sum = (x, y) => x + y;

const analyze = (text) =>
  tokenize(text).map(deleteUselessChars).map(rateWord).reduce(sum);

(async () => {
  let feed = await parser.parseURL(
    "https://www.independent.ie/breaking-news/rss/"
  );
  console.log(feed.title);

  Promise.all(
    feed.items.map((item) => getAmazonSentiment(item.content))
  ).then((data) => {
    data.forEach(each => console.log(each))
  });
})();
