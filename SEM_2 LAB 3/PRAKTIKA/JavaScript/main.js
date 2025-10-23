document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    let pict 


    //<--- ПРЯЧЕТ ЭЛЕМЕНТЫ, ПОЯВЛЯЮЩИЕСЯ ПРИ ВКЛЮЧЕНИИ АНИМАЦИИ
    let hide = document.getElementsByClassName('isVisible')
    for (let i in hide) hide[i].hidden = true
    document.getElementsByClassName('el')[1].children[0].children[0].hidden = true
}) 

let draw = (dataForm) => {                 //<--- ДЕЙСТВИЕ ПО НАЖАТИЮ КНОПКИ "НАРИСОВАТЬ"
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    //<--- РАЗМЕЩЕНИЕ ПО УКАЗ. КООРДИНАТАМ
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value}) 
                            scale(${dataForm.scale1.value}, ${dataForm.scale2.value})
                            rotate(${dataForm.rotate.value})`);
}

//<--- ВКЛЮЧАЕТ ДИАПАЗОН ЗНАЧЕНИЙ И ПРЯЧЕТ КНОПКУ "НАРИСОВАТЬ"


/*d3.select('input#AnimOn').on('change', function() {
    alert('1')
    let hide = document.getElementsByClassName('isVisible')
    if (this.checked == true) {
        document.getElementById('Draw').hidden = true
        for (let i in hide) hide[i].hidden = false  
    } else {
        document.getElementById('Draw').hidden = false
        for (let i in hide) hide[i].hidden = true      
    }
})*/



//<--- АНИМАЦИЯ
let runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);    
    let animType = 'ease'+document.getElementsByTagName('select')[0].value

    pict.attr("transform", `translate(${dataForm.cx.value},
        ${dataForm.cy.value}) 
                            scale(${dataForm.scale1.value}, ${dataForm.scale2.value})
                            rotate(${dataForm.rotate.value})`)
    
    //<--- ЕСЛИ НЕ ПУТЬ
    if (PathOn.checked == false) {
     
      pict.transition(svg)   //<--- ОБЪЯВЛЕНИЕ АНИМАЦИИ
          .duration(document.getElementById('time').value*1000)
          .ease(d3[animType])  //<--- ТИП АНИМАЦИИ
          .attr("transform", `translate(${dataForm.cx_finish.value},
                                        ${dataForm.cy_finish.value}) 
                              scale(${dataForm.scale1_finish.value}, ${dataForm.scale2_finish.value})
                              rotate(${dataForm.rotate_finish.value})`);  //<--- ЗНАЧЕНИЯ ПО ОКОНЧАНИИ АНИМАЦИИ
    //<-- ЕСЛИ ПУТЬ
    } else {
        pict.attr("transform", `translate(${dataForm.cx.value},
                                          ${dataForm.cy.value}) 
                                scale(${dataForm.scale1.value}, ${dataForm.scale2.value})
                                rotate(${dataForm.rotate.value})
                                `)

        let path = drawPath();   //<--- СОЗДАНИЕ ПУТИ


        pict.transition()    //<--- ОБЪЯВЛЕНИЕ АНИМАЦИИ
        .ease(d3[animType])
        .duration(document.getElementById('time').value*1000)
        .attrTween( 'transform', translateAlong(path.node(), dataForm) ); 
    }
    
}