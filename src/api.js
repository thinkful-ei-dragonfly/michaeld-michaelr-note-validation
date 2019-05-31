const BASE_URL = 'http://localhost:9090';

const API = {
  getData : () => {
    return fetch(`${BASE_URL}/db`)
      .then(res => res.json())
  },

  deleteNote: (id) => {
    fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export default API;