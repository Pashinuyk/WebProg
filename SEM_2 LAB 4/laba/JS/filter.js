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

let reserv //= document.getElementById('filter')


let filterStart = (data, idTable, dataForm) => {

  let form = document.getElementById('sort')  //<--- ОБНУЛЕНИЕ СОРТИРОВКИ                     
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
  changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst')) //<--- ОБНУЛЕНИЕ СОРТИРОВКИ

  tableFilter = filterTable(data, idTable, dataForm)

  reserv = dataForm
  clearTable(idTable)

  // показать на странице таблицу с отфильтрованными строками
  if (tableFilter.length != 0) {
   // console.log(tableFilter.length)
    createTable(tableFilter, idTable);
  } else {
    createTable(arr = [consoles[0]], idTable);
  }  

}



let dataFilter = (dataForm) => {   //<--- ИЗВЛЕЧЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ ФОРМЫ "ФИЛЬТРАЦИЯ"
  let dictFilter = {}; //<-- КЛЮЧИ МАССИВА - ID'Ы ПОЛЕЙ (ИМЯ - NAME, ТИП - TYPE И Т.Д.), ЗНАЧЕНИЯ - СОДЕРЖИМОЕЙ ПОЛЕЙ


  for(let j = 0; j < dataForm.elements.length-1; j++) {   //<--- ПЕРЕБИРАЮТСЯ ВСЕ ПОЛЯ ФОРМЫ
  // выделяем очередной элемент формы
    let item = dataForm.elements[j];

  // получаем значение элемента
    let valInput = item.value;
  // если поле типа text - приводим его значение к нижнему регистру

    if (item.type == "text") { //<--- ПРЕОБРАЗОВАНИЕ ЗНАЧЕНИЯ ЭЛЕМЕНТА В ЗАВИСИМОСТИ ОТ ТИПА ПОЛЯ
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
    
    // формируем очередной элемент ассоциативного массива
    dictFilter[item.id] = valInput; 

  } 
  



  return dictFilter;
}


  
let filterTable = (data, idTable, dataForm) =>{   //<--- ГЛАВНАЯ ФУНКЦИЯ ФИЛЬТРАЦИИ


  // получаем данные из полей формы
  let datafilter = dataFilter(dataForm); //<--- ДАННЫЕ ИЗ ПОЛЕЙ ФОРМЫ
  console.log(datafilter)
  //console.log(document.getElementById('list').innerHTML)
  //alert(document.getElementById('list').innerHTML)

  /*filterFunc = (el) => {
    let val = el['Название'].toLowerCase()
    if (val.indexOf(datafilter['name']) == -1) return true
    else return false
   // return (el['Тип'] == datafilter['type'])
  }

  d3.select('table')
    .select('tbody')
    .selectAll('tr')
    .style('display', '')

  d3.select('table')
  .select('tbody')
  .selectAll('tr')
  .data(consoles)
  //.filter(d => d['Тип'] != datafilter['type'])
  .filter(d => filterFunc(d))
  //.filter(d => !((d['Оперативная памяти (МБ)'] >= datafilter['ram1']) && (d['Оперативная памяти (МБ)'] <= datafilter['ram2'])))
  .style('display', 'none')  */

  let tableFilter = data.filter(item => {  //<--- ИЗ ТАБЛИЦЫ ПОСТЕПЕННО БЕРЁТСЯ КАЖДАЯ СТРОКА И СРАВНИВАЕТСЯ С datafilter
    let result = true;
    // строка соответствует фильтру, если сравнение всех значения из input
    // со значением ячейки очередной строки - истина
    for(let key in item) { //<--- ИЗ СТРОКИ БЕРЁТСЯ КАЖДОЕ ПОЛЕ И СРАВНИВАЕТСЯ С СООТВЕТСТВУЮЩИМ ИЗ datafilter
      let val = item[key];
      
      // текстовые поля проверяем на вхождение
      if (key == 'Изображение' || (key == "Тип" && datafilter[correspond[key]] == 'Нет')) continue

      if (key == 'Тип') {
        if (val != datafilter['type']) result = false
      } 
      else {
        if (typeof val == 'string') {
          val = val.toLowerCase()
          if (val.indexOf(datafilter[correspond[key]]) == -1) result = false //<--- indexOf(...) - ПОИСК ПОДСТРОКИ В СТРОКЕ. correspot[key] - ПОИСК КЛЮЧА
        }

        if (typeof val == 'number') {
          val = Number(val)
       //   if (key == 'Год выпуска') console.log(val+' >= '+datafilter[correspond[key][0]]+' AND '+val+' <= '+datafilter[correspond[key][1]])

          if (!((val >= datafilter[correspond[key][0]]) && (val <= datafilter[correspond[key][1]]))) result = false 
        }
      }  
     if (result == false) break
    }

    return result;
  });

  return tableFilter

}  

let clearFilter = (idTable) => { //<--- ЧИСТКА ФИЛЬТРОВ

  let form = document.getElementById('sort') //<--- ЧИСТКА ЗНАЧЕНИЙ ФОРМЫ "СОРТИРОВКА"
  for (let i=0;i<4;i++)
    if (i==0 || i==2) {
      form[i].value = 0
    } else {
      form[i].checked = false
    }
  changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst')) //<--- ОБНУЛЕНИЕ СОРТИРОВКИ

  for (let i=0; i<idTable.elements.length-2; i++) { //<--- ЧИСТКА ЗНАЧЕНИЙ ФОРМЫ "ФИЛЬТРЫ"
    if (i == 1) idTable.elements[i].value = 'Нет'
    else idTable.elements[i].value = ''
  }

  clearTable('list')
  createTable(consoles, 'list');  
}