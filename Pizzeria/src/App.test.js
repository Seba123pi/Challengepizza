import Ajv from 'ajv';
import schema from './example-pizzas.json';
import pizzas from './example-pizzas.json';

describe('Pizza data validation', () => {
  test('each pizza data is valid', () => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    pizzas.forEach((pizza, index) => {
      const valid = validate(pizza);
      expect(valid).toBeTruthy();
    });
  });
});

