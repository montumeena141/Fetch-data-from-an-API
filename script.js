let coin=[];
let currentData=[];

const api = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

async function fetchData(){
    try{
        const response=await fetch(api);
        const data=await response.json();
        coin=data;
        currentData=[...data];

        console.log(data);
        Table(currentData);
    }catch(error){
        console.error('Error:', error);
    }
}

function Table(data) {
    const tbody=document.getElementById('tbody');
    tbody.innerHTML='';

    data.forEach(coin=>{
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${coin.image}" alt="${coin.id}" width="30" height="30">
                ${coin.name} (${coin.id})
            </td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price}</td>
            <td>$${coin.total_volume}</td>
            <td class="${coin.price_change_percentage_24h>=0?'positive': 'negative'}">
                ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>$${coin.market_cap}</td>
        `;
        tbody.appendChild(row);
    });
}



function handleSearch() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    currentData = coin.filter(coin => 
        coin.name.toLowerCase().includes(search)||
        coin.symbol.toLowerCase().includes(search)||
        coin.id.toLowerCase().includes(search)
    );
    Table(currentData);
}


function MarketCap() {
    currentData = [...currentData].sort((a, b) => b.market_cap - a.market_cap);
    Table(currentData);
}


function Percentage() {
    currentData = [...currentData].sort((a, b) => 
        b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    Table(currentData);
}


fetchData();