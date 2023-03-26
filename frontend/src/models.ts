export interface IInputAttributes {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    value: string;
    error: string;
    required: boolean;
    touched: boolean;
}

export interface INavLink {
    title: string;
    path: string;
}