import { MinusIcon, PlusIcon } from "../../icons";
import s from "./Quantity.module.css";
import { cn } from "../../../utils/cn";

const Quantity = ({  value, decrease, increase }) => {
  const max = 10;
  return (
    <div className="flex flex-row h-9">
      {/* <button className={s.actions} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button> */}
      <button
        type="button"
        onClick={decrease}
        className={s.actions}
        style={{ marginRight: "-1px" }}
        disabled={value <= 1}
      >
        <MinusIcon width={18} height={18} />
      </button>
      <label className="w-full border-gray-300 border">
        <input
          className={s.input}
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={increase}
        className={cn(s.actions)}
        style={{ marginLeft: "-1px" }}
        disabled={value < 1 || value >= max}
      >
        <PlusIcon width={18} height={18} />
      </button>
    </div>
  );
};

export default Quantity;
