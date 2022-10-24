import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/ticket/ticketSlice'
// components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
// pages
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  const { tickets } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (!tickets) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Products</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
