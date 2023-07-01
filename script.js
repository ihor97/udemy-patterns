// якщо в тебе функція яка бере базовий клас то во ця ф-я мусить брати теж клас наслідник його 
class Recatangle{
    constructor(width,height){
        this._width=width
        this._height=height
    }

    get area(){
        return this._width*this._height
    }
    toString(){
        return `${this._height}*${this._width}`
    }
    get width(){
        return this._width
    }
    get height(){
        return this._height
    }
    set width(val){
         this._width=val
    }
    set height(val){
         this._height=val
    }
    
    
}
class Square extends Recatangle{
    constructor(size){
        super(size,size)
    }
    set width(val){
        this._width=this._height=val
    }
    set height(val){
        this._width=this._height=val

    }
}
// функція буде ламатися 
let useIt=function (rec) {
    let width=rec._width
    rec.height=10
    console.log(
        `expected area of ${10*width}
        got ${rec.area}`
    );


}


let rec=new Recatangle(2,3)
useIt(rec)


let sq=new Square(5)
useIt(sq)

console.log(sq.toString());
sq.width=10
console.log(sq.toString());




