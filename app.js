const got = require("got");
const cheerio = require("cheerio");



async function requestTo(query) {
    try {
        
        const flipkartRes = await got(`https://www.flipkart.com/search?q=${query}`);
        let Flipkart = flipkartData(flipkartRes.body);
        const amazonRes = await got(`https://www.amazon.in/s?k=${query}`);
        let Amazon = amazonData(amazonRes.body);

        return { Flipkart, Amazon };
        

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

    let length = aTag.length > 8 ? 8 : aTag.length;

    for (let i = 0; i < length; i++) {
        data[`product${i}`] = { brand: "Amazon", productName: $(nameTag[i]).text(), productLink: `https://www.amazon.in${$(aTag[i]).attr('href')}`, productImg: $(imgTag[i]).attr('src'), productPrice: $(priceTag[i]).text() }
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
        data[`product${i}`] = { brand: "Flipkart", productName: $(nameTag[i]).text(), productLink: `https://www.flipkart.com${$(aTag[i]).attr('href')}`, productImg: $(imgTag[i]).attr('src'), productPrice: $(priceTag[i]).text() }
    }

    return data;

}



module.exports = requestTo;

// requestTo();












// <% for (let key in result) {
//     if (result[key] !== " ") {%>
//                 <div class="product_brand">
//                     <h1>
//                         Brand
//                     </h1>
//                 </div>
//                 <div class="products_grid">
//                     <%for(let subKey in result[key]){ if(result[key][subKey]!=="" ){%>
//                         <a href="<%=result[key][subKey]['productLink']%>" class="product">

//                             <img src="<%=result[key][subKey]['productImg']%>">
//                             <h4>
//                                 <%=result[key][subKey]["productName"]%>
//                             </h4>
//                             <h3 class="price">Price: <span>
//                                     <%=result[key][subKey]["productPrice"]%>
//                                 </span> </h3>

//                         </a>
//                         <%}else{%>
//                             <h1>No Result Found</h1>
//                             <%}}%>
//                 </div>

//                 <%}
// }%>
