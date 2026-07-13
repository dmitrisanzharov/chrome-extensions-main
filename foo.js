// console.log('test');

const mainUrl = 'https://www.youtube.com/watch?v=hvPGfcAgk9Y&list=PLPNW_gerXa4OoypUEgZI7uouI12WZrxeS&index=2';


 console.log('============================');
const a = new URL(mainUrl);
console.log(a); 

 console.log('============================');
const b = a.searchParams; 
console.log(b);

const b2 = new URLSearchParams(mainUrl);
console.log(b2);

 console.log('============================');
const obj = Object.fromEntries(b);
console.log(obj);