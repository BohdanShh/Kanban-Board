import Board from 'src/features/Board';
import Header from 'src/features/Header';
import Sidebar from 'src/features/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100%_-_102px)]">
        <Sidebar />
        <Board />
      </div>
    </>
  );
}

export default App;
