import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsPositive, IsString, Min } from "class-validator";

export enum UnitType {
  PIEZA = 'pieza',
  JUEGO = 'juego',
  LITRO = 'litro',
  GARRAFA = 'garrafa',
  BOTE = 'bote',
  CENTIMETRO = 'centimetro',
}

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({maxDecimalPlaces: 4})
  @IsPositive()
  @Min(0)
  @Type(()=> Number)
  public price: number;

  @IsPositive()
  @Min(0)
  @Type(()=> Number)
  public stock: number;

  @IsString()
  public sku: string;

  @IsString()
  public brand: string;

  @IsString()
  public barCode:string;
  

  @IsPositive()
  @Type(()=> Number)
  public supplierId: number;

  @IsEnum(UnitType)
  public unit:UnitType;

  
  @IsNumber({maxDecimalPlaces: 4})
  @IsPositive()
  @Min(0)
  @Type(()=> Number)
  public cost: number;
}
