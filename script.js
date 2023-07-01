// dependency inversion визначає взаємовідношення між модулями вищого рівня і нижчого 
// 
let Relationship=Object.freeze({
    parent:0,
    child:1,
    sibling:2
})

class Person{
    constructor(name){
        this.name=name
    }
}

// low level module
// це абстракція RelationshipBrowser
class RelationshipBrowser{
    constructor(){
        if(this.constructor.name==="RelationshipBrowser"){
            throw new Error('RelationshipBrowser is abstract')
        }
    }
    findAllChildrenOf(name){

    }
}
class Relationsships extends RelationshipBrowser{
    constructor(){
        super()
        this.data=[]
    }
    addParentAndChild(parent,child){
        this.data.push({
            from:parent,
            type:Relationship.parent,
            to:child
        })
    }
    findAllChildrenOf(name){
        return this.data.filter(r=>r.from.name===name&&r.type===Relationship.parent)
            .map(r=>r.to)
    }
}

// high level module
// high level module має залежати від абстракцій
class Research{
    // constructor(relationships){
    //     // find all children
    //     // проблема в тому що ми юзаємо low level data storage
    //     // це означає якщо ми щось поміняємо в модулі нижчого рівня треба буде лізти в модуль вищого рівня
    //     let relations=relationships.data
      
    //     for (const rel of relations.filter(r=>r.from.name==='john'&&r.type==Relationship.parent)) {
    //         console.log(`John has a child named ${rel.to.name}`);
    //     }
    // }
    constructor(browser){
        for (const p of browser.findAllChildrenOf('john')) {
            console.log(`John has a child called ${p.name}`);
        }
    }
}

let parent = new Person('john')
let child1 = new Person('chris')
let child2 = new Person('matt')

let rels=new Relationsships()
rels.addParentAndChild(parent,child1)
rels.addParentAndChild(parent,child2)
new Research(rels)

// 