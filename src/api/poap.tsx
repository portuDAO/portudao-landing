// libraries
import axios from 'axios';

const getEvents = async (query: string) => {
  const path = `http://api.poap.xyz/events?name=${query}`;
  const res = await axios.get(path);
  if (res) {
    console.log('Get events service:', res);
    return res.data;
  }
  return false;
};

export default getEvents;
