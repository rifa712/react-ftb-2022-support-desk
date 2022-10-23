import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/ticket/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  )

  const { ticketId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [message, isError, ticketId])

  const onTicketClosed = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed')
    navigate('/tickets')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <div className='ticket-header'>
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
      </div>

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClosed}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
