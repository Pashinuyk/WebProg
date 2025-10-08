/*формируем массив для сортировки по уровням вида:
[
  {column: номер столбца,
order: порядок сортировки (true по убыванию, false по возрастанию)
},
  {column: номер столбца,
   order: порядок сортировки
  }
]
*/
let createSortArr = (data) => {   //<--- ИЗВЛЕЧЕНИЕ ЗНАЧЕНИЙ ИЗ ФОРМЫ "СОРТИРОВКА"
  let sortArr = [];
  let sortSelects = data.getElementsByTagName('select');

  for (let i = 0; i < sortSelects.length; i++) {
    // получаем номер выбранной опции
    let keySort = sortSelects[i].value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort == 0) break;

    // получаем номер значение флажка для порядка сортировки
    // имя флажка сформировано как имя поля SELECT и слова Desc
    let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;

    sortArr.push({column: keySort - 1, order: desc});   //<--- АССОЦИАЦ. МАССИВ: column - ЭТО ВЫБРАННОЕ ЗНАЧЕНИЕ (ЦИФРА, НОМЕР ПОЛЯ), order - УБЫВАНИЕ ИЛИ НЕТ
    //<--- ДЛИНА ЭТОГО МАССИВА - КОЛ-ВО ВЫБРАННЫХ УРОВНЕЙ СОРТИРОВКИ 
  }
  return sortArr;
};



let sortTable = (idTable, data) => {         //<--- ГЛАВНАЯ ФУНКЦИЯ СОРТИРОВКИ
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);     //<--- ИЗВЛЕЧЕНИЕ ЗНАЧЕНИЙ ИЗ ФОРМЫ "СОРТИРОВКА"

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) return false;

    //находим нужную таблицу
    let table = document.getElementById(idTable); 
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows); //<---МАССИВ СТРОК (tr) ИЗ ТАБЛИЦЫ

    // удаляем элемент с заголовками таблицы
    rowData.shift();
    
    //сортируем данные по возрастанию по всем уровням сортировки
    rowData.sort((first, second) => {
      for(let i in sortArr) {    
        let key = sortArr[i].column;
      //  alert('first: '+first.cells[0].innerHTML+' second: '+second.cells[0].innerHTML)

        if (key == 1) continue
        
        //<--- ПРОЦЕСС СОРТИРОВКИ
        if (((key < 5) && (first.cells[key].innerHTML > second.cells[key].innerHTML)) || ((key >= 5) && ((first.cells[key].innerHTML / 1) > (second.cells[key].innerHTML / 1)))) {
          if (sortArr[i].order == false) return 1
          else return -1;
        } 
        else if (((key < 5) && (first.cells[key].innerHTML < second.cells[key].innerHTML)) || ((key >= 5) && ((first.cells[key].innerHTML / 1) < (second.cells[key].innerHTML / 1)))){
          if (sortArr[i].order == false) return -1
          else return 1;
        }
      }  
    return 0;
    });

    //выводим отсортированную таблицу на страницу
    table.innerHTML = table.rows[0].innerHTML;
    rowData.forEach(item => {
      table.append(item);
    });

}



let dropSort = (idTable, form) => { //<--- ЧИСТКА ЗНАЧЕНИЙ ФОРМЫ "ФИЛЬТРЫ"
   for (let i=0;i<6;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'))

    let val = document.getElementById('filter')

    clearTable(idTable)
    createTable(consoles, idTable);
    filterTable(consoles, idTable, reserv)

}



