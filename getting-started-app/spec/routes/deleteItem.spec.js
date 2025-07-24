const db = require("../../src/persistence/sqlite");
const deleteItem = require("../../src/routes/deleteItem");
const ITEM = { id: 12345 };

jest.mock("../../src/persistence/sqlite", () => ({
  removeItem: jest.fn(),
  getItem: jest.fn(),
}));

test("remove item correctly", async () => {
  const req = { params: { id: 12345 } };
  const res = { sendStatus: jest.fn() };

  await deleteItem(req, res);

  expect(db.removeItem.mock.calls.length).toBe(1);
  expect(db.removeItem.mock.calls[0][0]).toEqual(req.params.id);
  expect(res.sendStatus.mock.calls[0].length).toBe(1);
  expect(res.sendStatus.mock.calls[0][0]).toEqual(200);
});
