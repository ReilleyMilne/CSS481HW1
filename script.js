const textarea = document.querySelector("input#text-output");
const buttons = document.querySelectorAll("button");

let currentComputation = "";

function operator(n1, n2, operator)
{
    if (operator === "x")
    {
        result =  n1 * n2;
    }
    else if (operator === "/")
    {
        result = n1 / n2;
    }
    else if (operator === "+")
    {
        result = n1 + n2;
    }
    else if(operator === "-")
    {
        result = n1 - n2;
    }
    else
    {
        result = "Invalid Operator.";
    }
    return result;
}

function containsOperator(char)
{
    let operators = ["x", "/", "+", "-"];
    return operators.includes(char);
}

function calculateComputation(computation, operatorIndex)
{
    let leftNumber = "";
    let rightNumber = "";

    let left = operatorIndex - 1;
    while(left >= 0 && !containsOperator(computation[left]))
    {
        left--;
    }
    left++;

    leftNumber = computation.slice(left, operatorIndex);

    let right = operatorIndex + 1;
    while(right < computation.length && !containsOperator(computation[right]))
    {
        rightNumber += computation[right];
        right++;
    }

    let n1 = parseFloat(leftNumber);
    let n2 = parseFloat(rightNumber);

    let result = operator(n1, n2, computation[operatorIndex]);

    computation =
        computation.slice(0, left) +
        result +
        computation.slice(right);

    return computation;
}

function compute(computation)
{
    for(let i = 0; i < computation.length; i++)
    {
        if (computation[i] === "x" || computation[i] === "/")
        {
            computation = calculateComputation(computation, i);

            i = -1;
        }
    }

    for(let i = 0; i < computation.length; i++)
    {
        if(computation[i] === "+" || computation[i] === "-")
        {
            computation = calculateComputation(computation, i);

            i = -1;
        }
    }
    return computation;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.textContent === "C")
        {
            currentComputation = "";
        }
        else if(button.textContent === "=")
        {
            currentComputation = compute(currentComputation);
        }
        else
        {
            currentComputation += button.textContent;
        }
        textarea.value = currentComputation;
    });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    currentComputation = currentComputation.slice(0, currentComputation.length - 1);
    textarea.value = currentComputation;
  }
});