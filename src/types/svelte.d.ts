declare module 'svelte' {
    export interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
        target: Element | Document | ShadowRoot;
        anchor?: Element;
        props?: Props;
        context?: Map<any, any>;
        hydrate?: boolean;
        intro?: boolean;
        $$inline?: boolean;
    }

    export type ComponentEvents<Component extends SvelteComponent_1> = Component extends SvelteComponent<any, infer Events> ? Events : never;

    export type ComponentProps<Component extends SvelteComponent_1> = Component extends SvelteComponent<infer Props> ? Props : never;

    export type ComponentType<Component extends SvelteComponent = SvelteComponent> = (new (options: ComponentConstructorOptions<Component extends SvelteComponent<infer Props> ? Props : Record<string, any>>) => Component) & {
        element?: typeof HTMLElement;
    };

    interface DispatchOptions {
        cancelable?: boolean;
    }

    interface EventDispatcher<EventMap extends Record<string, any>> {
        <Type extends keyof EventMap>(...args: null extends EventMap[Type] ? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions] : undefined extends EventMap[Type] ? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions] : [type: Type, parameter: EventMap[Type], options?: DispatchOptions]): boolean;
    }
    class SvelteComponent_1<Props extends Record<string, any> = any, Events extends Record<string, any> = any> {
        $$: any;
        $$set: any;

        $destroy(): void;

        $on<K extends Extract<keyof Events, string>>(type: K, callback: ((e: Events[K]) => void) | null | undefined): () => void;

        $set(props: Partial<Props>): void;
    }
    export class SvelteComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponent_1<Props, Events> {
        [prop: string]: any;

        constructor(options: ComponentConstructorOptions<Props>);
        $$prop_def: Props;
        $$events_def: Events;
        $$slot_def: Slots;

        $capture_state(): void;

        $inject_state(): void;
    }
    export class SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponent<Props, Events, Slots> {}
    export function beforeUpdate(fn: () => any): void;
    export function onMount<T>(fn: () => NotFunction<T> | Promise<NotFunction<T>> | (() => any)): void;
    export function afterUpdate(fn: () => any): void;
    export function onDestroy(fn: () => any): void;
    export function createEventDispatcher<EventMap extends Record<string, any> = any>(): EventDispatcher<EventMap>;
    export function setContext<T>(key: any, context: T): T;
    export function getContext<T>(key: any): T;
    export function getAllContexts<T extends Map<any, any> = Map<any, any>>(): T;
    export function hasContext(key: any): boolean;
    export function tick(): Promise<void>;
    type NotFunction<T> = T extends Function ? never : T;
}

declare module 'svelte/compiler' {
    import type { AssignmentExpression, Node, Program } from 'estree';
    import type { SourceMap } from 'magic-string';
    export { walk } from 'estree-walker';
    interface BaseNode {
        start: number;
        end: number;
        type: string;
        children?: TemplateNode[];
        [prop_name: string]: any;
    }

    interface Text extends BaseNode {
        type: 'Text';
        data: string;
    }

    interface MustacheTag extends BaseNode {
        type: 'MustacheTag' | 'RawMustacheTag';
        expression: Node;
    }

    interface Comment extends BaseNode {
        type: 'Comment';
        data: string;
        ignores: string[];
    }

    interface ConstTag extends BaseNode {
        type: 'ConstTag';
        expression: AssignmentExpression;
    }

    interface DebugTag extends BaseNode {
        type: 'DebugTag';
        identifiers: Node[];
    }

    type DirectiveType = 'Action' | 'Animation' | 'Binding' | 'Class' | 'StyleDirective' | 'EventHandler' | 'Let' | 'Ref' | 'Transition';

    interface BaseDirective extends BaseNode {
        type: DirectiveType;
        name: string;
    }

    interface BaseExpressionDirective extends BaseDirective {
        type: DirectiveType;
        expression: null | Node;
        name: string;
        modifiers: string[];
    }

    interface Element extends BaseNode {
        type: 'InlineComponent' | 'SlotTemplate' | 'Title' | 'Slot' | 'Element' | 'Head' | 'Options' | 'Window' | 'Document' | 'Body';
        attributes: Array<BaseDirective | Attribute | SpreadAttribute>;
        name: string;
    }

    interface Attribute extends BaseNode {
        type: 'Attribute';
        name: string;
        value: any[];
    }

    interface SpreadAttribute extends BaseNode {
        type: 'Spread';
        expression: Node;
    }

    interface Transition extends BaseExpressionDirective {
        type: 'Transition';
        intro: boolean;
        outro: boolean;
    }

    type Directive = BaseDirective | BaseExpressionDirective | Transition;

    type TemplateNode = Text | ConstTag | DebugTag | MustacheTag | BaseNode | Element | Attribute | SpreadAttribute | Directive | Transition | Comment;

    interface Script extends BaseNode {
        type: 'Script';
        context: string;
        content: Program;
    }

    interface Style extends BaseNode {
        type: 'Style';
        attributes: any[];
        children: any[];
        content: {
            start: number;
            end: number;
            styles: string;
        };
    }

    interface Ast {
        html: TemplateNode;
        css?: Style;
        instance?: Script;
        module?: Script;
    }

    interface Warning {
        start?: { line: number; column: number; pos?: number };
        end?: { line: number; column: number };
        pos?: number;
        code: string;
        message: string;
        filename?: string;
        frame?: string;
        toString: () => string;
    }

    export type EnableSourcemap = boolean | { js: boolean; css: boolean };

    export type CssHashGetter = (args: { name: string; filename: string | undefined; css: string; hash: (input: string) => string }) => string;

    export interface CompileOptions {
        name?: string;

        filename?: string;

        generate?: 'dom' | 'ssr' | false;

        errorMode?: 'throw' | 'warn';

        varsReport?: 'full' | 'strict' | false;

        sourcemap?: object | string;

        enableSourcemap?: EnableSourcemap;

        outputFilename?: string;

        cssOutputFilename?: string;

        sveltePath?: string;

        dev?: boolean;

        accessors?: boolean;

        immutable?: boolean;

        hydratable?: boolean;

        legacy?: boolean;

        customElement?: boolean;

        tag?: string;

        css?: 'injected' | 'external' | 'none' | boolean;

        loopGuardTimeout?: number;

        namespace?: string;

        cssHash?: CssHashGetter;

        preserveComments?: boolean;

        preserveWhitespace?: boolean;
        discloseVersion?: boolean;
    }

    interface ParserOptions {
        filename?: string;
        customElement?: boolean;
        css?: 'injected' | 'external' | 'none' | boolean;
    }

    interface Var {
        name: string;
        export_name?: string;
        is_boolean?: boolean;
        injected?: boolean;
        module?: boolean;
        mutated?: boolean;
        reassigned?: boolean;
        referenced?: boolean;
        referenced_from_script?: boolean;
        writable?: boolean;

        global?: boolean;
        internal?: boolean;
        initialised?: boolean;
        hoistable?: boolean;
        subscribable?: boolean;
        is_reactive_dependency?: boolean;
        imported?: boolean;
    }

    interface CssResult {
        code: string;
        map: SourceMap;
    }

    export interface CompileResult {
        js: {
            code: string;
            map: any;
        };
        css: CssResult;
        ast: Ast;
        warnings: Warning[];
        vars: Var[];
        stats: {
            timings: {
                total: number;
            };
        };
    }
    export interface Processed {
        code: string;
        map?: string | object;
        dependencies?: string[];
        attributes?: Record<string, string | boolean>;
        toString?: () => string;
    }

    export type MarkupPreprocessor = (options: { content: string; filename?: string }) => Processed | void | Promise<Processed | void>;

    export type Preprocessor = (options: { content: string; attributes: Record<string, string | boolean>; markup: string; filename?: string }) => Processed | void | Promise<Processed | void>;

    export interface PreprocessorGroup {
        name?: string;
        markup?: MarkupPreprocessor;
        style?: Preprocessor;
        script?: Preprocessor;
    }

    export interface SveltePreprocessor<PreprocessorType extends keyof PreprocessorGroup, Options = any> {
        (options?: Options): Required<Pick<PreprocessorGroup, PreprocessorType>>;
    }
    export function compile(source: string, options?: CompileOptions): CompileResult;
    export function parse(template: string, options?: ParserOptions): Ast;
    export function preprocess(
        source: string,
        preprocessor: PreprocessorGroup | PreprocessorGroup[],
        options?:
            | {
                  filename?: string | undefined;
              }
            | undefined,
    ): Promise<Processed>;
    export const VERSION: string;
}

declare module 'svelte/types/compiler/preprocess' {
    export interface Processed {
        code: string;
        map?: string | object;
        dependencies?: string[];
        attributes?: Record<string, string | boolean>;
        toString?: () => string;
    }

    export type MarkupPreprocessor = (options: { content: string; filename?: string }) => Processed | void | Promise<Processed | void>;

    export type Preprocessor = (options: { content: string; attributes: Record<string, string | boolean>; markup: string; filename?: string }) => Processed | void | Promise<Processed | void>;

    export interface PreprocessorGroup {
        name?: string;
        markup?: MarkupPreprocessor;
        style?: Preprocessor;
        script?: Preprocessor;
    }

    export interface SveltePreprocessor<PreprocessorType extends keyof PreprocessorGroup, Options = any> {
        (options?: Options): Required<Pick<PreprocessorGroup, PreprocessorType>>;
    }
}

declare module 'svelte/types/compiler/interfaces' {
    import type { AssignmentExpression, Node, Program } from 'estree';
    import type { SourceMap } from 'magic-string';
    interface BaseNode {
        start: number;
        end: number;
        type: string;
        children?: TemplateNode[];
        [prop_name: string]: any;
    }

    export interface Fragment extends BaseNode {
        type: 'Fragment';
        children: TemplateNode[];
    }

    export interface Text extends BaseNode {
        type: 'Text';
        data: string;
    }

    export interface MustacheTag extends BaseNode {
        type: 'MustacheTag' | 'RawMustacheTag';
        expression: Node;
    }

    export interface Comment extends BaseNode {
        type: 'Comment';
        data: string;
        ignores: string[];
    }

    export interface ConstTag extends BaseNode {
        type: 'ConstTag';
        expression: AssignmentExpression;
    }

    interface DebugTag extends BaseNode {
        type: 'DebugTag';
        identifiers: Node[];
    }

    export type DirectiveType = 'Action' | 'Animation' | 'Binding' | 'Class' | 'StyleDirective' | 'EventHandler' | 'Let' | 'Ref' | 'Transition';

    export interface BaseDirective extends BaseNode {
        type: DirectiveType;
        name: string;
    }

    interface BaseExpressionDirective extends BaseDirective {
        type: DirectiveType;
        expression: null | Node;
        name: string;
        modifiers: string[];
    }

    export interface Element extends BaseNode {
        type: 'InlineComponent' | 'SlotTemplate' | 'Title' | 'Slot' | 'Element' | 'Head' | 'Options' | 'Window' | 'Document' | 'Body';
        attributes: Array<BaseDirective | Attribute | SpreadAttribute>;
        name: string;
    }

    export interface Attribute extends BaseNode {
        type: 'Attribute';
        name: string;
        value: any[];
    }

    export interface SpreadAttribute extends BaseNode {
        type: 'Spread';
        expression: Node;
    }

    export interface Transition extends BaseExpressionDirective {
        type: 'Transition';
        intro: boolean;
        outro: boolean;
    }

    export type Directive = BaseDirective | BaseExpressionDirective | Transition;

    export type TemplateNode = Text | ConstTag | DebugTag | MustacheTag | BaseNode | Element | Attribute | SpreadAttribute | Directive | Transition | Comment;

    export interface Parser {
        readonly template: string;
        readonly filename?: string;

        index: number;
        stack: Node[];

        html: Node;
        css: Node;
        js: Node;
        meta_tags: {};
    }

    export interface Script extends BaseNode {
        type: 'Script';
        context: string;
        content: Program;
    }

    export interface Style extends BaseNode {
        type: 'Style';
        attributes: any[];
        children: any[];
        content: {
            start: number;
            end: number;
            styles: string;
        };
    }

    export interface Ast {
        html: TemplateNode;
        css?: Style;
        instance?: Script;
        module?: Script;
    }

    export interface Warning {
        start?: { line: number; column: number; pos?: number };
        end?: { line: number; column: number };
        pos?: number;
        code: string;
        message: string;
        filename?: string;
        frame?: string;
        toString: () => string;
    }

    export type EnableSourcemap = boolean | { js: boolean; css: boolean };

    export type CssHashGetter = (args: { name: string; filename: string | undefined; css: string; hash: (input: string) => string }) => string;

    export interface CompileOptions {
        name?: string;

        filename?: string;

        generate?: 'dom' | 'ssr' | false;

        errorMode?: 'throw' | 'warn';

        varsReport?: 'full' | 'strict' | false;

        sourcemap?: object | string;

        enableSourcemap?: EnableSourcemap;

        outputFilename?: string;

        cssOutputFilename?: string;

        sveltePath?: string;

        dev?: boolean;

        accessors?: boolean;

        immutable?: boolean;

        hydratable?: boolean;

        legacy?: boolean;

        customElement?: boolean;

        tag?: string;

        css?: 'injected' | 'external' | 'none' | boolean;

        loopGuardTimeout?: number;

        namespace?: string;

        cssHash?: CssHashGetter;

        preserveComments?: boolean;

        preserveWhitespace?: boolean;
        discloseVersion?: boolean;
    }

    export interface ParserOptions {
        filename?: string;
        customElement?: boolean;
        css?: 'injected' | 'external' | 'none' | boolean;
    }

    export interface Visitor {
        enter: (node: Node) => void;
        leave?: (node: Node) => void;
    }

    export interface AppendTarget {
        slots: Record<string, string>;
        slot_stack: string[];
    }

    export interface Var {
        name: string;
        export_name?: string;
        is_boolean?: boolean;
        injected?: boolean;
        module?: boolean;
        mutated?: boolean;
        reassigned?: boolean;
        referenced?: boolean;
        referenced_from_script?: boolean;
        writable?: boolean;

        global?: boolean;
        internal?: boolean;
        initialised?: boolean;
        hoistable?: boolean;
        subscribable?: boolean;
        is_reactive_dependency?: boolean;
        imported?: boolean;
    }

    export interface CssResult {
        code: string;
        map: SourceMap;
    }

    export interface CompileResult {
        js: {
            code: string;
            map: any;
        };
        css: CssResult;
        ast: Ast;
        warnings: Warning[];
        vars: Var[];
        stats: {
            timings: {
                total: number;
            };
        };
    }
}

declare module 'svelte/action' {
    export interface ActionReturn<Parameter = undefined, Attributes extends Record<string, any> = Record<never, any>> {
        update?: (parameter: Parameter) => void;
        destroy?: () => void;
        $$_attributes?: Attributes;
    }

    export interface Action<Element = HTMLElement, Parameter = undefined, Attributes extends Record<string, any> = Record<never, any>> {
        <Node extends Element>(...args: undefined extends Parameter ? [node: Node, parameter?: Parameter] : [node: Node, parameter: Parameter]): void | ActionReturn<Parameter, Attributes>;
    }
}

declare module 'svelte/animate' {
    export interface AnimationConfig {
        delay?: number;
        duration?: number;
        easing?: (t: number) => number;
        css?: (t: number, u: number) => string;
        tick?: (t: number, u: number) => void;
    }

    export interface FlipParams {
        delay?: number;
        duration?: number | ((len: number) => number);
        easing?: (t: number) => number;
    }
    export function flip(
        node: Element,
        {
            from,
            to,
        }: {
            from: DOMRect;
            to: DOMRect;
        },
        params?: FlipParams,
    ): AnimationConfig;
}

declare module 'svelte/easing' {
    export function backInOut(t: number): number;
    export function backIn(t: number): number;
    export function backOut(t: number): number;
    export function bounceOut(t: number): number;
    export function bounceInOut(t: number): number;
    export function bounceIn(t: number): number;
    export function circInOut(t: number): number;
    export function circIn(t: number): number;
    export function circOut(t: number): number;
    export function cubicInOut(t: number): number;
    export function cubicIn(t: number): number;
    export function cubicOut(t: number): number;
    export function elasticInOut(t: number): number;
    export function elasticIn(t: number): number;
    export function elasticOut(t: number): number;
    export function expoInOut(t: number): number;
    export function expoIn(t: number): number;
    export function expoOut(t: number): number;
    export function quadInOut(t: number): number;
    export function quadIn(t: number): number;
    export function quadOut(t: number): number;
    export function quartInOut(t: number): number;
    export function quartIn(t: number): number;
    export function quartOut(t: number): number;
    export function quintInOut(t: number): number;
    export function quintIn(t: number): number;
    export function quintOut(t: number): number;
    export function sineInOut(t: number): number;
    export function sineIn(t: number): number;
    export function sineOut(t: number): number;
    export function linear(x: any): any;
}

declare module 'svelte/motion' {
    export interface Spring<T> extends Readable<T> {
        set: (new_value: T, opts?: SpringUpdateOpts) => Promise<void>;
        update: (fn: Updater<T>, opts?: SpringUpdateOpts) => Promise<void>;
        precision: number;
        damping: number;
        stiffness: number;
    }

    export interface Tweened<T> extends Readable<T> {
        set(value: T, opts?: TweenedOptions<T>): Promise<void>;
        update(updater: Updater<T>, opts?: TweenedOptions<T>): Promise<void>;
    }
    type Subscriber<T> = (value: T) => void;

    type Unsubscriber = () => void;

    interface Readable<T> {
        subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
    }
    interface SpringOpts {
        stiffness?: number;
        damping?: number;
        precision?: number;
    }

    interface SpringUpdateOpts {
        hard?: any;
        soft?: string | number | boolean;
    }

    type Updater<T> = (target_value: T, value: T) => T;

    interface TweenedOptions<T> {
        delay?: number;
        duration?: number | ((from: T, to: T) => number);
        easing?: (t: number) => number;
        interpolate?: (a: T, b: T) => (t: number) => T;
    }
    type Invalidator<T> = (value?: T) => void;
    export function spring<T = any>(value?: T | undefined, opts?: SpringOpts | undefined): Spring<T>;
    export function tweened<T>(value?: T | undefined, defaults?: TweenedOptions<T> | undefined): Tweened<T>;
}

declare module 'svelte/store' {
    export type Subscriber<T> = (value: T) => void;

    export type Unsubscriber = () => void;

    export type Updater<T> = (value: T) => T;

    export type StartStopNotifier<T> = (set: (value: T) => void, update: (fn: Updater<T>) => void) => void | (() => void);

    export interface Readable<T> {
        subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
    }

    export interface Writable<T> extends Readable<T> {
        set(this: void, value: T): void;

        update(this: void, updater: Updater<T>): void;
    }
    type Invalidator<T> = (value?: T) => void;

    type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;

    type StoresValues<T> = T extends Readable<infer U> ? U : { [K in keyof T]: T[K] extends Readable<infer U> ? U : never };
    export function readable<T>(value?: T | undefined, start?: StartStopNotifier<T> | undefined): Readable<T>;
    export function writable<T>(value?: T | undefined, start?: StartStopNotifier<T> | undefined): Writable<T>;
    export function derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>, set: (value: T) => void, update: (fn: Updater<T>) => void) => Unsubscriber | void, initial_value?: T | undefined): Readable<T>;
    export function derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>) => T, initial_value?: T | undefined): Readable<T>;
    export function readonly<T>(store: Readable<T>): Readable<T>;
    export function get<T>(store: Readable<T>): T;
}

declare module 'svelte/transition' {
    export type EasingFunction = (t: number) => number;

    export interface TransitionConfig {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
        css?: (t: number, u: number) => string;
        tick?: (t: number, u: number) => void;
    }

    export interface BlurParams {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
        amount?: number | string;
        opacity?: number;
    }

    export interface FadeParams {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
    }

    export interface FlyParams {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
        x?: number | string;
        y?: number | string;
        opacity?: number;
    }

    export interface SlideParams {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
        axis?: 'x' | 'y';
    }

    export interface ScaleParams {
        delay?: number;
        duration?: number;
        easing?: EasingFunction;
        start?: number;
        opacity?: number;
    }

    export interface DrawParams {
        delay?: number;
        speed?: number;
        duration?: number | ((len: number) => number);
        easing?: EasingFunction;
    }

    export interface CrossfadeParams {
        delay?: number;
        duration?: number | ((len: number) => number);
        easing?: EasingFunction;
    }
    export function blur(node: Element, { delay, duration, easing, amount, opacity }?: BlurParams | undefined): TransitionConfig;
    export function fade(node: Element, { delay, duration, easing }?: FadeParams | undefined): TransitionConfig;
    export function fly(node: Element, { delay, duration, easing, x, y, opacity }?: FlyParams | undefined): TransitionConfig;
    export function slide(node: Element, { delay, duration, easing, axis }?: SlideParams | undefined): TransitionConfig;
    export function scale(node: Element, { delay, duration, easing, start, opacity }?: ScaleParams | undefined): TransitionConfig;
    export function draw(
        node: SVGElement & {
            getTotalLength(): number;
        },
        { delay, speed, duration, easing }?: DrawParams | undefined,
    ): TransitionConfig;
    export function crossfade({
        fallback,
        ...defaults
    }: CrossfadeParams & {
        fallback?: ((node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig) | undefined;
    }): [
        (
            node: any,
            params: CrossfadeParams & {
                key: any;
            },
        ) => () => TransitionConfig,
        (
            node: any,
            params: CrossfadeParams & {
                key: any;
            },
        ) => () => TransitionConfig,
    ];
}
declare module '*.svelte' {
    export { SvelteComponent as default } from 'svelte';
}
