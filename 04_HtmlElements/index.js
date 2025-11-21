document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});
let txt1;
let txt2;
let btnCalc;
let lblRes;
function pageLoaded() {
    txt1 = document.getElementById("txt1");
    txt2 = document.querySelector("#txt2");
    btnCalc = document.getElementById("btnCalc");
    lblRes = document.getElementById("lblRes");
    if (btnCalc) {
        btnCalc.addEventListener('click', calculate); // <-- הקריאה לפונקציה calculate (בלי סוגריים!)
    } else {
        console.error("Button with ID 'btnCalc' not found!");
    }


    const btn2 = document.getElementById("btn2");
    btn2.addEventListener("click", () => {
        print_regular("btn2 clicked :" + btn2.id + "|" + btn2.innerText);
    });

    // 3. קישור אימות בזמן אמת (משימה 5)
    if (txt1) {
        txt1.addEventListener('input', () => validInput(txt1));
    }
    if (txt2) {
        txt2.addEventListener('input', () => validInput(txt2));
    }

}
/**
 * מבצעת אימות על שדה קלט יחיד
 * @param {HTMLElement} inputElement - רכיב ה-HTML של תיבת הקלט
 */
function validInput(inputElement) {
    const value_valid = inputElement.value.trim();
    const isNumeric = !isNaN(parseFloat(value_valid)) && isFinite(value_valid)
    const isNotEmpty = !isNaN(parseFloat(value_valid)) && isFinite(value_valid) && value_valid.length > 0;
    const isValid = isNumeric && isNotEmpty;
    // הסרת מחלקות ישנות
    inputElement.classList.remove('is-valid', 'is-invalid');

    // הוספת המחלקה המתאימה לפי התוצאה
    if (isValid) {
        inputElement.classList.add('is-valid');
    } else {
        inputElement.classList.add('is-invalid');
    }
    return isValid;
}
const operation = document.getElementById('operation-select').value;
// לדוגמה, operation יכיל את המחרוזת "+", "-", "*" או "/".
function calculate() {
    // 1. קבלת הערכים מה-DOM
    const txt1 = document.getElementById('txt1'); // ודא שזהו ה-ID הנכון
    const txt2 = document.getElementById('txt2'); // ודא שזהו ה-ID הנכון
    const lblRes = document.getElementById('lblRes'); // ודא שזהו ה-ID הנכון
    const operationSelect = document.getElementById('operation-select'); // ה-ID של ה-Dropdown

    // --- יישום משימה 5: אימות קלט ---
    const isNum1Valid = validInput(txt1);
    const isNum2Valid = validInput(txt2);

    // אם אחד מהקלטho אינו תקין, עוצרים את החישוב
    if (!isNum1Valid || !isNum2Valid) {
        document.getElementById('lblRes').innerText = "שגיאה: קלט לא מספרי!";
        // אין צורך להמשיך לחישוב או ללוג אם יש שגיאת קלט
        return;
    }
    // 2. המרת הקלט למספרים
    // מומלץ להשתמש ב-parseFloat כדי לתמוך גם במספרים עשרוניים
    let num1 = parseFloat(txt1.value);
    let num2 = parseFloat(txt2.value);

    // 3. קבלת הפעולה הנבחרת
    let operation = operationSelect.value;

    let res = "";

    // 4. שיפור לוגיקת ההשוואה (באמצעות switch) והוספת בדיקת חלוקה באפס
    switch (operation) {
        case '+':
            res = num1 + num2;
            break;

        case '-':
            res = num1 - num2;
            break;

        case '*':
            res = num1 * num2;
            break;

        case '/':
            if (num2 === 0) {
                res = "שגיאה: חלוקה באפס!";
            } else {
                res = num1 / num2;
            }
            break;

        default:
            res = "פעולה לא חוקית";
            break;
    }

    // 5. הצגת התוצאה
    lblRes.innerText = res;

    // קבלת מצב הצבירה (למשל, מתוך Checkbox)
    const isAppendMode = document.getElementById('appendModeCheckboxId').checked;

    // קריאה לפונקציית ההדפסה שכוללת המעודכנת שכולללת כתיבה לוג ומצב הוספה לטקסט
    print(num1, num2, operation, res, isAppendMode);

    // עדכון התווית התוצאה
    document.getElementById('lblRes').innerText = res;
};



// btn2.addEventListener("click",func1);
// function func1(){

// }

// =============================================
// HELPER: PRINT TO TEXTAREA
// =============================================
function print(num1, num2, operation, result, appendMode) {
    // 1. הגדרת רכיבי ה-DOM
    const taOutput = document.getElementById("output");      // תיבת הטקסט הראשית
    const taLog = document.getElementById("logHistory");    // תיבת הלוג/היסטוריה (הוסף אותה ל-HTML)

    // 2. טיפול בתיבת הטקסט הראשית (מצב צבירה)
    if (taOutput) {
        if (appendMode) {
            // אם appendMode הוא true: מוסיפים את התוצאה הנוכחית לשורה חדשה
            // מומלץ לוודא שהתוצאה תקינה לפני הוספה (למשל, לא "שגיאה")
            if (typeof result === 'number' || (typeof result === 'string' && !isNaN(parseFloat(result)))) {
                // מוסיף שורה חדשה עם התוצאה
                taOutput.value += "\n" + result;
            }
        } else {
            // אם appendMode הוא false: מחליפים את כל התוכן בתוצאה הנוכחית
            taOutput.value = result;
        }
    } else {
        console.log("Error: output element not found.");
    }

    // 3. רישום הפעולה המלאה בתיבת הלוג
    if (taLog) {
        // בונה את שורת הלוג המלאה: נתונים + פעולה + תוצאה
        const logEntry = `${num1} ${operation} ${num2} = ${result}`;

        // מוסיף את שורת הלוג החדשה
        if (taLog.value.length > 0) {
            taLog.value += "\n" + logEntry;
        } else {
            taLog.value = logEntry;
        }
    } else {
        console.log("Log Entry: " + logEntry);
    }
}

// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x => x * 2).join(", ");

    // Functions as variables
    const add = function (a, b) { return a + b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3, 4);

    // Callback
    function calc(a, b, fn) { return fn(a, b); }
    const result = calc(10, 20, (x, y) => x + y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;
    //Print to Log
    print_regular(out);
}

function print_regular(msg) {
    //--Get TextArea Element Reference
    const ta = document.getElementById("output");
    //--Write msg to TextArea text
    if (ta) ta.value = msg;
    //wrute Log
    else console.log(msg);
}