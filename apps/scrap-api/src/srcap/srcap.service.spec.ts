import { Test, TestingModule } from '@nestjs/testing';
import { SrcapService } from './srcap.service';

describe('SrcapService', () => {
  let service: SrcapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SrcapService],
    }).compile();

    service = module.get<SrcapService>(SrcapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
