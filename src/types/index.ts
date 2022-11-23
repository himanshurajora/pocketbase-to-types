import { FieldTypeKeys } from "../token-constants";

export interface CollectionSchema {
    id:         string;
    name:       string;
    type:       string;
    system:     boolean;
    schema:     Schema[];
    listRule:   null | string;
    viewRule:   null | string;
    createRule: null | string;
    updateRule: null | string;
    deleteRule: null | string;
    options:    CollectionSchemaOptions;
}

export interface CollectionSchemaOptions {
    allowEmailAuth?:     boolean;
    allowOAuth2Auth?:    boolean;
    allowUsernameAuth?:  boolean;
    exceptEmailDomains?: null;
    manageRule?:         null;
    minPasswordLength?:  number;
    onlyEmailDomains?:   null;
    requireEmail?:       boolean;
}

export interface Schema {
    id:       string;
    name:     string;
    type:     FieldTypeKeys;
    system:   boolean;
    required: boolean;
    unique:   boolean;
    options:  SchemaOptions;
}

export interface SchemaOptions {
    min?:           null;
    max?:           null;
    pattern?:       string;
    maxSelect?:     number;
    maxSize?:       number;
    mimeTypes?:     string[];
    thumbs?:        null;
    collectionId?:  string;
    cascadeDelete?: boolean;
    values?:        string[];
    exceptDomains?: any[];
    onlyDomains?:   any[];
}
