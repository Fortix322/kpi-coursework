'use strict'

const instructionText = "-Firstly, chose amount of equations in your system<br>" +
    "<img src='./res/dimension.png'/><br>" +
    "-Input numerical values of coefficients of variables, leave input box empty if variable has coefficient 0<br>" +
    "<img src='./res/input.png'/><br>" +
    "-Also, you can clear or fill input boxes with random values, using tools section<br>" + 
    "<img src='./res/tools.png'/> " +
    "<img src='./res/clear.png'/> " +
    "<img src='./res/random.png'/><br>" +
    "-When input boxes filled with values(Keep in mind: unfiled boxes will be automatically filled with 0)<br>" + 
    "Submit values and start calculating by pressing submition button(Big one with 'Submit' text on it)<br>" + 
    "<img src='./res/submission.png'/><br>" +
    "-In output box you can see calculations result, or unconsisted system error message<br>" + 
    "<img src='./res/output.png'/><br>" +
    "-Enjoy! :)"; 

const popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'focus',
    html : true,
    content: instructionText
});

function createInputLayout(dimension)
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