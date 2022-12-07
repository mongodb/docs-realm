// import the hook 
import useCounter from "../src/useCounter";

// import testing lib
import {act, renderHook} from '@testing-library/react-hooks'; // act = to perform actions like increment() ; renderHook = renders our hook

describe("useCounter tests", () => {
    test("should increment count by 1", () => {
        const { result } = renderHook(useCounter); // result is our hook itself
        
        // act phase:
        act(() => {
            const current = result.current; // current instance of our hook; must be called
            result.current.increment();
        })
        // assert:
        expect(result.current.count).toBe(1);
    })
})