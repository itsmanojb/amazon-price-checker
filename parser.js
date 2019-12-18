const nightmare = require('nightmare')()

const args = process.argv.slice(2)
const productId = args[0]
const minPrice = args[1]

const rod = (function rod() {
  const chars = "|/-\\";
  let i = 0;
  return function () {
    i = (i + 1) % 4;
    process.stdout.write(`Checking ${chars[i]}\r`);
  }
})()

const loading = setInterval(rod, 100)
checkPrice()

async function checkPrice() {
  try {
    const url = `https://www.amazon.in/dp/${productId}`;
    const data = await nightmare.goto(url)
      .wait("#priceblock_ourprice")
      .evaluate(() => {
        const parsedArr = [];
        parsedArr.push(document.getElementById("productTitle").innerText)
        const priceText = document.getElementById("priceblock_ourprice").innerText;
        if (!priceText.includes('-')) {
          parsedArr.push(priceText)
        }
        return parsedArr;
      })
      .end()
    if (data.length == 1) {
      console.log(`\n\nFailed to determine actual price of ${data[0]}.\n`)
    } else {
      const priceNumber = parseFloat(data[1].replace(/[₹, ]/g, ''))
      if (minPrice) {
        if (priceNumber < minPrice) {
          console.log(`\n\nThe price of ${data[0]} has dropped. Current Price ${data[1]}\n`)
        } else {
          console.log(`\n\n${data[0]} is still expensive. Current Price ${data[1]}\n`)
        }
      } else {
        console.log(`\n\nThe current price of ${data[0]} is ${data[1]}\n`)
      }
    }
    clearInterval(loading)
  } catch (e) {
    console.log('Error occured while fetching price information.')
    // throw e
  }
}