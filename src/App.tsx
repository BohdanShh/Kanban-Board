import Header from 'src/features/Header';
import Sidebar from 'src/features/Sidebar';
import TaskBoard from 'src/features/TaskBoard';

function App() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100%_-_102px)]">
        <Sidebar />
        <TaskBoard />
      </div>
    </>
  );
}

export default App;
