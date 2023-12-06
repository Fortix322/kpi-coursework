'use strict';

(function setEquationInputLayout(){

    const dimensionSelect = document.getElementById("dimension-select");
    const inputSection = document.getElementById("input-section");
    const resultSection = document.getElementById("result-section");
    const equationsContainer = document.createElement("div");

    setInputLayout();

    dimensionSelect.addEventListener("change", () => {
        clearInputLayout();
        setInputLayout();
    });

    function clearInputLayout()
    {
        while(equationsContainer.firstChild){
            resultSection.children[0].innerHTML = "";
            equationsContainer.removeChild(equationsContainer.firstChild);
        }
    }

    function setInputLayout()
    {
        let selectedOption = dimensionSelect.item(dimensionSelect.selectedIndex);
        equationsContainer.appendChild(createEquationInput(selectedOption.value));
        inputSection.appendChild(equationsContainer);
    }

})();

(function ()
{
    const form = document.getElementById("main-form");
    const button = document.getElementById("submit-button");
    const inputSection = document.getElementById("input-section"); 
    const outputSection = document.getElementById("output-section"); 
    const resultSection = document.getElementById("result-section");
    var calculated = false;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();

        let mat = parseEquationsInput();
        resultSection.children[0].innerHTML = gaussianElimination(mat, mat[0].length - 1);
        //calculated = calculated ? false : true;
        //button.innerHTML = calculated ? "Back" : "Solve";
        //resultSection.children[0].innerHTML = calculated ? gaussianElimination(mat, mat[0].length - 1) : ""; // #result-text
    });

})();

function parseEquationsInput()
{
    var mat = [];
    const equationsContainer = document.getElementsByClassName("equation-input-group")[0];

    for(var i = 0; i < equationsContainer.children.length; i++)
    {
        let equationsRow = equationsContainer.children[i];
        let values = [];

        for(var j = 0; j < equationsRow.children.length; j++)
        {
            if(!equationsRow.children[j].classList.contains("equation-input"))
                continue;

            if(equationsRow.children[j].value == '')
            {
                equationsRow.children[j].value = 0;
            }

            values.push(Number(equationsRow.children[j].value));
        }

        mat.push(values);
    }

    return mat;
}

function clearMatrix()
{
    const equationsContainer = document.getElementsByClassName("equation-input-group")[0];
    const resultSection = document.getElementById("result-section");

    resultSection.children[0].innerHTML = "";

    for(var i = 0; i < equationsContainer.children.length; i++)
    {
        let equationsRow = equationsContainer.children[i];

        for(var j = 0; j < equationsRow.children.length; j++)
        {
            equationsRow.children[j].value = '';
        }
    }
}

function randomMatrix()
{
    clearMatrix();

    const equationsContainer = document.getElementsByClassName("equation-input-group")[0];

    for(var i = 0; i < equationsContainer.children.length; i++)
    {
        let equationsRow = equationsContainer.children[i];

        for(var j = 0; j < equationsRow.children.length; j++)
        {
            equationsRow.children[j].value = getRandomInt(-20, 20);
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}