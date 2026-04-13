**Q1 — Dead route diagnosis**

La respuesta es 404 Not Found, porque en NestJS, un método del controller solo existe como endpoint si tiene decorador (@Get, @Post, etc.), entonces, si findAll() no tiene @Get(), la ruta /tasks no está registrada en el router.Para solucionarlo, debes agregar explícitamente el decorador, por ejemplo @Get() encima del método.

---
**Q2 — When `transform: true` is not enough**

Aunque "transform: true" en el ValidationPipe convierte automáticamente los tipos (por ejemplo, de string a number), no reemplaza completamente a ParseIntPipe, ya que el transform se basa en los tipos del DTO y hace una conversión más general, mientras que ParseIntPipe no solo convierte sino que valida estrictamente que el valor sea un número válido y lanza un error si no lo es, por eso ambos no son exactamente iguales.

---
**Q3 — Silent strip vs hard rejection**

Si solo usamos whitelist: true, la petición será exitosa con estado 201 Created y el cuerpo incluirá únicamente los campos válidos (name, email, age), el campo "password" será eliminado silenciosamente antes de llegar al service, esto puede ser un problema de seguridad, porque el cliente no sabe que envió un dato inválido, lo que puede ocultar errores o intentos maliciosos, mientras que con forbidNonWhitelisted: true, lanza un error 400 indicando que ese campo no está permitido.

---
**Q4 — Mutation side-effect**

Sí, los datos internos del servicio se alteran si quien llama modifica el resultado de findAll(), esto ocurre, porque el método devuelve la referencia directa al arreglo interno (this.products), no una copia, en JavaScript, los objetos y arrays se pasan por referencia, por lo que cualquier modificación externa afecta el estado interno del servicio, para evitarlo, se debería devolver una copia, por ejemplo usando return this.products.map(p => ({ ...p })), lo que protege los datos originales.

---

**Q5 — The optional field trap**

En el primer caso ({ "price": -50 }), la validación falla, porque el campo está presente, así que @IsOptional() no aplica y se ejecutan las demás validaciones como @IsPositive() que falla. En el segundo caso ({}), la validación pasa correctamente porque el campo no está presente y @IsOptional() indica que en ese caso no se deben aplicar las demás validaciones, es decir, “opcional” en class-validator significa que si el campo no viene, se ignoran todas las validaciones asociadas.

---

**Q6 — ID reuse after deletion**

Con el uso de nextId, si eliminamos la tarea con id 1 y luego creas una nueva, esta obtendrá un nuevo ID (por ejemplo 3), evitando conflictos, por eso findOne(1) no devolvería datos incorrectos, sin embargo, si se usara this.tasks.length + 1, se podrían generar IDs duplicados. Por ejemplo, si tenemos [1,2,3], eliminamos el 2 y luego creamos uno nuevo, el length sería 2 y el nuevo ID sería 3, que ya existe, esto rompe la unicidad y puede causar errores en búsquedas.

---

**Q7 — Module forgotten**

El servidor inicia normalmente porque no hay errores de compilación ni de arranque, simplemente el módulo no está registrado, Sin embargo, al hacer POST /users, la respuesta será 404 Not Found, porque las rutas de ese módulo no existen en la aplicación. Esto se considera un error de ejecución (runtime), ya que el problema solo se manifiesta al intentar usar el endpoint.

---

**Q8 — Missing 201**

En NestJS un handler con @Post() devuelve por defecto el estado 201 Created, incluso si no se especifica @HttpCode(HttpStatus.CREATED), por lo tanto, no es funcionalmente incorrecto omitirlo. Un cliente normalmente no fallará por esto, pero en APIs más estrictas o con contratos bien definidos, sí puede ser importante especificar explícitamente el código para mantener consistencia.

---

**Q9 — Service throws, not returns null**

Si el servicio devolviera null, el controller tendría que encargarse de validar y lanzar la excepción manualmente cada vez, lo que duplicaría lógica en múltiples lugares, en cambio lanzar directamente una excepción como NotFoundException desde el servicio centraliza el manejo de errores y simplifica el código, especialmente cuando métodos como update o remove también dependen de findOne, por eso en aplicaciones más grandes, es mejor que el servicio lance la excepción en lugar de devolver null.
