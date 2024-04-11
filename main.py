import sanic
from sanic import response

app = sanic.Sanic("BenchCalendar")

@app.get("/")
async def route_index(req: sanic.Request):
    return response.text("Hello, World!")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8190)
