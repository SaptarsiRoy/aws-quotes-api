import { useState } from 'react';
import './App.css';
import { useQuote } from './hooks/useQuote';


function App() {
  const [id, setId] = useState(1)
  const { error, isPending, quote } = useQuote(id)

  const handleClick = () => {
    setId(Math.floor((Math.random() * 20) + 1))
  }
  return (
    <div className="app">
      <div className="card">
        {error && <h1 className='heading' > {error} </h1>}
        {quote && <h1 className='heading' > {quote.quote} </h1>}
        {isPending && <button className="button" disabled>
          <span>Loading...</span>
        </button>}
        {!isPending && <button className="button" onClick={handleClick}>
          <span>Give Me Advice</span>
        </button>}
      </div>
    </div>
  );
}

export default App;
