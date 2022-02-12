const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const api = supertest(app);

afterAll(() => {
  mongoose.connection.close();
});

describe("GET", () => {
  test.skip("get mascotas", async () => {
    await api
      .get("/mascotas")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test.skip("if no existen mascotas", async () => {
    await api
      .get("/mascotas")
      .expect(410)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect('{"message":"aun no existen mascotas"}');
  });

  test.skip("get one mascota", async () => {
    const result = await api
      .get("/mascotas/62052c80a81dbec0cb057d16")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
      expect(result.body.value._id).toBe("62052c80a81dbec0cb057d16");
  });

  test.skip("if url incorreta", async () => {
    await api.get("/mascot").expect(404);
  });
});

describe("POST", () => {
  test.skip("if name of mascota is existing", async () => {
    await api
      .post("/mascotas")
      .send({
        especie: "gato",
        raza: "chiwawa",
        nombre: "toby",
      })
      .expect(406)
      .expect('{"mesaage":"el nombre de esta mascota ya existe"}');
  });

  test.skip("if data no is completed", async () => {
    await api
      .post("/mascotas")
      .send({
        raza: "chiwawa",
        nombre: "toby",
      })
      .expect(409)
      .expect(
        '{"message":"data incompleta, asegurese de haber enviado los campos obligatorios"}'
      );
  });

  test.skip("created", async () => {
    const result = await api
      .post("/mascotas")
      .send({
        especie: "perro",
        raza: "pitbull",
        nombre: "capi",
      })
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8");
    expect(result.body.especie).toBe("perro");
  });
});

describe("DELETE", () => {
  test.skip("delete one mascota", async () => {
    const result = await api
      .delete("/mascotas/62052c80a81dbec0cb057d16")
      .expect(200);
    expect(result.body._id).toBe("62052c80a81dbec0cb057d16");
  });

  test.skip("delete all mascotas", async () => {
    const result = await api.delete("/mascotas").expect(204)
    .expect("Content-Type", "application/json; charset=utf-8");
  });
});

describe("PUT", () => {
  test.skip("update one mascota", async () => {
    const result = await api
      .put("/mascotas/62048796507936396dd2ded8")
      .send({ especie: "gato", raza: "miaww", nombre: "luna" })
      .expect(200);
    expect(result.body.value._id).toBe("62048796507936396dd2ded8");
  });
});
