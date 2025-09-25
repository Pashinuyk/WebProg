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
let createSortArr = (data) => {
  let sortArr = [];
  let sortSelects = data.getElementsByTagName('select');

  for (let i = 0; i < sortSelects.length; i++) {
    // получаем номер выбранной опции
    let keySort = sortSelects[i].value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort == 0) {
        break;
    }
    // получаем номер значение флажка для порядка сортировки
    // имя флажка сформировано как имя поля SELECT и слова Desc
    let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;

    sortArr.push({column: keySort - 1, order: desc});
  }
  return sortArr;
};



let sortTable = (idTable, data) => {
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
      return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows);

    // удаляем элемент с заголовками таблицы
    rowData.shift();
    //сортируем данные по возрастанию по всем уровням сортировки
    rowData.sort((first, second) => {
      for(let i in sortArr) {
        let key = sortArr[i].column;
        if ((i == 0 && data[1].checked == false) || (i == 1 && data[3].checked == false) || (2 == 1 && data[5].checked == false)) {
          if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
            return 1;
          } else if (first.cells[key].innerHTML < second.cells[key].innerHTML){
            return -1;
          }
        }
        else {
            if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                return 1;
            } else if (first.cells[key].innerHTML > second.cells[key].innerHTML){
                return -1;
            }      
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



let dropSort = (idTable, form) => {
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



