import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ContactController', () => {
  let app: INestApplication<App>;
  let logger: Logger;
  let testService: TestService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/contact', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.createUser();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if request is not valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contact')
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'invalid format',
          phone: '',
        });
      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be create contact', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contact')
        .set('Authorization', 'test')
        .send({
          first_name: 'Jieyra',
          last_name: 'De Chattilon',
          email: 'test@example.com',
          phone: '12345678',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('Jieyra');
      expect(response.body.data.last_name).toBe('De Chattilon');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('12345678');
    });
  });
});
