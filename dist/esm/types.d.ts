import { z } from "zod";
import { AuthInfo } from "./server/auth/types.js";
export declare const LATEST_PROTOCOL_VERSION = "2025-06-18";
export declare const DEFAULT_NEGOTIATED_PROTOCOL_VERSION = "2025-03-26";
export declare const SUPPORTED_PROTOCOL_VERSIONS: string[];
export declare const JSONRPC_VERSION = "2.0";
/**
 * A progress token, used to associate progress notifications with the original request.
 */
export declare const ProgressTokenSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
/**
 * An opaque token used to represent a cursor for pagination.
 */
export declare const CursorSchema: z.ZodString;
declare const RequestMetaSchema: z.ZodObject<{
    /**
     * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
     */
    progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
}, z.core.$loose>;
export declare const RequestSchema: z.ZodObject<{
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strip>;
export declare const NotificationSchema: z.ZodObject<{
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strip>;
export declare const ResultSchema: z.ZodObject<{
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * A uniquely identifying ID for a request in JSON-RPC.
 */
export declare const RequestIdSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
/**
 * A request that expects a response.
 */
export declare const JSONRPCRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strict>;
export declare const isJSONRPCRequest: (value: unknown) => value is JSONRPCRequest;
/**
 * A notification which does not expect a response.
 */
export declare const JSONRPCNotificationSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strict>;
export declare const isJSONRPCNotification: (value: unknown) => value is JSONRPCNotification;
/**
 * A successful (non-error) response to a request.
 */
export declare const JSONRPCResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    result: z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>;
}, z.core.$strict>;
export declare const isJSONRPCResponse: (value: unknown) => value is JSONRPCResponse;
/**
 * Error codes defined by the JSON-RPC specification.
 */
export declare enum ErrorCode {
    ConnectionClosed = -32000,
    RequestTimeout = -32001,
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603
}
/**
 * A response to a request that indicates an error occurred.
 */
export declare const JSONRPCErrorSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>;
}, z.core.$strict>;
export declare const isJSONRPCError: (value: unknown) => value is JSONRPCError;
export declare const JSONRPCMessageSchema: z.ZodUnion<readonly [z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strict>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$strict>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    result: z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>;
}, z.core.$strict>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>;
}, z.core.$strict>]>;
/**
 * A response that indicates success but carries no data.
 */
export declare const EmptyResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$strict>;
/**
 * This notification can be sent by either side to indicate that it is cancelling a previously-issued request.
 *
 * The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
 *
 * This notification indicates that the result will be unused, so any associated processing SHOULD cease.
 *
 * A client MUST NOT attempt to cancel its `initialize` request.
 */
export declare const CancelledNotificationSchema: z.ZodObject<{
    method: z.ZodLiteral<"notifications/cancelled">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        requestId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Base metadata interface for common properties across resources, tools, prompts, and implementations.
 */
declare const BaseMetadataSchema: z.ZodObject<{
    /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
    name: z.ZodString;
    /**
     * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
     * even by those unfamiliar with domain-specific terminology.
     *
     * If not provided, the name should be used for display (except for Tool,
     * where `annotations.title` should be given precedence over using `name`,
     * if present).
     */
    title: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/**
 * Describes the name and version of an MCP implementation.
 */
export declare const ImplementationSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    version: z.ZodString;
}, z.core.$loose>;
/**
 * Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
 */
export declare const ClientCapabilitiesSchema: z.ZodObject<{
    experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    sampling: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    elicitation: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    roots: z.ZodOptional<z.ZodObject<{
        listChanged: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * This request is sent from the client to the server when it first connects, asking it to begin initialization.
 */
export declare const InitializeRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"initialize">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        protocolVersion: z.ZodString;
        capabilities: z.ZodObject<{
            experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            sampling: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            elicitation: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            roots: z.ZodOptional<z.ZodObject<{
                listChanged: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$loose>>;
        }, z.core.$loose>;
        clientInfo: z.ZodObject<{
            name: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            version: z.ZodString;
        }, z.core.$loose>;
    }, z.core.$loose>;
}, z.core.$strip>;
export declare const isInitializeRequest: (value: unknown) => value is InitializeRequest;
/**
 * Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
 */
export declare const ServerCapabilitiesSchema: z.ZodObject<{
    experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    logging: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    completions: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    prompts: z.ZodOptional<z.ZodObject<{
        listChanged: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>;
    resources: z.ZodOptional<z.ZodObject<{
        subscribe: z.ZodOptional<z.ZodBoolean>;
        listChanged: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>;
    tools: z.ZodOptional<z.ZodObject<{
        listChanged: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * After receiving an initialize request from the client, the server sends this response.
 */
export declare const InitializeResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    protocolVersion: z.ZodString;
    capabilities: z.ZodObject<{
        experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        logging: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        completions: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        prompts: z.ZodOptional<z.ZodObject<{
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        resources: z.ZodOptional<z.ZodObject<{
            subscribe: z.ZodOptional<z.ZodBoolean>;
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        tools: z.ZodOptional<z.ZodObject<{
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
    }, z.core.$loose>;
    serverInfo: z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        version: z.ZodString;
    }, z.core.$loose>;
    instructions: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/**
 * This notification is sent from the client to the server after initialization has finished.
 */
export declare const InitializedNotificationSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/initialized">;
}, z.core.$strip>;
export declare const isInitializedNotification: (value: unknown) => value is InitializedNotification;
/**
 * A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
 */
export declare const PingRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"ping">;
}, z.core.$strip>;
export declare const ProgressSchema: z.ZodObject<{
    progress: z.ZodNumber;
    total: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/**
 * An out-of-band notification used to inform the receiver of a progress update for a long-running request.
 */
export declare const ProgressNotificationSchema: z.ZodObject<{
    method: z.ZodLiteral<"notifications/progress">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        progressToken: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        progress: z.ZodNumber;
        total: z.ZodOptional<z.ZodNumber>;
        message: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>;
export declare const PaginatedRequestSchema: z.ZodObject<{
    method: z.ZodString;
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
}, z.core.$strip>;
export declare const PaginatedResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/**
 * The contents of a specific resource or sub-resource.
 */
export declare const ResourceContentsSchema: z.ZodObject<{
    /**
     * The URI of this resource.
     */
    uri: z.ZodString;
    /**
     * The MIME type of this resource, if known.
     */
    mimeType: z.ZodOptional<z.ZodString>;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
export declare const TextResourceContentsSchema: z.ZodObject<{
    uri: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    text: z.ZodString;
}, z.core.$loose>;
export declare const BlobResourceContentsSchema: z.ZodObject<{
    uri: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    blob: z.ZodString;
}, z.core.$loose>;
/**
 * A known resource that the server is capable of reading.
 */
export declare const ResourceSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    uri: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * A template description for resources available on the server.
 */
export declare const ResourceTemplateSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    uriTemplate: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the client to request a list of resources the server has.
 */
export declare const ListResourcesRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"resources/list">;
}, z.core.$strip>;
/**
 * The server's response to a resources/list request from the client.
 */
export declare const ListResourcesResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    resources: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the client to request a list of resource templates the server has.
 */
export declare const ListResourceTemplatesRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"resources/templates/list">;
}, z.core.$strip>;
/**
 * The server's response to a resources/templates/list request from the client.
 */
export declare const ListResourceTemplatesResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    resourceTemplates: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uriTemplate: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the client to the server, to read a specific resource URI.
 */
export declare const ReadResourceRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"resources/read">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * The server's response to a resources/read request from the client.
 */
export declare const ReadResourceResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    contents: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        text: z.ZodString;
    }, z.core.$loose>, z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        blob: z.ZodString;
    }, z.core.$loose>]>>;
}, z.core.$loose>;
/**
 * An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
 */
export declare const ResourceListChangedNotificationSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/resources/list_changed">;
}, z.core.$strip>;
/**
 * Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.
 */
export declare const SubscribeRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"resources/subscribe">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.
 */
export declare const UnsubscribeRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"resources/unsubscribe">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.
 */
export declare const ResourceUpdatedNotificationSchema: z.ZodObject<{
    method: z.ZodLiteral<"notifications/resources/updated">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Describes an argument that a prompt can accept.
 */
export declare const PromptArgumentSchema: z.ZodObject<{
    /**
     * The name of the argument.
     */
    name: z.ZodString;
    /**
     * A human-readable description of the argument.
     */
    description: z.ZodOptional<z.ZodString>;
    /**
     * Whether this argument is required.
     */
    required: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>;
/**
 * A prompt or prompt template that the server offers.
 */
export declare const PromptSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * The name of the argument.
         */
        name: z.ZodString;
        /**
         * A human-readable description of the argument.
         */
        description: z.ZodOptional<z.ZodString>;
        /**
         * Whether this argument is required.
         */
        required: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the client to request a list of prompts and prompt templates the server has.
 */
export declare const ListPromptsRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"prompts/list">;
}, z.core.$strip>;
/**
 * The server's response to a prompts/list request from the client.
 */
export declare const ListPromptsResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    prompts: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * The name of the argument.
             */
            name: z.ZodString;
            /**
             * A human-readable description of the argument.
             */
            description: z.ZodOptional<z.ZodString>;
            /**
             * Whether this argument is required.
             */
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Used by the client to get a prompt provided by the server.
 */
export declare const GetPromptRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"prompts/get">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Text provided to or from an LLM.
 */
export declare const TextContentSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    /**
     * The text content of the message.
     */
    text: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * An image provided to or from an LLM.
 */
export declare const ImageContentSchema: z.ZodObject<{
    type: z.ZodLiteral<"image">;
    /**
     * The base64-encoded image data.
     */
    data: z.ZodString;
    /**
     * The MIME type of the image. Different providers may support different image types.
     */
    mimeType: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * An Audio provided to or from an LLM.
 */
export declare const AudioContentSchema: z.ZodObject<{
    type: z.ZodLiteral<"audio">;
    /**
     * The base64-encoded audio data.
     */
    data: z.ZodString;
    /**
     * The MIME type of the audio. Different providers may support different audio types.
     */
    mimeType: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * The contents of a resource, embedded into a prompt or tool call result.
 */
export declare const EmbeddedResourceSchema: z.ZodObject<{
    type: z.ZodLiteral<"resource">;
    resource: z.ZodUnion<readonly [z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        text: z.ZodString;
    }, z.core.$loose>, z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        blob: z.ZodString;
    }, z.core.$loose>]>;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * A resource that the server is capable of reading, included in a prompt or tool call result.
 *
 * Note: resource links returned by tools are not guaranteed to appear in the results of `resources/list` requests.
 */
export declare const ResourceLinkSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    uri: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    type: z.ZodLiteral<"resource_link">;
}, z.core.$loose>;
/**
 * A content block that can be used in prompts and tool results.
 */
export declare const ContentBlockSchema: z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodLiteral<"text">;
    /**
     * The text content of the message.
     */
    text: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodLiteral<"image">;
    /**
     * The base64-encoded image data.
     */
    data: z.ZodString;
    /**
     * The MIME type of the image. Different providers may support different image types.
     */
    mimeType: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodLiteral<"audio">;
    /**
     * The base64-encoded audio data.
     */
    data: z.ZodString;
    /**
     * The MIME type of the audio. Different providers may support different audio types.
     */
    mimeType: z.ZodString;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    uri: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    mimeType: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    type: z.ZodLiteral<"resource_link">;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodLiteral<"resource">;
    resource: z.ZodUnion<readonly [z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        text: z.ZodString;
    }, z.core.$loose>, z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        blob: z.ZodString;
    }, z.core.$loose>]>;
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>]>;
/**
 * Describes a message returned as part of a prompt.
 */
export declare const PromptMessageSchema: z.ZodObject<{
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        type: z.ZodLiteral<"resource_link">;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"resource">;
        resource: z.ZodUnion<readonly [z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            text: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            blob: z.ZodString;
        }, z.core.$loose>]>;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>;
}, z.core.$loose>;
/**
 * The server's response to a prompts/get request from the client.
 */
export declare const GetPromptResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    description: z.ZodOptional<z.ZodString>;
    messages: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<{
            user: "user";
            assistant: "assistant";
        }>;
        content: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"text">;
            /**
             * The text content of the message.
             */
            text: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"image">;
            /**
             * The base64-encoded image data.
             */
            data: z.ZodString;
            /**
             * The MIME type of the image. Different providers may support different image types.
             */
            mimeType: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"audio">;
            /**
             * The base64-encoded audio data.
             */
            data: z.ZodString;
            /**
             * The MIME type of the audio. Different providers may support different audio types.
             */
            mimeType: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            name: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            uri: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            type: z.ZodLiteral<"resource_link">;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"resource">;
            resource: z.ZodUnion<readonly [z.ZodObject<{
                uri: z.ZodString;
                mimeType: z.ZodOptional<z.ZodString>;
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
                text: z.ZodString;
            }, z.core.$loose>, z.ZodObject<{
                uri: z.ZodString;
                mimeType: z.ZodOptional<z.ZodString>;
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
                blob: z.ZodString;
            }, z.core.$loose>]>;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>]>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
 */
export declare const PromptListChangedNotificationSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/prompts/list_changed">;
}, z.core.$strip>;
/**
 * Additional properties describing a Tool to clients.
 *
 * NOTE: all properties in ToolAnnotations are **hints**.
 * They are not guaranteed to provide a faithful description of
 * tool behavior (including descriptive properties like `title`).
 *
 * Clients should never make tool use decisions based on ToolAnnotations
 * received from untrusted servers.
 */
export declare const ToolAnnotationsSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    readOnlyHint: z.ZodOptional<z.ZodBoolean>;
    destructiveHint: z.ZodOptional<z.ZodBoolean>;
    idempotentHint: z.ZodOptional<z.ZodBoolean>;
    openWorldHint: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>;
/**
 * Definition for a tool the client can call.
 */
export declare const ToolSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    inputSchema: z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    outputSchema: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$loose>>;
    annotations: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        readOnlyHint: z.ZodOptional<z.ZodBoolean>;
        destructiveHint: z.ZodOptional<z.ZodBoolean>;
        idempotentHint: z.ZodOptional<z.ZodBoolean>;
        openWorldHint: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the client to request a list of tools the server has.
 */
export declare const ListToolsRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"tools/list">;
}, z.core.$strip>;
/**
 * The server's response to a tools/list request from the client.
 */
export declare const ListToolsResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    tools: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        inputSchema: z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>;
        outputSchema: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$loose>>;
        annotations: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            readOnlyHint: z.ZodOptional<z.ZodBoolean>;
            destructiveHint: z.ZodOptional<z.ZodBoolean>;
            idempotentHint: z.ZodOptional<z.ZodBoolean>;
            openWorldHint: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * The server's response to a tool call.
 */
export declare const CallToolResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    content: z.ZodDefault<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        type: z.ZodLiteral<"resource_link">;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"resource">;
        resource: z.ZodUnion<readonly [z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            text: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            blob: z.ZodString;
        }, z.core.$loose>]>;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>>>;
    structuredContent: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    isError: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>;
/**
 * CallToolResultSchema extended with backwards compatibility to protocol version 2024-10-07.
 */
export declare const CompatibilityCallToolResultSchema: z.ZodUnion<[z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    content: z.ZodDefault<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        type: z.ZodLiteral<"resource_link">;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"resource">;
        resource: z.ZodUnion<readonly [z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            text: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            blob: z.ZodString;
        }, z.core.$loose>]>;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>>>;
    structuredContent: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    isError: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    toolResult: z.ZodUnknown;
}, z.core.$loose>]>;
/**
 * Used by the client to invoke a tool provided by the server.
 */
export declare const CallToolRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"tools/call">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
 */
export declare const ToolListChangedNotificationSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/tools/list_changed">;
}, z.core.$strip>;
/**
 * The severity of a log message.
 */
export declare const LoggingLevelSchema: z.ZodEnum<{
    error: "error";
    debug: "debug";
    info: "info";
    notice: "notice";
    warning: "warning";
    critical: "critical";
    alert: "alert";
    emergency: "emergency";
}>;
/**
 * A request from the client to the server, to enable or adjust logging.
 */
export declare const SetLevelRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"logging/setLevel">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        level: z.ZodEnum<{
            error: "error";
            debug: "debug";
            info: "info";
            notice: "notice";
            warning: "warning";
            critical: "critical";
            alert: "alert";
            emergency: "emergency";
        }>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Notification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.
 */
export declare const LoggingMessageNotificationSchema: z.ZodObject<{
    method: z.ZodLiteral<"notifications/message">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        level: z.ZodEnum<{
            error: "error";
            debug: "debug";
            info: "info";
            notice: "notice";
            warning: "warning";
            critical: "critical";
            alert: "alert";
            emergency: "emergency";
        }>;
        logger: z.ZodOptional<z.ZodString>;
        data: z.ZodUnknown;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * Hints to use for model selection.
 */
export declare const ModelHintSchema: z.ZodObject<{
    /**
     * A hint for a model name.
     */
    name: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/**
 * The server's preferences for model selection, requested of the client during sampling.
 */
export declare const ModelPreferencesSchema: z.ZodObject<{
    /**
     * Optional hints to use for model selection. If multiple models are supported, the client MAY choose how to prioritize these hints to pick a model.
     */
    hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * A hint for a model name.
         */
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>>;
    /**
     * A hint for the model's cost priority. 0 = highest cost, 1 = lowest cost. The client MAY use this to decide which model to use.
     */
    costPriority: z.ZodOptional<z.ZodNumber>;
    /**
     * A hint for the model's speed priority. 0 = slowest, 1 = fastest. The client MAY use this to decide which model to use.
     */
    speedPriority: z.ZodOptional<z.ZodNumber>;
    /**
     * A hint for the model's intelligence priority. 0 = least intelligent, 1 = most intelligent. The client MAY use this to decide which model to use.
     */
    intelligencePriority: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
/**
 * Describes a message issued to or received from an LLM API.
 */
export declare const SamplingMessageSchema: z.ZodObject<{
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>;
}, z.core.$loose>;
/**
 * A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
 */
export declare const CreateMessageRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"sampling/createMessage">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        messages: z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<{
                user: "user";
                assistant: "assistant";
            }>;
            content: z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"text">;
                /**
                 * The text content of the message.
                 */
                text: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"image">;
                /**
                 * The base64-encoded image data.
                 */
                data: z.ZodString;
                /**
                 * The MIME type of the image. Different providers may support different image types.
                 */
                mimeType: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"audio">;
                /**
                 * The base64-encoded audio data.
                 */
                data: z.ZodString;
                /**
                 * The MIME type of the audio. Different providers may support different audio types.
                 */
                mimeType: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>]>;
        }, z.core.$loose>>;
        systemPrompt: z.ZodOptional<z.ZodString>;
        includeContext: z.ZodOptional<z.ZodEnum<{
            none: "none";
            thisServer: "thisServer";
            allServers: "allServers";
        }>>;
        temperature: z.ZodOptional<z.ZodNumber>;
        maxTokens: z.ZodNumber;
        stopSequences: z.ZodOptional<z.ZodArray<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        modelPreferences: z.ZodOptional<z.ZodObject<{
            /**
             * Optional hints to use for model selection. If multiple models are supported, the client MAY choose how to prioritize these hints to pick a model.
             */
            hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * A hint for a model name.
                 */
                name: z.ZodOptional<z.ZodString>;
            }, z.core.$loose>>>;
            /**
             * A hint for the model's cost priority. 0 = highest cost, 1 = lowest cost. The client MAY use this to decide which model to use.
             */
            costPriority: z.ZodOptional<z.ZodNumber>;
            /**
             * A hint for the model's speed priority. 0 = slowest, 1 = fastest. The client MAY use this to decide which model to use.
             */
            speedPriority: z.ZodOptional<z.ZodNumber>;
            /**
             * A hint for the model's intelligence priority. 0 = least intelligent, 1 = most intelligent. The client MAY use this to decide which model to use.
             */
            intelligencePriority: z.ZodOptional<z.ZodNumber>;
        }, z.core.$loose>>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * The client's response to a sampling/create_message request from the server. The client should inform the user before returning the sampled message, to allow them to inspect the response (human in the loop) and decide whether to allow the server to see it.
 */
export declare const CreateMessageResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    model: z.ZodString;
    stopReason: z.ZodOptional<z.ZodUnion<[z.ZodEnum<{
        maxTokens: "maxTokens";
        endTurn: "endTurn";
        stopSequence: "stopSequence";
    }>, z.ZodString]>>;
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>;
}, z.core.$loose>;
/**
 * Primitive schema definition for boolean fields.
 */
export declare const BooleanSchemaSchema: z.ZodObject<{
    type: z.ZodLiteral<"boolean">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    default: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>;
/**
 * Primitive schema definition for string fields.
 */
export declare const StringSchemaSchema: z.ZodObject<{
    type: z.ZodLiteral<"string">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodEnum<{
        date: "date";
        uri: "uri";
        email: "email";
        "date-time": "date-time";
    }>>;
}, z.core.$loose>;
/**
 * Primitive schema definition for number fields.
 */
export declare const NumberSchemaSchema: z.ZodObject<{
    type: z.ZodEnum<{
        number: "number";
        integer: "integer";
    }>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    minimum: z.ZodOptional<z.ZodNumber>;
    maximum: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
/**
 * Primitive schema definition for enum fields.
 */
export declare const EnumSchemaSchema: z.ZodObject<{
    type: z.ZodLiteral<"string">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    enum: z.ZodArray<z.ZodString>;
    enumNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$loose>;
/**
 * Union of all primitive schema definitions.
 */
export declare const PrimitiveSchemaDefinitionSchema: z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodLiteral<"boolean">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    default: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodLiteral<"string">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodEnum<{
        date: "date";
        uri: "uri";
        email: "email";
        "date-time": "date-time";
    }>>;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodEnum<{
        number: "number";
        integer: "integer";
    }>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    minimum: z.ZodOptional<z.ZodNumber>;
    maximum: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>, z.ZodObject<{
    type: z.ZodLiteral<"string">;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    enum: z.ZodArray<z.ZodString>;
    enumNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$loose>]>;
/**
 * A request from the server to elicit user input via the client.
 * The client should present the message and form fields to the user.
 */
export declare const ElicitRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"elicitation/create">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        message: z.ZodString;
        requestedSchema: z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"string">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"string">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodArray<z.ZodString>;
                enumNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$loose>]>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$loose>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * The client's response to an elicitation/create request from the server.
 */
export declare const ElicitResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    action: z.ZodEnum<{
        accept: "accept";
        decline: "decline";
        cancel: "cancel";
    }>;
    content: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$loose>;
/**
 * A reference to a resource or resource template definition.
 */
export declare const ResourceTemplateReferenceSchema: z.ZodObject<{
    type: z.ZodLiteral<"ref/resource">;
    uri: z.ZodString;
}, z.core.$loose>;
/**
 * @deprecated Use ResourceTemplateReferenceSchema instead
 */
export declare const ResourceReferenceSchema: z.ZodObject<{
    type: z.ZodLiteral<"ref/resource">;
    uri: z.ZodString;
}, z.core.$loose>;
/**
 * Identifies a prompt.
 */
export declare const PromptReferenceSchema: z.ZodObject<{
    type: z.ZodLiteral<"ref/prompt">;
    name: z.ZodString;
}, z.core.$loose>;
/**
 * A request from the client to the server, to ask for completion options.
 */
export declare const CompleteRequestSchema: z.ZodObject<{
    method: z.ZodLiteral<"completion/complete">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        ref: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"ref/prompt">;
            name: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"ref/resource">;
            uri: z.ZodString;
        }, z.core.$loose>]>;
        argument: z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$loose>;
        context: z.ZodOptional<z.ZodObject<{
            arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>>;
    }, z.core.$loose>;
}, z.core.$strip>;
/**
 * The server's response to a completion/complete request
 */
export declare const CompleteResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    completion: z.ZodObject<{
        values: z.ZodArray<z.ZodString>;
        total: z.ZodOptional<z.ZodNumber>;
        hasMore: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>;
}, z.core.$loose>;
/**
 * Represents a root directory or file that the server can operate on.
 */
export declare const RootSchema: z.ZodObject<{
    uri: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Sent from the server to request a list of root URIs from the client.
 */
export declare const ListRootsRequestSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"roots/list">;
}, z.core.$strip>;
/**
 * The client's response to a roots/list request from the server.
 */
export declare const ListRootsResultSchema: z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    roots: z.ZodArray<z.ZodObject<{
        uri: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * A notification from the client to the server, informing it that the list of roots has changed.
 */
export declare const RootsListChangedNotificationSchema: z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/roots/list_changed">;
}, z.core.$strip>;
export declare const ClientRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"ping">;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"initialize">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        protocolVersion: z.ZodString;
        capabilities: z.ZodObject<{
            experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            sampling: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            elicitation: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            roots: z.ZodOptional<z.ZodObject<{
                listChanged: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$loose>>;
        }, z.core.$loose>;
        clientInfo: z.ZodObject<{
            name: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            version: z.ZodString;
        }, z.core.$loose>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"completion/complete">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        ref: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"ref/prompt">;
            name: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"ref/resource">;
            uri: z.ZodString;
        }, z.core.$loose>]>;
        argument: z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, z.core.$loose>;
        context: z.ZodOptional<z.ZodObject<{
            arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"logging/setLevel">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        level: z.ZodEnum<{
            error: "error";
            debug: "debug";
            info: "info";
            notice: "notice";
            warning: "warning";
            critical: "critical";
            alert: "alert";
            emergency: "emergency";
        }>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"prompts/get">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"prompts/list">;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"resources/list">;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"resources/templates/list">;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"resources/read">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"resources/subscribe">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"resources/unsubscribe">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"tools/call">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"tools/list">;
}, z.core.$strip>]>;
export declare const ClientNotificationSchema: z.ZodUnion<readonly [z.ZodObject<{
    method: z.ZodLiteral<"notifications/cancelled">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        requestId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"notifications/progress">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        progressToken: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        progress: z.ZodNumber;
        total: z.ZodOptional<z.ZodNumber>;
        message: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/initialized">;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/roots/list_changed">;
}, z.core.$strip>]>;
export declare const ClientResultSchema: z.ZodUnion<readonly [z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$strict>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    model: z.ZodString;
    stopReason: z.ZodOptional<z.ZodUnion<[z.ZodEnum<{
        maxTokens: "maxTokens";
        endTurn: "endTurn";
        stopSequence: "stopSequence";
    }>, z.ZodString]>>;
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    action: z.ZodEnum<{
        accept: "accept";
        decline: "decline";
        cancel: "cancel";
    }>;
    content: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    roots: z.ZodArray<z.ZodObject<{
        uri: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>]>;
export declare const ServerRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"ping">;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"sampling/createMessage">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        messages: z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<{
                user: "user";
                assistant: "assistant";
            }>;
            content: z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"text">;
                /**
                 * The text content of the message.
                 */
                text: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"image">;
                /**
                 * The base64-encoded image data.
                 */
                data: z.ZodString;
                /**
                 * The MIME type of the image. Different providers may support different image types.
                 */
                mimeType: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"audio">;
                /**
                 * The base64-encoded audio data.
                 */
                data: z.ZodString;
                /**
                 * The MIME type of the audio. Different providers may support different audio types.
                 */
                mimeType: z.ZodString;
                /**
                 * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
                 * for notes on _meta usage.
                 */
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            }, z.core.$loose>]>;
        }, z.core.$loose>>;
        systemPrompt: z.ZodOptional<z.ZodString>;
        includeContext: z.ZodOptional<z.ZodEnum<{
            none: "none";
            thisServer: "thisServer";
            allServers: "allServers";
        }>>;
        temperature: z.ZodOptional<z.ZodNumber>;
        maxTokens: z.ZodNumber;
        stopSequences: z.ZodOptional<z.ZodArray<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        modelPreferences: z.ZodOptional<z.ZodObject<{
            /**
             * Optional hints to use for model selection. If multiple models are supported, the client MAY choose how to prioritize these hints to pick a model.
             */
            hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * A hint for a model name.
                 */
                name: z.ZodOptional<z.ZodString>;
            }, z.core.$loose>>>;
            /**
             * A hint for the model's cost priority. 0 = highest cost, 1 = lowest cost. The client MAY use this to decide which model to use.
             */
            costPriority: z.ZodOptional<z.ZodNumber>;
            /**
             * A hint for the model's speed priority. 0 = slowest, 1 = fastest. The client MAY use this to decide which model to use.
             */
            speedPriority: z.ZodOptional<z.ZodNumber>;
            /**
             * A hint for the model's intelligence priority. 0 = least intelligent, 1 = most intelligent. The client MAY use this to decide which model to use.
             */
            intelligencePriority: z.ZodOptional<z.ZodNumber>;
        }, z.core.$loose>>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"elicitation/create">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        message: z.ZodString;
        requestedSchema: z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"string">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
            }, z.core.$loose>, z.ZodObject<{
                type: z.ZodLiteral<"string">;
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodArray<z.ZodString>;
                enumNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$loose>]>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$loose>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            /**
             * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
             */
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        }, z.core.$loose>>;
        cursor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"roots/list">;
}, z.core.$strip>]>;
export declare const ServerNotificationSchema: z.ZodUnion<readonly [z.ZodObject<{
    method: z.ZodLiteral<"notifications/cancelled">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        requestId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"notifications/progress">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        progressToken: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        progress: z.ZodNumber;
        total: z.ZodOptional<z.ZodNumber>;
        message: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"notifications/message">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        level: z.ZodEnum<{
            error: "error";
            debug: "debug";
            info: "info";
            notice: "notice";
            warning: "warning";
            critical: "critical";
            alert: "alert";
            emergency: "emergency";
        }>;
        logger: z.ZodOptional<z.ZodString>;
        data: z.ZodUnknown;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"notifications/resources/updated">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/resources/list_changed">;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/tools/list_changed">;
}, z.core.$strip>, z.ZodObject<{
    params: z.ZodOptional<z.ZodObject<{
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
    method: z.ZodLiteral<"notifications/prompts/list_changed">;
}, z.core.$strip>]>;
export declare const ServerResultSchema: z.ZodUnion<readonly [z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$strict>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    protocolVersion: z.ZodString;
    capabilities: z.ZodObject<{
        experimental: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        logging: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        completions: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        prompts: z.ZodOptional<z.ZodObject<{
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        resources: z.ZodOptional<z.ZodObject<{
            subscribe: z.ZodOptional<z.ZodBoolean>;
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        tools: z.ZodOptional<z.ZodObject<{
            listChanged: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
    }, z.core.$loose>;
    serverInfo: z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        version: z.ZodString;
    }, z.core.$loose>;
    instructions: z.ZodOptional<z.ZodString>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    completion: z.ZodObject<{
        values: z.ZodArray<z.ZodString>;
        total: z.ZodOptional<z.ZodNumber>;
        hasMore: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    description: z.ZodOptional<z.ZodString>;
    messages: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<{
            user: "user";
            assistant: "assistant";
        }>;
        content: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"text">;
            /**
             * The text content of the message.
             */
            text: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"image">;
            /**
             * The base64-encoded image data.
             */
            data: z.ZodString;
            /**
             * The MIME type of the image. Different providers may support different image types.
             */
            mimeType: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"audio">;
            /**
             * The base64-encoded audio data.
             */
            data: z.ZodString;
            /**
             * The MIME type of the audio. Different providers may support different audio types.
             */
            mimeType: z.ZodString;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>, z.ZodObject<{
            name: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            uri: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            type: z.ZodLiteral<"resource_link">;
        }, z.core.$loose>, z.ZodObject<{
            type: z.ZodLiteral<"resource">;
            resource: z.ZodUnion<readonly [z.ZodObject<{
                uri: z.ZodString;
                mimeType: z.ZodOptional<z.ZodString>;
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
                text: z.ZodString;
            }, z.core.$loose>, z.ZodObject<{
                uri: z.ZodString;
                mimeType: z.ZodOptional<z.ZodString>;
                _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
                blob: z.ZodString;
            }, z.core.$loose>]>;
            /**
             * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
             * for notes on _meta usage.
             */
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        }, z.core.$loose>]>;
    }, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    prompts: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * The name of the argument.
             */
            name: z.ZodString;
            /**
             * A human-readable description of the argument.
             */
            description: z.ZodOptional<z.ZodString>;
            /**
             * Whether this argument is required.
             */
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    resources: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    resourceTemplates: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uriTemplate: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    contents: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        text: z.ZodString;
    }, z.core.$loose>, z.ZodObject<{
        uri: z.ZodString;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        blob: z.ZodString;
    }, z.core.$loose>]>>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    content: z.ZodDefault<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        /**
         * The text content of the message.
         */
        text: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"image">;
        /**
         * The base64-encoded image data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the image. Different providers may support different image types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"audio">;
        /**
         * The base64-encoded audio data.
         */
        data: z.ZodString;
        /**
         * The MIME type of the audio. Different providers may support different audio types.
         */
        mimeType: z.ZodString;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>, z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        uri: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
        type: z.ZodLiteral<"resource_link">;
    }, z.core.$loose>, z.ZodObject<{
        type: z.ZodLiteral<"resource">;
        resource: z.ZodUnion<readonly [z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            text: z.ZodString;
        }, z.core.$loose>, z.ZodObject<{
            uri: z.ZodString;
            mimeType: z.ZodOptional<z.ZodString>;
            _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            blob: z.ZodString;
        }, z.core.$loose>]>;
        /**
         * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
         * for notes on _meta usage.
         */
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>]>>>;
    structuredContent: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    isError: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>, z.ZodObject<{
    _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodString>;
    tools: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        inputSchema: z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>;
        outputSchema: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"object">;
            properties: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$loose>>;
        annotations: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            readOnlyHint: z.ZodOptional<z.ZodBoolean>;
            destructiveHint: z.ZodOptional<z.ZodBoolean>;
            idempotentHint: z.ZodOptional<z.ZodBoolean>;
            openWorldHint: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$loose>>;
        _meta: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    }, z.core.$loose>>;
}, z.core.$loose>]>;
export declare class McpError extends Error {
    readonly code: number;
    readonly data?: unknown | undefined;
    constructor(code: number, message: string, data?: unknown | undefined);
}
/**
 * Headers that are compatible with both Node.js and the browser.
 */
export type IsomorphicHeaders = Record<string, string | string[] | undefined>;
/**
 * Information about the incoming request.
 */
export interface RequestInfo {
    /**
     * The headers of the request.
     */
    headers: IsomorphicHeaders;
}
/**
 * Extra information about a message.
 */
export interface MessageExtraInfo {
    /**
     * The request information.
     */
    requestInfo?: RequestInfo;
    /**
     * The authentication information.
     */
    authInfo?: AuthInfo;
}
export type ProgressToken = z.infer<typeof ProgressTokenSchema>;
export type Cursor = z.infer<typeof CursorSchema>;
export type Request = z.infer<typeof RequestSchema>;
export type RequestMeta = z.infer<typeof RequestMetaSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type Result = z.infer<typeof ResultSchema>;
export type RequestId = z.infer<typeof RequestIdSchema>;
export type JSONRPCRequest = z.infer<typeof JSONRPCRequestSchema>;
export type JSONRPCNotification = z.infer<typeof JSONRPCNotificationSchema>;
export type JSONRPCResponse = z.infer<typeof JSONRPCResponseSchema>;
export type JSONRPCError = z.infer<typeof JSONRPCErrorSchema>;
export type JSONRPCMessage = z.infer<typeof JSONRPCMessageSchema>;
export type EmptyResult = z.infer<typeof EmptyResultSchema>;
export type CancelledNotification = z.infer<typeof CancelledNotificationSchema>;
export type BaseMetadata = z.infer<typeof BaseMetadataSchema>;
export type Implementation = z.infer<typeof ImplementationSchema>;
export type ClientCapabilities = z.infer<typeof ClientCapabilitiesSchema>;
export type InitializeRequest = z.infer<typeof InitializeRequestSchema>;
export type ServerCapabilities = z.infer<typeof ServerCapabilitiesSchema>;
export type InitializeResult = z.infer<typeof InitializeResultSchema>;
export type InitializedNotification = z.infer<typeof InitializedNotificationSchema>;
export type PingRequest = z.infer<typeof PingRequestSchema>;
export type Progress = z.infer<typeof ProgressSchema>;
export type ProgressNotification = z.infer<typeof ProgressNotificationSchema>;
export type PaginatedRequest = z.infer<typeof PaginatedRequestSchema>;
export type PaginatedResult = z.infer<typeof PaginatedResultSchema>;
export type ResourceContents = z.infer<typeof ResourceContentsSchema>;
export type TextResourceContents = z.infer<typeof TextResourceContentsSchema>;
export type BlobResourceContents = z.infer<typeof BlobResourceContentsSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type ResourceTemplate = z.infer<typeof ResourceTemplateSchema>;
export type ListResourcesRequest = z.infer<typeof ListResourcesRequestSchema>;
export type ListResourcesResult = z.infer<typeof ListResourcesResultSchema>;
export type ListResourceTemplatesRequest = z.infer<typeof ListResourceTemplatesRequestSchema>;
export type ListResourceTemplatesResult = z.infer<typeof ListResourceTemplatesResultSchema>;
export type ReadResourceRequest = z.infer<typeof ReadResourceRequestSchema>;
export type ReadResourceResult = z.infer<typeof ReadResourceResultSchema>;
export type ResourceListChangedNotification = z.infer<typeof ResourceListChangedNotificationSchema>;
export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;
export type UnsubscribeRequest = z.infer<typeof UnsubscribeRequestSchema>;
export type ResourceUpdatedNotification = z.infer<typeof ResourceUpdatedNotificationSchema>;
export type PromptArgument = z.infer<typeof PromptArgumentSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type ListPromptsRequest = z.infer<typeof ListPromptsRequestSchema>;
export type ListPromptsResult = z.infer<typeof ListPromptsResultSchema>;
export type GetPromptRequest = z.infer<typeof GetPromptRequestSchema>;
export type TextContent = z.infer<typeof TextContentSchema>;
export type ImageContent = z.infer<typeof ImageContentSchema>;
export type AudioContent = z.infer<typeof AudioContentSchema>;
export type EmbeddedResource = z.infer<typeof EmbeddedResourceSchema>;
export type ResourceLink = z.infer<typeof ResourceLinkSchema>;
export type ContentBlock = z.infer<typeof ContentBlockSchema>;
export type PromptMessage = z.infer<typeof PromptMessageSchema>;
export type GetPromptResult = z.infer<typeof GetPromptResultSchema>;
export type PromptListChangedNotification = z.infer<typeof PromptListChangedNotificationSchema>;
export type ToolAnnotations = z.infer<typeof ToolAnnotationsSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type ListToolsRequest = z.infer<typeof ListToolsRequestSchema>;
export type ListToolsResult = z.infer<typeof ListToolsResultSchema>;
export type CallToolResult = z.infer<typeof CallToolResultSchema>;
export type CompatibilityCallToolResult = z.infer<typeof CompatibilityCallToolResultSchema>;
export type CallToolRequest = z.infer<typeof CallToolRequestSchema>;
export type ToolListChangedNotification = z.infer<typeof ToolListChangedNotificationSchema>;
export type LoggingLevel = z.infer<typeof LoggingLevelSchema>;
export type SetLevelRequest = z.infer<typeof SetLevelRequestSchema>;
export type LoggingMessageNotification = z.infer<typeof LoggingMessageNotificationSchema>;
export type SamplingMessage = z.infer<typeof SamplingMessageSchema>;
export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;
export type CreateMessageResult = z.infer<typeof CreateMessageResultSchema>;
export type BooleanSchema = z.infer<typeof BooleanSchemaSchema>;
export type StringSchema = z.infer<typeof StringSchemaSchema>;
export type NumberSchema = z.infer<typeof NumberSchemaSchema>;
export type EnumSchema = z.infer<typeof EnumSchemaSchema>;
export type PrimitiveSchemaDefinition = z.infer<typeof PrimitiveSchemaDefinitionSchema>;
export type ElicitRequest = z.infer<typeof ElicitRequestSchema>;
export type ElicitResult = z.infer<typeof ElicitResultSchema>;
export type ResourceTemplateReference = z.infer<typeof ResourceTemplateReferenceSchema>;
/**
 * @deprecated Use ResourceTemplateReference instead
 */
export type ResourceReference = ResourceTemplateReference;
export type PromptReference = z.infer<typeof PromptReferenceSchema>;
export type CompleteRequest = z.infer<typeof CompleteRequestSchema>;
export type CompleteResult = z.infer<typeof CompleteResultSchema>;
export type Root = z.infer<typeof RootSchema>;
export type ListRootsRequest = z.infer<typeof ListRootsRequestSchema>;
export type ListRootsResult = z.infer<typeof ListRootsResultSchema>;
export type RootsListChangedNotification = z.infer<typeof RootsListChangedNotificationSchema>;
export type ClientRequest = z.infer<typeof ClientRequestSchema>;
export type ClientNotification = z.infer<typeof ClientNotificationSchema>;
export type ClientResult = z.infer<typeof ClientResultSchema>;
export type ServerRequest = z.infer<typeof ServerRequestSchema>;
export type ServerNotification = z.infer<typeof ServerNotificationSchema>;
export type ServerResult = z.infer<typeof ServerResultSchema>;
export {};
//# sourceMappingURL=types.d.ts.map