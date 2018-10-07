const puppeteer = require('puppeteer');
const _ = require('lodash');

const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));

(async () => {
  const browser = await puppeteer.launch({headless: false})
  console.log("browser launched")
  const page = await browser.newPage()
  
  await page.setViewport({ width: 800, height: 600 })
  
  await page.goto('https://www.portal.reinvent.awsevents.com/connect/publicDashboard.ww')

  console.log("site opened")
  
  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow:nth-child(3) > label')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow:nth-child(3) > label')
  
  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginPassword')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginPassword')
  
  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginUsername')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginUsername')
  
  await page.waitForSelector('.amazon2015 > #templateMain > #templateContent > #centerCol > .rows')
  await page.click('.amazon2015 > #templateMain > #templateContent > #centerCol > .rows')

  await page.type('#loginUsername', process.env.username)
  await page.type('#loginPassword', process.env.password)
  
  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginButton')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginButton')
  
  await page.waitForNavigation()

  console.log("logged in")
  
  await page.waitForSelector('nav > #mainNav > #ui-id-5 > .ui-menu-item > #ui-id-6')
  await page.click('nav > #mainNav > #ui-id-5 > .ui-menu-item > #ui-id-6')
  
  console.log("before days")
  await page.waitForSelector('#schedulableDays_tr > div.formContent.filter-list-scroll > div')
  console.log("after days")

  const days = _.uniqBy(await page.evaluate(() => {
      const inputs = [...document.querySelectorAll('#schedulableDays_tr .filter-item')]
      return inputs.map(input => ({id: input.children[0].getAttribute('id'), label: input.textContent.trim()})).filter(d => d.label != 'Sunday')
  }), 'id')

  const hotels = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_728_tr .filter-item')]
    return inputs.map(input => ({id: input.children[0].getAttribute('id'), label: input.textContent.trim()}))
  }), 'id')

  const levels = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_10041_tr .filter-item')]
    return inputs.map(input => ({id: input.children[0].getAttribute('id'), label: input.textContent.trim()}))
  }), 'id')

  console.log(days)
  console.log(hotels)
  console.log(levels)

  for (day of days) {
      for (hotel of hotels) {
          for (level of levels) {
              const dayId = day.id.replace('day_', '');
              const hotelId = hotel.id.replace('profileItem_728_', '')
              const levelId = level.id.replace('profileItem_10041_', '')

              await page.goto(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&dayID=${dayId}&p=&i(10041)=${levelId}&id(728)=${hotelId}`)

              console.log('before wait')
                await page.waitForSelector('#getMoreResults')
                console.log('after wait')
                await sleep(2);
                await page.click('#getMoreResults')
                console.log('after click')

              await page.waitForSelector('toto')
          }
      }
  }
  
  
  await browser.close()
})()