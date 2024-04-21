const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const payload = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  const { launchDate, ...payloadWithoutDate } = { ...payload };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(payload)
      .expect(201);

    const launchDateReq = new Date(launchDate).valueOf();
    const responseLaunchDate = new Date(response.body.launchDate).valueOf();

    expect(response.body).toMatchObject(payloadWithoutDate);
    expect(responseLaunchDate).toBe(launchDateReq);
  });

  test("It should catch missing required proprieties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(payloadWithoutDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch request",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({ ...payloadWithoutDate, launchDate: "zoot" })
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
