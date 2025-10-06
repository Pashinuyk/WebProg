// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
  "Название": "name",
  "Тип": "type",
  "Разработчик": "dev",
  "Процессор": "cpu",
  "Такт. частота процессора (МГц)": ["temp1", "temp2"],
  "Оперативная памяти (МБ)": ["ram1", "ram2"],
  "Продано (млн.)": ["year1", "year2"],
  "Поколение": ["gen1", "gen2"],
  "Год выпуска": ["year1", "year2"]

}

let reserv = document.getElementById('filter')

let dataFilter = (dataForm) => {   //<--- ДАННЫЕ ИЗ ПОЛЕЙ ФОРМЫ "ФИЛЬТРАЦИЯ"
  let dictFilter = {}; //<-- КЛЮЧИ МАССИВА - ID'Ы ПОЛЕЙ (ИМЯ - NAME, ТИП - TYPE И Т.Д.), ЗНАЧЕНИЯ - СОДЕРЖИМОЕЙ ПОЛЕЙ

  //<--- ПЕРЕБИРАЮТСЯ ВСЕ ПОЛЯ ФОРМЫ
  for(let j = 0; j < dataForm.elements.length-1; j++) {
  // выделяем очередной элемент формы
    let item = dataForm.elements[j];

  // получаем значение элемента
    let valInput = item.value;
  // если поле типа text - приводим его значение к нижнему регистру

    if (item.id == 'type') { //<--- ПРЕОБРАЗОВАНИЕ ЗНАЧЕНИЯ ЭЛЕМЕНТА В ЗАВИСИМОСТИ ОТ ТИПА ПОЛЯ
      valInput = item.value
      if (valInput == 1) {
        valInput = 'Домашняя'
      } else if (valInput == 2) {
        valInput = 'Портативная'
      } else if (valInput == 3) {
        valInput = 'Гибридная'
      } else if (valInput == 4) {
        valInput = 'Аддон'
      }
    } 
    else {
      if (item.type == "text") {
        valInput = valInput.toLowerCase();
      } 
      else if (item.type == "number") {
        if (!isNaN(parseFloat(valInput))) {
          valInput = Number(valInput)
        } 
        else {
          if (item.id=='temp1' || item.id=='ram1' || item.id=='year1' || item.id=='gen1') {
            valInput = -Infinity
          } 
          else if (item.id=='temp2' || item.id=='ram2' || item.id=='year2' || item.id=='gen2') {
            valInput = Infinity
          }
        }
      } 
    }

    // формируем очередной элемент ассоциативного массива
    dictFilter[item.id] = valInput;

  }
  return dictFilter;
}


  
let filterTable = (data, idTable, dataForm) =>{   // фильтрация таблицы

  let form = document.getElementById('sort')  //<--- ОБНУЛЕНИЕ СОРТИРОВКИ                     
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
  changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst')) //<--- ОБНУЛЕНИЕ СОРТИРОВКИ

  // получаем данные из полей формы
  let datafilter = dataFilter(dataForm); //<--- ДАННЫЕ ИЗ ПОЛЕЙ ФОРМЫ
  console.log(datafilter)
  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter(item => {
    let result = true;
    // строка соответствует фильтру, если сравнение всех значения из input
    // со значением ячейки очередной строки - истина
    for(let key in item) { //<--- ПО-ОТДЕЛЬНОСТИ ВЫБИРАЕТСЯ КАЖДЫЙ ЭЛЕМЕНТ И СРАВНИВАЕТСЯ С datafilter
      let val = item[key];
      //console.log(key+'   '+item[key])
      
      // текстовые поля проверяем на вхождение
      if (key == 'Изображение' || (key == "Тип" && datafilter[correspond[key]] == 0)) { 
        continue
      }

     if (key == 'Тип') {
      val = item[key]
      result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
     } 
     
     else {
      if (typeof val == 'string') {
        val = item[key].toLowerCase()
        result &&= val.indexOf(datafilter[correspond[key]]) !== -1
      }

      if (typeof val == 'number') {
        val = Number(item[key])
        if (key == 'Год выпуска') {
          console.log(val+' >= '+datafilter[correspond[key][0]]+' AND '+val+' <= '+datafilter[correspond[key][1]])
        }
        if (!((val >= datafilter[correspond[key][0]]) && (val <= datafilter[correspond[key][1]]))) {
          result = false 
        } 
      }
     }  

    // if (result == false) break
    }

    return result;
  });
  reserv = dataForm

  clearTable(idTable)

  // показать на странице таблицу с отфильтрованными строками
  if (tableFilter.length > 0) {
    console.log(tableFilter.length)
    createTable(tableFilter, idTable);
  } else {
    createTable(consoles[0], idTable);
  }

 // console.log(reserv)
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
    if (i == 1) {
      idTable.elements[i].value = 0
    } else {
      idTable.elements[i].value = ''
    }
   // idTable.elements[i].value = ''
  }

  clearTable('list')
  createTable(consoles, 'list');  
}