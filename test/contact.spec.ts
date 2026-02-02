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
        .set('Authorization', 'test123')
        .send({
          first_name: 'Zheeva',
          last_name: 'Azizah',
          email: 'yera@example.com',
          phone: '101010',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('Zheeva');
      expect(response.body.data.last_name).toBe('Azizah');
      expect(response.body.data.email).toBe('yera@example.com');
      expect(response.body.data.phone).toBe('101010');
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

  describe('GET /api/contact', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be able to search contacts', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contact`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search by name', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          name: 'Yves',
        })
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });
    it('should be able to search by name not found ', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          name: 'wrong',
        })
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search by email', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          email: 'test',
        })
        .set('Authorization', 'test');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search by email not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          email: 'test',
        })
        .set('Authorization', 'test');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search by phone', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          phone: '12345678',
        })
        .set('Authorization', 'test');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });
    it('should be able to search by phone not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          phone: '0989',
        })
        .set('Authorization', 'test');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search by page', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/contact')
        .query({
          size: 1,
          page: 2,
        })
        .set('Authorization', 'test');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.size).toBe(1);
      expect(response.body.paging.total_page).toBe(1);
    });
  });
});
