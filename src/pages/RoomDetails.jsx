import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown, ScrollToTop } from '../components';
import { useRoomContext } from '../context/RoomContext';
import { hotelRules } from '../constants/data';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';


const RoomDetails = () => {

  const { id } = useParams(); // id get form url (/room/:id) as string...
  const { rooms, adults, kids, checkIn, checkOut } = useRoomContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const room = rooms.find(room => room.id === +id);

  // for (const key in room) {
  //   console.log(key);
  // }

  const { name, description, facilities, price, imageLg } = room ?? {};

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().slice(0, 10);
  };

  const cottageNameById = {
    1: 'Котедж Полонина',
    2: 'Котедж Затишок',
    3: 'Котедж Верховини',
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const guestName = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const reservationName = cottageNameById[Number(id)] || guestName;

    const payload = {
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      adults: parseInt(adults, 10) || 0,
      children: parseInt(kids, 10) || 0,
      roomType: reservationName,
      name: guestName,
      phone,
      id,
      status: 'pending',
    };

    if (!payload.checkIn || !payload.checkOut || !payload.name || !payload.phone) {
      alert('Please fill check-in, check-out, name and phone.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('https://api.runabooking.me/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      alert('Reservation sent successfully.');
  form.reset();
    } catch (error) {
      console.error('Reservation submit error:', error);
      // alert('Failed to send reservation. Please try again.');
      alert(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>

      <ScrollToTop />

      <div className='bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-5xl text-white z-20 font-primary text-center'>{name} Деталі</h1>
      </div>


      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row lg:gap-x-8 h-full py-24'>

          {/* ⬅️⬅️⬅️ left side ⬅️⬅️⬅️ */}
          <div className='w-full lg:w-[60%] h-full text-justify'>

            <h2 className='h2'>{name}</h2>
            <p className='mb-8'>{description}</p>
            <img className='mb-8' src={imageLg} alt="roomImg" />

            <div className='mt-12'>
              <h3 className='h3 mb-3'></h3>
              <p className='mb-12'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis accusantium sapiente quas quos explicabo, odit nostrum? Reiciendis illum dolor eos dicta. Illum vero at hic nostrum sint et quod porro. </p>

              {/* icons grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {
                  facilities.map((item, index) =>
                    <div key={index} className='flex items-center gap-x-3 flex-1'>
                      <div className='text-3xl text-accent'>{<item.icon />}</div>
                      <div className='text-base'>{item.name}</div>
                    </div>
                  )
                }
              </div>
            </div>

          </div>


          {/* ➡️➡️➡️ right side ➡️➡️➡️ */}
          <div className='w-full lg:w-[40%] h-full'>

            {/* reservation */}
            <div className='py-8 px-6 bg-accent/20 mb-12'>

              <form onSubmit={handleReservationSubmit}>
                <div className='flex flex-col space-y-4 mb-4'>
                  <h3>Ваше бронювання</h3>
                  <div className='h-[60px]'> <CheckIn /> </div>
                  <div className='h-[60px]'> <CheckOut /> </div>
                  <div className='h-[60px]'> <AdultsDropdown /> </div>
                  <div className='h-[60px]'> <KidsDropdown /> </div>
                  <div className='h-[60px]'>
                    <input
                      type='text'
                      name='name'
                      // defaultValue='John Smith'
                      placeholder='Your name'
                      className='w-full h-full bg-white px-6 outline-none'
                      required
                    />
                  </div>
                  <div className='h-[60px]'>
                    <input
                      type='tel'
                      name='phone'
                      // defaultValue='+380991112233'
                      placeholder='Your phone'
                      className='w-full h-full bg-white px-6 outline-none'
                      required
                    />
                  </div>
                </div>

                <button type='submit' disabled={isSubmitting} className='btn btn-lg btn-primary w-full'>
                  {isSubmitting ? 'sending...' : `book now for $${price}`}
                </button>
              </form>
            </div>

            <div>
              <h3 className='h3'>Hotel Rules</h3>
              <p className='mb-6 text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolores iure fugiat eligendi illo est, aperiam quasi distinctio necessitatibus suscipit nemo provident eaque voluptas earum.
              </p>

              <ul className='flex flex-col gap-y-4'>
                {
                  hotelRules.map(({ rules }, idx) =>
                    <li key={idx} className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      {rules}
                    </li>
                  )
                }
              </ul>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default RoomDetails;
