const mainUrl = 'https://www.youtube.com/watch?v=hvPGfcAgk9Y&list=PLPNW_gerXa4OoypUEgZI7uouI12WZrxeS&index=2';

const newUrl = new URL(mainUrl);
console.log("newUrl: ", newUrl);

const searchParams = newUrl.searchParams;
console.log("searchParams: ", searchParams);

const searchParams2 = new URLSearchParams(newUrl.search);
console.log("searchParams2: ", searchParams2);

const obj1 = Object.fromEntries(searchParams);
console.log("obj1: ", obj1);

const obj2 = Object.fromEntries(searchParams2);
console.log("obj2: ", obj2);