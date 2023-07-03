
class Adress{
    constructor(streetAdress,city,country){
        this.streetAdress=streetAdress
        this.city=city
        this.country=country
    }
    toString(){
        return `adress: ${this.streetAdress}, 
        ${this.city}, ${this.country}
        `
    }
    deepCopy(){
        // копієюмо особу
        return new Adress(
            this.streetAdress,this.city,this.country
        )
    }
}




class Person{
    constructor(name,adress){
        this.name=name
        this.adress=adress
    }
    toString(){
        return `${this.name} lives at ${this.adress}`
    }
    deepCopy(){
        // копієюмо особу
        return new Person(
            this.name,this.adress.deepCopy()
        )
    }
}
// можемо копіювати адресу якщо вона повторюється
let john=new Person('john',new Adress('123 London road','london','UK'))

// неправильно
// let jane=john
// jane.name='Jane'
// jane.adress.streetAdress='321 Angel str'

// console.log(john.toString());
// console.log(jane.toString());

let jane=john.deepCopy()
jane.name='Jane'
jane.adress.streetAdress='321 Angel str'

console.log(john.toString());
console.log(jane.toString());