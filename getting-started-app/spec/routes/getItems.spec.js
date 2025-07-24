const db = require("../../src/persistence/sqlite");
const getItems = require("../../src/routes/getItems");
const ITEMS = { id: 12345 };

jest.mock("../../src/persistence/sqlite", () => ({
  getItems: jest.fn(),
}));

test("get item correctly", async () => {
  const req = {};
  const res = { send: jest.fn() };
  db.getItems.mockReturnValue(Promise.resolve(ITEMS));

  await getItems(req, res);

  expect(db.getItems.mock.calls.length).toBe(1);
  expect(res.send.mock.calls[0].length).toBe(1);
  expect(res.send.mock.calls[0][0]).toEqual(ITEMS);
});
