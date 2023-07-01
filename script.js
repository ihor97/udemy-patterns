// enterprise design pattern


let Color=Object.freeze({
    red:'red',
    green:'green',
    blue:'blue'
})
let Size=Object.freeze({
    small:'small',
    medium:'medium',
    large:'large'
})

class Product{
    constructor(name,color,size){
        this.name=name
        this.color=color
        this.size=size
    }
}
// open closed principle - обєкти відкриті для розширення але закриті для модифікації
// під extension розуміється що клас наслідує властивості вже 
// тобто ми не ліхемо у існуючі класи і не модуфікуємо їх
class ProductFilter{
    filterByColor(products,color){
        // якщо ми будемо тут щось міняти тоді це буде модіфікація і це погано 
        return products.filter(p=>p.color===color)
    }
    filterBySize(products,size){
        return products.filter(p=>p.size===size)

    }
    filterBySizeAndColor(products,size,color){
        return products.filter(p=>p.size===size&&p.color===color)
    }
    // state space explosion - тобто ми не можемо безкінечно аихати сюди різні методи
}


// specification -клас що відповідає за фільтрування

class ColorSpecification{
    constructor(color){
        this.color=color
    }
    isStisfied(item){
        return item.color===this.color
    }
}
class SizeSpecification{
    constructor(size){
        this.size=size
    }
    isStisfied(item){
        return item.size===this.size
    }
}
// комбінатори
class AndSpecification{
    constructor(...specs){
        this.specs=specs
    }
    isStisfied(item){
        return this.specs.every(x=>x.isStisfied(item))
    }
}
let apple=new Product('apple',Color.green,Size.small)
let tree=new Product('tree',Color.green,Size.large)
let house=new Product('house',Color.blue,Size.large)
let products=[apple,tree,house]
// let pf= new ProductFilter()
// console.log(`green products(old)`);
// for (const p of pf.filterByColor(products,Color.green)) {
//     console.log(`* ${p.name} is green`);
// }

class BetterFilter{
    filter(items,spec){
        return items.filter(x=>spec.isStisfied(x))
    }
}

let bF=new BetterFilter()
console.log( 'greeen products (new)');
for (const p of bF.filter(products,new ColorSpecification(Color.green))) {
    console.log(`* ${p.name} is green`);
}


console.log(`large and green`);

let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
)

for (const p of bF.filter(products,spec)) {
    console.log(`* ${p.name} is green and large`);
}