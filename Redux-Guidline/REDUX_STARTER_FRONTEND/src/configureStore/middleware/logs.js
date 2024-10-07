

// Easy way of using currying function where  we can use arrow syntax to pass aruguments instead of calling individual arguments and returning multiple functions until all arguments are avaiable and we return final output.
// Recurrying Function: (Currying in JavaScript is a technique of transforming a function that takes multiple arguments into a series of functions that each take a single argument. Instead of calling a function with all its arguments at once, you call it with one argument, which returns a new function that takes the next argument, and so on, until all arguments are provided.)
export const log = store=> next=> action=>{
    console.log(action);
    // console.log(next);
    // console.log(store);

    // always use nect after every middleware to pass the action to next middlare, if there is no middleware left then action is passed to rootreduer
    return next(action);
}
