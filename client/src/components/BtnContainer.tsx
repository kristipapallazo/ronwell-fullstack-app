import { useState } from "react";
import classes from "./BtnContainer.module.css";
interface BtnItem {
  id: string;
  label: string;
}

/* id is used as route path */
const BTN_ARR: BtnItem[] = [
  {
    id: "create",
    label: "Create",
  },
  {
    id: "read",
    label: "read",
  },
  {
    id: "update",
    label: "Update",
  },
  {
    id: "delete",
    label: "delete",
  },
];

const BtnContainer = () => {
  const [loading, setLoading] = useState(false);
  const handleCreate = async (id: string) => {
    try {
      setLoading(true);
      console.log("loading inside :>> ", loading);
      const url = `${apiUrl}/${id}`;
      const res = await fetch(url);
      console.log("res :>> ", res);
      /* check for res.ok */
      if (!res) throw new Error("Error during creating an item");
      console.log("waiting");
      const data = await res.json();
      console.log("data :>> ", data);
      if (!data || data.error) throw new Error("Error during creating an item");
    } catch (error) {
      const e = error as Error;
      return { error: true, message: e.message };
    } finally {
      setLoading(false);
    }
  };
  const handleRead = (id: string) => {};
  const handleUpdate = (id: string) => {};
  const handleDelete = (id: string) => {};
  const handleClick = (id: string) => {
    switch (id) {
      case "create": {
        handleCreate(id);
        break;
      }
      case "read": {
        handleRead(id);
        break;
      }
      case "update": {
        handleUpdate(id);
        break;
      }
      case "delete": {
        handleDelete(id);
        break;
      }
      default: {
        console.log(`Unknown method => ${id}`);
        return;
      }
    }
  };
  console.log("loading :>> ", loading);
  const btns = BTN_ARR.map(({ id, label }: BtnItem) => (
    <button key={id} className={classes.btn} onClick={() => handleClick(id)}>
      {label}
    </button>
  ));
  if (loading)
    return <div style={{ textAlign: "center", color: "red" }}>Loading...</div>;
  return <div className={classes.container}>{btns}</div>;
};

export default BtnContainer;
