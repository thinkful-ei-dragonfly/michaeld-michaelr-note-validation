import React from 'react';
import './AddFolder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddFolder extends React.Component {

  state = {
    error: null
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const addedFolder = e.target['folder-name'].value;
      this.props.addFolder(addedFolder);
      e.target['folder-name'].value = '';
    }
    
  render() {
    console.log(this.props)
    return (
      <form className="AddFolder" onSubmit={this.handleSubmit}>
        <label htmlFor="folder-name">Folder Name:</label>
        <input type="text" name="folder-name" id="folder-name"/>
        <button type="submit">
          <FontAwesomeIcon icon='plus' />
          <br />
          Add
        </button>
      </form>
    )
  }
}

export default AddFolder;