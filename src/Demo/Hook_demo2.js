import React, { useState } from 'react';

function Example() {

    const [count, setCount] = useState(0);
    // const [demo, setDemo] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = You clicked ${ count } times;
    });



    function handleClick() {
        setCount(count + 1)
    }


    // const handleClick = () => {
    //   setCount(count + 1)
    // }	


    return (
        <div>
            <p>You clicked {count} times</p>


            <button onClick={handleClick()}>
                Click me
            </button>
        </div>
    );
}