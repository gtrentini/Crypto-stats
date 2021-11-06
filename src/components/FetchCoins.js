import React, { useState, useEffect } from 'react';

function FetchCoins() {
  const [coins, setCoins] = useState(null);

  // + adding the use
  useEffect(() => {
    console.log('test3');
    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=1&sparkline=false'
      );
      const data = await response.json();

      // store the data into our books variable
      setCoins(data);
    }
    getData();
  }, []); // <- you may need to put the setBooks function in this array

  return (
    <>
      {coins && (
        <div className="books">
          {coins.map((coin, index) => (
            <div key={index}>
              <p>
                {index}. {coin.name} with {coin.total_volume.toLocaleString()}{' '}
                total volume
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default FetchCoins;
