const cheerio = require('cheerio');
const fs = require('fs');

const sessions = [];

fs.readdirSync("sessions").forEach(fileName => {
    const [day, hotel] = fileName.split("_"); //?

    const file = fs.readFileSync('sessions/' + fileName, {encoding: 'utf-8'});
    const $ = cheerio.load(file)
        
    $('.sessionRow').each((index, elem) => {
        const id = $(elem).attr('id') //?
        const abbr = $('.abbreviation', elem).text() //?
        const title = $('.title', elem).text() //?
        const abstract = $('.abstract', elem).text() //?
        const type = $('.type', elem).text() //?
        sessions.push({id, abbr, title, abstract, type, day, hotel: hotel.replace(".html", "")})
    })
})

fs.writeFileSync('src/sessions.json', JSON.stringify(sessions, null, 4))
