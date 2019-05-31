import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import API from '../api';
import cuid from 'cuid';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    API.getData().then(res => {
      this.setState(res);
    });
  }

  deleteNote = id => {
    console.log(id);
    API.deleteNote(id);
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  addFolder = folderName => {
    const folder = {
      id: cuid(),
      name: folderName
    };
    API.addFolder(folder);
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNote = data => {
    const note = {
      id: cuid(),
      name: data.name,
      modified: data.date,
      folderId: data.folderId,
      content: data.content
    }
    API.addNote(note);
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                  deleteNote={this.deleteNote}
                />
              );
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
        <Route
            path="/add-folder"
            render={() => {
                return <AddFolder addFolder={this.addFolder}/>
            }
        }
        />
        <Route
            path="/add-note"
            render={() => {
                return <AddNote addNote={this.addNote} folders={this.state.folders}/>
            }
        }
        />

      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
