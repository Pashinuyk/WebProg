let dataType = 1;

function reorganize(data) {
    dataType = data.typeOfData.value;

    if (dataType == 2) {
        document.getElementById("secF").textContent = "α =";
        document.getElementById("thrF").textContent = "β =";
        document.querySelector('img').src='pict_2.png';
        data.input2.min = 0; data.input.max = 360;
        data.input3.min = 0; data.input.max = 360;
    } else {
        document.getElementById("secF").textContent = "B =";
        document.getElementById("thrF").textContent = "C =";   
        document.querySelector('img').src='pict_1.png';
        data.input2.min = 1; data.input.max = 99999;
        data.input3.min = 1; data.input.max = 99999; 
    }
    
}




function calculate(data) {
    /* читаем входные данные */ 
    let a = Number(data.input1.value); 
    let b = Number(data.input2.value);
    let c = Number(data.input3.value);

    let isError = 0;

    if (a <= 0) {
      data.input1.classList.add("error"); 
      isError = 1;
    } 
    if ((b <= 0) || (b > 360 && dataType==2)) {
      data.input2.classList.add("error"); 
      isError = 1;      
    } 
    if ((c <= 0) || (c > 360 && dataType==2)) {
      data.input3.classList.add("error"); 
      isError = 1;
    }  

    if ((data.task1.checked == 0) && (data.task2.checked == 0) && (data.task3.checked == 0) && (data.task4.checked == 0)) {
      document.getElementById("search").classList.add("errorSearch");
      let output = document.getElementById('output'); 
      output.innerHTML = "";
      isError = 1;
    }

    if ((dataType == 2) && ((Number(b)+Number(c)>=180))) {
        data.input2.classList.add("error"); 
        data.input3.classList.add("error"); 
        isError = 1;
    }

    if (isError == 1) {
        return false;
    }
    let p = 0;
    let s = 0;

    let gamma = 0;
    let stB = 0;
    let stC = 0;

    if (dataType == 1) {
      p = (a+b+c)/2;
      s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
    } else {
      b = b * Math.PI / 180;
      c = c * Math.PI / 180;
      gamma = (180 * Math.PI / 180)-b-c;
      //gamma = gamma * Math.PI / 180;
      stB = (a*Math.sin(b)/Math.sin(gamma)).toFixed(3);
      stC = (a*Math.sin(c)/Math.sin(gamma)).toFixed(3);
      stB = +stB;
      stC = +stC;

      p = (a+stB+stC)/2;
      s = Math.sqrt(p*(p-a)*(p-stB)*(p-stC));    
    }


    let output = document.getElementById('output'); 

    output.innerHTML = "<p>Результаты:</p>";

    /* формируем новый абзац */ 
    if (data.task1.checked) { /* ПЛОЩАДЬ */
        let newElement1 = document.createElement('p'); 
        if (dataType == 1) {
            newElement1.innerHTML = "S = " +s.toFixed(3); 
        } else {
            newElement1.innerHTML = "S = " +(0.5*a*stB*Math.sin(c)).toFixed(3);
        }    

        output.appendChild(newElement1); 
    }    

    if (data.task2.checked) { /* РАДИУС ВПИСАННОЙ ОКРУЖНОСТИ */

        let newElement2 = document.createElement('p'); 

        if (dataType == 1) {
            newElement2.innerHTML = "R = " +(s/p).toFixed(3); 
        } else {
            newElement2.innerHTML = "R = " /*+((a * Math.sin(b) * Math.sin(c)) / (2 * Math.sin(gamma) * Math.sin((b + c) / 2))).toFixed(3);  */ +(2*s/(a+stB+stC)).toFixed(3);
        }    

        output.appendChild(newElement2); 
    }    

    if (data.task3.checked) { /* ВЫСОТА */
        let newElement3 = document.createElement('p'); 

        if (dataType == 1) {
            newElement3.innerHTML = "H = " +(2*s/a).toFixed(3); 
        } else {    
            newElement3.innerHTML = "H = " +(stB * Math.sin(c)).toFixed(3); 
        }     

        output.appendChild(newElement3); 
    }       

    if (data.task4.checked) { /* БИССЕКТРИСА */
        let newElement4 = document.createElement('p'); 

        if (dataType == 1) {
            newElement4.innerHTML = "bi = " +((2*Math.sqrt(b*c*p*(p-a)))/(b+c)).toFixed(3); 
        } else {
            let n1 = +(2 * stB * stC * Math.cos(gamma / 2));
            let n2 = +(stB + stC);
            let n3 = n1/n2;
            newElement4.innerHTML = "bi = " +(n3).toFixed(3);
        }    

        output.appendChild(newElement4); 
    }     
    return true;
}

function clean(data) {
    data.input1.value = '';
    data.input2.value = '';
}

