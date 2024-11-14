const currencyone = document.getElementById('currency-one');
const currencytwo = document.getElementById('currency-two');
const currencyamount = document.getElementById('amount-one');
const currencyamount2 = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculation(){
    const currencyonecode = currencyone.value;
    const currencytwoode = currencytwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/8bfcd7e73084040dc027c68c/pair/${currencyonecode}/${currencytwoode}`)
    .then(res=> res.json())
    .then(data => {
        const conversion = data.conversion_rate;
        rate.innerText = `1 ${currencyonecode} = ${currencytwoode} ${conversion}`;
        currencyamount2 = new Intl.NumberFormat('en-US',{style: 'currency', currency:currencytwoode }).format((currencyamount));
        currencyamount2.value = amount2;
    });
}

currencyone.addEventListener('change',calculation);
currencyamount2.addEventListener('input',calculation);
currencytwo.addEventListener('change',calculation);
currencyamount2.addEventListener('input',calculation);

calculation();