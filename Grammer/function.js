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
    console.log("화살표 함수1 " + word);
}
arrow("arrow function")

//하나일땐 괄호 생략 가능
arrow = word => {
    console.log("화살표 함수 축약2 " + word);
}
arrow("arrow function")

//함수 내용이 한줄일땐 중괄호 생략 가능
arrow = word =>  console.log("화살표 함수3 " + word);
arrow("arrow function")