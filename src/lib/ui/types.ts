export type Value = {
    key: string[];
    type: string;
    value: unknown;
    content: string;
    error?: string;
    selected?: boolean;
    highlighted?: boolean;
    added?: boolean;
    updated?: boolean;
};
