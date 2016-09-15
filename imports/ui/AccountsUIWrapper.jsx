import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze }  from 'meteor/blaze'


export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    //meteor blaze to render login btns

    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container))
  }

  componentWillUnmount() {
    //clen up vlaze view

    Blaze.remove(this.view)
  }

  render() {
    //just render a placeholder container that will b filled in

    return <span ref="container"/>
  }
}
