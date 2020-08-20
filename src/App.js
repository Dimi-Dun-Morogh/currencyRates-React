/* eslint-disable react/no-unused-state */
import React from 'react';

import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/RateContext';

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      rate: '',
      date: '',
      currency: {
        USD: { name: 'Доллар США', flag: USD, course: '' },
        RUB: { name: 'Российский Рубль', flag: RUB, course: '' },
        JPY: { name: 'Японская Йена', flag: JPY, course: '' },
        GBP: { name: 'Фунт Стерлингов', flag: GBP, course: '' },
        EUR: { name: 'Евро', flag: EUR, course: '' },
        CNY: { name: 'Китайский Юань', flag: CNY, course: '' },
        CHF: { name: 'Швейцарский Франк', flag: CHF, course: '' },
      },
      // calculator
      InputValue: 100,
      currencyValue: 'USD',
      result: null,
    };
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then((response) => response.json())
      .then((response) => {
        const rateArr = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'RUB', 'CHF'];
        const currency = { ...this.state.currency };

        for (let i = 0; i < rateArr.length; i += 1) {
          currency[rateArr[i]].course = response.rates[rateArr[i]];
        }
        this.setState({
          rate: response.rates,
          date: response.date,
          currency,
        });
      });
  }

  inputValueHandler = (event) => {
    this.setState({ InputValue: event.target.value, result: null });
  };

  currencyValueHandler = (event) => {
    this.setState({ currencyValue: event.target.value, result: null });
  };

  calculatorHandler = async (value) => {
    let result;
    await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
      .then((response) => response.json())
      .then((response) => {
        result = response.rates[value] * this.state.InputValue;
      });
    this.setState({ result });
  };

  render() {
    return (
      <RateContext.Provider
        value={{
          state: this.state,
          inputValueHandler: this.inputValueHandler,
          calculatorHandler: this.calculatorHandler,
          currencyValueHandler: this.currencyValueHandler,
        }}
      >
        <Layout />
      </RateContext.Provider>
    );
  }
}

export default App;
