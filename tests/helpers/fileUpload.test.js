import {v2 as cloudinary} from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';


cloudinary.config({
  cloud_name: 'doilfq77p',
  api_key: '495148786141616',
  api_secret: 'TOYYMatmYFppUTo-zir6tY4kkEk',
  secure: true
});


describe('Tests for fileUpload', () => {

  test('should upload the file correctly to Cloudinary', async () => {
    const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'photo.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.api.delete_resources(['journal/' + imageId], {resource_type: 'image'});
  });

  test('should return null', async () => {
    const file = new File([], 'photo.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });

});