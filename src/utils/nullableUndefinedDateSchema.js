const z = require('zod');

const nullableUndefinedDateSchema = z.union([
    z.string().refine(value => value === '', "Debe ser una cadena vacía").transform(() => undefined),
    z.null().transform(() => undefined),
    z.undefined(),
    z.string(),  // Accepts string representing a valid date
    z.coerce.date(), 
  ]);

  module.exports = { nullableUndefinedDateSchema }