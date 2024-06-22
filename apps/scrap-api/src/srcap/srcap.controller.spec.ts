import { Test, TestingModule } from '@nestjs/testing';
import { SrcapController } from './srcap.controller';
import { SrcapService } from './srcap.service';

describe('SrcapController', () => {
  let controller: SrcapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrcapController],
      providers: [SrcapService],
    }).compile();

    controller = module.get<SrcapController>(SrcapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
