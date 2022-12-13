import http from 'http';
import * as fs from 'fs';


// const target = "http://vps-a47222b1.vps.ovh.net:8484/Product/page/"
// const otherTarget = "http://vps-a47222b1.vps.ovh.net:8484/Product/page/2"*

let page = 0;

for (let pages = 0; pages < 3; pages++) {
    page ++;
    const target = `http://vps-a47222b1.vps.ovh.net:8484/Product/page/${page}`
    console.log(target); 

    async function getHTML(target) {
        return new Promise((resolve, rejects) => {
            let allData = "";
            http.get(target, (rep) => {
                console.log(rep.statusCode)
                rep.setEncoding("utf8");
                rep.on("data", (data) => {
                    allData += data;
                    console.log("Téléchargement de la page en cours")
                })
                rep.on("end", () => {
                    resolve(allData);
                    console.log("Téléchargement de la page terminé")
                })
            })
        })
    }
    
    async function getInformation() {
        return new Promise(async (resolve, reject) => {
            await getHTML(target).then((res) => {
                /**
             * REGEX
             */
                var regex_prix = /<h5 class="card-title">(.*)<\/h5>/gm;
                var regex_image = /<img src="(.*)" class="card-img-top" alt=".*">/gm;
    
                let prix;
                let img;
    
                var Allprix = [];
                var Allimg = [];
                var info = [];
    
                while ((prix = regex_prix.exec(res)) !== null && (img = regex_image.exec(res)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (prix.index === regex_prix.lastIndex && img.index === regex_image.lastIndex) {
                        regex_prix.lastIndex++;
                        regex_image.lastIndex++;
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
                }
    
                for (let i = 0; i < Allprix.length; i++) {
                    info.push([ Allprix[i], Allimg[i]])
    
                }
    
                resolve(info)
            })
        })
    }
    
    getInformation().then(async (info) => {
        if (fs.existsSync("products.json")) {
            try {
                await fs.unlink('./products.json', () => { });
                console.log('Suppresion => products.json reussie');
            } catch (error) {
                console.error('Suppresion => il y eu une erreur : ', error.message);
            }
        }
    
        try {
            fs.writeFileSync('./products.json', JSON.stringify(info, null, 2), { flag: 'a+' })
        } catch (error) {
    
        }
    })



}

