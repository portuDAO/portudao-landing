// libraries
import axios from 'axios';

const path = 'https://apidao.ddns.net/api/membership';

const getNonceSignature = async () => {
  const res = await axios.get(`${path}/signature`);

  if (res && res.data) {
    console.log('Get user nonce service:', res);
    return res.data;
  }
  return false;
};

export default getNonceSignature;
