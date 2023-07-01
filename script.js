// builder використовується для побудови складних об'єктів шляхом крокової конфігурації його складових части


class Tag{
static get indentSize(){return 2}

    constructor(name='',text=''){
        this.name=name
        this.text=text
        this.children=[]
    }
    toStringimpl(indent){
        let html =[]
        let i =' '.repeat(indent*Tag.indentSize)
        html.push(`${i}<${this.name}>\n`)
        if(this.text.length>0){
            html.push(' '.repeat(Tag.indentSize*(indent+1)))
            html.push(this.text)
            html.push('\n')
        }

        for (const child of this.children) {
            html.push(child.toStringimpl(indent+1))
        }
        html.push(`${i}</${this.name}>\n`)
        return html.join('')
    }
    toString(){
        return this.toStringimpl(0)
    }
    // створюємо через статичний метод
    static create(name){
        return new HtmlBuilder(name)
    }
}
class HtmlBuilder{
    constructor(rootname){
        this.root=new Tag(rootname)
        this.rootName=rootname
    }
    addChild(childName,childText){
        let child=new Tag(childName,childText)
        this.root.children.push(child)
    }
    toString(){
        return this.root.toString()
    }
clear(){
    this.root=new Tag(this.rootName)
}
    build(){
        return this.root
    }
}


// const hello='hello'
// let html=[]

// html.push('<p>')
// html.push(hello)
// html.push('/p>')

// console.log(html.join(''));

const words=['hello','world']

// html=[]

// html=[]
// html.push('<ul>\n')
// for (const word of words) {
//     html.push(`    <li>${word}></li>\n`)
// }
// html.push('</ul>')

// console.log(html.join(''));


// let builder=new HtmlBuilder('ul')
let builder=Tag.create('ul')
for (const word of words) {
    builder.addChild('li',word)
}

console.log(builder.root.toString());

builder.clear()

