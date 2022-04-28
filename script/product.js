//get categories for select using ajax
var opt;
const xhttp1 = new XMLHttpRequest();
xhttp1.open("get", "https://dummyjson.com/products/categories", true);
xhttp1.send();


xhttp1.onreadystatechange = function() {
    if (xhttp1.readyState == 4 && xhttp1.status == 200) {
        var display = JSON.parse(xhttp1.responseText);
        select_categories(display);
    }
}

function select_categories(data) {
    for (const item of data) {


        opt = document.createElement('option')
        opt.innerHTML = item;
        opt.value = item
        document.getElementById('select').appendChild(opt)
    }
}

// cards



//get all produects and display when windows load

const xhttp2 = new XMLHttpRequest();
xhttp2.open("get", "https://dummyjson.com/products", true);
xhttp2.send();


xhttp2.onreadystatechange = function() {
        //request finished & result is ok 
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            var display = JSON.parse(xhttp2.responseText);
            display_data(display.products);
        }
    }
    //function for remove old select categories and put new category
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//select categories
function select_category() {
    //remove old select categories
    const container = document.querySelector('#all');
    var ca = document.getElementById('all').child
    removeAllChildNodes(container);
    //select new category
    const xhttp = new XMLHttpRequest();
    xhttp.open("get", "https://dummyjson.com/products/category/" + document.getElementById('select').value, true);
    xhttp.send();


    xhttp.onreadystatechange = function() {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var display = JSON.parse(xhttp.responseText);
                display_data(display.products);

            }
        }
        //if select All Categories from dropdown
    if (document.getElementById('select').value == 'All Categories') {
        const xhttp3 = new XMLHttpRequest();
        xhttp3.open("get", "https://dummyjson.com/products", true);
        xhttp3.send();
        xhttp3.onreadystatechange = function() {
            //request finished & result is ok 
            if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                var display = JSON.parse(xhttp3.responseText);
                display_data(display.products);
            }
        }
    }
}
//display categories in screan
function display_data(data) {
    var img;
    var p1, span22, btn, div, card, disc;
    for (let item of data) {

        img = document.createElement('img')

        p1 = document.createElement('p')
        p2 = document.createElement('p')
        btn = document.createElement('button')
        div = document.createElement('div')
        card = document.createElement('div')
        img.src = item.thumbnail;
        img.style.width = 50 + '%';
        img.style.height = 40 + '%';
        p1.innerHTML = item.title;
        disc = document.createElement('del');
        span22 = document.createElement('span');
        disc.innerHTML = (item.price) + ' $ '

        span22.innerHTML = ' - ' + (item.price - Math.round(item.discountPercentage)) + ' $'
        btn.innerHTML = 'Add To Cart'
        div.classList.add('container');
        card.classList.add('card1');
        card.style.cursor = "pointer"
        btn.classList.add('button1')
        btn.classList.add('button21')
        btn.onclick = function(event) {

            if (document.getElementById("myNav").style.width != "50%") {
                event.stopPropagation()
                addcart(item.id, item.discountPercentage, item.brand, item.title, item.description, item.price, item.thumbnail)
                alert(item.title + 'added to Shopping Cart')
            }
        }
        card.onclick = function(event) {

            if (document.getElementById("myNav").style.width != "50%") {
                event.stopPropagation()
                document.getElementById("body").style.background = " rgba(90, 90, 91, 0.9)";
                document.getElementById("body").style.opacity = 0.8;
                document.getElementById("myNav").style.width = "50%";
                document.getElementById("img_overlay").src = item.thumbnail
                document.getElementById("title_overlay").innerHTML = 'Title :' + item.title
                document.getElementById("brand_overlay").innerHTML = 'Brand :' + item.brand
                document.getElementById("discount_overlay").innerHTML = 'Discount : ' + item.discountPercentage
                document.getElementById("price_overlay").innerHTML = 'Price : ' + item.price
                document.getElementById("discription_overlay").innerHTML = 'Discription : ' + item.description
            }

        }
        card.appendChild(img)

        div.appendChild(p1)

        div.appendChild(disc)
        div.appendChild(span22)
        div.appendChild(btn)
        card.appendChild(div)
        document.getElementById('all').appendChild(card)

    }


}

document.getElementById("body").onclick = function() {
    document.getElementById("body").style.background = "none"
    document.getElementById("body").style.opacity = 1;
    document.getElementById("myNav").style.width = 0;
}
var count;
//function for add to cart
let countEl = document.getElementById("lblCartCount")
let counter = 0

function addcart(id, discountPercentage, brand, title, description, price, image) {

    counter += 1
    countEl.innerHTML = counter
    if (localStorage.getItem(id)) {

        cart = JSON.parse(localStorage.getItem(id));
        console.log(cart)
        if (cart) {
            cart.count++;
            localStorage.setItem(id, JSON.stringify(cart));


        } else {

            cart = {
                image: image,
                discountPercentage: discountPercentage,
                brand: brand,
                title: title,
                description: description,
                price: price,
                count: 1
            };

            localStorage.setItem(id, JSON.stringify(cart));
        }

    } else {
        cart = {
            image: image,
            discountPercentage: discountPercentage,
            brand: brand,
            title: title,
            description: description,
            price: price,
            count: 1
        };
        localStorage.setItem(id, JSON.stringify(cart));
    }
    console.log(JSON.parse(localStorage.getItem(id)))
}