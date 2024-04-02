document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("textInput");
    const applyButton = document.getElementById("applyButton");
    const clearButton = document.getElementById("clearButton");
    const outputDiv = document.getElementById("output");
    const form = document.getElementById("form");

    let selectedLetter = null;
    let offsetX = null;
    let offsetY = null;

    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, 0)}`;
    }

    clearButton.addEventListener("click", function (event) {
        outputDiv.innerHTML = "";
        event.preventDefault();
        form.reset();
    });

    applyButton.addEventListener("click", function (event) {
        event.preventDefault();
        const text = textInput.value.replaceAll(" ", "");

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.textContent = text[i];
            span.style.backgroundColor = getRandomHexColor();
            span.style.position = "absolute";
            span.style.left = `${i * 70}px`;

            outputDiv.append(span);
        }
    });

    function moveCursor(event) {
        // console.log("yes");

        selectedLetter.style.position = "absolute";
        selectedLetter.style.left = event.clientX - offsetX + "px";
        selectedLetter.style.top = event.clientY - offsetY + "px";
    }

    document.addEventListener("mouseup", function () {
        selectedLetter = null;
        document.removeEventListener("mousemove", moveCursor);
    });

    outputDiv.addEventListener("mousedown", function (event) {
        if (event.target.tagName === "SPAN") {
            selectedLetter = event.target;
            const rect = selectedLetter.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
            outputDiv.append(selectedLetter);

            // const currentZIndex = window.getComputedStyle(selectedLetter).zIndex;
            // console.log("currentZIndex--->", currentZIndex);
            // if (currentZIndex === "auto") {
            //     selectedLetter.style.zIndex = "1";
            //     console.log("selectedLetter.style.zIndex--->", selectedLetter.style.zIndex);
            // } else {
            //     // const currentZIndexNumber = parseInt(currentZIndex);

            //     selectedLetter.style.zIndex = (+currentZIndex + 1).toString();
            //     console.log("selectedLetter.style.zIndex--->", selectedLetter.style.zIndex);
            // }
            document.addEventListener("mousemove", moveCursor);
        }
    });
});
