class Person{
    constructor(){
        //adress
        this.streetAdress=this.postcode=this.city='';
        // employmentInfo
        this.companyName=this.position='';
        this.annualIncome=0
    }

    toString(){
        return `person lives at ${this.streetAdress}, ${this.city}, ${this.postcode}
        and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
    }
}


class PersonBuilder{
    // вони всі працюють з одним обєктом
    // решта білдерів теж будуть працювати з тим обєктом
    constructor(person=new Person()){
        this.person=person
    }
    get lives(){

        return new PersonAdressBuilder(this.person)
    }
    get works(){
        return new PersonJobBuilder(this.person)
    }
    build(){
        return this.person
    }
}


class PersonJobBuilder extends PersonBuilder{
    constructor(person){
        // цей super зберігає силку з батьківського класу
        super(person)
    }
    at(companyName){
        this.person.companyName=companyName
        return this;
    }
    asA(position){
        this.person.position=position
        return this;
    }
    earning(annualIncome){
        this.person.annualIncome=annualIncome
        return this;
    }

}

class PersonAdressBuilder extends PersonBuilder{
    constructor(person){
        // цей super зберігає силку з батьківського класу
        super(person)
    }
    at(streetAdress){
        this.person.streetAdress=streetAdress
        return this;
    }
    withPostCode(postcode){
        this.person.postcode=postcode
        return this;
    }
    in(city){
        this.person.city=city
        return this
    }
}


let pb=new PersonBuilder()
let person=pb
    .lives.at('123 london road').in('London').withPostCode('SW12BC')
    .works.at('Fabrikam').asA('Engineer').earning(123800)
    .build();

console.log(person.toString());






