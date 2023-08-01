import React, { Component } from 'react';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
}

export class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (evt) => {
    console.log("name: ", evt.target.value);
    this.setState({ name: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, contacts } = this.state;
    const id = nanoid();
    contacts.push( { name, id } );
    console.log("contactos props: ", this.state);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
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
        <form onSubmit={this.handleSubmit} >
          <h3>Phonebooks</h3>
          <label htmlFor="">
            Nombre
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={this.handleChange}
              required
            />
          </label>

          <button type="submit">Add contact</button>
          {
            (this.state.contacts.length === 0) ? ( <h3>Vacio!</h3> ) : ( <h3>Tengo contactos</h3> )
          }
          <h3>Contacts</h3>
          <ul>
            {
              (this.state.contacts.length !== 0)
              ? ( <h3>Lista!</h3> )
              : null
            }
          </ul>
        </form>
      </div>
    );
  }
}
