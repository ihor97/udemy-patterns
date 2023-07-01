//interface segregation 
class Document{

}

class Machine{
    constructor(){
        if(this.constructor.name==='Machine'){
            throw new Error('Machine is abstract')
        }
    }
    print(doc){}
    fax(doc){}
    scan(doc){}
}
// цікавий підхід по викидуванню помилок 
class NotImplementedError extends Error{
    constructor(name){
        let msg=`${name} is not implemented`
        super(msg)
        if(Error.captureStackTrace){
            Error.captureStackTrace(this,NotImplementedError)
        }
    }
}
class MultiFunctionPrinter extends Machine{
    print(doc){}
    fax(doc){}
    scan(doc){}
}
class OldPrinter extends Machine{
    // старий принтер ще може видруковувати але не fax і scan 
    print(doc){}
    // 
    fax(doc){
        // можна нічого не ставити але тут буде проблема 
        // principle of least surprise тобто люди які юудуть юзати твою прогу можуть здивуватися коли щось піде не так як бажано 
        // можна щакоментувати але метод викличеться з базового класу 
    }
    // інший варіант вирішення проблеми 
    scan(doc){
        throw new NotImplementedError('old printer')
    }
}



// ISP = треба розділяти 

class Printer{
    constructor(){
        if(this.constructor.name==='Printer'){
            throw new Error('Printer is abstract')
        }
    }
    print(){}
}
class Scanner{
    constructor(){
        if(this.constructor.name==='Scanner'){
            throw new Error('Scanner is abstract')
        }
    }
    scan(){}
}
// 
class Photocopier {
    print(){}
    scan(){}
}