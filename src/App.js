import { useEffect, useState, useRef } from 'react';
import './App.scss';
import {InputType} from './components/InputType';
import fetchCurrencyData from './services/fetchCurrencyData';

function App() {
  const [isLoad, setIsLoad] = useState(false);

  const [activeInputs, setActiveInputs] = useState(false); //активны ли инпуты?

  const [firstCurrency, setFirstCurrency] = useState(''); //установка валюты UAH/USD/EUR для 1 селекта
  const [secondCurrency, setSecondCurrency] = useState(''); //для 2 селекта


  const [firstInput, setFirstInput] = useState(0); //значение 1 инпута
  const [secondInput, setSecondInput] = useState(0); //значение 2 инпута


  const [rates, setRates] = useState([])

  useEffect(()=>{
    if(!rates.length){
      fetchCurrencyData(rates, setRates, setIsLoad)
    }
  }, [])

  useEffect(()=>{
    getActive()
  }, [firstCurrency, secondCurrency])
  
  function getActive(){
    if(firstCurrency&&secondCurrency){
      if(!activeInputs){setActiveInputs(true)};
    }
  }

  function ConverterSecond(e){
    if(activeInputs) {
      const result = (e / rates[firstCurrency]) * rates[secondCurrency];
      setFirstInput(e);
      setSecondInput(result)}
  }
  
  function ConverterFirst(e){
    if(activeInputs) {
      const result = (rates[firstCurrency] / rates[secondCurrency]) * e;
      setSecondInput(e)
      setFirstInput(result)
    }
  }
 
  return (
    <div className="App">
      {!isLoad?<div className='load-data'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : null}
      <header>
        <nav>
          <div className="exchange-value">USD : UAH {(rates.UAH)?.toFixed(2)}</div>
          <div className="exchange-value">EUR : UAH {((1/rates.EUR) * rates.UAH)?.toFixed(2)}</div>
        </nav>
      </header>
      <div className="main">
        <div className='convertor__wrapper'>
          <InputType
                      currency={firstCurrency}
                      setCurrency={setFirstCurrency} 
                      rates={rates}
                      getActive={getActive} 
                      finishValue={ConverterSecond} 
                      activeInput={activeInputs}
                      valueInput={firstInput}
                      setValueInput={setFirstInput}/>
          <InputType 
                      currency={secondCurrency}
                      setCurrency={setSecondCurrency} 
                      rates={rates}
                      getActive={getActive} 
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
