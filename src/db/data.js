import { FaWifi, FaCoffee, FaBath, FaParking, FaSwimmingPool, FaHotdog, FaStopwatch, FaCocktail } from 'react-icons/fa';
import images from '../assets';

export const roomData = [
  {
    id: 1,
    name: 'Котедж Полонина',
    description:
      'Затишний котедж серед гір з панорамним видом на полонини. Ідеально підходить для компанії друзів або сімейного відпочинку. Простора тераса, свіже гірське повітря та тиша дозволяють повністю відключитись від міста і перезавантажитись.',
    facilities: [
      { name: 'Wi-Fi', icon: FaWifi },
      { name: 'Кава', icon: FaCoffee },
      { name: 'Ванна', icon: FaBath },
      { name: 'Паркінг', icon: FaParking },
      { name: 'Басейн', icon: FaSwimmingPool },
      { name: 'Сніданок', icon: FaHotdog },
      // { name: 'Тренажерний зал', icon: FaStopwatch },
      { name: 'Напої', icon: FaCocktail },
    ],
    size: 30,
    maxPerson: 10,
    price: 1115,
    image: images.Room1Img,
    imageLg: images.Room1ImgLg,
    gallery: [images.Room1Img001, images.room111, images.Room1Img],
  },
  {
    id: 2,
    name: 'Котедж Затишок',
    description:
      'Комфортний котедж з атмосферою домашнього тепла. Підійде для спокійного відпочинку, романтичних поїздок або невеликої компанії. Інтер’єр виконаний у сучасному стилі з дерев’яними елементами, що створює відчуття справжнього карпатського релаксу.',
    facilities: [
      { name: 'Wi-Fi', icon: FaWifi },
      { name: 'Кава', icon: FaCoffee },
      { name: 'Ванна', icon: FaBath },
      { name: 'Паркінг', icon: FaParking },
      { name: 'Басейн', icon: FaSwimmingPool },
      { name: 'Сніданок', icon: FaHotdog },
      // { name: 'Тренажерний зал', icon: FaStopwatch },
      { name: 'Напої', icon: FaCocktail },
    ],
    size: 70,
    maxPerson: 7,
    price: 1200,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
    gallery: [images.room222, images.Room2Img, images.room223],
  },
  {
    id: 3,
    name: 'Котедж Верховини',
    description:
      'Великий котедж для масштабного відпочинку в серці Карпат. Ідеальний варіант для великих компаній, святкувань або сімейних зустрічей. Багато простору, краєвиди на гори та максимальний комфорт для кожного гостя.',
    facilities: [
      { name: 'Wi-Fi', icon: FaWifi },
      { name: 'Кава', icon: FaCoffee },
      { name: 'Ванна', icon: FaBath },
      { name: 'Паркінг', icon: FaParking },
      { name: 'Басейн', icon: FaSwimmingPool },
      { name: 'Сніданок', icon: FaHotdog },
      // { name: 'Тренажерний зал', icon: FaStopwatch },
      { name: 'Напої', icon: FaCocktail },
    ],
    size: 50,
    maxPerson: 14,
    price: 2650,
    image: images.Room3Img,
    imageLg: images.Room3ImgLg,
    gallery: [images.room331, images.Room3Img, images.room333],
  },
];