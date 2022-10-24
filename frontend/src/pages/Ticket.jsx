import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/ticket/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket } = useSelector((state) => state.tickets)

  const { notes } = useSelector((state) => state.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { ticketId } = useParams()

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
    // eslint-disable-next-line
  }, [dispatch, ticketId])

  // Close ticket
  const onTicketClosed = () => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        navigate('/tickets')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        toggleModal()
      })
      .catch(toast.error)
  }

  // open/close modal
  const toggleModal = () => {
    setModalIsOpen((prev) => !prev)
  }

  if (!ticket) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted : {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of the issue : </h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={() => toggleModal()}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel='Add note'
      >
        <h2>Add note</h2>
        <button className='btn-close' onClick={toggleModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text ...'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClosed}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
