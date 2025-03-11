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
export declare type UserScoreUpdateFormInputValues = {
    userId?: string;
    date?: string;
    score?: number;
    timestamp?: string;
};
export declare type UserScoreUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    score?: ValidationFunction<number>;
    timestamp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserScoreUpdateFormOverridesProps = {
    UserScoreUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    score?: PrimitiveOverrideProps<TextFieldProps>;
    timestamp?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserScoreUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserScoreUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userScore?: any;
    onSubmit?: (fields: UserScoreUpdateFormInputValues) => UserScoreUpdateFormInputValues;
    onSuccess?: (fields: UserScoreUpdateFormInputValues) => void;
    onError?: (fields: UserScoreUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserScoreUpdateFormInputValues) => UserScoreUpdateFormInputValues;
    onValidate?: UserScoreUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserScoreUpdateForm(props: UserScoreUpdateFormProps): React.ReactElement;
