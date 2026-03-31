// tslint:disable:max-classes-per-file
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import {ComponentType, ReactNode} from 'react';
import {StyleSheet} from 'react-native';

export function getUniqueID(): string;

export function openUrl(url: string): void;

export function hasParents(parents: ASTNode[], type: string): boolean;

export type MarkdownStyle = StyleSheet.NamedStyles<Record<string, unknown>>;

export type RenderFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyle,
  styleObj?: Record<string, unknown>,
  // must have this so that we can have fixed overrides with more arguments
  ...args: unknown[]
) => ReactNode;

export type RenderLinkFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyle,
  onLinkPress?: (url: string) => boolean | void,
) => ReactNode;

export type RenderImageFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyle,
  allowedImageHandlers: string[],
  defaultImageHandler: string | null,
) => ReactNode;

export interface RenderRules {
  [name: string]: RenderFunction | undefined;

  link?: RenderLinkFunction;
  blocklink?: RenderLinkFunction;
  image?: RenderImageFunction;
}

export const renderRules: RenderRules;

export interface MarkdownParser {
  parse: (value: string, options: Record<string, unknown>) => Token[];
}

export interface ASTNode {
  type: string;
  sourceType: string; // original source token name
  sourceInfo: string;
  sourceMeta: unknown;
  key: string;
  content: string;
  markup: string;
  tokenIndex: number;
  index: number;
  attributes: Record<string, unknown>;
  children: ASTNode[];
}

export class AstRenderer {
  constructor(customRenderRules: RenderRules, style?: MarkdownStyle);

  getRenderFunction(type: string): RenderFunction;

  renderNode(node: ASTNode, parentNodes: ReadonlyArray<ASTNode>): ReactNode;

  render(nodes: ReadonlyArray<ASTNode>): ReactNode;
}

export type RenderAstFunction = (nodes: ReadonlyArray<ASTNode>) => ReactNode;

export type MarkdownSource = string | ReadonlyArray<ASTNode>;

export function parser(
  source: MarkdownSource,
  renderer: RenderAstFunction,
  markdownParser: MarkdownParser,
): ReactNode;

export function stringToTokens(
  source: string,
  markdownIt: MarkdownParser,
): Token[];

export function tokensToAST(tokens: ReadonlyArray<Token>): ASTNode[];

export interface MarkdownProps {
  rules?: RenderRules;
  style?: MarkdownStyle;
  renderer?: AstRenderer | RenderAstFunction;
  markdownit?: MarkdownIt;
  mergeStyle?: boolean;
  debugPrintTree?: boolean;
  onLinkPress?: (url: string) => boolean | void;
  allowedImageHandlers?: string[];
  defaultImageHandler?: string | null;
  maxTopLevelChildren?: number | null;
  topLevelMaxExceededItem?: ReactNode;
  children: MarkdownSource;
}

type MarkdownStatic = ComponentType<MarkdownProps>;
export const Markdown: MarkdownStatic;
export type Markdown = MarkdownStatic;
export {MarkdownIt};
export default Markdown;
