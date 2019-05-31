import React from 'react';
import './AddFolder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddFolder extends React.Component {

  state = {
    folderName: '',
    error: null
    }

    handleSubmit(e) {
      e.preventDefault();
    }
    

  render() {
    return (
      <form className="AddFolder">
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