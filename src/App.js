/* eslint-disable react/no-unused-state */
import React from 'react';

import './App.scss';
import axios from 'axios';
import Layout from './components/layout/Layout';
import { RateContext } from './context/RateContext';

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';
import { Input } from './components/input/Input';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class App extends React.Component {
  static validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'email',
          errorMessage: 'Введите корректный Email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          label: 'Пароль',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
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

      // sample

      sample: { base: 'USD', base2: 'RUB', date: '', course: '' },
      sampleList: '',
      showModal: false,
      IsFormValid: false,
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
    axios('https://rateapp-react.firebaseio.com/sample.json').then((response) =>
      this.setState({ sampleList: response.data }),
    );
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWRV3Vl-yHPmHCmmzK8Byv2B-amRFlsio',
        authData,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  signUpHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWRV3Vl-yHPmHCmmzK8Byv2B-amRFlsio',
        authData,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  modalShowHandler = () => {
    this.setState({ showModal: true });
  };

  modalHideHandler = () => {
    this.setState({ showModal: false });
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = App.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({ formControls, isFormValid });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  };

  baseHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base: event.target.value },
    });
  };

  base2Handler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base2: event.target.value },
    });
  };

  sampleDateHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, date: event.target.value },
    });
  };

  dataWrite = async () => {
    const { date, base, base2 } = this.state.sample;
    await axios(`https://api.exchangeratesapi.io/${date}?base=${base}`).then(
      ({ data }) => {
        this.setState({
          sample: {
            ...this.state.sample,
            course: data.rates[base2],
          },
        });
      },
    );

    await axios
      .post(
        'https://rateapp-react.firebaseio.com/sample.json',
        this.state.sample,
      )
      .then((response) => response);
    await axios(
      'https://rateapp-react.firebaseio.com/sample.json',
    ).then((response) => this.setState({ sampleList: response.data }));
  };

  sampleRemove = async (id) => {
    const sampleList = { ...this.state.sampleList };
    delete sampleList[id];
    this.setState({ sampleList });

    await axios.delete(
      `https://rateapp-react.firebaseio.com/sample/${id}.json`,
    );
  };

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
          baseHandler: this.baseHandler,
          base2Handler: this.base2Handler,
          sampleDateHandler: this.sampleDateHandler,
          dataWrite: this.dataWrite,
          sampleRemove: this.sampleRemove,
          renderInputs: this.renderInputs,
          modalShowHandler: this.modalShowHandler,
          modalHideHandler: this.modalHideHandler,
          loginHandler: this.loginHandler,
          signUpHandler: this.signUpHandler,
        }}
      >
        <Dark
          showModal={this.state.showModal}
          modalHideHandler={this.modalHideHandler}
        />
        <Modal />
        <Layout />
      </RateContext.Provider>
    );
  }
}

export default App;
