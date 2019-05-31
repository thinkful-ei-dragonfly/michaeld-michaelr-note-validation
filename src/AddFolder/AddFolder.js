import React from 'react';
import './AddFolder.css';

class AddFolder extends React.Component {
  render() {
    return (
      <form className="AddFolder">
        <label htmlFor="folder-name">Folder Name:</label>
        <input type="text" name="folder-name" id="folder-name"/>
        <button type="submit">Add new folder</button>
        <button class="cancel-button">Cancel</button>
      </form>
    )
  }
}

export default AddFolder;