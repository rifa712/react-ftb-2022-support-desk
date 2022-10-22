import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { createTicket, reset } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
// components
import BackButton from '../components/BackButton'

const NewTicket = () => {
  // redux
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createTicket({
        product,
        description,
      })
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create new Ticket</h1>
        <p>Please fill the form below</p>

        <section className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Customer name</label>
            <input type='text' className='form-control' value={name} disabled />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Customer email</label>
            <input
              type='text'
              className='form-control'
              value={email}
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='product'>Product</label>
              <select
                name='product'
                id='product'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value='iPhone'>iPhone</option>
                <option value='Macbook Pro'>Macbook Pro</option>
                <option value='iMac'>iMac</option>
                <option value='iPad'>iPad</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description of the issue</label>
              <textarea
                name='description'
                id='description'
                className='form-control'
                placeholder='Description of the issue'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='form-group'>
              <button className='btn btn-block'>Submit</button>
            </div>
          </form>
        </section>
      </section>
    </>
  )
}

export default NewTicket
