function createArrGraph(data, key) {
    groupObj = d3.group(data, d => d[key]); //<--- формирует map по полю "Страна"
   // console.log(groupObj);
    let arrGraph =[];

    for(let entry of groupObj) { //<--- формирует массив
      let minMax = d3.extent(entry[1].map(d => d['Высота'])); //<--- получает минмакс каждой страны
      arrGraph.push({labelX : entry[0], values : minMax});
    //  console.log('New Array El.: '+entry[0], minMax)
    }
    arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
    for (let i=0; i<arrGraph.length; i++) console.log(arrGraph[i])
    return arrGraph;
}

function drawGraph(data) { //<--- data - массив buildings
    // значения по оси ОХ
    const keyX = "Год";

    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    let svg = d3.select("svg")
    svg.selectAll('*').remove();

    // создаем ассоц. массив с атрибутами области вывода графика
  attr_area = {
      width: parseFloat(svg.style('width')),
      height: parseFloat(svg.style('height')),
      marginX: 50,
      marginY: 50
  }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    // рисуем график
    createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0)
    createChart(svg, arrGraph, scX, scY, attr_area, "red", 1)
}

function createAxis(svg, data, attr_area){
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const [min, max] = d3.extent(data.map(d => d.values[1]));
    console.log(min+' '+max)

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    let scaleX = d3.scaleBand()
      .domain(data.map(d => d.labelX)) //что будет отображаться на графике
      .range([0, attr_area.width - 2 * attr_area.marginX]); //диапазон расположений

    let scaleY = d3.scaleLinear()
      .domain([min * 0.85, max * 1.1 ])
      .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
      .attr("transform", `translate(${attr_area.marginX},
                                    ${attr_area.height - attr_area.marginY})`)
      .call(axisX)
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

function createChart(svg, data, scaleX, scaleY, attr_area, color, ind) {
    const r = 4;

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", r)
      .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr("cy", d => scaleY(d.values[ind]))
      .attr("transform", `translate(${attr_area.marginX},
                                    ${attr_area.marginY})`)
      .style("fill", color)

}