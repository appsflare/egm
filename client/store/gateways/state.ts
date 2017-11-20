// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GatewaysState {
    isLoading: boolean;
    gateways: GatewayInfo[];
}

export interface GatewayInfo {
    name: string;
    adminApi: string;
}