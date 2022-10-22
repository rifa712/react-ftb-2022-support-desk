import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/ticket/ticketSlice'
// components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const Tickets = () => {
  const { tickets, isLoading, isSuccess, isError } = useSelector(
    (state) => state.ticket
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
    console.log('123')
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return <div>Tickets</div>
}

export default Tickets
