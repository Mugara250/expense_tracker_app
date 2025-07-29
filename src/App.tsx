import ExpenseForm from "./components/ExpenseTracker/ExpenseForm";

function App() {
  return (
    <div className="w-3/6 mx-auto mt-8 text-lg mb-4">
      <ExpenseForm expenses={[]} />
    </div>
  );
}

export default App;
