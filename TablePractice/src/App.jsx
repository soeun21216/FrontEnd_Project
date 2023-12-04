import './App.css';

import TableItem from './components/TableItem';

function App() {
  const tableTitle = ['1학년', '2학년', '3학년'];

  return (
    <div className='flex flex-col items-center gap-10 p-10 h-screen bg-violet-100'>
      {tableTitle.map((title, i) => {
        return <TableItem key={i} title={title} />;
      })}
    </div>
  );
}

export default App;
