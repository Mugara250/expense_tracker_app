interface Expense {
  description: string;
  amount: number;
  category: string;
}
interface Props {
  expenses: Expense[];
  onDelete: (event: React.MouseEvent) => void;
  onCategorySelect: (event: React.ChangeEvent) => void;
}
const ExpenseList = ({ expenses, onDelete, onCategorySelect }: Props) => {
  return (
    <div className="mt-10">
      <div id="category-input" className="flex flex-col gap-2">
        <select
          id="category"
          name="category"
          onChange={onCategorySelect}
          className="border-[1px] border-gray-400 rounded-[5px] py-1 px-2.5"
        >
          <option value="">Choose a category</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>
      {expenses.length !== 0 && (
        <table className="mt-5 text-center border-[1px] border-black">
          <thead className="border-b-[1px] border-black">
            <tr>
              <th className="border-r-[1px] border-black w-[200px]">
                Description
              </th>
              <th className="border-r-[1px] border-black w-[200px]">
                Category (Rwf)
              </th>
              <th className="border-r-[1px] border-black w-[200px]">Amount</th>
              <th className="w-[200px]"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({ description, amount, category }) => {
              return (
                <tr key={description} className="border-b-[1px] border-black">
                  <td className="border-r-[1px] border-black w-[200px]">
                    {description}
                  </td>
                  <td className="border-r-[1px] border-black w-[200px]">
                    {category}
                  </td>
                  <td className="border-r-[1px] border-black w-[200px]">
                    {amount}
                  </td>
                  <td className="w-[200px] py-2">
                    <button
                      id={description}
                      className="border-[1px] border-red-400 text-red-400 px-2 py-0.5 font-bold rounded-[5px] hover:bg-red-400 hover:text-white cursor-pointer "
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr id="Totals">
              <td className="border-r-[1px] border-black w-[200px] font-bold ">
                Total
              </td>
              <td className="border-r-[1px] border-black w-[200px]"></td>
              <td className="border-r-[1px] border-black w-[200px]">
                {expenses.reduce((sum, item) => sum + item.amount, 0)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
