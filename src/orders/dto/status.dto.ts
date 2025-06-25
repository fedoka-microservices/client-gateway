import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../enum/order.enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatus, { message: `Valid statuses are ${Object.values(OrderStatus).join(', ')}` })
    status: OrderStatus;
}