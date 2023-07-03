
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

}




class Person{
    constructor(name,adress){
        this.name=name
        this.adress=adress
    }
    toString(){
        return `${this.name} lives at ${this.adress}`
    }

    greet(){
        console.log(`hi my name is ${this.name}
        I live at ${this.adress.toString()}`
        );
    }

}


class Serializer{
    constructor(types){
        this.types=types
    }

    markRecursive(obj){
        let idx=this.types.findIndex(t=>{
            return t.name===obj.constructor.name
        })
        if(idx!==-1){
            obj['typeIndex']= idx
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    this.markRecursive(obj[key])
                }
            }
        }
    }

    clone(obj){
        this.markRecursive(obj)
        let copy=JSON.parse(JSON.stringify(obj))
        return this.reconstructRecursive(copy)

    }
    reconstructRecursive(obj){
        if(obj.hasOwnProperty('typeIndex')){
            let type=this.types[obj.typeIndex]
            let object=new type()
            for (const key in object) {
                if (Object.hasOwnProperty.call(obj, key)&&obj[key]!=null) {
                    object[key]=this.reconstructRecursive(obj[key])
                    
                }
            }
            delete object.typeIndex
            return object
        }
        return obj
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

// JSON.parse( JSON.stringify(john)) - видаляє звязку до класу
let s = new Serializer([Person,Adress])


let jane=s.clone(john)
jane.name='Jane'
jane.adress.streetAdress='321 Angel str'
jane.greet()
console.log(john.toString());
console.log(jane.toString());