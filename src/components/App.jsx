import React, { Component } from 'react';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
//----------- external imports
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-9', name: 'Rosie Carmen', number: '459-12-56' },
        { id: 'id-7', name: 'rosie Fernando', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      contactsFiltered: [],
      name: '',
      number: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleDelete(e) {
    const name = e.target.parentNode.firstChild.data;
    this.setState( (prevState) => (
      Swal.fire(`${name} eliminado!`),
      {
        contacts: [...prevState.contacts.filter( item => item.name !== name )],
        contactsFiltered: [...prevState.contactsFiltered.filter( item => item.name !== name )]
      }
    ));
  }

  handleReset = e => {
    this.setState({ ...INITIAL_STATE });
    e.target[0].value = '';
    e.target[1].value = '';
  };

  handleChange = evt => {
    const {name, value} = evt.target;
    this.setState( () => ({
      [name]: value,
    }));
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;

    if (contacts.map(item => item.name).includes(name)) {
      Swal.fire('El contacto ya existe!');
    }
    else if (contacts.map(item => item.number).includes(number)) {
      Swal.fire('Este numero ya esta agregado!');
    }
    else {
      const id = "id-" + contacts.length + "-" + nanoid(2);
      this.setState( prevState => ({
        contacts: [...prevState.contacts, {id, number, name}],
      }));
    }
    this.handleReset(evt);
  };

  handleFilter(evt) {
    const value = evt.target.value;
    const { contacts } = this.state;
    const aux = contacts.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ contactsFiltered: aux });
  }

  render() {
    return (
      <div className={css.container}>
        <ContactForm
          handleReset={this.handleReset}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Filter
          {...this.state}
          handleFilter={this.handleFilter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
