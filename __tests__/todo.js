/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markCompleted, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const thisDay = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: thisDay,
    });
  });
  test("add new todo", () => {
    add(
      {
        title: "Test todo",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "Test todo",
        completed: false,
        dueDate: yesterday,
      }
    );
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });

    expect(all.length).toBe(todoItemCount + 1);
  });
  test("checking a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markCompleted(0);
    expect(all[0].completed).toBe(true);
  });
  test("hecking retrieval of overdue items", () => {
    let todoitem = overdue();
    expect(all[2].dueDate).toBe(todoitem[0]["dueDate"]);
  });
  test("checking retrieval of items due thisDay", () => {
    let todoitem = dueToday();
    expect(all[0].dueDate).toBe(todoitem[0]["dueDate"]);
  });
  test("checking retrieval of due later items", () => {
    let todoitem = dueLater();
    expect(all[1].dueDate).toBe(todoitem[0]["dueDate"]);
  });
});
