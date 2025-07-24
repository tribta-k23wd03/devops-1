const db = require("../../src/persistence/sqlite");
const updateItem = require("../../src/routes/updateItem");
const ITEM = { id: 12345 };

jest.mock("../../src/persistence/sqlite", () => ({
  updateItem: jest.fn(),
  getItem: jest.fn(),
}));

test("update item correctly", async () => {
  const req = {
    params: { id: 12345 },
    body: {
      name: "Updated Name",
      completed: false,
    },
  };
  const res = { send: jest.fn() };

  db.getItem.mockReturnValue(Promise.resolve(ITEM));

  await updateItem(req, res);

  expect(db.updateItem.mock.calls.length).toBe(1);
  expect(db.updateItem.mock.calls[0][0]).toBe(req.params.id);
  expect(db.updateItem.mock.calls[0][1]).toEqual({
    name: "Updated Name",
    completed: false,
  });

  expect(db.getItem.mock.calls.length).toBe(1);
  expect(db.getItem.mock.calls[0][0]).toBe(req.params.id);

  expect(res.send.mock.calls[0].length).toBe(1);
  expect(res.send.mock.calls[0][0]).toEqual(ITEM);
});
