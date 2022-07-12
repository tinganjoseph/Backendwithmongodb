///explanation to the server.js

Let me explain what we’ve just done:
– import express, cookie-session and cors modules:

Express is for building the Rest apis
cookie-session helps to stores the session data on the client within a cookie without requiring any database/resources on the server side
cors provides Express middleware to enable CORS
– create an Express app, then add request parsing, cookie-based session middleware and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
– define a GET route which is simple for test.
– listen on port 8080 for incoming requests.

Let’s talk about following code:
app.use(
  cookieSession({
    name: "tingan-session",
    // keys: ['key1', 'key2'], 
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
keys: sign & verify cookie values. Set cookies are always signed with keys[0], while the other keys are valid for verification, allowing for key rotation.
secret: we don’t provide keys, so we use this as single key. In practice, you must provide value as secret environment variable (.env file for example) for security.
httpOnly: indicate that the cookie is only to be sent over HTTP(S), and not made available to client JavaScript.
Now let’s run the app with command: 
node server.js.