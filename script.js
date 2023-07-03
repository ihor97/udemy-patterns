
class Adress{
    constructor(suite,streetAdress,city){
        this.streetAdress=streetAdress
        this.city=city
        this.suite=suite
    }
    toString(){
        return `Suite: ${this.suite}, 
        ${this.streetAdress}, ${this.city}
        `
    }

}




class Emploee{
    constructor(name,adress){
        this.name=name
        this.adress=adress
    }
    toString(){
        return `${this.name} works at ${this.adress}`
    }

    greet(){
        console.log(`hi my name is ${this.name}
        I work at ${this.adress.toString()}`
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
                if (Object.hasOwnProperty.call(obj, key)&&obj[key]!=null) {
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

class EmploeeFactory{
    static _newEmployee(proto,name,suite){
        let copy = EmploeeFactory.serializer.clone(proto)
        copy.name=name
        copy.adress.suite=suite
        return copy
    }

    static newMainOfficeEmployee(name,suite){
        return this._newEmployee(EmploeeFactory.main, name, suite)
    }
    static newAuxOfficeEmployee(name,suite){
        return this._newEmployee(EmploeeFactory.aux, name, suite)
    }
}

EmploeeFactory.serializer=new Serializer([Emploee,Adress])

EmploeeFactory.main=new Emploee(null,
    new Adress(null,'123 East Dr','London'))
EmploeeFactory.aux=new Emploee(null,
    new Adress(null,'200 London Rd','Oxford'))

    let john= EmploeeFactory.newMainOfficeEmployee('john',4321)
    let jane= EmploeeFactory.newAuxOfficeEmployee('jane',222)
    console.log(john.toString());
    console.log(jane.toString());