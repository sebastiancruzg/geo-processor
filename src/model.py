from typing import Annotated

from pydantic import AfterValidator, BaseModel

from .utils import is_empty_or_none, is_invalid_latitude, is_invalid_longitude


class Point(BaseModel):
    lat: Annotated[float, AfterValidator(is_invalid_latitude)]
    lng: Annotated[float, AfterValidator(is_invalid_longitude)]


class PointsRequest(BaseModel):
    points: Annotated[list[Point], AfterValidator(lambda v: is_empty_or_none(v, "points"))]


class Bound(BaseModel):
    north: float
    south: float
    east: float
    west: float


class Response(BaseModel):
    centroid: Point
    bounds: Bound
