// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
  "Название": "name",
  "Тип": "type",
  "Разработчик": "dev",
  "Процессор": "cpu",
  "Частота процессора": ["temp1", "temp2"],
  "RAM": ["ram1", "ram2"],
  "Поколение": "gen",
  "Год выпуска": ["year1", "year2"]

}

let reserv = document.getElementById('filter')

let dataFilter = (dataForm) => {   //фильтрация данных
  let dictFilter = {};

  // перебираем все элементы формы с фильтрами
  for(let j = 0; j < dataForm.elements.length-1; j++) {
  // выделяем очередной элемент формы
    let item = dataForm.elements[j];

  // получаем значение элемента
    let valInput = item.value;
  // если поле типа text - приводим его значение к нижнему регистру
    if (item.type == "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type == "number") {
      if (!isNaN(parseFloat(valInput))) {
        valInput = Number(valInput)
      } else {
        if (item.id=='temp1' || item.id=='ram1' || item.id=='year1') {
          valInput = -Infinity
        } else if (item.id=='temp2' || item.id=='ram2' || item.id=='year2') {
          valInput = Infinity
        }
      }
    } 
    //alert(valInput+' '+item.type)

  // формируем очередной элемент ассоциативного массива
    dictFilter[item.id] = valInput;

  }
  return dictFilter;
}


  
let filterTable = (data, idTable, dataForm) =>{   // фильтрация таблицы

 /* let form = document.getElementById('sort')                         ВЕРНУТЬ
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'))*/

  // получаем данные из полей формы
  let datafilter = dataFilter(dataForm);
  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter(item => {
    let result = true;
    // строка соответствует фильтру, если сравнение всех значения из input
    // со значением ячейки очередной строки - истина
    for(let key in item) {
      let val = item[key];
      alert(item[key])
     // alert(datafilter[correspond['Год'][1]])
      // текстовые поля проверяем на вхождение
      if (typeof val == 'string') {
        val = item[key].toLowerCase()
        result &&= val.indexOf(datafilter[correspond[key]]) !== -1
      }

      if (typeof val == 'number') {
        val = Number(item[key])
        if (!(val >= datafilter[correspond[key][0]] && val <= datafilter[correspond[key][1]])) {
          result = false 
        }
       // alert(val+' '+result)
      }

  }
  return result;
  });
  clearTable(idTable)

  // показать на странице таблицу с отфильтрованными строками
 //alert(tableFilter.length)

 reserv = dataForm


  if (tableFilter.length > 0) {
    createTable(tableFilter, idTable);
  } else {
    createTable(consoles[0], idTable);
  }
}  

let clearFilter = (idTable) => {

  let form = document.getElementById('sort')
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
  changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'))

  for (let i=0; i<idTable.elements.length-2; i++) {
    idTable.elements[i].value = ''
  }

  clearTable('list')
  createTable(buildings, 'list');  
}