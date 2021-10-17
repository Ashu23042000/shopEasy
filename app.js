const got = require("got");
const cheerio = require("cheerio");



async function requestTo(query) {
    try {
        const flipkartRes = await got(`https://www.flipkart.com/search?q=${query}`);
        let fdata = flipkartData(flipkartRes.body);
        const amazonRes = await got(`https://www.amazon.in/s?k=${query}`);
        let adata = amazonData(amazonRes.body);
        return { fdata, adata };

    } catch (error) {
        console.log(error);
    }

}



function amazonData(html) {

    let data = {};

    let $ = cheerio.load(html);
    
    let aTag = $('div[class="sg-col-inner"] a[class="a-link-normal s-no-outline"]');

    let nameTag = $('div[class="sg-col-inner"] a[class="a-link-normal a-text-normal"] span[class="a-size-medium a-color-base a-text-normal"]');

    let imgTag = $('div[class="sg-col-inner"] a[class="a-link-normal s-no-outline"] img[class="s-image"]');
    
    let priceTag = $('div[class="sg-col-inner"] a[class="a-size-base a-link-normal a-text-normal"] span[class="a-price-whole"]');



    for (let i = 0; i < aTag.length; i++) {
        data[`product${i}`] = { productName: $(nameTag[i]).text(), productLink: `https://www.amazon.in${$(aTag[i]).attr('href')}`, productImg: $(imgTag[i]).attr('src'), productPrice: $(priceTag[i]).text() }
    }

    return data;
}




function flipkartData(html) {

    let data = {};

    let $ = cheerio.load(html);
    let aTag = $("._1fQZEK");
    let nameTag = $("._1fQZEK ._4rR01T")
    let imgTag = $("._1fQZEK ._396cs4");
    let priceTag = $("._1fQZEK ._30jeq3._1_WHN1")


    for (let i = 0; i < aTag.length; i++) {
        data[`product${i}`] = { productName: $(nameTag[i]).text(), productLink: `https://www.flipkart.com${$(aTag[i]).attr('href')}`, productImg: $(imgTag[i]).attr('src'), productPrice: $(priceTag[i]).text() }
    }

    return data;

}



module.exports = requestTo;

// requestTo();