import { useEffect, useState, useRef } from 'react';
import './App.scss';
import {InputType} from './components/InputType';
var myHeaders = new Headers();
myHeaders.append("apikey", "GgAucr5Io51y0F3j8Dw17DGzGzJxfQA5");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
function App() {
  const [isLoad, setIsLoad] = useState(true);

  const [activeInputs, setActiveInputs] = useState(false); //активны ли инпуты?

  const [firstCurrency, setFirstCurrency] = useState(''); //установка валюты UAH/USD/EUR для 1 селекта
  const [secondCurrency, setSecondCurrency] = useState(''); //для 2 селекта
  let NewExchange = `${firstCurrency}-${secondCurrency}`; //создание строки конвертирования


  const [firstInput, setFirstInput] = useState(0); //значение 1 инпута
  const [secondInput, setSecondInput] = useState(0); //значение 2 инпута

  const firstLink = useRef()
  const secondLink = useRef()
  // const [rates, setRates] = useState({
  //   "UAH-UAH": 1,
  //   "UAH-USD": 1/40,
  //   "UAH-EUR": 1/39,
  //   "USD-USD": 1,
  //   "USD-UAH": 40,
  //   "USD-EUR": 0.9,
  //   "EUR-EUR": 1,
  //   "EUR-UAH": 39,
  //   "EUR-USD": 1.1,
  //   "null-null": 0
  // })

  const [rates, setRates] = useState({
    "UAH-UAH": 1,
    "UAH-USD": null,
    "UAH-EUR": null,
    "USD-USD": 1,
    "USD-UAH": null,
    "USD-EUR": null,
    "EUR-EUR": 1,
    "EUR-UAH": null,
    "EUR-USD": null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [response1, response2] = await Promise.all([
          fetch(
            "https://api.apilayer.com/exchangerates_data/latest?symbols=UAH,EUR&base=USD",
            requestOptions
          ).then((response) => response.json()),
          fetch(
            "https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=EUR",
            requestOptions
          ).then((response) => response.json()),
        ]);
  
        const updatedRates = {
          ...rates,
          "UAH-USD": 1 / response1.rates.UAH,
          "USD-UAH": response1.rates.UAH,
          "USD-EUR": response1.rates.EUR,
          "EUR-USD": 1 / response1.rates.EUR,
          "UAH-EUR": 1 / response2.rates.UAH,
          "EUR-UAH": response2.rates.UAH,
        };
  
        setRates(updatedRates);
        setIsLoad(true);
      } catch (error) {
        setIsLoad(false);
        console.log(error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(()=>{
    getRate()
  }, [firstCurrency])

  useEffect(()=>{
    getRate()
  }, [secondCurrency])
  
  function getRate(){ //устанавливаем курс для вычислений при двух выбранных селектах
    if(firstCurrency!='' && secondCurrency!=''){
      setActiveInputs(true);
      return rates[NewExchange];
    }
    else{
      setActiveInputs(false);
    }
  }
  
  function ConverterSecond(e){ //изменяем значение второго инпута при вводе в первый
    if(activeInputs) {setSecondInput(e * getRate())}
  }
  
  function ConverterFirst(e){
    if(activeInputs) {setFirstInput(e/getRate())}
  }
 
  return (
    <div className="App">
      {!isLoad?<div className='load-data'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : null}
      <header>
        <nav>
          <div className="exchange-value">USD : UAH {rates['UAH-USD']?.toFixed(3)}</div>
          <div className="exchange-value">EUR : UAH {rates['UAH-EUR']?.toFixed(3)}</div>
        </nav>
      </header>
      <div className="main">
        <div className='convertor__wrapper'>
          <InputType
                      link={firstLink}
                      currency={firstCurrency}
                      setCurrency={setFirstCurrency} 
                      getRate={getRate} 
                      finishValue={ConverterSecond} 
                      activeInput={activeInputs}
                      valueInput={firstInput}
                      setValueInput={setFirstInput}/>
          <InputType 
                      link={secondLink}
                      currency={secondCurrency}
                      setCurrency={setSecondCurrency} 
                      getRate={getRate} 
                      finishValue={ConverterFirst} 
                      activeInput={activeInputs}
                      valueInput={secondInput}
                      setValueInput={setSecondInput}/>
        </div>
      </div>
      <footer>
        <div className='info'>API-data is from <a href="https://apilayer.com/provider" target="_blank">https://apilayer.com/provider</a></div>
      </footer>
    </div>
  );
}

export default App;
