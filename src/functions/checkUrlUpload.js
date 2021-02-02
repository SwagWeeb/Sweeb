const w = require('wumpfetch');
async function check(url) {
    if (!url) throw new Error("No arg defined!")
    var result = "";
    const giphy = new RegExp("giphy\.com/gifs/(?:.*-)?([^ /]+)"),
    giphyMedia = new RegExp(/media\d\.giphy\.com\/media\/([^ \/]+)\/giphy.gif/ig)
    tenor = new RegExp("tenor\.com/view/(?:.*-)?([^ /]+)");
    if (giphy.exec(url) !== null) result = `https://media${Math.floor(Math.random() * Math.floor(4))}.giphy.com/media/${giphy.exec(url)[1]}/giphy.gif`;
    else if (giphyMedia.exec(url) !== null) result = url;
    else if (tenor.exec(url) !== null) {
        const r = await w({
            url: `https://api.tenor.com/v1/gifs?ids=${tenor.exec("https://tenor.com/view/kiss-anime-love-gif-9158317")[1]}&key=${process.env.TENOR_KEY}`,
            method: 'GET',
        }).send()
        
        result = r.json().results[0].media[0].gif.url;
    }
    else result = url;
    return result;
}
module.exports = check;