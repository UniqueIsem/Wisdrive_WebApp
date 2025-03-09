import clsx from "clsx";

export function Input({classname, ...props}) {
    return <input className={clsx("p-3 rounded-xl w-full !bg-violet-50 text-black h-10")} {...props} />;
  }
  