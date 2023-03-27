import { App, Credentials } from "realm";
import { REALM_APP_ID } from "./config.js";

const appId = REALM_APP_ID; // Set your Realm app ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};

describe("Call a Function", () => {
  test("should call a function by it's name", async () => {
    const app = new App(appConfig);
    const credentials = Credentials.anonymous();
    const user = await app.logIn(credentials);

    // :snippet-start: call-a-function-by-name
    // wrap the code below in an async function to 'await' for the promises to resolve
    const numA = 2;
    const numB = 3;
    const result = await user.functions.sum(numA, numB);
    // v12_BUG?? this returns "2,3undefined"..not sure why
    const resultOfCallFunction = await user.callFunction("sum", numA, numB); // alternate syntax to call a MongoDB Realm Function
    console.log(
      `Using the "functions.sum()" method: the sum of ${numA} + ${numB} = ${result}`
    );
    console.log(
      `Using the "callFunction()" method: the sum of ${numA} + ${numB} = ${resultOfCallFunction}`
    );
    // :snippet-end:

    expect(result).toBe(5);
    expect(resultOfCallFunction).toBe(5);
  });
});
