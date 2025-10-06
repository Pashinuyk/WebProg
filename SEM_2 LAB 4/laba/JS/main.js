document.addEventListener("DOMContentLoaded", function() {
    setSortSelects(consoles[0], document.getElementById("sort"))
    createTable(consoles, 'list');

    reserv = document.getElementById('filter')
 //   drawGraph(consoles)
   // filterTable(consoles, 'list', document.getElementById('filter'));
})



let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}



let setSortSelect = (head, sortSelect) => {
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем все ключи переданного элемента массива данных
    for (let i in head) {
        // создаем OPTION из очередного ключа и добавляем в SELECT
        // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(head[i], Number(i) + 1));
    }
}



// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    let head = Object.keys(data);
    let head2 = []
    head2[0] = head[0]
    for (let i=2; i<head.length;i++) {
      head2[i] = head[i]
    }
    
    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');

    for(let j = 0; j < allSelect.length; j++) {
      //формируем опции очередного SELECT
      setSortSelect(head2, allSelect[j]);
      //самостоятельно все SELECT, кроме первого, сделать неизменяемыми
      if (j > 0) {
        allSelect[j].disabled = true
      } 
    }
}



// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);
    let praNextSelect;
    if (nextSelect.id == 'fieldsSecond') praNextSelect = document.getElementById('fieldsThird')



    nextSelect.disabled = false;
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
        if (curSelect.value > 2) {
          if (nextSelect.id == 'fieldsSecond') { 
            nextSelect.remove(curSelect.value-1)
            praNextSelect.remove(curSelect.value-1)
          } else nextSelect.remove(curSelect.value-2)
        } else {
          nextSelect.remove(curSelect.value);
          if (nextSelect.id == 'fieldsSecond') praNextSelect.remove(curSelect.value)
        } 
    } else {

      nextSelect.disabled = true;
      if (nextSelect.id == 'fieldsSecond') { 
        praNextSelect.disabled = true
        praNextSelect.value = 0
      }  
    }
}