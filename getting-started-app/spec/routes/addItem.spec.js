const db = require("../../src/persistence/sqlite");
const addItem = require("../../src/routes/addItem");

const ITEM = { id: 12345 };

const { v4: uuid } = require("uuid");

jest.mock("uuid", () => ({ v4: jest.fn() }));
// mock method dùng để kiểm tra giá trị trả về
// coi có phải là uuid hay không

jest.mock("../../src/persistence/sqlite", () => ({
  removeItem: jest.fn(),
  storeItem: jest.fn(),
  getItem: jest.fn(),
}));

test("check storeItem()", async () => {
  const id = "something-not-a-uuid";
  const name = "A sample item";

  const req = { body: { name } };

  const res = { send: jest.fn() };

  // trả về id cố định
  uuid.mockReturnValue(id);

  await addItem(req, res);

  const expectedItem = { id, name, completed: false };

  // check result:
  // 1. storeitem chỉ dc call 1 lần.
  expect(db.storeItem.mock.calls.length).toBe(1);

  // 2. storeitem phải kèm theo params
  expect(db.storeItem.mock.calls[0][0]).toEqual(expectedItem);

  // 3. response chỉ được gọi 1 lần
  expect(res.send.mock.calls[0].length).toBe(1);

  // 4. res.send phải trả về đúng expectedItem
  expect(res.send.mock.calls[0][0]).toEqual(expectedItem);
});
