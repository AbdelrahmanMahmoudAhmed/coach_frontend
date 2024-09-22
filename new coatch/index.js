const phoneCallsNumArr = [
    {name:"abdelrahman" , num:14},
    {name:"ahmed",num:2},
    {name:"huda" , num :3},
    {name:"ahmed" , num :8},
    {name:"abdelrahman",num:4},
    {name:"mostafa" , num :9},
    {name :"huda" ,num :7},

]

const theResult = phoneCallsNumArr.reduce((acc , item)=>{

    const current = item.name;
    if(acc.hasOwnProperty(current)){
         acc[current] = acc[current] + item.num
    }else{
        acc[current] = item.num
    }

    return acc

} , {})

const theResultArr = [];

for(item in theResult){
    theResultArr.push({name:item , num : theResult[item]})
}

const sortedArr = theResultArr.sort((a,b)=> a.num - b.num)

const searchFunction = ( name ) => {
  return  theResult[name] ? {name , num: theResult[name]} : 'worng name';
} 

// console.log(searchFunction('abdelrahman'))
// console.log(searchFunction('abdeslrahman'))
// console.log(sortedArr);
// setTimeout(()=>console.log("setTimeout") , 0)
// queueMicrotask(()=>console.log("queueMicrotask"))
// console.log("hello")



    // let a = 10;

    // if(true){
    //     let a = 2;
    // }

    // console.log("a" , a)



    function a (){
        for(var i = 0 ; i <= 3 ; i++){

            setTimeout(()=>{
                console.log("i => " , i);
            }, i * 1000);
        }
    }

    a();
