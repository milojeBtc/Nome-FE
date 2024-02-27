import axios from "axios";

const getBtcInfo = async (address, ticker) => {
    console.log('getBtcInfo func is working well ==> ');
    const payload = await axios.post("http://146.19.215.121:5005/api/verify", {
        address: address,
        ticker: ticker
    })

    let availableBalance = payload.data.result.data.availableBalance;
    console.log("availableBalance ==> ", availableBalance);
    if(availableBalance > 0){
        return true
    } else return false
}

export default getBtcInfo;