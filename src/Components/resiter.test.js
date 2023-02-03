import { testRegister } from "./LoginComponent/Register";

test("Hello world", () => {
    console.log("Hello");
});

describe("Assert testRegister function", () => {
    test("Test touts champs vides", () => {
        expect(testRegister("", "", "")).toEqual(false);
    });
    test("Test form valide", () => {
        expect(testRegister("Paul", "paul@paul.fr", "paulpaul")).toEqual(true);
    });
    test("Test touts champs vides", () => {
        expect(testRegister("", "", "")).toEqual(false);
    });
});
