
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./OrderItem.dto";

export class CreateOrderDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true } )
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
}
