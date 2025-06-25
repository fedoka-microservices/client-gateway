
export enum OrderStatus {
    CANCELLED = 'CANCELLED',
    PENDING = 'PENDING',
    PAID = 'PAID',
    CREDIT = 'CREDIT',
    REFUNDED = 'REFUNDED'
}

export const OrderStatusList = [
    OrderStatus.CANCELLED,
    OrderStatus.PENDING,
    OrderStatus.PAID,
    OrderStatus.CREDIT,
    OrderStatus.CANCELLED,
    OrderStatus.REFUNDED,
];