'use strict'

const instructionText = "Placeholder text" +
    " placeholder text";

const popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'focus'
});

(function setInstructionButtonText()
{
    let instructionButton = document.getElementById("instruction-button");
    instructionButton.setAttribute("data-bs-content", instructionText);
}());

function createEquationInput(dimension)
{
    var equationInputContainer = document.createElement("div");
    equationInputContainer.classList.add("equation-input-group");

    const dimensionNum = Number(dimension);

    for(var i = 0; i < dimensionNum; i++)
    {
        let row = document.createElement("div");
        row.classList.add("input-row");
        for(var j = 0; j < dimensionNum + 1; j++)
        {
            if(j === dimensionNum)
            {
                var textSpan = document.createElement("span");
                row.appendChild(textSpan);
            }

            let input = document.createElement("input");
            input.classList.add("equation-input", "rounded-2");
            input.setAttribute("data-row", i + 1);
            input.setAttribute("data-col", j + 1);
            input.setAttribute("type", "number");
            row.appendChild(input);
        }
        equationInputContainer.appendChild(row);
    }

    return equationInputContainer;
}