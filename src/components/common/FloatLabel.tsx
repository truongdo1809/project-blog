import { useState } from "react";
export default function FloatLabel(props: any) {
    const [focus, setFocus] = useState(false);
    const { children, label, value } = props;

    const labelFloat = (focus || (value && value.length !== 0));

    return (
        <div
            className="relative mb-3"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            {children}
            <label className={`absolute left-3 ease-linear duration-300 px-0.5 z-10 ${labelFloat ? "-top-2 text-xs bg-white" : "top-1.5 text-sm"}`}>{label}</label>
        </div>
    )
}
