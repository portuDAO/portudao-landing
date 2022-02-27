// libraries
import axios from 'axios';

const canClaim = async (eventId: string) => {
  const path = `http://apiportudao.ddns.net:8080/api/event/${eventId}/canClaim`;
  const res = await axios.get(path);
  if (res) {
    console.log('Can  claim service:', res);
    return res.data;
  }
  return false;
};

export default canClaim;
