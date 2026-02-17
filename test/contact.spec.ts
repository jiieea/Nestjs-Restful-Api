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
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/contact', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if request is not valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contact')
        .set('Authorization', '2020434')
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
        .set('Authorization', '2020434')
        .send({
          first_name: 'sample',
          last_name: 'test',
          email: 'sample@example.com',
          phone: '1111',
          username: 'TestUser',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('sample');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('sample@example.com');
      expect(response.body.data.phone).toBe('1111');
    });
  });

  describe('GET /api/contact/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
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
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be get contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id}`)
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('sample');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('sample@example.com');
      expect(response.body.data.phone).toBe('1111');
    });
  });

  describe('PUT /api/contact/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createContact();
    });
    it('should be rejected if request is not valid', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contact.id}`)
        .set('Authorization', '2020434')
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
        .set('Authorization', '2020434')
        .send({
          first_name: 'sample',
          last_name: 'test',
          email: 'sample@example.com',
          phone: '1111',
          username: 'TestUser',
        });
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be update contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contact.id}`)
        .set('Authorization', '2020434')
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
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
    });
    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .delete(`/api/contact/${contact.id + 1}`)
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be delete contact', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .delete(`/api/contact/${contact.id}`)
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  describe('GET /api/contact', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createContact();
    });

    it('should be able to search contacts', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contact`)
        .set('Authorization', '5e702da3-f5a3-4d2a-98ff-a6cf23bcf8aa');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search with params', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          search: 'sample',
        })
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });
    it('should be able return empty if there is no data ', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          search: 'wrong',
        })
        .set('Authorization', '202434');
      logger.info(response.body);
      expect(response.status).toBe(400);
    });

    it('should be able to search by page', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          size: 1,
          page: 2,
        })
        .set('Authorization', '2020434');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.size).toBe(1);
      expect(response.body.paging.total_page).toBe(1);
    });
  });
});
