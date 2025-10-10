//выводим таблицу на страницу
let createTable = (data, idTable) => {
    // находим таблицу
    let table = document.getElementById(idTable);

    // формируем заголовочную строку из ключей нулевого элемента массива
    let tr = document.createElement('tr');

    for(key in data[0]) {         //<--- СОЗДАНИЕ СТРОКИ С ЗАГОЛОВКАМИ
      let th = document.createElement('th');
      th.innerHTML = key;
      tr.append(th);
    }

    table.append(tr);


    let td
    
    // самостоятельно сформировать строки таблицы на основе массива data
    for (let i=0;i<data.length;i++) {
      if (data.length > 1) keys = Object.values(data[i])
      else keys = null

      tr = document.createElement('tr');

      for (let j=0; j<keys.length; j++) {
        td = document.createElement('th')
        if (j != 1) td.innerHTML = keys[j]
        else td.innerHTML = '<img src='+keys[j]+' alt='+keys[0]+'>'
        tr.append(td)
      }

      table.append(tr);

    }; 

}



let clearTable = (idTable) => {
      let i = 0;
      let El = document.getElementById(idTable);

      while (El.children.length > 0) {
        El.children[0].remove()
      }


}

