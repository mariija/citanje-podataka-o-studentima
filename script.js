let textArea = document.getElementById("txtarea");

let getDataBtn = document.createElement("button");
getDataBtn.innerHTML = "Get data";
getDataBtn.classList.add("btn");
textArea.before(getDataBtn);

class Student {
    constructor(name, adress, phone, course) {
        this.name = name;
        this.adress = adress;
        this.phone = phone;
        this.course = course;
    }

    getInfo() {
        return "\n" +
            "Name: " + this.name + "\n" +
            "Adress: " + this.adress + "\n" +
            "Phone: " + this.phone + "\n" +
            "Course: " + this.course + "\n"

    }
}

async function getData() {
    try {
        let response = await fetch('https://v-dresevic.github.io/Advanced-JavaScript-Programming/data/students.txt');
        if (response.status !== 200) {
            throw new Error("Error while reading file.");
        }
        let rawData = await response.text();
        let dataLines = rawData.split("\r\n");
        splitLine(dataLines);

    } catch (err) {
        textArea.innerHTML = 'Fetch problem: ' + err.message;
    }
}

getDataBtn.addEventListener("click", function () {
    getData();
})


function splitLine(info) {
    for (let i = 0; i < info.length; i += 4) {
        let x = info.slice(i, i + 4);
        let students = new Student(x[0], x[1], x[2], x[3]);
        textArea.innerHTML += students.getInfo();
    }
}
