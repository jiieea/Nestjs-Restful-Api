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
        .set('Authorization', 'atmin')
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
        .set('Authorization', 'atmin')
        .send({
          first_name: 'Yves',
          last_name: 'Castillon',
          email: 'yves@example.com',
          phone: '090987',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('Yves');
      expect(response.body.data.last_name).toBe('Castillon');
      expect(response.body.data.email).toBe('yves@example.com');
      expect(response.body.data.phone).toBe('090987');
    });
  });

  describe('GET /api/contact/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id + 1}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be get contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('Yves');
      expect(response.body.data.last_name).toBe('Castilon');
      expect(response.body.data.email).toBe('yves@example.com');
      expect(response.body.data.phone).toBe('0909');
    });
  });

  describe('PUT /api/contact/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if request is not valid', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contact.id}`)
        .set('Authorization', 'atmin')
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

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contact.id + 1}`)
        .set('Authorization', 'atmin')
        .send({
          first_name: 'Yves',
          last_name: 'Castillon',
          email: 'yves@example.com',
          phone: '090987',
        });
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be update contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contact.id}`)
        .set('Authorization', 'atmin')
        .send({
          first_name: 'Vermilion',
          last_name: 'Castillon',
          email: 'castilon@example.com',
          phone: '123123',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('Vermilion');
      expect(response.body.data.last_name).toBe('Castillon');
      expect(response.body.data.email).toBe('castilon@example.com');
      expect(response.body.data.phone).toBe('123123');
    });
  });

  describe('DELETE /api/contact/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if request is not valid', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .delete(`/api/contact/${contact.id + 1}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .delete(`/api/contact/${contact.id + 1}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be delete contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .delete(`/api/contact/${contact.id}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });
});
