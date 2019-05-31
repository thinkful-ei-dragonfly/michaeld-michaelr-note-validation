import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddNote extends React.Component {
  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const addedNote = e.target["note-name"].value;
    const addedContent = e.target["note-content"].value;

    console.log(addedNote);
    console.log(addedContent);
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
      <form className="AddNote" onSubmit={this.handleSubmit}>
        <label htmlFor="note-name">Note: </label>
        <input type="text" name="note-name" id="note-name" />
        <label htmlFor="note-content">Content: </label>
        <textarea name="note-content" id="note-content" rows="4" cols="50" />
        <select>
          {this.renderFolderOptions()}
        </select>
        <button type="submit">
          <FontAwesomeIcon icon="plus" />
          <br />
          Add Note
        </button>
      </form>
    );
  }
}

export default AddNote;
