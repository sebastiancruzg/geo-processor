from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from .model import Bound, Point, PointsRequest, Response

app = FastAPI()


@app.exception_handler(RequestValidationError)
async def handle_validation_error(request: Request, exc: RequestValidationError):
    return JSONResponse(
        content=jsonable_encoder({"detail": exc.errors()}), status_code=status.HTTP_400_BAD_REQUEST
    )


@app.post("/geo")
def process_geo_info(request_data: PointsRequest) -> Response:
    print("Received request data:", request_data)
    points = request_data.points
    lat_list = [point.lat for point in points]
    lng_list = [point.lng for point in points]

    centroid_lat = sum(lat_list) / len(list(points))
    centroid_lng = sum(lng_list) / len(list(points))
    limit = Bound(north=max(lat_list), south=min(lat_list), east=max(lng_list), west=min(lng_list))

    return Response(
        centroid=Point(lat=round(centroid_lat, 4), lng=round(centroid_lng, 4)), bounds=limit
    )
