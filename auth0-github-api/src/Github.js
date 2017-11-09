import React, { Component } from 'react';
import Search from './Components/Search';
import Profile from './Components/Profile';

const API = 'https://api.github.com/users'


class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: 'bijendrakarmakar',
      name: '',
      avatar: '',
      repos: '',
      homeURL: '',
      bio: '',
      notFound: ''
    };
  }

  getProfile(username){
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json() )
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        homeURL: data.html_url,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
        notFound: data.message
      })
    })
    .catch((error) => console.log('There was some problem in fetching the data'))
  }

  componentDidMount(){
    this.getProfile(this.state.username);
  }


  render(){
    return(
      <div>
        <section id='card'>
          <Search searchProfile={this.getProfile.bind(this)} />
          <Profile userData={this.state} />
        </section>
      </div>
    );
  }
}

export default Github;
