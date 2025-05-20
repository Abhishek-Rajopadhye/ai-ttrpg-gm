# routes/location.py
from fastapi import APIRouter, Depends, HTTPException
from app.services.location_service import get_location, get_locations_in_world, get_location_of_character, get_locations_by_user, get_locations_in_campaign, create_location, update_location, delete_location
from app.db.location import Location, LocationCreate

router = APIRouter()


@router.get("/{location_id}", response_model=Location)
def read_location(location_id: str):
    location = get_location(location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.get("/worlds/{world_id}/locations")
def read_locations_in_world(world_id: str):
    locations = get_locations_in_world(world_id)
    return locations


@router.get("/characters/{character_id}/location")
def read_location_of_character(character_id: str):
    location_id = get_location_of_character(character_id)
    if location_id:
        location = get_location(location_id)
        if location is None:
            raise HTTPException(status_code=404, detail="Location not found")
        return location
    raise HTTPException(status_code=404, detail="Location not found")


@router.get("/users/{user_id}/locations")
def read_locations_by_user(user_id: str):
    locations = get_locations_by_user(user_id)
    return locations


@router.get("/campaigns/{campaign_id}/locations")
def read_locations_in_campaign(campaign_id: str):
    locations = get_locations_in_campaign(campaign_id)
    if locations is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return locations


@router.post("/", response_model=str)
def create_location(location: LocationCreate):
    location_id = create_location(location)
    return location_id


@router.put("/{location_id}", response_model=Location)
def update_location(location_id: str, location: Location):
    updated_location = update_location(location_id, location)
    if updated_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return updated_location


@router.delete("/{location_id}")
def delete_location(location_id: str):
    deleted = delete_location(location_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"message": "Location deleted"}
