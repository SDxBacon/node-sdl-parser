/**
 * interface of a block
 */
export interface Block {
  Name?: string;
  Value?: number | string;
  Token?: string;
  props?: string[];
}

/** BLOCK_START */
export const BLOCK_START = "TOKEN";

/** BLOCK_END */
export const BLOCK_END = "End";

/**
 * whitelist
 */
export const Targets: string[] = ["Name", "Value", "Token"];
