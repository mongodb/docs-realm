import React from 'react';

const useCounter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1)
  }
    const decrement = () => {
    setCount(count - 1 )
  }

  return { count, increment, decrement }
}

export default useCounter;