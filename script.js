
const fs=require('fs')
class Journal{
    constructor(){
        this.entries={}
    }
    addEntry(text){
        let c=++Journal.count
        let entry=`${c}:${text}`
        this.entries[c]=entry
        return c
    }
    removeEntry(index){
        delete this.entries[index]
    }
    toString(){
        return Object.values(this.entries).join('\n')
    }

}

// це вже друга якась відповідальність
class PersistenceManager{
    preprocess(j){

    }
    saveToFile(journal,filename){
        // створює новий файл
        fs.writeFileSync(filename,journal.toString())
    }
    load(filename){
        /////
    }
    loadFromUrl(url){
        /////
    }
}


Journal.count=0


let j=new Journal()

j.addEntry('one')
j.addEntry('two')
console.log(j.toString());

let p=new PersistenceManager()
let filename='journal.txt'

p.saveToFile(j,filename)