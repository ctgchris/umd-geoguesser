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
export declare type PuzzleCreateFormInputValues = {
    date?: string;
    imageUrl?: string;
    actualLat?: number;
    actualLng?: number;
    hintRadius?: number;
    difficulty?: string;
    imageDescription?: string;
    aiFunFacts?: string;
};
export declare type PuzzleCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
    actualLat?: ValidationFunction<number>;
    actualLng?: ValidationFunction<number>;
    hintRadius?: ValidationFunction<number>;
    difficulty?: ValidationFunction<string>;
    imageDescription?: ValidationFunction<string>;
    aiFunFacts?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PuzzleCreateFormOverridesProps = {
    PuzzleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    actualLat?: PrimitiveOverrideProps<TextFieldProps>;
    actualLng?: PrimitiveOverrideProps<TextFieldProps>;
    hintRadius?: PrimitiveOverrideProps<TextFieldProps>;
    difficulty?: PrimitiveOverrideProps<TextFieldProps>;
    imageDescription?: PrimitiveOverrideProps<TextFieldProps>;
    aiFunFacts?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PuzzleCreateFormProps = React.PropsWithChildren<{
    overrides?: PuzzleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PuzzleCreateFormInputValues) => PuzzleCreateFormInputValues;
    onSuccess?: (fields: PuzzleCreateFormInputValues) => void;
    onError?: (fields: PuzzleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PuzzleCreateFormInputValues) => PuzzleCreateFormInputValues;
    onValidate?: PuzzleCreateFormValidationValues;
} & React.CSSProperties>;
export default function PuzzleCreateForm(props: PuzzleCreateFormProps): React.ReactElement;
