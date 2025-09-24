// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
  "Название": "structure",
  "Тип": "category",
  "Страна": "country",
  "Город": "city",
  "Год": ["yearFrom", "yearTo"],
  "Высота": ["heightFrom", "heightTo"]
}

let reserv = document.getElementById('filter')

let dataFilter = (dataForm) => {   //фильтрация данных
  let dictFilter = {};

  // перебираем все элементы формы с фильтрами

  for(let j = 0; j < dataForm.elements.length-2; j++) {
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
        if (item.id=='yearFrom' || item.id=='heightFrom') {
          valInput = -Infinity
        } else if (item.id=='yearTo' || item.id=='heightTo') {
          valInput = Infinity
        }
      }
    } 

  //  alert(valInput)

  // формируем очередной элемент ассоциативного массива
    dictFilter[item.id] = valInput;

  }
  return dictFilter;
}


  
let filterTable = (data, idTable, dataForm) =>{   // фильтрация таблицы

  let form = document.getElementById('sort')
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'))

  // получаем данные из полей формы
  let datafilter = dataFilter(dataForm);
  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter(item => {
    let result = true;
    // строка соответствует фильтру, если сравнение всех значения из input
    // со значением ячейки очередной строки - истина
    for(let key in item) {
      let val = item[key];

      //alert(datafilter[correspond['Год'][1]])
      // текстовые поля проверяем на вхождение
      if (typeof val == 'string') {
        val = item[key].toLowerCase()
        result &&= val.indexOf(datafilter[correspond[key]]) !== -1
      //  alert(val+' '+result)
      }

      if (typeof val == 'number') {
        val = Number(item[key])
        if (!(val >= datafilter[correspond[key][0]] && val <= datafilter[correspond[key][1]])) {
          result = false 
        }
        //alert(val+' '+result)
      }
    // самостоятельно проверить числовые поля на принадлежность интервалу

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
    createTable(buildings[0], idTable);
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