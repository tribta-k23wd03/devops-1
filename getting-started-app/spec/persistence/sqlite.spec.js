// commonJS
const db = require("../../src/persistence/sqlite");

const fs = require("fs");

require("dotenv").config();

const location = process.env.SQLITE_DB_LOCATION || "/etc/todos/todo.db";

const ITEM = {
  id: "3a425bd7-5fe2-43ba-a299-6a5e8092ffe7",
  name: "Test_Name",
  completed: false,
};

// close connection, delete database cũ
beforeEach(async () => {
  if (db.close) {
    await db.close();
  }

  if (fs.existsSync(location)) {
    fs.unlinkSync(location); // xóa db hiện tại.
  }
});

// TEST_CASE:
// 1. Khởi tạo database mới:
test("initial database", async () => {
  await db.init();
});

// 2. test save to db:
test("it can store and get items", async () => {
  await db.init();
  await db.storeItem(ITEM);

  const items = await db.getItems();

  expect(items.length).toBe(1);
  expect(items[0]).toEqual(ITEM);
});

// 3. check update items
test("can be update item", async () => {
  await db.init();
  const initialItem = await db.getItems();
  expect(initialItem.length).toBe(0); //đảm bảo chưa có bất kỳ items nào

  await db.storeItem(ITEM);

  await db.updateItem(
    ITEM.id,
    Object.assign({}, ITEM, { completed: !ITEM.completed })
  );

  const items = await db.getItems();

  expect(items.length).toBe(1);
  expect(items[0].completed).toBe(!ITEM.completed);
});
// 4. TEST DELETE
test("it can remove item", async () => {
  await db.init();
  await db.storeItem(ITEM);
  await db.removeItem(ITEM.id);

  const items = await db.getItems();
  expect(items.length).toBe(0);
});
// 5. TEST GET ONE ITEM BY ID
test("it can be get single item", async () => {
  await db.init();
  await db.storeItem(ITEM);
  const item = await db.getItem(ITEM.id);
  expect(items[0]).toEqual(ITEM);
});
// yarn test (jest)
