// libraries
import axios from 'axios';

const path = 'https://apidao.ddns.net/api/user';

const getUserNonce = async (params: any) => {
  const res = await axios.get(`${path}/nonce?publicAddress=${params.publicAddress}`);

  if (res && res.data) {
    console.log('Get user nonce service:', res);
    return res.data;
  }
  return false;
};

export default getUserNonce;
