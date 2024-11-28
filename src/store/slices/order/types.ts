export enum OrderType {
  ride = 'ride',
  delivery = 'delivery',
}
export enum VehicleType {
  car = 'car',
  keke = 'keke',
  bike = 'bike',
}

export type Vehicle = {
  capacity: number;
  type: VehicleType;
};

export type Rider = {
  riderId: string;
  location: {coords: {latitude: number; longitude: number}; address: string};
  vehicle: Vehicle;
  photo: string;
  lastName: string;
  firstName: string;
};

export enum OrderPhase {
  creation = 'creation',
  awaitingResponse = 'awaiting-response',
  awaitingRide = 'awaiting-ride',
  enroute = 'enroute',
  complete = 'complete',
  accepted = 'accepted',
  nil = 'nil',
}

export interface RideOrderRequest {
  type: OrderType;
  orderId: string;
  origin: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  destination: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  fare?: number;
  ride_specific_prop: string;
}
export interface RideOrderResponse {
  availableRiders: Rider[];
}

export interface DeliveryOrderRequest {
  type: OrderType;
  orderId: string;
  origin: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  destination: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  delivery_specific_prop: string;
}
export interface DeliveryOrderResponse {
  availableRiders: Rider[];
}

export type OrderRequest = RideOrderRequest | DeliveryOrderRequest;

export type OrderResponse = RideOrderResponse | DeliveryOrderResponse;

export type OrderState = {
  orderRequest: OrderRequest | null;
  orderResponse: OrderResponse | null;
  orderPhase: OrderPhase;
  riderInfo: Rider | null;
};
