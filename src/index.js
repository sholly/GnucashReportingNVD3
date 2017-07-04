/**
 * Created by sholly on 6/11/17.
 */
import * as expenses from './expenses';
import * as debt from './debt';
import * as utils from './utils';

let expensesstartdate = document.querySelector('input[name=expensesstartdate]');
let expensesenddate = document.querySelector('input[name=expensesenddate]');
expensesstartdate.value = utils.getFirstDateOfThisMonth();
expensesenddate.value = utils.getToday();
expenses.getExpensesData(expensesstartdate.value, expensesenddate.value);
expensesstartdate.addEventListener('change', function () {
    expenses.update(expensesstartdate.value, expensesenddate.value);
});
expensesenddate.addEventListener('change', function () {
    expenses.update(expensesstartdate.value, expensesenddate.value);
});
debt.getDebtData();


