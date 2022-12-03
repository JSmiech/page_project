let oldChart = null;

function calculateFunctionValue(fnc, x) {
    fnc = fnc.replace('x', '(' + x + ')');
    return eval(fnc);
}

function calculateChart() {
    clearErrorMsg();
    let chart = document.getElementById("chart").getContext("2d");

    let from = parseFloat(document.getElementById("fromRangeInput").value);
    let to = parseFloat(document.getElementById("toRangeInput").value);
    let step = parseFloat(document.getElementById("stepInput").value);
    let fnc = document.getElementById("functionInput").value;

    if (!validateInputData(step, from, to, fnc)) {
        return;
    }

    destroyOldChart();

    let labels = [];
    let data = [];

    for (let i=from ; i<=to ; i+=step) {
        let val = calculateFunctionValue(fnc, i);
        labels.push(i);
        data.push(val);
    }

    oldChart = new Chart(chart, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "ƒ(x)",
                data: data,
                backgroundColor: '#5d95d9',
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'ƒ(x)=' + functionInput
                }
            }
        }
    });
}

function destroyOldChart() {
    if (oldChart) {
        oldChart.destroy();
        oldChart = null;
    }
}

function clearErrorMsg() {
    setErrorMsg("");
}

function setErrorMsg(msg) {
    document.getElementById("chart-error").innerText = msg;
}

function validateInputData(interval, from, to, func) {
    if (interval === null || from === null || to === null || func === null) {
        setErrorMsg("Fill all inputs");
        return false;
    }

    if (interval <= 0) {
        setErrorMsg("Interval must be greather than 0");
        return false;
    }

    return true;
}