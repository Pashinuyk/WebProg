document.addEventListener("DOMContentLoaded", function() {
  //  setSortSelects(buildings[0], document.getElementById("sort"))
    createTable(consoles, 'list');
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
    
    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');

    for(let j = 0; j < allSelect.length; j++) {
      //формируем опции очередного SELECT
      setSortSelect(head, allSelect[j]);
      //самостоятельно все SELECT, кроме первого, сделать неизменяемыми
      if (j > 0) {
        allSelect[j].disabled = true
      } 
    }
}



// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
      nextSelect.remove(curSelect.value);
    } else {
      nextSelect.disabled = true;
    }
}