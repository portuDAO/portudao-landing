// libraries
import axios from 'axios';

const getEvents = async (query: string) => {
  const path = `https://api.poap.xyz/events?name=${query}`;
  const res = await axios.get(path);
  if (res) {
    console.log('Get events service:', res);
    return res.data;
  }
  return false;
};

const getEvent = async (id: string) => {
  const path = `https://api.poap.xyz/events/id/${id}`;
  const res = await axios.get(path);
  if (res) {
    console.log('Get event service:', res);
    return res.data;
  }
  return false;
};

const getToken = async (id: string) => {
  const path = `https://api.poap.xyz/token/${id}`;
  const res = await axios.get(path);
  if (res) {
    console.log('Get event service:', res);
    return res.data;
  }
  return false;
};

export { getEvent, getEvents, getToken };
