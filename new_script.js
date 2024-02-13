
document.addEventListener('DOMContentLoaded', () => {

			
	// сразу фокус на элемент матрицы
	document.querySelector('.matrix_elem').focus();

	// кнопки
	const btnMakeMatrixElem = document.querySelector('.add_matrix_elem');
	const btnDeleteMatrix = document.querySelector('.cross_symbol');
	const btnCreateNewMatrix = document.querySelector('.btn_plus');

	const alphabet = /[A-Za-zА-Яа-яЁё]/g;
	let matricesNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	let matrices_count = 1;

	const minFontSize = '0.6em';	//0.6
	const normalFontSize = 1.4;	//1.5

	let row_limit = 10;
	let column_limit = 10;

	let id_count = 0;
	let id_row_count = 0;
	let copy_flag = false;

	// Изначальная (пустая) матрица элементов
	let matrix = [];
	for (i = 0; i < row_limit; i++){
		let row_matrix = [];
		for (j = 0; j < column_limit; j++) {
			row_matrix.push('n');
		}
		matrix.push(row_matrix);
	}

	let matrices = [];



	// Обработчики по клавишам
	document.addEventListener('keydown', function(event) {
		pressingButtons(event.code);	// подсветка кнопок

		if (event.code == 'Space' && document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')) {
			createNewElem();	// Добавление элемента по пробелу
		}	
		else if (event.code == 'Enter' && document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')) {
			createNewElem(true);	// Перенос строки (добавление элемента) по Enter
		}	
		else if (event.code == 'Backspace' && (document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')
			&& document.querySelector(`#matrix_elem_${id_count}`).value == "")) {
			deleteElement();	// Удаление элемента по Backspace
		}
		if (event.code == 'KeyV' && (event.ctrlKey || event.metaKey) && 
			document.querySelector('#matrix_elem_0') === document.querySelector(':focus')) {
			copy_flag = true;	// Вставка матрицы по Ctrl + V
		}
		if (event.code == 'Delete') {
			deleteMatrix();		// Удаление матрицы
		}
	});

	// Недожеланная пока хуйня с клавиатурой
	document.addEventListener('click', function(event) {
		if (event.target.id.slice(0, 4) == "abtn") {
			let h = event.target.id.slice(5);
			if (+h >= 0 && +h <= 9) {
				document.querySelector(`#matrix_elem_${id_count}`).value += event.target.id.slice(5);
			}
			else if (+h == 10) {
				deleteElement();
			}
			else if (+h == 11) {
				createNewElem();
			}
			else if (+h == 12) {
				createNewElem(true);
			}
			document.querySelector(`#matrix_elem_${id_count}`).focus();
			fixFontSize(document.querySelector(`#matrix_elem_${id_count}`));
		}
	});



	// Создание нового элемента матрицы
	function createNewElem(flag) {
		matrix[Math.floor(id_count / column_limit)][id_count - Math.floor(id_count / column_limit) * column_limit] = 
		document.querySelector(`#matrix_elem_${id_count}`).value;
		id_count++;
		// Удаляем textarea и меняем на input
		if (id_count == 1) {
			let elem = document.createElement('input');
			elem.className = "matrix_elem";
			elem.type = "text";	
			elem.name = "username";
			elem.autocomplete = "off";
			elem.id = 'matrix_elem_0';	
			elem.value = 0;
			matrix[0][0] = '0';
			if (document.querySelector('#matrix_elem_0').value != '') {
				elem.value = document.querySelector('#matrix_elem_0').value;
				matrix[0][0] = document.querySelector('#matrix_elem_0').value;
			}
			document.querySelector('#matrix_elem_0').replaceWith(elem);
		}
		// Меняет '' на 0 у первого эл-та
		if (id_count >= 1 && document.querySelector(`#matrix_elem_${id_count- 1}`).value == '') {
			document.querySelector(`#matrix_elem_${id_count- 1}`).value = 0;
			matrix[Math.floor((id_count- 1) / column_limit)][(id_count- 1) - Math.floor((id_count- 1) / column_limit) * column_limit] = '0';
		}

		// автоматически перебрасывать на след. строку, если кол-во элементов прев. пред. строку
		if (id_row_count > 0) {
			column_limit = document.getElementById(`matrix_row_${id_row_count - 1}`).getElementsByClassName('matrix_elem').length;
		}

		// Создание новой строки матрицы
		if ((flag && (id_row_count == 0 || id_count % column_limit == 0)) || id_count % column_limit == 0) {
			if (flag && id_row_count == 0) {
				column_limit = document.getElementById(`matrix_row_${id_row_count}`).getElementsByClassName('matrix_elem').length;
			}
			id_row_count++;
			if (id_row_count > row_limit - 1) { 
				id_count--;
				id_row_count--;
				return;
			}
			let row = document.createElement('div');
			row.className = "matrix_row_field";
			row.id = `matrix_row_${id_row_count}`;
			document.querySelector('.matrix_field').append(row);
		}

		// Создание инпута нового элемента матрицы
		let elem = document.createElement('input');
		elem.className = "matrix_elem";
		elem.type = "text";	
		elem.name = "username";
		elem.autocomplete = "off";
		elem.id = `matrix_elem_${id_count}`;

		fixFontSize(document.getElementById(`matrix_elem_${id_count - 1}`)); 
		document.querySelector(`#matrix_row_${id_row_count}`).append(elem);
		document.querySelector(`#matrix_elem_${id_count}`).focus();
	}



	// Удалить элемент
	function deleteElement() {
		// Удаляем textarea и меняем на input
		if (id_count == 1) {
			let elem = document.createElement('textarea');
			elem.className = "matrix_elem";
			elem.type = "text";	
			elem.name = "username";
			elem.autocomplete = "off";
			elem.placeholder = "0";
			elem.id = 'matrix_elem_0';
			elem.value = document.querySelector('#matrix_elem_0').value;		
			document.querySelector('#matrix_elem_0').replaceWith(elem);
			console.log(document.querySelector('#matrix_elem_0'));
			/*document.querySelector(`#matrix_elem_${id_count}`).remove();
			id_count--;
			document.querySelector(`#matrix_elem_${id_count}`).focus();*/
		}
		// Пока не первый элемент
		if (id_count != 0) {
			// Если элемент первый в строке - удалить строку
			if (id_count % column_limit == 0 && id_row_count != 0) {
				document.querySelector(`#matrix_elem_${id_count}`).remove();
				document.querySelector(`#matrix_row_${id_row_count}`).remove();
				id_row_count--;
				id_count--;
				document.querySelector(`#matrix_elem_${id_count}`).focus();
				if (id_row_count == 0) {
					column_limit = 10;
				}
			}
			else {
				document.querySelector(`#matrix_elem_${id_count}`).remove();
				id_count--;
				document.querySelector(`#matrix_elem_${id_count}`).focus();
			}
		}
	}



	// Удаление матрицы полностью
	function deleteMatrix() {

		row_limit = 10;
		column_limit = 10;

		matrix = [];
		for (i = 0; i < row_limit; i++){
			let row_matrix = [];
			for (j = 0; j < column_limit; j++) {
				row_matrix.push('n');
			}
			matrix.push(row_matrix);
		}
		console.log('deleteMatrix', matrix)

		document.querySelector(".matrix_field").innerHTML = '';
		id_count = 0;
		id_row_count = 0;

		let row = document.createElement('div');
			row.className = "matrix_row_field";
			row.id = "matrix_row_0";
			document.querySelector('.matrix_field').append(row);

		let elem = document.createElement('textarea');
			elem.className = "matrix_elem";
			elem.type = "text";	
			elem.name = "username";
			elem.autocomplete = "off";
			elem.placeholder = "0";
			elem.id = 'matrix_elem_0';
			elem.value = '';
			document.querySelector('.matrix_row_field').append(elem);
			document.querySelector('#matrix_elem_0').focus();
	}



	// Добавление элементов в matrix
	function addToMatrix(elem) {
	  	let id = elem.id;
	  	id_num = +id.slice(12);
	  	// не даем вписать в инпут пробелы и буквы
	  	elem.value = elem.value.replace(' ', '');
	  	elem.value = elem.value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
	  	// добавляем элемент в матрицу
	  	if (elem.value == '') {
	  		matrix[Math.floor(id_num / column_limit)][id_num - Math.floor(id_num / column_limit) * column_limit] = 'n';
	  	}
	  	else { matrix[Math.floor(id_num / column_limit)][id_num - Math.floor(id_num / column_limit) * column_limit] = elem.value; }
	  	console.log(matrix);
	  	console.log(normalizeMatrix(matrix));
	  	matrices.push(normalizeMatrix(matrix));
	}



	// Преобразование matrix в нормальную матрицу
	function normalizeMatrix(matrix) {
		matrix2 = [];

		for (i = 0; i < matrix.length; i++) {
			if (matrix[i][0] != 'n') {
				row_matrix = [];
				for (j = 0; j < matrix[i].length; j++) {
					if (matrix[i][j] != 'n' && matrix[i][j] != '') {
						row_matrix.push(matrix[i][j]);
					}
					else if (matrix[i][j] != 'n' && matrix[i][j] == '') {
						row_matrix.push('0');
					}
				}
				matrix2.push(row_matrix);
			}
			else {
				break;
			}
		}
		return(matrix2);
	}



	// Вставка матрицы через Ctrl + V
	function insertMatrix() {

		id_row_count = 0;

		// Получаем строку из textarea
		let temp_matrix = document.querySelector('#matrix_elem_0').value;
		console.log(temp_matrix);

		// Устаналивает рамки матрицы (по столбцу) исходя из размеров вставленной первой строки
		let tag = '\n';
		console.log(temp_matrix.split(tag)[0].split(' '));
		console.log(temp_matrix.split(tag));
		column_limit = temp_matrix.split(tag)[0].split(' ').length;
		console.log('column_limit', column_limit);
		
		// Преобразуем строку в матрицу
		m_matrix = [];
		m_count = 0;
		for (i = 0; i < temp_matrix.split(tag).length; i++) {
			for (j = 0; j < temp_matrix.split(tag)[i].split(" ").length; j++) {
				if (temp_matrix.split(tag)[i].split(" ")[j] != ' ' && temp_matrix.split(tag)[i].split(" ")[j] != '') {
					m_matrix.push(temp_matrix.split(tag)[i].split(" ")[j]);
					m_count++;
				}
			}
		}
		console.log(m_matrix);


		// Копирует в matrix вставленную строку
		for (i = 0; i < temp_matrix.split(tag).length; i++) {
			for (j = 0; j < temp_matrix.split(tag)[i].split(' ').length; j++) {
				matrix[i][j] = temp_matrix.split(tag)[i].split(' ')[j];
			}
		}
		console.log(matrix);

		// Удаляет textarea и меняет на input
		let elem = document.createElement('input');
		elem.className = "matrix_elem";
		elem.type = "text";	
		elem.name = "username";
		elem.autocomplete = "off";
		elem.id = `matrix_elem_${id_count}`;	
		document.querySelector('#matrix_elem_0').replaceWith(elem);

		// Создает инпуты и вставляет в них значения
		document.querySelector('#matrix_elem_0').value = m_matrix[0];
		for (i = 1; i < m_count; i++) {
			createNewElem();
			document.querySelector(`#matrix_elem_${id_count}`).value = m_matrix[i]; 
		}
		fixFontSize(document.getElementById(`matrix_elem_${id_count}`));
		copy_flag = false;
	}



	// Динамическая замена всего
	document.querySelector('.matrix_field').oninput = function(event) {
		if (copy_flag) { 
			insertMatrix();
			addDeleteCrossSymbol(); 
		}
		else {
			addToMatrix(event.target);	
			addDeleteCrossSymbol();
			fixFontSize(event.target);
		}
	};



	// Возвращает строку из matrix
	function makeMatrixToStr() {
		str = [];
		for (i = 0; i < matrix.length; i++) {
			if (matrix[i][0] != 'n') {
				for (j = 0; j < matrix[i].length; j++) {

					if (matrix[i][j] != 'n' && matrix[i][j] != '' && j < column_limit) {
						str += matrix[i][j] + ' ';
					}
					else if (matrix[i][j] != 'n' && matrix[i][j] == '' && j < column_limit) {
						str += '0' + ' ';
					}

				}
				str = str.slice(0, -1);
				str += "\n";
			}
			else {
				break;
			}
		}
		str = str.slice(0, -1);
		console.log(str);
		console.log(column_limit);
		return str;
	}



	// Замена размера шрифта у инпута 
	function fixFontSize(text) {
  		if (text.value.length > 2 && text.value.length < 7)  {
  			text.style.fontSize = `${(normalFontSize + 0.2 - (text.value.length - 1) * 0.2).toFixed(1)}em`;
  		}
  		else if (text.value.length >= 7) {
  			text.style.fontSize = '0.6em';
  		}
  		else { text.style.fontSize = `${normalFontSize}em`; }
	}



	// Добавляет, удаляет крестик на странице
	function addDeleteCrossSymbol() {
		// Добавляет, удаляет крестик на странице  || elem.value != '' && isNaN(elem.value) == false
	  if (document.getElementById('m_field').getElementsByClassName('matrix_elem').length > 1) {
	  	document.querySelector('.xyz').style.display = 'none';
	  	document.querySelector('.cross_symbol').style.display = 'block';
	  	// document.querySelector('.info_block').style.display = 'none';
	  }
	  else {
	  	document.querySelector('.cross_symbol').style.display = 'none';
	  	document.querySelector('.xyz').style.display = 'flex';
	  	// document.querySelector('.info_block').style.display = 'block';
	  }
	}



	// Удалить матрицу
	btnDeleteMatrix.addEventListener('click', e => { deleteMatrix(); addDeleteCrossSymbol(); })



	// Создание "новой матрицы"
	document.querySelector('.btn_plus').addEventListener('click', e => {
		if (matrices_count < 10) {
			let new_matrix_elem = document.createElement('a');
			new_matrix_elem.className = "matrix_btn";

			let matrix_cross = document.createElement('span');	
			matrix_cross.innerHTML = '×';
			matrix_cross.className = 'matrix_cross';
			new_matrix_elem.innerHTML = `${matricesNames[matrices_count]} <span class="matrix_cross">×</span>`;
			matrices_count++;

			document.querySelector('.btn_plus').before(new_matrix_elem);
		}
	})



	// Копирование матрицы в буфер
	document.querySelector('.copy').addEventListener('click', e => {
	  	var inp = document.createElement('textarea')
	  	inp.value = makeMatrixToStr();
	  	// console.log('copy', makeMatrixToStr())
	  	document.body.appendChild(inp)
	  	inp.select()
	  	document.execCommand('copy')
	  	document.body.removeChild(inp)
	  	alert(`Successfully copied\n${makeMatrixToStr()}`)
	})





	//=============================================================>>>>>

	function lightKey(key) {
		if (+key <= 14 && +key >= 0) {
			document.querySelector(`#abtn_${key}`).classList.add('dark');
			setTimeout(function(){
				document.querySelector(`#abtn_${key}`).classList.remove('dark');
			}, 200)
			// document.querySelector(`#abtn_${key}`).click();
		}
	}

	// Подсветка кнопок при вводе
	function pressingButtons(key) {
		if (key == 'Digit0') { lightKey('0') }
		if (key == 'Digit1') { lightKey('1') }
		if (key == 'Digit2') { lightKey('2') }
		if (key == 'Digit3') { lightKey('3') }
		if (key == 'Digit4') { lightKey('4') }
		if (key == 'Digit5') { lightKey('5') }
		if (key == 'Digit6') { lightKey('6') }
		if (key == 'Digit7') { lightKey('7') }
		if (key == 'Digit8') { lightKey('8') }
		if (key == 'Digit9') { lightKey('9') }
		if (key == 'Backspace') { lightKey('10') }
		if (key == 'Space') { lightKey('11') }
		if (key == 'Enter') { lightKey('12') }
		if (key == 'Minus') { lightKey('13') }
		if (key == 'Slash') { lightKey('14') }
	}



	// Конец скрипта
})












/*
Шаг 1: Преобразовать числа в ячейках в элементы определнной матрицы '1', '2', '3' -> [1, 2, 3] (matrix A)
Шаг 2: Записать эту матрицу в переменную матриц





*/



function addElem() {

}