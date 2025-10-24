resType = 0; //<--- 0 - сумм. продажи, 1 - макс. оператива



function createArrGraph(data, key) {
    groupObj = d3.group(data, d => d[key]); //<--- формирует map по выбранному полю OX
    console.log(groupObj);
    let arrGraph =[];


    for(let entry of groupObj) { //<--- формирует массив
      //alert(entry[0]+':   '+entry[1].map(d=>d['Продано (млн.)']))
      let val
      if (resType == 0) val = d3.sum(entry[1].map(d => d['Продано (млн.)'])); //<--- ПОЛУЧАЕТ НУЖНЫЕ ЗНАЧЕНИЯ ПО ШКАЛЕ OY
      else val = d3.max(entry[1].map(d => d['Оперативная памяти (МБ)']))

      arrGraph.push({labelX : entry[0], values : val});
    //  console.log('New Array El.: '+entry[0], val)
    }
    arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX))); //<--- СОРТИРОВКА ШКАЛЫ OX ЧТОБЫ БЫЛО КРАСИВО

    return arrGraph;
}



function drawGraph(data) { //<--- САМОЕ НАЧАЛО ПОСТРОЕНИЯ ГРАФИКА
    // значения по оси ОХ
    console.log('VAL: '+resType)

    document.querySelector('svg').style.height = '600px'  //<--- ДЕЛАЕТ SVG ВЫШЕ
    let keyX;
    for (let i=0; i<3; i++) {   //<--- ЗНАЧЕНИЕ ПО ОСИ OX
      if (document.getElementsByName('ox')[i].checked == true) keyX = document.getElementsByName('ox')[i].value;
    } 

    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);


    let svg = d3.select("svg")
    svg.selectAll('*').remove();   //<--- УДАЛЯЕТ ВСЁ СОДЕРЖИМОЕ SVG

    // создаем ассоц. массив с атрибутами области вывода графика
  attr_area = {
      width: parseFloat(svg.style('width')),   //800
      height: parseFloat(svg.style('height')),  //600
      marginX: 50,
      marginY: 50
  }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area); //<--- РИСУЕТСЯ ГРАФИК


   // createScatter(svg, arrGraph2, scX, scY, attr_area, "blue")
   if (document.getElementById('chart-type').value == 'scatter') createScatter(svg, arrGraph, scX, scY, attr_area, "red")
   else if (document.getElementById('chart-type').value == 'bar') createBar(svg, arrGraph, scX, scY, attr_area, "red")

}

function createAxis(svg, data, attr_area){
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const [min, max] = d3.extent(data.map(d => d.values));
    console.log(min+' '+max)

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    let scaleX = d3.scaleBand()    //СЛОВА СОПОСТАВЛЯЮТСЯ С ЦИФРАМИ
      .domain(data.map(d => d.labelX)) //что будет отображаться на графике
      .range([0, attr_area.width - 2 * attr_area.marginX]); //диапазон расположений

    let scaleY = d3.scaleLinear()   //ЦИФРЫ СОПОСТАВЛЯЮТСЯ С ЦИФРАМИ
      .domain([min * 0.85, max*1.1])
      .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
      .attr("transform", `translate(${attr_area.marginX},
                                    ${attr_area.height - attr_area.marginY})`)
      .call(axisX)
      //<-- ВСЁ ДАЛЬНЕЙШЕЕ - СТИЛИЗАЦИЯ ТЕКСТА
      .selectAll("text") // подписи на оси - наклонные
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", d => "rotate(-45)");

    svg.append("g")
      .attr("transform", `translate(${attr_area.marginX},
                                    ${attr_area.marginY})`)
      .call(axisY);

    return [scaleX, scaleY]
}

function createScatter(svg, data, scaleX, scaleY, attr_area, color) { //<--- ТОЧКИ
    const r = 4;

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", r)
      .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr("cy", d => scaleY(d.values))    
      .attr("transform", `translate(${attr_area.marginX},
                                    ${attr_area.marginY})`)
      .style("fill", color)
}

/*function createBar(svg, data, scaleX, scaleY, attr_area, color) {
  const r = 5;

  svg.selectAll(".dot")
    .data(data)
    .enter()

    .append("rect")
    .attr("x", d => (scaleX(d.labelX) + scaleX.bandwidth() * 0.475))//scaleX.bandwidth() * 0.35) + 10.7)
    .attr("y", d => scaleY(d.values))
    .attr("width", r)
    .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values))     
    .attr("transform", `translate(${attr_area.marginX},
                                  ${attr_area.marginY})`)
    .style("fill", color)

}*/

function createBar(svg, data, scaleX, scaleY, attr_area, color) {  //<--- ПОЛОСКИ
 // alert(data.length)
 // alert(attr_area.width - 2 * attr_area.marginX)

  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() * 0.3) // центрируем
    .attr("y", d => scaleY(d.values))
    .attr("width", scaleX.bandwidth() * 0.4) 
    .attr("height", d => attr_area.height - attr_area.marginY * 2 - scaleY(d.values))
    .attr("transform", `translate(${attr_area.marginX},
      ${attr_area.marginY})`)    
    .attr("fill", color);
}

/*function createGraph(svg, data, scaleX, scaleY, attr_area) {
  let line = d3.line()
      .x(d => scaleX(d.labelX))
      .y(d => scaleY(d.values))

svg.append('path')
  .datum(data)
  .attr('d', line)
  .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
  
  .style('stroke-width', '2')
  .style('stroke', 'red')
  .style("fill", "none");
} */