//<--- РИСОВАНИЕ ЛОГОТИПА SNES
function drawSmile(svg) {
    let smile = svg.append("g")   //<--- ОСНОВАННАЯ ПЕРЕМЕННАЯ
    .style("stroke", "black")
    .style("stroke-width", 2)
  //  .style("fill", "brown");
    //фон
    smile.append("ellipse")     
    .attr("cx", -1)
    .attr("cy", 0)
    .attr("rx",75)
    .attr("ry",62.5)
    .style("fill", "gray");
    //голубая кнопка
    smile.append("circle")  
    .attr("cx", -6)
    .attr("cy", -30)
    .attr("r",20)
    .attr("stroke", "blue")
    .attr("fill", "blue");
    //красная кнопка
    smile.append("circle")
    .attr("cx", 43)
    .attr("cy", -5)
    .attr("r",20)
    .attr("stroke", "red")
    .attr("fill", "red");  
    //загородить голубую
    smile.append("circle")
    .attr("cx", -26)
    .attr("cy", -10)
    .attr("r",20)
    .attr("stroke", "gray")
    .attr("fill", "gray");    
    //загородить красную
    smile.append("circle")
    .attr("cx", 23)
    .attr("cy", 15)
    .attr("r",20)
    .attr("stroke", "gray")
    .attr("fill", "gray");     
    
    //жёлтая кнопка
    smile.append("ellipse")
    .attr("cx", 6)
    .attr("cy", 30)
    .attr("rx", 25)
    .attr("ry",13)
    .style("stroke", "yellow")
    .style("fill", "yellow");
    //зелёная кнопка
    smile.append("ellipse")
    .attr("cx", -44)
    .attr("cy", 5)
    .attr("rx", 25)
    .attr("ry",13)
    .style("stroke", "green")
    .style("fill", "green");
  

    
    // улыбка
   /* let arc = d3.arc()
    .innerRadius(35)
    .outerRadius(35);
    smile.append("path")
    .attr("d", arc({startAngle: Math.PI /3 * 2,
    endAngle: Math.PI/3 * 4}))
    .style("stroke", "brown") */
    return smile
    }