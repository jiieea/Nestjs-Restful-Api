import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('AddressController', () => {
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

  describe('POST /api/contact/:contactId/addresses', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await app.close();
    });
    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .post(`/api/contact/${contact.id + 1}/addresses`)
        .set('Authorization', 'atmin')
        .send({
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        });
      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be create address', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .post(`/api/contact/${contact.id}/addresses`)
        .set('Authorization', 'atmin')
        .send({
          street: 'jl.tebet',
          city: 'kota tebet',
          province: 'provinsi jaksel',
          country: 'negara indo',
          postal_code: '101032',
        });
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.street).toBe('jl.tebet');
      expect(response.body.data.city).toBe('kota tebet');
      expect(response.body.data.province).toBe('provinsi jaksel');
      expect(response.body.data.country).toBe('negara indo');
      expect(response.body.data.postal_code).toBe('101032');
    });
  });

  describe('GET /api/contact/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });
    afterEach(async () => {
      await app.close();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id + 1}/addresses/${address.id}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if address is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id}/addresses/${address.id + 1}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });
    it('should be get addresses', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .get(`/api/contact/${contact.id}/addresses/${address.id}`)
        .set('Authorization', 'atmin');
      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.street).toBe('jl.tebet');
      expect(response.body.data.city).toBe('kota tebet');
      expect(response.body.data.province).toBe('provinsi jaksel');
      expect(response.body.data.country).toBe('negara indo');
      expect(response.body.data.postal_code).toBe('101032');
    });
  });
});
