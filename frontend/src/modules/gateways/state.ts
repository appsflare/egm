// -----------------
// STATE - This defines the type of data maintained in the Redux store for gateways.

export interface GatewaysState {
    isLoading: boolean;
    selectedGateway?: string;
    gateways: GatewayInfo[];
}

export interface GatewayInfo {
    _id: string;
    name: string;    
}
