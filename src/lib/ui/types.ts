export type Value = {
    key: string[];
    type: "string" | "number" | "boolean" | "object";
    value: unknown;
    content: string;
    selected?: boolean;
    highlighted?: boolean;
    added?: boolean;
    updated?: boolean;
};
