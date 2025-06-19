from typing import Any


def is_empty_or_none(value: Any, field: str):
    if not value:
        raise ValueError(f"{field} cannot be empty")
    return value


def is_invalid_latitude(lat: float):
    if not (-90 <= lat <= 90):
        raise ValueError(f"Latitude {lat} is out of bounds. Must be between -90 and 90.")
    return lat


def is_invalid_longitude(lng: float):
    if not (-180 <= lng <= 180):
        raise ValueError(f"Longitude {lng} is out of bounds. Must be between -180 and 180.")
    return lng
