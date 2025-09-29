document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    let pict //= drawSmile(svg);

    document.getElementsByClassName('isVisible')[0].hidden = true
    document.getElementsByClassName('isVisible')[1].hidden = true

   // let strs = d3.selectAll("ol")
   // strs.append("li").text(d3.select("li").text())

   /* pict.attr("transform", `translate(${width / 2}, ${height / 2})`)
    pict.attr("transform", `translate(${width / 2}, ${height / 2})
    scale(1.5, 1.5) rotate(180)`); */

   // alert(document.getElementsByTagName('svg')[0].outerHTML)
}) 

let draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value}) 
                            scale(${dataForm.scale1.value}, ${dataForm.scale2.value})
                            rotate(${dataForm.rotate.value})`);
}

function isAnimOn(dataForm) {
    if (dataForm.checked == true) {
        document.getElementById('Draw').hidden = true
        document.getElementsByClassName('isVisible')[0].hidden = false
        document.getElementsByClassName('isVisible')[1].hidden = false   
    } else {
        document.getElementById('Draw').hidden = false
        document.getElementsByClassName('isVisible')[0].hidden = true
        document.getElementsByClassName('isVisible')[1].hidden = true       
    }
}

let runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);
    pict.attr("transform",
    `translate(${dataForm.cx.value}, ${dataForm.cy.value}`)
    .transition(svg)
    .duration(6000)
    .ease(d3.easeBounce)
    .attr("transform",
    `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value})`);
    
}