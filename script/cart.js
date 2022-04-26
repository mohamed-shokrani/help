// get keys and value from local storage to put in html
var keys = Object.keys(localStorage);

var i = keys.length;
document.getElementById('items').innerHTML = i + ' items'
document.getElementById('t_item').innerHTML = ' ITEMS ' + i
var res = 0
var dis = 0;
if (i > 0) {
    for (let n of keys) {
        var item = JSON.parse(localStorage.getItem(n))
        res += item.count * item.price
        dis += item.count * Math.round(item.discountPercentage)
        var cart = ' <div class="row border-top">  <div class="row main align-items-center"><div class="col-2"><img class="img-fluid" src=' +
            item.image +
            '></div><div class="col"> <div class="row text-muted">' + item.brand +
            '</div> <div class="row">' + item.title +
            '</div> </div><div class="col"> <a style="cursor: pointer"  onclick="minus(this,' + n + ')">-</a><a  class=" border" ">' + item.count + '</a><a style="cursor: pointer" onclick="plus(this,' + n + ')">+</a> </div> <div class="col">$' + item.price + '<span class="close" onclick="del(this,' + n + ')">&#10005;</span></div> </div> </div>'
        document.getElementById('cart').innerHTML += (cart)
    }

}

document.getElementById('cart').innerHTML += '<div class="back-to-shop"><a href="index.html"">&leftarrow;</a><span class="text-muted">Back to shop</span></div>'
    //function when minus count one of items
function minus(th, id) {
    var cart = JSON.parse(localStorage.getItem(id))
    th.nextSibling.innerHTML = Number(th.nextSibling.innerHTML) - 1
    res -= cart.price
    dis -= Math.round(cart.discountPercentage);
    document.getElementById('t_price').innerHTML = ' $ ' + res
    document.getElementById('t_discount').innerHTML = ' $ ' + dis
    document.getElementById('total').innerHTML = ' $ ' + (res + 7 - dis)
    if (Number(th.nextSibling.innerHTML)) {

        cart.count = th.nextSibling.innerHTML;
        localStorage.setItem(id, JSON.stringify(cart));
    } else {
        var sure = confirm("are you sure you want to delete this?");
        if (sure) {
            //delete from associative array
            cart = ''
            localStorage.removeItem(id);
            location.reload();
        } else {
            th.nextSibling.innerHTML = 1
            cart.count = Number(th.nextSibling.innerHTML);
            localStorage.setItem(id, JSON.stringify(cart));
        }
    }
}
//function when add count one of items
function plus(th, id) {
    var cart = JSON.parse(localStorage.getItem(id))
    res += cart.price
    dis += Math.round(cart.discountPercentage);
    document.getElementById('t_price').innerHTML = ' $ ' + res
    document.getElementById('t_discount').innerHTML = ' $ ' + dis
    document.getElementById('total').innerHTML = ' $ ' + (res + 7 - dis)
    th.parentNode.firstChild.nextSibling.nextSibling.innerHTML = Number(th.parentNode.firstChild.nextSibling.nextSibling.innerHTML) + 1



    cart.count = Number(th.parentNode.firstChild.nextSibling.nextSibling.innerHTML);

    localStorage.setItem(id, JSON.stringify(cart));


}
//function when delete items
function del(th, id) {
    var sure = confirm("are you sure you want to delete this?");
    if (sure) {
        localStorage.removeItem(id);
        location.reload();
    }
}
document.getElementById('t_price').innerHTML = ' $ ' + res
document.getElementById('t_discount').innerHTML = ' $ ' + Math.round(dis)
document.getElementById('total').innerHTML = ' $ ' + (res + 7 - Math.round(dis))