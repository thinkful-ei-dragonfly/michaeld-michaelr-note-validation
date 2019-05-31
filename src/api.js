const BASE_URL = "http://localhost:9090";

const API = {
  getData: () => {
    return fetch(`${BASE_URL}/db`).then(res => res.json());
  },

  deleteNote: id => {
    fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
  },

  addFolder: folder => {
    fetch(`${BASE_URL}/folders/`, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json"
      }
    });
  },

  addNote: note => {
    fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json"
      }
    })
  },

  
}

export default API;
