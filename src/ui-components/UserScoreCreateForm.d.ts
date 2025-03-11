/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserScoreCreateFormInputValues = {
    userId?: string;
    date?: string;
    score?: number;
    timestamp?: string;
};
export declare type UserScoreCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    score?: ValidationFunction<number>;
    timestamp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserScoreCreateFormOverridesProps = {
    UserScoreCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    score?: PrimitiveOverrideProps<TextFieldProps>;
    timestamp?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserScoreCreateFormProps = React.PropsWithChildren<{
    overrides?: UserScoreCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserScoreCreateFormInputValues) => UserScoreCreateFormInputValues;
    onSuccess?: (fields: UserScoreCreateFormInputValues) => void;
    onError?: (fields: UserScoreCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserScoreCreateFormInputValues) => UserScoreCreateFormInputValues;
    onValidate?: UserScoreCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserScoreCreateForm(props: UserScoreCreateFormProps): React.ReactElement;
