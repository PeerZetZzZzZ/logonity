const axios = require('axios');
const TokenRepository = require('../repository/token-repository');

const checkExchanges = () => {
  const checkGateIo = async () => {
    const response = await axios.get('https://data.gateio.io/api2/1/ticker/ae_usdt');
    TokenRepository.updateTokenExchangeEntry({
      volume24: Number(response.data.baseVolume),
      price: Number(response.data.last),
      exchangeName: 'GATE.IO',
    });
  };
  const checkBinance = async () => {
    const response = await axios.get('https://api.binance.com/api/v1/ticker/24hr?symbol=AEBTC');
    TokenRepository.updateTokenExchangeEntry({
      volume24: Number(response.data.volume),
      price: Number(response.data.lastPrice),
      exchangeName: 'Binance',
    });
  };

  const checkBithumb = async () => {
    const response = await axios.get('https://api.bithumb.com/public/ticker/ae');
    TokenRepository.updateTokenExchangeEntry({
      volume24: Number(response.data.data.volume_1day),
      price: Number(response.data.data.average_price),
      exchangeName: 'Bithumb',
    });
  };

  const checkUex = async () => {
    const response = await axios.get('https://open-api.uex.com/open/api/get_ticker?symbol=aebtc');
    TokenRepository.updateTokenExchangeEntry({
      volume24: Number(response.data.data.vol),
      price: Number(response.data.data.last),
      exchangeName: 'Uex',
    });
  };

  checkGateIo();
  checkBinance();
  checkBithumb();
  checkUex();
};

setInterval(checkExchanges, global.properties.checkExchangesIntervalMillisecs);
