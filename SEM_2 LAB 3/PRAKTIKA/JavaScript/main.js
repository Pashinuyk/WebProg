document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    let pict //= drawSmile(svg);

    let hide = document.getElementsByClassName('isVisible')
     for (let i in hide) hide[i].hidden = true
     document.getElementsByClassName('el')[1].children[0].children[0].hidden = true

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
    let hide = document.getElementsByClassName('isVisible')
    if (dataForm.checked == true) {
        document.getElementById('Draw').hidden = true
        for (let i in hide) hide[i].hidden = false  
    } else {
        document.getElementById('Draw').hidden = false
        for (let i in hide) hide[i].hidden = true      
    }
}

function isPathOn(dataForm) {
    if (dataForm.checked == true) {
        document.getElementsByClassName('el')[0].hidden = true
        document.getElementsByClassName('el')[1].hidden = false
    } else {
        document.getElementsByClassName('el')[0].hidden = false
        document.getElementsByClassName('el')[1].hidden = true       
    }
}

let runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);    
    let animType = 'ease'+document.getElementsByTagName('select')[1].value

    if (PathOn.checked == false) {
      pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value}) 
                            scale(${dataForm.scale1.value}, ${dataForm.scale2.value})
                            rotate(${dataForm.rotate.value})`)
      .transition(svg)
      .duration(6000)
      .ease(d3[animType])
      .attr("transform", `translate(${dataForm.cx_finish.value},
        ${dataForm.cy_finish.value}) 
scale(${dataForm.scale1_finish.value}, ${dataForm.scale2_finish.value})
rotate(${dataForm.rotate_finish.value})`);
    } else {
        let path = drawPath(document.getElementById('whatIsPath').selectedIndex);
        pict.transition()
        .ease(d3[animType])
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
    }
    
}