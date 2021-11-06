const coinArray = [];
const coinsToGrab = 45;
let inputStartDate = '';
let inputEndDate = '';

function doArrayStuff(coinId, totalVolume) {
  coinArray.sort((a, b) => b.volume - a.volume);
  if (coinArray.length >= coinsToGrab) {
    coinArray.map((coin, index) => {
      // const volumeLocale = coin.volume.toLocaleString({
      //   minimumIntegerDigits: 2,
      // });
      let volumeLocale = parseInt(coin.volume / 1000000000);
      volumeLocale = volumeLocale.toLocaleString();
      const coinOutput = `<tr><td><strong>${coin.name}</strong> with</td><td> ${volumeLocale} Billion</td></tr>`;
      document
        .querySelector('.total-volume')
        .insertAdjacentHTML('beforeend', coinOutput);

      return null;
    });
  }
}

async function fetchCoin(coinId, index) {
  const startDate = new Date(`${inputStartDate}T00:00:00`).getTime() / 1000;
  const endDate = new Date(`${inputEndDate}T23:59:59`).getTime() / 1000;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`
  );
  const coinData = await res.json();

  let totalVolume = 0;

  coinData.total_volumes.map((coin) => {
    totalVolume += parseFloat(coin[1]);
    return null;
  });
  const totalVolumeLocale = totalVolume.toLocaleString();
  const totalOutput = `<li>${coinId} with ${totalVolumeLocale} total volume`;
  document
    .querySelector('.coin-container2')
    .insertAdjacentHTML('beforeend', totalOutput);

  coinArray.push({ name: coinId, volume: totalVolume });
  doArrayStuff(coinId, totalVolume);

  return null;
}

async function fetchCoins() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsToGrab}&page=1&sparkline=false`
  );
  const coinsVolume = await res.json();
  coinsVolume.map((coin, index) => {
    const numberLocale = coin.market_cap.toLocaleString();
    const li = `<li>${index}. ${coin.id} with ${numberLocale} market cap</li>`;
    document
      .querySelector('.coin-container')
      .insertAdjacentHTML('beforeend', li);
    fetchCoin(coin.id, index);
    return null;
  });

  return null;
}

document.querySelector('.form-dates').addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.coin-container').innerHTML = '';
  document.querySelector('.coin-container2').innerHTML = '';
  document.querySelector('.total-volume').innerHTML = '';
  inputStartDate = document.querySelector('.start-date').value;
  inputEndDate = document.querySelector('.end-date').value;
  fetchCoins();
});
