/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserProfrileCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    gender?: string;
    jobTitle?: string;
    isAgreed?: boolean;
};
export declare type UserProfrileCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    jobTitle?: ValidationFunction<string>;
    isAgreed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserProfrileCreateFormOverridesProps = {
    UserProfrileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    jobTitle?: PrimitiveOverrideProps<TextFieldProps>;
    isAgreed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type UserProfrileCreateFormProps = React.PropsWithChildren<{
    overrides?: UserProfrileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserProfrileCreateFormInputValues) => UserProfrileCreateFormInputValues;
    onSuccess?: (fields: UserProfrileCreateFormInputValues) => void;
    onError?: (fields: UserProfrileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserProfrileCreateFormInputValues) => UserProfrileCreateFormInputValues;
    onValidate?: UserProfrileCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserProfrileCreateForm(props: UserProfrileCreateFormProps): React.ReactElement;
