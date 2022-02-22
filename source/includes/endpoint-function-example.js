// This function is the endpoint's request handler.
// It has two arguments:
// - `request`: an object that represents the incoming HTTP request
// - `response`: an object that configures the response sent back to callers
exports = async function (request, response) {
  // 1. Parse the incoming request
  // Query params, e.g. '?arg1=hello&arg2=world' => { arg1: "hello", arg2: "world" }
  const { arg1, arg2 } = request.query;
  // Headers, e.g. { "Content-Type": ["application/json"] }
  const contentTypes = request.headers["Content-Type"];
  // Body (if provided in a POST, PUT, or PATCH) is a BSON.Binary object
  const bodyJson = JSON.parse(request.body.text());

  // 2. Run the endpoint logic
  // You might call an external service over HTTP...
  await context.http.post({
    url: "https://example.com",
    body: { msg: "This request could do anything you want!" },
    encodeBodyAsJSON: true,
  });
  // ...or run queries and store data in a linked MongoDB cluster
  await context.services
    .get("mongodb-atlas")
    .db("myDb")
    .collection("myCollection")
    .insertOne({ date: new Date(), requestBody: bodyJson });

  // 3. Configure the response
  // You can manually configure the response that's sent back to the caller...
  response.setStatusCode(200); // Set an HTTP Status code like "200 - OK"
  response.setBody(JSON.stringify({ ok: true })); // Return a custom response payload
  response.addHeader("Content-Type", "application/json"); // Modify the response headers

  // ...or just return a value and use the default response configuration.
  // If you manually configure the `response` object, then the return value does nothing.
  return { ok: true };
};
