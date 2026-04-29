import { items } from "../data/items.js";

let nextId = 1;

export function createItem(name) {
  const item = {
    id: nextId,
    name,
  };

  items.push(item);
  nextId++;

  return item;
}

export function listItems() {
  return items;
}

export function updateItem(id, newName) {
  const item = items.find((item) => item.id === Number(id));

  if (!item) {
    return null;
  }

  item.name = newName;

  return item;
}

export function deleteItem(id) {
  const itemIndex = items.findIndex((item) => item.id === Number(id));

  if (itemIndex === -1) {
    return null;
  }

  const deletedItem = items.splice(itemIndex, 1);

  return deletedItem[0];
}