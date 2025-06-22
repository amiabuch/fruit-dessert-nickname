import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

const FRUITS_URL = 'https://simple.wikipedia.org/wiki/List_of_fruits';
const DESSERTS_URL = 'https://en.wikipedia.org/wiki/List_of_desserts';

async function scrapeWikipediaList(url) {
  const res = await fetch(url);
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const divs = [...doc.querySelectorAll('div.div-col')];
  const items = new Set();

  for (const div of divs) {
    const lis = div.querySelectorAll('li');
    for (const li of lis) {
      const text = li.textContent.trim().toLowerCase();
      if (text && text.split(' ').length <= 4) {
        items.add(text);
      }
    }
  }

  return [...items];
}

function generateNickname(fruits, desserts) {
  const formats = [
    () => `${rand(fruits)} ${rand(desserts)} ${rand(fruits)} ${rand(desserts)}`,
    () => `${rand(fruits)} ${rand(fruits)} ${rand(desserts)}`,
    () => `${rand(fruits)} ${rand(desserts)} ${rand(fruits)}`,
    () => `${rand(desserts)} ${rand(fruits)} ${rand(fruits)}`,
    () => `${rand(fruits)} ${rand(fruits)} ${rand(desserts)} goo`
  ];
  return formats[Math.floor(Math.random() * formats.length)]();
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  try {
    const [fruits, desserts] = await Promise.all([
      scrapeWikipediaList(FRUITS_URL),
      scrapeWikipediaList(DESSERTS_URL)
    ]);

    const nickname = generateNickname(fruits, desserts);
    return NextResponse.json({ nickname });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate nickname' }, { status: 500 });
  }
}
