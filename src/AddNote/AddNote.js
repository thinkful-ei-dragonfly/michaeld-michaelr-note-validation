import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import timestamp from 'time-stamp';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

class AddNote extends React.Component {
  state = {
    error: null,
    hasError: false
  };

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError');
    return { hasError: true };
  }

  handleSubmit = e => {
    e.preventDefault();
    const addedNote = e.target["note-name"].value;
    if (addedNote === '') {
      this.setState({
        error: 'Please enter note name'
      })
    } else {
      const addedContent = e.target["note-content"].value;
      const addedFolderId = e.target["folder-id"].value;
      const date = timestamp('YYYY-MM-DDTHH:MM:SS.msZ');
  
      e.target["note-name"].value = ''
      e.target["note-content"].value = ''
      this.props.addNote({name: addedNote, folderId: addedFolderId, content: addedContent, date: date})
    }
  };


  renderFolderOptions() {
    const folderOptions = this.props.folders.map(folder => {
      return (
        <option value={folder.id} key={folder.id}>
          {folder.name}
          
        </option>
      )
    })
    return folderOptions;

  }
  render() {
    
    return (
      <div>
        <form className="AddNote" onSubmit={this.handleSubmit}>
          <label htmlFor="note-name">Note: </label>
          <input type="text" name="note-name" id="note-name" />
          <label htmlFor="note-content">Content: </label>
          <textarea name="note-content" id="note-content" rows="4" cols="50" />
          <select id="folder-id">
            {this.renderFolderOptions()}
          </select>
          <button type="submit">
            <FontAwesomeIcon icon="plus" />
            <br />
            Add Note
          </button>
        </form>
        <ValidationError hasError={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default AddNote;
