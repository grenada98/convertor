let myHeaders = new Headers();
myHeaders.append("apikey", "GgAucr5Io51y0F3j8Dw17DGzGzJxfQA5");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

async function fetchCurrencyData(rates, setRates, setIsLoad) {
    try {
        await fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD",requestOptions)
        .then(response => response.json())
        .then(data=> {
            setRates(data.rates)});
        setIsLoad(true);
    } catch (error) {
        setIsLoad(false);
        console.log(error);
    }
}

export default fetchCurrencyData;