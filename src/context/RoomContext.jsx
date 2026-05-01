import { createContext, useContext, useEffect, useState } from "react";

const COTTAGES_API_URL = 'https://api.runabooking.me/api/cottages/';

const RoomInfo = createContext();


export const RoomContext = ({ children }) => {

  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCottages = async () => {
      try {
        const response = await fetch(COTTAGES_API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        const cottages = Array.isArray(data) ? data : (data?.data ?? []);
        setRooms(cottages);
        setAllRooms(cottages);
      } catch (error) {
        if (error.name !== 'AbortError') console.error('Failed to load cottages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCottages();
    return () => controller.abort();
  }, []);

  const [adults, setAdults] = useState('1 дорослий');
  const [kids, setKids] = useState('0 дітей');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [total, setTotal] = useState(0);


  useEffect(() => { setTotal(+adults[0] + +kids[0]) });


  const resetRoomFilterData = () => {
    setAdults('1 дорослий');
    setKids('0 дітей');
    setCheckIn(null);
    setCheckOut(null);
    setRooms(allRooms);
  };


  const handleCheck = (e) => {
    e.preventDefault();
    setLoading(true);

    const filterRooms = allRooms.filter(room => total <= (room.maxGuests ?? room.maxPerson))

    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms);
    }, 3000);
  }


  const shareWithChildren = {
    rooms, loading,
    adults, setAdults,
    kids, setKids,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    handleCheck,
    resetRoomFilterData,
  };


  return (
    <RoomInfo.Provider value={shareWithChildren}>
      {
        children
      }
    </RoomInfo.Provider>
  )
}

export const useRoomContext = () => useContext(RoomInfo);