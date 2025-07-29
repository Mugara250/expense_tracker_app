import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Fragment } from "react";
import ExpenseList from "./ExpenseList";
// Defining the validation rules within a schema
const schema = z.object({
  description: z.string().min(1, { message: "Required input field!" }),
  amount: z.number("Required input field!"),
  category: z.string().min(1, "Required input field"),
});
// Inferring the structure of our form data object from the schema
type FormData = z.infer<typeof schema>;

// Defining the structure of our props object
interface Expense {
  description: string;
  amount: number;
  category: string;
}
interface Props {
  expenses: Expense[];
}
// building the form component
const ExpenseForm = ({ expenses }: Props) => {
  // creating state for tracking the items
  const [currentItems, setCurrentItems] = useState(expenses);
  const [currentTableItems, setCurrentTableItems] = useState(expenses);
  // obtaining different functionalities from the form object
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // defining the event handler for the form submission event
  const onSubmit = (data: FormData) => {
    setCurrentItems([...currentItems, data]);
    setCurrentTableItems([...currentTableItems, data]);
    reset();
  };
  // defining the event handler for the delete button click event
  const onDelete = (event: React.MouseEvent) => {
    const currentTarget = event.target as HTMLButtonElement;
    setCurrentItems([
      ...currentItems.filter((item) => item.description !== currentTarget.id),
    ]);
  };
  // defining the event handler for the selection of the category
  const onCategorySelect = (event: React.ChangeEvent) => {
    const currentTarget = event.target as HTMLOptionElement;
    currentTarget.value !== ""
      ? setCurrentItems([
          ...currentTableItems.filter(
            (item) => item.category === currentTarget.value
          ),
        ])
      : setCurrentItems([...currentTableItems]);
  };
  return (
    <Fragment>
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker App</h1>
      <form
        className="w-3/5 mx-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="description-input" className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register("description")}
            placeholder="Enter item description"
            className="border-[1px] border-gray-400 rounded-[5px] py-1 px-1.5 "
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div id="amount-input" className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            {...register("amount", { valueAsNumber: true })}
            placeholder="Enter item amount"
            className="border-[1px] border-gray-400 rounded-[5px] py-1 px-1.5 "
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}
        </div>
        <div id="category-input" className="flex flex-col gap-2">
          <label htmlFor="category">Categories</label>
          <select
            id="category"
            {...register("category")}
            className="border-[1px] border-gray-400 rounded-[5px] py-1 px-1.5"
          >
            <option value="">Choose a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Beverages">Beverages</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <input
          type="submit"
          value="Submit"
          className="w-[30%] mx-auto mt-5 font-bold py-1 px-2 bg-amber-300 rounded-[5px] hover:bg-amber-400 cursor-pointer "
        />
      </form>
      <ExpenseList
        expenses={currentItems}
        onDelete={onDelete}
        onCategorySelect={onCategorySelect}
      />
    </Fragment>
  );
};

export default ExpenseForm;
