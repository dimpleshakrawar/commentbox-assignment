import { v4 as uuid } from "uuid";

export const commentData = (name) => ({
  id: uuid(),
  user: "Ricky Grevals",
  name,
  time: "1 day ago",
  items: [],
});
