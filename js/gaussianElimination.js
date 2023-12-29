
function gaussianElimination(mat, dimension)
{
    var result = "";

    /* reduction into r.e.f. */
    let singular_flag = forwardElim(mat, dimension);
 
    /* if matrix is singular */
    if (singular_flag != -1)
    {
        result = "Singular Matrix." + `\n`;
        /* if the RHS of equation corresponding to
           zero row  is 0, * system has infinitely
           many solutions, else inconsistent*/
        if (mat[singular_flag][dimension])
        {
            result += "Inconsistent System.";
        }
        else
        {
            result += "May have infinitely many solutions." ;
        }
    }
    else
    {
        /* get solution to system and print it using
           backward substitution */
        result = backSub(mat, dimension);
    }

    return result;
}

// function for elementary operation of swapping two rows
function swap_row(mat, i, j, dimension)
{
    for (var k = 0; k <= dimension; k++)
    {
        let temp = mat[i][k];
        mat[i][k] = mat[j][k];
        mat[j][k] = temp;
    }
}

// function to print matrix content at any stage
function print(mat, dimension)
{

    for (var i=0; i<dimension; i++, console.log(""))
        for (var j=0; j<=dimension; j++)
            process.stdout.write("" + mat[i][j]);
     
    console.log("");
}

// function to reduce matrix to r.e.f.
function forwardElim(mat, dimension)
{
    for (var k = 0; k < dimension; k++)
    {
        // Initialize maximum value and index for pivot
        var i_max = k;
        var v_max = mat[i_max][k];
 
        /* find greater amplitude for pivot if any */
        for (var i = k + 1; i < dimension; i++)
            if (Math.abs(mat[i][k]) > v_max)
                v_max = mat[i][k], i_max = i;
 
        /* if a principal diagonal element  is zero,
         * it denotes that matrix is singular, and
         * will lead to a division-by-zero later. */
        if (!mat[k][i_max])
            return k; // Matrix is singular
 
        /* Swap the greatest value row with current row */
        if (i_max != k)
            swap_row(mat, k, i_max, dimension);
 
 
        for (var i= k + 1; i < dimension; i++)
        {
            /* factor f to set current row kth element to 0,
             * and subsequently remaining kth column to 0 */
            let f = mat[i][k] / mat[k][k];
 
            /* subtract fth multiple of corresponding kth
               row element*/
            for (var j= k + 1; j <= dimension; j++)
                mat[i][j] -= mat[k][j]*f;
 
            /* filling lower triangular matrix with zeros*/
            mat[i][k] = 0;
        }
 
        //print(mat);        //for matrix state
    }
    //print(mat);            //for matrix state
    return -1;
}
 
// function to calculate the values of the unknowns
function backSub(mat, dimension)
{
    let x = new Array(dimension);  // An array to store solution
 
    /* Start calculating from last equation up to the
       first */
    for (var i = dimension - 1; i >= 0; i--)
    {
        /* start with the RHS of the equation */
        x[i] = mat[i][dimension];
 
        /* Initialize j to i+1 since matrix is upper
           triangular*/
        for (var j = i + 1; j < dimension; j++)
        {
            /* subtract all the lhs values
             * except the coefficient of the variable
             * whose value is being calculated */
            x[i] -= mat[i][j] * x[j];
        }
 
        /* divide the RHS by the coefficient of the
           unknown being calculated */
        x[i] = x[i] / mat[i][i];
    }
 
    var result = "";

    for (var i=0; i < dimension; i++)
    {
        if(Math.abs(x[i]) > 0.0001)
        {
            result += `x${i + 1}: ` + Number.parseFloat(x[i]).toFixed(4) + ";\t";
        }
        else
        {
            result += `x${i + 1}: ` + Number.parseFloat(x[i]).toFixed(6) + ";\t";
        }
    }

    return result;
}