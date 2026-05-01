import { FaPhone, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const Contacts = () => {
  return (
    <section className='py-24 bg-gray-50'>
      <div className='container mx-auto px-4'>

        <div className='text-center mb-12'>
          <p className='font-tertiary uppercase text-[15px] tracking-[6px]'>Зв'яжіться з нами</p>
          <h2 className='font-primary text-[45px]'>Контакти</h2>
        </div>

        <div className='flex flex-col lg:flex-row gap-10'>

          <div className='flex flex-col gap-8 lg:w-1/3 justify-center'>

            <div className='flex items-start gap-4'>
              <div className='bg-accent p-3 rounded-full text-white shrink-0'>
                <FaMapMarkerAlt className='text-xl' />
              </div>
              <div>
                <h4 className='font-primary text-xl mb-1'>Адреса</h4>
                <p className='text-gray-600 leading-relaxed'>
                  Україна, смт Ворохта<br />
                  вул. Данила Галицького, 146
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='bg-accent p-3 rounded-full text-white shrink-0'>
                <FaPhone className='text-xl' />
              </div>
              <div>
                <h4 className='font-primary text-xl mb-1'>Телефон</h4>
                <a
                  href='tel:+380970055678'
                  className='text-gray-600 hover:text-accent transition-colors'
                >
                  +380 (97) 005 56 78
                </a>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='bg-accent p-3 rounded-full text-white shrink-0'>
                <FaUser className='text-xl' />
              </div>
              <div>
                <h4 className='font-primary text-xl mb-1'>Менеджер</h4>
                <p className='text-gray-600'>Лілія</p>
              </div>
            </div>

          </div>

          <div className='lg:w-2/3 h-[400px] rounded-xl overflow-hidden shadow-lg'>
            <iframe
              title='Runa Booking Map'
              src='https://maps.google.com/maps?q=48.2663,24.5688&z=17&output=embed'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacts;
