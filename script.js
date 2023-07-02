
// метод для створення обєктів
const CoordinatesSystem = {
    cartesian: 0,
    polar: 1
}

class Point {
    // теж поганий 
    // constructor(a, b, cs = CoordinatesSystem.cartesian) {
    //     switch (cs) {
    //         // тут може бути порушення другого принципу тому що можуть бути різні координати 
    //         case CoordinatesSystem.cartesian:
    //             this.x = a;
    //             this.b = b;
    //             break
    //         case CoordinatesSystem.polar:
    //             this.x = a * Math.cos(b)
    //             this.y = a * Math.sin(b)
    //     }
    // }


    // поганий варік
    // constructor(x,y){
    //     this.x=x
    //     this.y=y
    // }
    // constructor(rho,theta){
    //     this.x=rho*Math.cos(theta)
    //     this.y=rho*Math.sin(theta)
    // }


    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static newCartisianPoint(x, y) {
        return new Point(x, y)
    }
    static newPolarpoint(rho, theta) {
        return new Point(rho * Math.cos(theta),
            rho * Math.sin(theta))
    }
}

let p = Point.newCartisianPoint(4,5)
console.log(p);
let p2=Point.newPolarpoint(5,Math.PI/2)
console.log(p2);

