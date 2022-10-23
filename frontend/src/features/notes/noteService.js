import axios from 'axios'

const API_URL = '/api/tickets/'

// GET user ticket notes
const getTicketNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL + ticketId + '/notes', config)

  return res.data
}

const noteService = { getTicketNotes }

export default noteService
