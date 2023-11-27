export default function generatePoint (r1, r2) {

    /// r1 и r2 - радиусы меньшей и большей окружности

    /// по сути r1 - r2 равняется радуиусу нужного сектора

    let xBoolean;
    let yBoolean;


    const xRand = Math.random()
    const yRand = Math.random()

    xRand > 0.5 ? xBoolean = 1 : xBoolean = -1
    yRand > 0.5 ? yBoolean = 1 : yBoolean = -1


    /// для определения знака координаты


    const min = r1 * r1
    const max = r2 * r2
    let x = Math.random() * r2 * xBoolean
    let y = Math.random() * r2 * yBoolean
    if (x*x + y*y > max || x*x + y*y < min) {
        generatePoint(r1, r2)
    } else { 
        console.log(x, y, "COORD with " + r1  + " and " + r2)
        return x, y
    }

}