function test(word){
    console.log("test함수 " + word);
}

test("Hello")

//익명함수
anonymous  = function(word){
    console.log("익명함수 " + word);
}
anonymous('swag')

//화살표 함수
arrow = (word) => {
    console.log("화살표 함수 " + word);
}
arrow("arrow function")
