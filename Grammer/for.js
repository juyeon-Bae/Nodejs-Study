//forEach
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
for(let i=0; i<fruits.length; i++){
    console.log(fruits[i]);
}
fruits.forEach(f => console.log(f))

for(const f of fruits){
    console.log(f)
}