import axios from 'axios'

const API_URL = '/api/tickets/'

// GET user ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL + ticketId + '/notes', config)

  return res.data
}

// GET user ticket notes
const createNote = async (notetext, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(
    API_URL + ticketId + '/notes',
    { text: notetext },
    config
  )

  return res.data
}

const noteService = { getNotes, createNote }

export default noteService
