import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, Distinct, And, Not } = new Context("main");
const solver = new Solver();

// Define integer variables for each child
const Bob = Int.const('Bob');
const Mary = Int.const('Mary');
const Cathy = Int.const('Cathy');
const Sue = Int.const('Sue');

// Define pet values
const CAT = 1;
const DOG = 2;
const BIRD = 3;
const FISH = 4;

// Add constraints based on clues
solver.add(Bob.eq(DOG));           // Bob has Dog
solver.add(Sue.eq(BIRD));           // Sue has Bird
solver.add(Not(Mary.eq(FISH)));     // Mary does not have Fish

// Each child has one unique pet
solver.add(Distinct(Bob, Mary, Cathy, Sue));

// Each child can only pick from the available pets
solver.add(And(Bob.ge(CAT), Bob.le(FISH)));
solver.add(And(Mary.ge(CAT), Mary.le(FISH)));
solver.add(And(Cathy.ge(CAT), Cathy.le(FISH)));
solver.add(And(Sue.ge(CAT), Sue.le(FISH)));

// Run the Z3 solver
const result = await solver.check();
if (result === "sat") {
    const model = solver.model();
    const bobPet = model.eval(Bob).value();
    const maryPet = model.eval(Mary).value();
    const cathyPet = model.eval(Cathy).value();
    const suePet = model.eval(Sue).value();
    
    // Map pets to names for readability
    const petNames = { 1: "Cat", 2: "Dog", 3: "Bird", 4: "Fish" };
    
    console.log("Solution:");
    console.log(`Bob has ${petNames[bobPet]}`);
    console.log(`Mary has ${petNames[maryPet]}`);
    console.log(`Cathy has ${petNames[cathyPet]}`);
    console.log(`Sue has ${petNames[suePet]}`);
} else {
    console.log("No solution found.");
}
