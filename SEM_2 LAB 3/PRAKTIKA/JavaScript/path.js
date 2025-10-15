/* массив точек пути будет иметь следующий вид:
[
{x: координата, y: координата},
{x: координата, y: координата},
...
]
*/
//<--- РИСОВАНИЕ ПУТИ
function createPathG() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = []; //массив точек пути; промежуток между точками равен h
    const padding = 480; 
    //начальное положение рисунка
    let posX = padding; //480
    let posY = height - padding; //120
    const h = 5; //промежуток между точками

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

    console.log(data)
    return data
}

let drawPath =() => { //<--- ОСНОВНАЯ ФУНКЦИЯ ПУТИ

    // создаем массив точек пути в зависимости от параметра
   // const dataPoints = (typePath == 0)? createPathG() : createPathCircle();
    const dataPoints = createPathG()  //<--- СОЗДАНИЕ МАССИВА ПУТИ
    const line = d3.line()  //<--- ОБЪЯВЛЕНИЕ ФУНКЦИИ СОЗДАНИЯ ЛИНИИ
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

function translateAlong(path, dataForm) {      //<--- ТРАНСФОРМАЦИЯ ВО ВРЕМЯ ПУТИ
    const length = path.getTotalLength();

    const OGsizeX = Number(dataForm.scale1.value)
    const OGsizeY = Number(dataForm.scale2.value)
    const OGsizeX2 = Number(dataForm.scale1_finish.value)
    const OGsizeY2 = Number(dataForm.scale2_finish.value)
    
    const Rot1 = Number(dataForm.rotate.value)
    const Rot2 = Number(dataForm.rotate_finish.value)

    return function() {       //<--- РЕКУРСИВНАЯ ФУНКЦИЯ, ВОЗВРАЩАЮЩАЯ ЗНАЧЕНИЕ, НА КОТОРОЕ НУЖНО ПЕРЕПРЫГИВАТЬ
      return function(t) {
       // console.log('t: '+t+' length: '+length)
        const {x, y} = path.getPointAtLength(t * length);

        const scaleX = (OGsizeX2 - OGsizeX)*t
        const scaleY = (OGsizeY2 - OGsizeY)*t

        const rotDX = (Rot2 - Rot1)*t


        return `translate(${x},${y}), 
                                scale(${OGsizeX+scaleX}, ${OGsizeY+scaleY})
                                         rotate(${Rot1+rotDX})`;
        }
    }
}





















/*scale(${scaleX}, ${scaleY})
                                rotate(${rot})`; */
















                                


                                       /* const interpolateScaleX  = d3.interpolate(dataForm.scale1.value, dataForm.scale1_finish.value);
        const interpolateScaleY  = d3.interpolate(dataForm.scale2.value, dataForm.scale2_finish.value);    
        const interpolateRotate  = d3.interpolate(dataForm.rotate.value, dataForm.rotate_finish.value);

        const scaleX  = interpolateScaleX(t);
        const scaleY  = interpolateScaleY(t); */
       // console.log(scaleX+'   '+scaleY)
      //  const rot = interpolateRotate(t)