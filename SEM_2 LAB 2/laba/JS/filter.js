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
          if (key == 'Год выпуска') console.log(val+' >= '+datafilter[correspond[key][0]]+' AND '+val+' <= '+datafilter[correspond[key][1]])

          if (!((val >= datafilter[correspond[key][0]]) && (val <= datafilter[correspond[key][1]]))) result = false 
        }
      }  
     if (result == false) break
    }

    return result;
  });

  reserv = dataForm

  clearTable(idTable)

  // показать на странице таблицу с отфильтрованными строками
  if (tableFilter.length != 0) {
    console.log(tableFilter.length)
    createTable(tableFilter, idTable);
  } else {
    createTable(arr = [consoles[0]], idTable);
  }

 // console.log(reserv)
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



/*   const arr = Array.from(dataForm.elements)
  console.log(arr)

  const frHalf = arr.slice(0,4)
  const secHalf = arr.slice(4,12)

  let copy1 = frHalf
  console.log(copy1.values)
  copy1[0].value = copy1[0].value.toLowerCase()
  copy1[2].value = copy1[2].value.toLowerCase()
  copy1[3].value = copy1[3].value.toLowerCase()
  let copy2 = secHalf
  copy2.values = secHalf.map((item) => Number(item.value))


 const arr2 = [].concat(copy1, copy2)

  const dictFilter = arr2.reduce((acc, item) => {
    return {...acc, [item.id]: item.value}
  }, {})
  console.log(dictFilter) 
  
  const newCopy1 = copy1.map((item, i) => ({
  ...item,
  value: frHalf[i].value.toLowerCase()
}));
  
  */
