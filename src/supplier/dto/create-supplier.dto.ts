import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsEmail()
    public email?: string;

    @IsNumberString()
    public phone?: string;

    @IsString()
    public address?: string;

    @IsString()
    @Length(12)
    public rfc?: string;
}
