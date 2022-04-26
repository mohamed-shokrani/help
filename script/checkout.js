var keys = Object.keys(localStorage);

var i = keys.length;
var res = 0,
    dis = 0;
if (i > 0) {
    for (let n of keys) {
        var item = JSON.parse(localStorage.getItem(n))
        res += item.count * item.price
        dis += item.count * Math.round(item.discountPercentage)

    }

}
res = res - dis + 7;
document.getElementById('Price').value = res + '$'
document.getElementById('pay').innerHTML = 'Pay ' + res + '$'
var regex_name = /^[A-Za-z\s]*$/
var regex_visa_code = /^4[0-9]{12}(?:[0-9]{3})?$/
var regex_Maestro_code = /(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}/
var regex_AmericanExpress_code = /^3[47][0-9]{13}$/
var regex_Discover_code = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
var regex_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
var regex_securitcod = /^[0-9]{3}$/
var regex_securitcod2 = /^[0-9]{4}$/
var scode = 0;
var t1, t2, t3, t4;
var x = {
    'card': false
}
document.getElementById('NameOnCard').onblur = function() {

    t1 = regex_name.test(document.getElementById('NameOnCard').value);
    console.log(t1)
    if (t1 == true && document.getElementById('NameOnCard').value != '') {
        document.getElementById('NameOnCard').style.border = '2px solid rgb(43, 209, 140)'
        document.getElementById('p_name').innerHTML = ''
    } else {
        document.getElementById('NameOnCard').style.border = '2px solid red'
        document.getElementById('p_name').innerHTML = ' Name on Card not vaild'
    }

}
document.getElementById('visa').onclick = function() {

    document.getElementById('mastercard').style.fontSize = '40px'
    document.getElementById('amex').style.fontSize = '40px'
    document.getElementById('discover').style.fontSize = '40px'
    x = {}
    x['visa'] = regex_visa_code;
    console.log(x['visa'])
    document.getElementById('visa').style.fontSize = '50px';


};
document.getElementById('mastercard').onclick = function() {
    document.getElementById('visa').style.fontSize = '40px'
    document.getElementById('amex').style.fontSize = '40px'
    document.getElementById('discover').style.fontSize = '40px'
    document.getElementById('mastercard').style.fontSize = '50px';
    x = {
        'card': true
    }
    x['mastercard'] = regex_Maestro_code;
    console.log(x)
};
document.getElementById('amex').onclick = function() {
    document.getElementById('visa').style.fontSize = '40px'
    document.getElementById('amex').style.fontSize = '50px'
    document.getElementById('discover').style.fontSize = '40px'
    document.getElementById('mastercard').style.fontSize = '40px';
    x = {
        'card': true
    }
    x['amex'] = regex_AmericanExpress_code;
    console.log(x)
};
document.getElementById('discover').onclick = function() {
    document.getElementById('visa').style.fontSize = '40px'
    document.getElementById('amex').style.fontSize = '40px'
    document.getElementById('discover').style.fontSize = '50px'
    document.getElementById('mastercard').style.fontSize = '40px';
    x = {
        'card': true
    }
    x['discover'] = regex_Discover_code;
    console.log(x)
};
document.getElementById('CardNumber').onfocus = function() {

    if (x['card'] == false) {
        alert('please select credit card type ')
        location.reload();
    }
}
document.getElementById('CardNumber').onblur = function() {
    if (x['card'] != true) {
        var reg = Object.values(x)
        var key = Object.keys(x)[0]
        t2 = reg[0].test(document.getElementById('CardNumber').value);
        console.log(t2)


        if (t2 == true && key != 'discover') {
            var v = document.getElementById('CardNumber').value;
            scode = Number(v.substring(v.length - 3, v.length));
        }
        if (t2 == true) {
            document.getElementById('CardNumber').style.border = '2px solid rgb(43, 209, 140)'
            document.getElementById('p_number').innerHTML = ''
        } else {
            document.getElementById('CardNumber').style.border = '2px solid red'
            document.getElementById('p_number').innerHTML = 'Card ' + key + ' Number not vaild'
        }
    }

}
document.getElementById('ZipCode').onblur = function() {

    t3 = regex_zip.test(document.getElementById('ZipCode').value);
    console.log(t3)
    if (t3 == true) {
        document.getElementById('ZipCode').style.border = '2px solid rgb(43, 209, 140)'
        document.getElementById('p_zip').innerHTML = ''
    } else {
        document.getElementById('ZipCode').style.border = '2px solid red'
        document.getElementById('p_zip').innerHTML = ' Zip not vaild'
    }
}
document.getElementById('SecurityCode').onblur = function() {
    var key = Object.keys(x)[0]
    if (key == 'discover') {
        t4 = regex_securitcod2.test(document.getElementById('SecurityCode').value);
        if (t4 == true) {
            document.getElementById('SecurityCode').style.border = '2px solid rgb(43, 209, 140)'
            document.getElementById('p_security').innerHTML = ''
        } else {
            document.getElementById('SecurityCode').style.border = '2px solid red'
            document.getElementById('p_security').innerHTML = ' Security code not vaild'
        }
    } else {
        t4 = regex_securitcod.test(document.getElementById('SecurityCode').value);
        if (t4 == true && Number(document.getElementById('SecurityCode').value) == scode) {
            document.getElementById('SecurityCode').style.border = '2px solid rgb(43, 209, 140)'
            document.getElementById('p_security').innerHTML = ''
        } else {
            document.getElementById('SecurityCode').style.border = '2px solid red'
            document.getElementById('p_security').innerHTML = ' Security code not vaild'
        }
    }
}
document.getElementById('pay').onclick = function() {
    if (t1 == true && t2 == true && t3 == true && t4 == true) {
        localStorage.clear();
        location.assign('cart.html')
    } else {
        alert('Please Enter Your Data vaild')
    }
}