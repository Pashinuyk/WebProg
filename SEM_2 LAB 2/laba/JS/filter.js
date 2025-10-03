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

let dataFilter = (dataForm) => {   //фильтрация данных
  let dictFilter = {};

  // перебираем все элементы формы с фильтрами
  for(let j = 0; j < dataForm.elements.length-1; j++) {
  // выделяем очередной элемент формы
    let item = dataForm.elements[j];

  // получаем значение элемента
    let valInput = item.value;
  // если поле типа text - приводим его значение к нижнему регистру

    if (item.id == 'type') {
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


    } else {

    if (item.type == "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type == "number") {
      if (!isNaN(parseFloat(valInput))) {
        valInput = Number(valInput)
      } else {
        if (item.id=='temp1' || item.id=='ram1' || item.id=='year1' || item.id=='gen1') {
          valInput = -Infinity
        } else if (item.id=='temp2' || item.id=='ram2' || item.id=='year2' || item.id=='gen2') {
          valInput = Infinity
        }
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
      
     // alert(Object.keys(item)+'   '+item[key])
     // alert(datafilter[correspond['Год'][1]])
      // текстовые поля проверяем на вхождение
     // alert('corr '+correspond[key].value+'   '+item[key])
      if (key == 'Изображение' || (key == "Тип" && datafilter[correspond[key]] == 0)) { 
        continue
      }
     // alert('corr '+correspond[key]+'   '+item[key])

     if (key == 'Тип') {
     // alert(datafilter[correspond[key]])
      val = item[key]

      //alert(val+' '+datafilter[correspond[key]])
      result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
     } else {

      if (typeof val == 'string') {
        val = item[key].toLowerCase()
      //  alert(key+' '+val.indexOf(datafilter[correspond[key]]))
        //alert(key+' '+datafilter[correspond[key]])
        result &&= val.indexOf(datafilter[correspond[key]]) !== -1
      }

      if (typeof val == 'number') {
        val = Number(item[key])
        //alert(correspond[key])
        if (!(val >= datafilter[correspond[key][0]] && val <= datafilter[correspond[key][1]])) {
          result = false 
        } 
       // alert(val+' '+result)
      }
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

