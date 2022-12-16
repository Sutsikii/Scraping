import * as fs from 'fs';

// const target = "http://vps-a47222b1.vps.ovh.net:8484/Product/page/"
// const otherTarget = "http://vps-a47222b1.vps.ovh.net:8484/Product/page/2"*

async function getHTML(target)
{
    let response = await fetch(target);
    let html = await response.text()

    return (html);
}

function getInformation(html)
{
    var regex_prix = /<h5 class=\"card-title\">(.*)<\/h5>/gm;
    var regex_image = /<img src=\"(.*)\" class=\"card-img-top\" alt=\".*\">/gm;
    var regex_link = /<a href="\/product\/(.*) class=\"btn btn-primary\">Go to page !<\/a>/gm;

    let prix;
    let img;
    let link;

    var Allprix = [];
    var Allimg = [];
    var Alllink = [];
    var info = [];

    while ((prix = regex_prix.exec(html)) !== null && (img = regex_image.exec(html)) !== null && (link = regex_link.exec(html)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (prix.index === regex_prix.lastIndex && img.index === regex_image.lastIndex && link.index === regex_link.lastIndex) {
            regex_prix.lastIndex++;
            regex_image.lastIndex++;
            regex_link.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        prix.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                Allprix.push(`${match}`)
            }
        });
        img.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                Allimg.push(`${match}`);
            }
        });
        link.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                Alllink.push(`${match}`);
            }
        });
    }

    for (let i = 0; i < Allprix.length; i++) {
        info.push([ Allprix[i], Allimg[i], Alllink[i]])
    }

    return (info);
}

async function saveJson(infos)
{
    if (fs.existsSync("products.json")) {
        try {
            await fs.unlink('./products.json', () => { });
            console.log('Suppresion => products.json reussie');
        } catch (error) {
            console.error('Suppresion => il y eu une erreur : ', error.message);
        }
    }

    try
    {
        fs.writeFileSync('./products.json', JSON.stringify(infos, null , 2), { flag: 'a+' })
    } catch (error) { }
}

let page = 0;
let infos = [];

for (let pages = 0; pages < 8; pages++)
{
    page ++;
    const target = `http://vps-a47222b1.vps.ovh.net:8484/Product/page/${page}`
    console.log(target); 

    let html = await getHTML(target);
    infos = infos.concat(getInformation(html));

    
}

await saveJson(infos);