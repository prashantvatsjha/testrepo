//console.log("Hello World!");

enum Color{
	RED,
	BLUE,
	GREEN
}

//console.log(Color.RED);

class User{
	a:number;
	b:number
	constructor(a:number, b:number){
	this.a=a;
	this.b=b;
	}
	
	addNumber(){
	var result=this.a+this.b;
		console.log(result);
	}
}



let u=new User(1,2);

u.addNumber();