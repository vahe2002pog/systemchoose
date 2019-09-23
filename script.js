let n;

function createMatrixTable() {
    n = $("#text1").val();
    let k = "";
    $('#myTable').text("");
    $('#myTableTwo').text("");
    for (let i = 0; i < n; i++) {
        k += `<td>${i+1}</td>`;
    }
    $('#myTable').append(`<tr><td rowspan="2">Группа показателей</td><td colspan="${n}">Группы показателей</td><td rowspan="2">Сумма ряда</td><td rowspan="2">Индекс балло-значимости</td></tr>${k}<tr>`);
    let o = "<td>Баллы</td><td>Индекс<br>балло-значимости</td><td>Взвешенный<br>балл</td>";
    $('#myTableTwo').append(`<tr><td rowspan="2">Группа показателей<br>сравниваемых вариантов</td><td colspan="3">Автоматизированный способ</td><td colspan="3">Неавтоматизированный способ</td></tr><tr>${o.repeat(2)}</tr>`);
    $('#myTableTwo').append(`<tr><td>1<td>2<td>3<td>4<td>5<td>6<td>7</tr>`);

    for (let i = 0; i < n; i++) {
        $('#myTable').append(`<tr id="tr${i}"><td>${i+1}</td></tr>`);
        for (let j = 0; j < n; j++) {
            if (i == j) {
                k = 0;
            } else {
                k = "";
            }
            $(`#tr${i}`).append(`<td><input type="text" onkeyup="rowSum(${i},${j})" maxlength="2" size="1" id="cell${i+""+j}" value="${k}"></td>`);
        }
        $(`#tr${i}`).append(`<td id="rowSum${i}"></td>`);
        $(`#tr${i}`).append(`<td id="rowInd${i}"></td>`);
        $('#myTableTwo').append(`<tr><td>${i+1}</td><td><input type="text" onkeyup="scoresF(${i})" maxlength="2" size="1" id="cellF${i}"></td><td id="rowIndF${i}"></td><td id="rowTotalF${i}"></td><td><input type="text" onkeyup="scoresS(${i})" maxlength="2" size="1" id="cellS${i}"></td><td id="rowIndS${i}"></td><td id="rowTotalS${i}"></td></tr>`);
    }

    $('#myTableTwo').append(`<tr><td colspan="3"></td><td id="sumTotalF"><td colspan="2"></td><td id="sumTotalS"></tr>`);
    $('#myTable').append(`<tr><td colspan=${parseInt(n)+1}></td><td id="total1"></td><td id="total2"></td></tr>`);
}

function rowSum(rowIndex, columnIndex) {
    if (columnIndex != rowIndex)
        $(`#cell${columnIndex+""+rowIndex}`).val(10 - $(`#cell${rowIndex+""+columnIndex}`).val());
    for (let i = 0; i < n; i++) {
        getRowSum(i);
    }
    let sum = 0,
        i;
    for (i = 0; i < n; i++) {
        if ($(`#rowSum${i}`).text() != "") {
            sum += parseInt($(`#rowSum${i}`).text());
        } else {
            break;
        }
    }
    if (i == n) {
        $('#total1').text(sum);
        getIndexScore();
    }
    for (let i = 0; i < n; i++) {
        scoresF(i);
        scoresS(i);
    }
}

function getIndexScore() {
    let summa = 0,
        sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if ($(`#cell${i+""+j}`).val() != "") {
                summa += parseInt($(`#cell${i+""+j}`).val());
            }
        }
    }
    for (let i = 0; i < n; i++) {
        $(`#rowInd${i}`).text(($(`#rowSum${i}`).text() / summa).toFixed(2));
        $(`#rowIndF${i}`).text($(`#rowInd${i}`).text());
        $(`#rowIndS${i}`).text($(`#rowInd${i}`).text());
        sum += parseFloat($(`#rowSum${i}`).text() / summa);
    }
    $("#total2").text(sum.toFixed(2));
}

function getRowSum(rowIndex) {
    let sum = parseInt(0),
        i = 0;
    for (i = 0; i < n; i++) {
        if ($(`#cell${rowIndex+""+i}`).val() != "")
            sum += parseInt($(`#cell${rowIndex+""+i}`).val());
        else
            break;
    }
    if (i == n) {
        $(`#rowSum${rowIndex}`).text(sum);
    }
}

function scoresF(rowIndex) {
    if ($(`#rowIndF${rowIndex}`).text() != "" && $(`#cellF${rowIndex}`).val() != "") {
        $(`#rowTotalF${rowIndex}`).text((parseFloat($(`#cellF${rowIndex}`).val()) * parseFloat($(`#rowIndF${rowIndex}`).text())).toFixed(2));
    }
    let i, sum = 0;
    for (i = 0; i < n; i++) {
        if ($(`#rowTotalF${i}`).text() != "") {
            sum += parseFloat($(`#cellF${i}`).val()) * parseFloat($(`#rowIndF${i}`).text());
        } else {
            break;
        }
    }
    if (i == n) {
        $('#sumTotalF').text(sum.toFixed(2));
    }
}

function scoresS(rowIndex) {
    if ($(`#rowIndS${rowIndex}`).text() != "" && $(`#cellS${rowIndex}`).val() != "") {
        $(`#rowTotalS${rowIndex}`).text((parseFloat($(`#cellS${rowIndex}`).val()) * parseFloat($(`#rowIndS${rowIndex}`).text())).toFixed(2));
    }
    let i, sum = 0;
    for (i = 0; i < n; i++) {
        if ($(`#rowTotalS${i}`).text() != "") {
            sum += parseFloat($(`#cellS${i}`).val()) * parseFloat($(`#rowIndS${i}`).text());
        } else {
            break;
        }
    }
    if (i == n) {
        $('#sumTotalS').text(sum.toFixed(2));
    }
}