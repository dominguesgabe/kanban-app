import { Controller } from '@nestjs/common';
import { ColumnItemsService } from '../services/column-item.service';

@Controller('column-items')
export class ColumnItemsController {
  constructor(private columnItemsService: ColumnItemsService) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // async create(
  //   @Body() createBoardColumnDTO: BoardColumnDTO,
  // ): Promise<BoardColumn> {
  //   return this.columnItemsService.create(createBoardColumnDTO);
  // }

  // @UseGuards(AuthGuard)
  // @Get(':boardId')
  // async findAll(@Param() boardId: { boardId: number }): Promise<BoardColumn[]> {
  //   return this.columnItemsService.findAll(boardId);
  // }

  // @UseGuards(AuthGuard)
  // @Patch(':id')
  // update(
  //   @Param() id: number,
  //   @Body() updateBoardColumnDTO: UpdateBoardColumnDTO,
  // ): Promise<BoardColumn> {
  //   return this.columnItemsService.update(id, updateBoardColumnDTO);
  // }

  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // delete(@Param() { id }: { id: number }): Promise<void> {
  //   return this.columnItemsService.delete(id);
  // }
}
