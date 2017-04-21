/**
 * Created by sholly on 4/20/17.
 */
// fetch("http://localhost:5000/expenses")
//     .then(function (response) {
//         console.log('status', response.status);
//         return response.json();
//     }).then(function (j) {
//     items = j['items'];
//     data = j['items'];
//     // items.forEach((i) =>   {
//     //     console.log(i[0], ", ", i[1]);
//     // });
//     let pd = new PrintData(data);
//     pd.printData();
// }).catch(function (err) {
//     console.log(err);
// });
let startdate = document.querySelector('input[name=startdate]');
startdate.value = getFirstDateOfThisMonth();
let enddate = document.querySelector('input[name=enddate]');
enddate.value = getToday();
ediv = document.querySelector('.expenses');
console.log(ediv);

class DataFetcher {
    constructor() {
        this.url = "http://localhost:5000";
    }

    getExpenses(startdate, enddate) {
        this.expensesUrl = this.url + "/expenses";
        if(startdate !== null) {
            this.expensesUrl += `?startdate=${startdate}`;
        }
        if(enddate !== null) {
            this.expensesUrl += `&enddate=${enddate}`;
        }
        this.expensesData = this._fetchData(this.expensesUrl);
    }

    _fetchData(url) {
        let data = [];
        fetch(url)
            .then((response) => {
                console.log(response.status);
                return response.json();
            }).then((json) => {
            data = json['items'];
            let dataHtml = `<table><thead><tr>
                        <td>Expense Account</td><td>Amount</td>
                        </tr></thead>`;
            data.forEach((d) => {
                dataHtml += `<tr><td>${d[0]}</td><td>${d[1]}</td></tr>`;
            });
            dataHtml += `</table>`;
            ediv.innerHTML = dataHtml;
        }).catch((error) => console.log(error));
        console.log(data.length);
        return data;
    }
}

function getToday() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : `${today.getMonth()}`;
    let dayOfMonth = today.getDate() < 10 ? `0${today.getDate()}`: `${today.getDate()}`;
    todayString = `${fullYear}-${month}-${dayOfMonth}`;
    return todayString;
}

function getFirstDateOfThisMonth() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : `${today.getMonth()}`;
    todayString = `${fullYear}-${month}-01`;
    return todayString;
}

function getExpensesByDate() {
    let startdate = document.querySelector('input[name=startdate]');
    let enddate = document.querySelector('input[name=enddate]');
    let d = new DataFetcher();
    d.getExpenses(startdate.value, enddate.value);
}

startdate.addEventListener('change', getExpensesByDate);
enddate.addEventListener('change', getExpensesByDate);
let df = new DataFetcher();
df.getExpenses(startdate.value, enddate.value);
