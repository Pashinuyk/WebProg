/* массив точек пути будет иметь следующий вид:
[
{x: координата, y: координата},
{x: координата, y: координата},
...
]
*/
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    const padding = 480;
    //начальное положение рисунка
    let posX = padding; //480
    let posY = height - padding; //120
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY < padding) {
    data.push( {x: posX, y: posY});
    posY += h;
    //x=480, y=480
    }

    while ((posY > (height - padding)) && (posX > (padding+(width-padding))/2)) {
        data.push( {x: posX, y: posY});
        posX -= h;
        posY -= 2*h;
        //x=300, y=120    
    }
            //120 < 480        //300 > (120)
    while ((posY < padding) && (posX > (width-padding))) {
        data.push( {x: posX, y: posY});
        posX -= h;
        posY += 2*h;   
        //x=120, y=480     
    }

    while ((posY > height-padding)) {
        data.push( {x: posX, y: posY});
        posY -= h;   
        //x=120, y=480     
    }    
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
    data.push( {x: posX, y: posY});
    posX += h;
    }
    return data
}
    // создаем массив точек, расположенных по кругу

/*function createPathCircle() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    // используем параметрическую форму описания круга
    // центр асположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = 0 ; t <= Math.PI * 2; t += 0.1) {
    data.push(
    {x: width / 2 + width / 3 * Math.sin(t),
    y: height / 2 + height / 3 * Math.cos(t)}
    );
    }
    return data
    }*/
    // создаем путь и отображаем его в svg-элементе
let drawPath =(typePath) => {
    // создаем массив точек пути в зависимости от параметра
   // const dataPoints = (typePath == 0)? createPathG() : createPathCircle();
    const dataPoints = createPathG()
    const line = d3.line()
      .x((d) => d.x)
      .y((d) => d.y);

    // создаем путь на основе массива точек
    const svg = d3.select("svg")
    const paths = svg.append('path')
      .attr('d', line(dataPoints))
      .attr('stroke', 'black')
      .attr('fill', 'none');
    return paths;
}    

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
    return function(t) {
    const {x, y} = path.getPointAtLength(t * length);
    return `translate(${x},${y})`;
    }
    }
    }