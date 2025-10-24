

document.addEventListener("DOMContentLoaded", function() {

    //ПРОСТО ВСТАВКА
    mas = ["LYUDI", "VY", "HUY NA BLYUDE", "PUTIN"]

    d3.selectAll("ul").selectAll("li").attr('class','red')

    //d3.select("ul").selectAll("li").data(mas).enter().insert("li", "li.HUI").attr("class", "PUTIN")
    //d3.select("ul").selectAll("li").data(mas).exit().text("ПОБЕДА")
    //d3.selectAll("li").data(mas).text(d => d)


    //ВЗЯТЬ ИЗ ДВУХ СПИСКОВ И ПРЕОБРАЗОВАТЬ В ОДИН
   /* mas1 = d3.select("ul").selectAll("li").nodes()
    mas2 = d3.select("ul:nth-child(2)").selectAll("li").nodes()
    mas3 = [].concat(mas1, mas2) 
    //ИЛИ
    mas3 = d3.selectAll("ul.list").selectChildren("li").nodes()
    console.log(mas3.map(d => d.textContent))

    d3.select("ul:nth-child(3)").selectAll("li").data(mas3).enter().append("li")
    d3.select("ul:nth-child(3)").selectAll("li").data(mas3).text(d => d.textContent) 

    alert(d3.select("ul").selectChild("div").text()) */

    d3.select("svg").append("path")
                    .attr

   // alert(d3.selectAll("ul").html())
}) 