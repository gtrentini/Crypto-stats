console.log('start of scripts.js4');

async function fetchCoins() {
  // document.querySelector('.coin-conatiner').innerHTML = '';
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=1&sparkline=false'
  );
  const coinsVolume = await res.json();
  coinsVolume.map((coin, index) => {
    const numberLocale = coin.total_volume.toLocaleString();
    const li = `<li>${index}. ${coin.id} with ${numberLocale} total volume</li>`;
    document
      .querySelector('.coin-conatiner')
      .insertAdjacentHTML('beforeend', li);
    return null;
  });

  return null;
}

fetchCoins();
