const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');

const sessions = [];

fs.readdirSync("sessions").forEach(fileName => {
    const [day, hotel, level] = fileName.split("_").map(n => n.replace(".html", "")); //?

    const file = fs.readFileSync('sessions/' + fileName, {encoding: 'utf-8'});
    const $ = cheerio.load(file)
        
    $('.sessionRow').each((index, elem) => {
        const id = $(elem).attr('id') //?
        const abbr = $('.abbreviation', elem).text().replace(" - ", "") //?
        const title = $('.title', elem).text() //?
        const abstract = $('.abstract', elem).text() //?
        const type = $('.type', elem).text() //?
        const speaker = $('.speakers', elem).text() //?
        const rooms = $('.sessionRoom', elem).text() //?
        const times = $('.availableSessions', elem).text().replace(rooms, '').replace('Session enrollment has not yet begun.', '')//?
        
        sessions.push({id, abbr, title, abstract, type, day, hotel, level, rooms: rooms.replace(' – ', ''), times})
    })
})

_.sortBy(sessions, ['day', 'hotel', 'level', 'id'])

fs.writeFileSync('src/sessions.json', JSON.stringify(sessions, null, 4))
