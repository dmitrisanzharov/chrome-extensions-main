export function convertUrlToObject(url){
    return Object.fromEntries(new URL(url).searchParams)
};

// const test1 = convertUrlToObject('https://www.youtube.com/watch?v=AXuSAF5C0V4');
// console.log("test1: ", test1);

// const test2 = convertUrlToObject('https://youtu.be/AXuSAF5C0V4?si=u2C8r-lH93r2FZl_&t=97');
// console.log("test2: ", test2);
