//выводим таблицу на страницу
let createTable = (data, idTable) => {


            
/*let table = d3.select('table')
//alert(document.getElementsByTagName('table')[0].innerHTML)    
            
// Заголовки
let head = table.append('thead')
      .append('tr')
      .selectAll('th')
      .data(Object.keys(consoles[0]))
      .enter()
      .append('th')
      .text(d => d)
      
    //  alert(document.getElementsByTagName('table')[0].innerHTML)          
            
// Строки таблицы
let rows = table.append('tbody')
      .selectAll('tr')
      .data(consoles)
      .enter()
      .append('tr')

//alert(document.getElementsByTagName('table')[0].innerHTML)          
            
// Ячейки
rows.selectAll('td')
      .data(d => Object.values(d))
      .enter()
      .append('td')
      .text(d => d)

rows.selectAll('td:nth-child(2)')
    .html(d => '<img src='+d+' alt='+d+'>')  */  
   
              
//alert(document.getElementsByTagName('table')[0].innerHTML) 


             
          

  // находим таблицу
  let table = document.getElementById(idTable);

  // формируем заголовочную строку из ключей нулевого элемента массива
  let head = document.createElement('thead')
  let tr = document.createElement('tr');

  /*for(key in data[0]) {         //<--- СОЗДАНИЕ СТРОКИ С ЗАГОЛОВКАМИ
    let th = document.createElement('th');
    th.innerHTML = key;
    tr.append(th);
  }

  head.append(tr)
  table.append(head);


  let td
  
  // самостоятельно сформировать строки таблицы на основе массива data
  for (let i=0;i<data.length;i++) {
    if (data.length > 1) keys = Object.values(data[i])
    else keys = null

    let body = document.createElement('tbody')
    tr = document.createElement('tr');

    for (let j=0; j<keys.length; j++) {
      td = document.createElement('td')
      if (j != 1) td.innerHTML = keys[j]
      else td.innerHTML = '<img src='+keys[j]+' alt='+keys[0]+'>'
      tr.append(td)
    }

    body.append(tr)

    table.append(body);

  }; */

d3.select('table').append('thead')
     .append('tr')
     .selectAll('th')
     .data(Object.keys(consoles[0]))
     .enter()
     .append('th')
     .text(d => d)

d3.select('table').append('tbody')
      .selectAll('tr')
      .data(consoles)
      .enter()
      .append('tr')

d3.select('tbody').selectAll('tr')
   .selectAll('td')
   .data(d => Object.values(d))
   .enter()
   .append('td')
   .text(d => d)

d3.select('tbody')
  .selectAll('tr')
  .data(consoles)
  .selectAll('td:nth-child(2)')
  .html(d => '<img src='+d+'>')   

}






let clearTable = (idTable) => {
      let i = 0;
      let El = document.getElementById(idTable);

      while (El.children.length > 0) {
        El.children[0].remove()
      }


}



//let

    /*function getParent(idElement){
        let El = document.getElementById(idTable);
        alert (El.children.length)
        
        while (element.parentNode){
            element = element.parentNode;
            alert(element);
            count++
        }
    
        return count;
    }*/