import { itemService } from "../services/itemService";

export async function meatItemLoader() {
  const items = await itemService.getAll();
  return items.filter((item) => item.category === "MEAT");
}
