// libraries
import axios from "axios"

const canClaim = async (eventId: string) => {
  const path = `https://apidao.ddns.net/api/event/${eventId}/canClaim`
  const res = await axios.get(path)
  if (res) {
    // console.log('Can claim service:', res);
    return res.data
  }
  return false
}

const claimPoap = async (eventId: string) => {
  const path = `https://apidao.ddns.net/api/event/${eventId}/claim`
  const res = await axios.get(path)
  if (res) {
    // console.log('Poap claim service:', res);
    return res.data
  }
  return false
}

export { canClaim, claimPoap }
