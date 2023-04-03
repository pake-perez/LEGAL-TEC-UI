import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUserProfrile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfrile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender?: string | null;
  readonly jobTitle?: string | null;
  readonly isAgreed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfrile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfrile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender?: string | null;
  readonly jobTitle?: string | null;
  readonly isAgreed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfrile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfrile : LazyUserProfrile

export declare const UserProfrile: (new (init: ModelInit<UserProfrile>) => UserProfrile) & {
  copyOf(source: UserProfrile, mutator: (draft: MutableModel<UserProfrile>) => MutableModel<UserProfrile> | void): UserProfrile;
}