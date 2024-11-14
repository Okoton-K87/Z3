import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And } = new Context("main");

const solver = new Solver();
const x = Int.const('x');
const y = Int.const('y');

// Constraints for "inside" the fence
solver.add(And(x.gt(5), x.lt(10), y.gt(15), y.lt(25)));

// Check and print a solution
if (await solver.check() === "sat") {
    const model = solver.model();
    const xVal = parseInt(model.eval(x).toString());
    const yVal = parseInt(model.eval(y).toString());
    console.log(`Position inside the fence: x = ${xVal}, y = ${yVal}`);
} else {
    console.log("No solution found.");
}
