import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class App extends Component {
  static defaultProps = {};

  static propTypes = {};

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
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleReset = e => {
    this.setState({ ...INITIAL_STATE });
    e.target[0].value = '';
    e.target[1].value = '';
  };

  handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (name === 'name') this.setState({ name: value });
    if (name === 'number') this.setState({ number: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;
    const id = nanoid();
    contacts.push({ name, number, id });
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
    const { contacts, contactsFiltered } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
          color: '#010101',
        }}
      >
        <form className={css.contactsForm} onSubmit={this.handleSubmit}>
          <h3 className={css.contactsH3}>Phonebooks</h3>
          <label htmlFor="">
            <span>Name</span>
            <br />
            <input
              type="text"
              name="name"
              className="inputName"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="">
            <span>Number</span>
            <br />
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={this.handleChange}
              required
            />
          </label>
          <button className={css.contactsBtnSubmit} type="submit">
            Add contact
          </button>
        </form>
        <h3 className={css.contactsH3}>Contacts</h3>
        <span className={css.filterText} >Find contacts by name</span>
        <input
          type="text"
          name="filter"
          className={css.inputFilter}
          onChange={this.handleFilter}
        />
        <ul className={css.contactList}>
          {this.state.contactsFiltered.length !== 0
            ? contactsFiltered.map((person, index) => (
                <li key={person.id} className={css.contactItem}>
                  {person.name}: {person.number}
                </li>
              ))
            : contacts.map((contact) => (
                <li key={contact.id} className={css.contactItem}>
                  {contact.name}: {contact.number}
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
