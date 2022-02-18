// libraries
import axios from 'axios';

const getTokenTransactions = async (address: string) => {
  const path = `https://blockscout.com/xdai/mainnet/api?module=account&action=tokentx&address=${address}`;
  const res = await axios.get(path);
  if (res) {
    console.log('Get Token Transactions service:', res);
    return res.data;
  }
  return false;
};

export default getTokenTransactions;
