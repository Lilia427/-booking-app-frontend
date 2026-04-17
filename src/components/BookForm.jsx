import { useState } from 'react';
import { useRoomContext } from '../context/RoomContext';


const BookForm = () => {

  const { handleCheck } = useRoomContext();

  const [bookingData, setBookingData] = useState({
    checkIn: '2026-04-20',
    checkOut: '2026-04-25',
    adults: 2,
    children: 1,
    roomType: 'luxary',
    name: 'John Smith',
    phone: '+380991112233',
    status: 'booked',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? Number(value) : value,
    }));
  };

  const onSubmit = (e) => {
    handleCheck(e);
    console.log('Booking payload:', bookingData);
  };


  return (
    <form className='w-full bg-white p-6 shadow-lg rounded-xl' onSubmit={onSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        <div>
          <label htmlFor='checkIn' className='block mb-1 text-sm font-medium text-primary'>
            Check In
          </label>
          <input
            id='checkIn'
            name='checkIn'
            type='date'
            value={bookingData.checkIn}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='checkOut' className='block mb-1 text-sm font-medium text-primary'>
            Check Out
          </label>
          <input
            id='checkOut'
            name='checkOut'
            type='date'
            value={bookingData.checkOut}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='adults' className='block mb-1 text-sm font-medium text-primary'>
            Adults
          </label>
          <input
            id='adults'
            name='adults'
            type='number'
            min='1'
            value={bookingData.adults}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='children' className='block mb-1 text-sm font-medium text-primary'>
            Children
          </label>
          <input
            id='children'
            name='children'
            type='number'
            min='0'
            value={bookingData.children}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='roomType' className='block mb-1 text-sm font-medium text-primary'>
            Room Type
          </label>
          <select
            id='roomType'
            name='roomType'
            value={bookingData.roomType}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
          >
            <option value='superior'>Superior</option>
            <option value='signature'>Signature</option>
            <option value='deluxe'>Deluxe</option>
            <option value='luxary'>Luxary</option>
            <option value='suite'>Suite</option>
          </select>
        </div>

        <div>
          <label htmlFor='name' className='block mb-1 text-sm font-medium text-primary'>
            Full Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={bookingData.name}
            onChange={handleInputChange}
            placeholder='John Smith'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='phone' className='block mb-1 text-sm font-medium text-primary'>
            Phone
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            value={bookingData.phone}
            onChange={handleInputChange}
            placeholder='+380991112233'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
            required
          />
        </div>

        <div>
          <label htmlFor='status' className='block mb-1 text-sm font-medium text-primary'>
            Status
          </label>
          <select
            id='status'
            name='status'
            value={bookingData.status}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent'
          >
            <option value='booked'>Booked</option>
            <option value='pending'>Pending</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>

        <button
          type='submit'
          className='btn btn-primary md:col-span-2 lg:col-span-4 mt-2'
        >
          Book Now
        </button>

      </div>
    </form>
  );
};

export default BookForm;
