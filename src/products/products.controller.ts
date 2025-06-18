import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductServiceClientTCP } from 'src/common/clients/product-client.tcp';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService:ProductServiceClientTCP
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto)
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.getAllProducts(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct({...updateProductDto, id} as UpdateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
