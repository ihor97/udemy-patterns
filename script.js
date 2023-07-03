// можна згупувати фабрика
const readline=require('readline')
let rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
class HotDrink {


    consume() {

    }
}

class Tea extends HotDrink {
    // переписуємо методи
    consume() {
        console.log(`this tea is nice with lemon`);
    }
}

class Coffe extends HotDrink {
    consume() {
        console.log(`this coffe is good`);

    }
}

class HotDrinkFactory {
    prepare(amount) {
        // abstract
    }

}

class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`put in tea bag, boil water pour ${amount}ml`);
        return new Tea()//customize
    }
}
class CoffeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`grind some beans, boil water pour ${amount}ml`);
        return new Coffe()//customize
    }
}

let AvailableDrink=Object.freeze({
    // це є типи 
    coffee:CoffeFactory,
    tea:TeaFactory
})

class HotDrinkMachine {
    constructor(){
        this.factories={}
        for (const drink in AvailableDrink) {
            if (Object.hasOwnProperty.call(AvailableDrink, drink)) {
                // робимо інстанси з перечислення
                this.factories[drink]=new AvailableDrink[drink]()
                
            }
        }
    }
    // правда це порущення open closed principle
    makeDrink(type) {
        switch (type) {
            case 'tea':
                return new TeaFactory().prepare(200)
            case 'coffee':
                return new CoffeFactory().prepare(50)
            default:
                throw new Error('')
        }
    }

    interact(consumer){
        rl.question('Please specify drink and amount '+ '(e.g. tea 50): ',answer=>{
            let parts=answer.split(' ')
            let name=parts[0]
            let amount=parseInt(parts[1])
            let d= this.factories[name].prepare(amount)
            rl.close()
            consumer(d)
        })
    }
}

let machine=new HotDrinkMachine();

// rl.question('which drink? ',function (answer) {
//     let drink=machine.makeDrink(answer)
//     drink.consume()
//     rl.close()
// })


machine.interact(function (drink) {
    drink.consume()
})
