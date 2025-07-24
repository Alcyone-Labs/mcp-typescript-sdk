import { Protocol, ProtocolOptions, RequestOptions } from "../shared/protocol.js";
import { Transport } from "../shared/transport.js";
import { CallToolRequest, CallToolResultSchema, ClientCapabilities, ClientNotification, ClientRequest, ClientResult, CompatibilityCallToolResultSchema, CompleteRequest, GetPromptRequest, Implementation, ListPromptsRequest, ListResourcesRequest, ListResourceTemplatesRequest, ListToolsRequest, LoggingLevel, Notification, ReadResourceRequest, Request, Result, ServerCapabilities, SubscribeRequest, UnsubscribeRequest } from "../types.js";
export type ClientOptions = ProtocolOptions & {
    /**
     * Capabilities to advertise as being supported by this client.
     */
    capabilities?: ClientCapabilities;
};
/**
 * An MCP client on top of a pluggable transport.
 *
 * The client will automatically begin the initialization flow with the server when connect() is called.
 *
 * To use with custom types, extend the base Request/Notification/Result types and pass them as type parameters:
 *
 * ```typescript
 * // Custom schemas
 * const CustomRequestSchema = RequestSchema.extend({...})
 * const CustomNotificationSchema = NotificationSchema.extend({...})
 * const CustomResultSchema = ResultSchema.extend({...})
 *
 * // Type aliases
 * type CustomRequest = z.infer<typeof CustomRequestSchema>
 * type CustomNotification = z.infer<typeof CustomNotificationSchema>
 * type CustomResult = z.infer<typeof CustomResultSchema>
 *
 * // Create typed client
 * const client = new Client<CustomRequest, CustomNotification, CustomResult>({
 *   name: "CustomClient",
 *   version: "1.0.0"
 * })
 * ```
 */
export declare class Client<RequestT extends Request = Request, NotificationT extends Notification = Notification, ResultT extends Result = Result> extends Protocol<ClientRequest | RequestT, ClientNotification | NotificationT, ClientResult | ResultT> {
    private _clientInfo;
    private _serverCapabilities?;
    private _serverVersion?;
    private _capabilities;
    private _instructions?;
    private _cachedToolOutputValidators;
    private _ajv;
    /**
     * Initializes this client with the given name and version information.
     */
    constructor(_clientInfo: Implementation, options?: ClientOptions);
    /**
     * Registers new capabilities. This can only be called before connecting to a transport.
     *
     * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
     */
    registerCapabilities(capabilities: ClientCapabilities): void;
    protected assertCapability(capability: keyof ServerCapabilities, method: string): void;
    connect(transport: Transport, options?: RequestOptions): Promise<void>;
    /**
     * After initialization has completed, this will be populated with the server's reported capabilities.
     */
    getServerCapabilities(): ServerCapabilities | undefined;
    /**
     * After initialization has completed, this will be populated with information about the server's name and version.
     */
    getServerVersion(): Implementation | undefined;
    /**
     * After initialization has completed, this may be populated with information about the server's instructions.
     */
    getInstructions(): string | undefined;
    protected assertCapabilityForMethod(method: RequestT["method"]): void;
    protected assertNotificationCapability(method: NotificationT["method"]): void;
    protected assertRequestHandlerCapability(method: string): void;
    ping(options?: RequestOptions): Promise<{
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    complete(params: CompleteRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        completion: {
            [x: string]: unknown;
            values: string[];
            total?: number | undefined;
            hasMore?: boolean | undefined;
        };
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    setLoggingLevel(level: LoggingLevel, options?: RequestOptions): Promise<{
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    getPrompt(params: GetPromptRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        messages: {
            [x: string]: unknown;
            role: "user" | "assistant";
            content: {
                [x: string]: unknown;
                type: "text";
                text: string;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            } | {
                [x: string]: unknown;
                type: "image";
                data: string;
                mimeType: string;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            } | {
                [x: string]: unknown;
                type: "audio";
                data: string;
                mimeType: string;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            } | {
                [x: string]: unknown;
                type: "resource";
                resource: {
                    [x: string]: unknown;
                    uri: string;
                    text: string;
                    mimeType?: string | undefined;
                    _meta?: {
                        [x: string]: unknown;
                    } | undefined;
                } | {
                    [x: string]: unknown;
                    uri: string;
                    blob: string;
                    mimeType?: string | undefined;
                    _meta?: {
                        [x: string]: unknown;
                    } | undefined;
                };
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            } | {
                [x: string]: unknown;
                name: string;
                uri: string;
                type: "resource_link";
                title?: string | undefined;
                description?: string | undefined;
                mimeType?: string | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            };
        }[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        description?: string | undefined;
    }>;
    listPrompts(params?: ListPromptsRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        prompts: {
            [x: string]: unknown;
            name: string;
            title?: string | undefined;
            description?: string | undefined;
            arguments?: {
                [x: string]: unknown;
                name: string;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    listResources(params?: ListResourcesRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        resources: {
            [x: string]: unknown;
            name: string;
            uri: string;
            title?: string | undefined;
            description?: string | undefined;
            mimeType?: string | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    listResourceTemplates(params?: ListResourceTemplatesRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        resourceTemplates: {
            [x: string]: unknown;
            name: string;
            uriTemplate: string;
            title?: string | undefined;
            description?: string | undefined;
            mimeType?: string | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    readResource(params: ReadResourceRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        contents: ({
            [x: string]: unknown;
            uri: string;
            text: string;
            mimeType?: string | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | {
            [x: string]: unknown;
            uri: string;
            blob: string;
            mimeType?: string | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        })[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    subscribeResource(params: SubscribeRequest["params"], options?: RequestOptions): Promise<{
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    unsubscribeResource(params: UnsubscribeRequest["params"], options?: RequestOptions): Promise<{
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    callTool(params: CallToolRequest["params"], resultSchema?: typeof CallToolResultSchema | typeof CompatibilityCallToolResultSchema, options?: RequestOptions): Promise<{
        [x: string]: unknown;
        content: ({
            [x: string]: unknown;
            type: "text";
            text: string;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | {
            [x: string]: unknown;
            type: "image";
            data: string;
            mimeType: string;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | {
            [x: string]: unknown;
            type: "audio";
            data: string;
            mimeType: string;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | {
            [x: string]: unknown;
            type: "resource";
            resource: {
                [x: string]: unknown;
                uri: string;
                text: string;
                mimeType?: string | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            } | {
                [x: string]: unknown;
                uri: string;
                blob: string;
                mimeType?: string | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
            };
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | {
            [x: string]: unknown;
            name: string;
            uri: string;
            type: "resource_link";
            title?: string | undefined;
            description?: string | undefined;
            mimeType?: string | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        })[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        structuredContent?: {
            [x: string]: unknown;
        } | undefined;
        isError?: boolean | undefined;
    } | {
        [x: string]: unknown;
        toolResult: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    private cacheToolOutputSchemas;
    private getToolOutputValidator;
    listTools(params?: ListToolsRequest["params"], options?: RequestOptions): Promise<{
        [x: string]: unknown;
        tools: {
            [x: string]: unknown;
            name: string;
            inputSchema: {
                type: "object";
                properties?: {
                    [x: string]: unknown;
                } | undefined;
                required?: string[] | undefined;
            };
            title?: string | undefined;
            description?: string | undefined;
            outputSchema?: {
                [x: string]: unknown;
                type: "object";
                properties?: {
                    [x: string]: unknown;
                } | undefined;
                required?: string[] | undefined;
            } | undefined;
            annotations?: {
                [x: string]: unknown;
                title?: string | undefined;
                readOnlyHint?: boolean | undefined;
                destructiveHint?: boolean | undefined;
                idempotentHint?: boolean | undefined;
                openWorldHint?: boolean | undefined;
            } | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    sendRootsListChanged(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map