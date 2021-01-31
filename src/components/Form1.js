import React, { Component } from 'react';
import axios from 'axios';
import './Form1.css';

class Form1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idCard: '',
      Name: '',
      dateOfBirth: '',
      showResult: false,
      result: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { idCard, Name, dateOfBirth } = this.state;

    const user = {
      idCard,
      Name,
      dateOfBirth,
    };

    const result = await axios
      .post('https://seekster-test.herokuapp.com/submit', user)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.resolve(null);
      });
    console.log('🚀 ~ Form1 ~ .then ~ this.state.result', result);
    this.setState({
      result: result,
      showResult: true,
    });
  };

  componentDidUpdate() {
    if (this.state.showResult && this.state.result) {
      document.getElementById('result').innerHTML =
        'FirstName: ' +
        this.state.result.FirstName +
        '<br />' +
        'LastName: ' +
        this.state.result.LastName +
        '<br />' +
        'Age: ' +
        this.state.result.Age +
        '<br />';
    } else if (this.state.showResult && !this.state.result) {
      document.getElementById('result').innerHTML = 'Something Incorrect.';
    }
  }

  render() {
    return (
      <div className='form1'>
        <br />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h1>Seekster TEST</h1>
            <p id='result' />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='idCard'
                placeholder='ID Card'
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Name'
                placeholder='FirstName LastName'
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='dateOfBirth'
                placeholder='Date of Birth (Ex. 01/01/1996)'
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className='submit-btn' style={{ width: '30%' }}>
              <button className='btn btn-success' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form1;
