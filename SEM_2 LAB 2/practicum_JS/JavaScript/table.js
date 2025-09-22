//выводим таблицу на страницу
let createTable = (data, idTable) => {
    // находим таблицу
    let table = document.getElementById(idTable);

    // формируем заголовочную строку из ключей нулевого элемента массива
    let tr = document.createElement('tr');

    for(key in data[0]) {
      let th = document.createElement('th');
      th.innerHTML = key;
      tr.append(th);
    }

    table.append(tr);

    let td
    // самостоятельно сформировать строки таблицы на основе массива data
    data.forEach((item) => {

        keys = Object.values(item)
        tr = document.createElement('tr');

        for (let i=0; i<keys.length; i++) {
            td = document.createElement('th')
            td.innerHTML = keys[i]
            tr.append(td)
        }

        table.append(tr);

    }); 
}

let clearTable = (idTable) => {
      let i = 0;
      let El = document.getElementById(idTable);

      while (El.children.length > 1) {
        El.children[1].remove()
      }


    }

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