import React, { Component } from 'react'
import JoblyApi from '../JoblyApi';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleNew = this.toggleNew.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // if the state is equal then call JoblyApi.registerUser instead
    let token
    if (this.state.newUser){
      let { newUser, ...user} = this.state;
      token = await JoblyApi.registerUser(user);
    }else {
      token = await JoblyApi.loginUser(this.state.username, this.state.password);
    }
    
    // Successful log in
    if (token) {
      this.props.login(token);
      this.props.history.push('/')
    } else {
      this.props.history.push('/login')
    }

  }

  toggleNew() {
    this.setState({ newUser: !this.state.newUser })
  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const newForm = (
      <React.Fragment>
        <label htmlFor="first_name">First Name</label>
        <input onChange={this.handleChange} name="first_name" className="form-control mr-sm-2" type="text" placeholder="Enter First Name here" />

        <label htmlFor="last_name">Last Name</label>
        <input onChange={this.handleChange} name="last_name" className="form-control mr-sm-2" type="text" placeholder="Enter Last Name here" />

        <label htmlFor="email">Email</label>
        <input onChange={this.handleChange} name="email" className="form-control mr-sm-2" type="email" placeholder="Enter Email here" />
      </React.Fragment>)
    
    return (
      <div>
        <button onClick={this.toggleNew}>{this.state.newUser ? 'Log In': 'New User'}</button>
          
          <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} name="username" className="form-control mr-sm-2" type="text" placeholder="Enter username here" />

            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} name="password" className="form-control mr-sm-2" type="password" placeholder="Enter password here" />

            {this.state.newUser ? newForm : ''}
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{this.state.newUser ? 'Register' : 'Log In'}</button>
          </form>

      </div>
    )
  }
}