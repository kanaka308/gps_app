let CURRENT_LOCATION = null
let A = null
let B = null
function main(){
    let geolocation = null
    if(window.navigator && window.navigator.geolocation){
        geolocation = window.navigator.geolocation
    }
    if(geolocation){
        geolocation.watchPosition(onLocaationUpdate, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000
        })
    }else{
        alert("Can't access Location, Please allow Location")
    }
}

function onLocaationUpdate(event){
    CURRENT_LOCATION = event.coords
    console.log(event);
}
function onError(err){
    alert("Cannot access location: " + err)
    document.getElementById("loc").innerHTML = "Your Location <br/> <span class='locFont'> Lat: "+ CURRENT_LOCATION.latitude.toFixed(4)+"<br/>Lon: "+CURRENT_LOCATION.longitude.toFixed(4) +"</span>"
}

function setA(){
    A = CURRENT_LOCATION
    updateInfo()
}

function setB(){
    B = CURRENT_LOCATION
    updateInfo()
}
function updateInfo(){
    if(A!=null){
        document.getElementById("aBtn").innerHTML = A.latitude + "<br/>"+A.longitude
        document.getElementById("aBtn").classList.add("locFont")
    }
    if(B!=null){
        document.getElementById("bBtn").innerHTML = B.latitude + "<br/>"+B.longitude
        document.getElementById("bBtn").classList.add("locFont")
    }
    if(A!=null && B!=null){
        let dist = getDistance(A,B)
        document.getElementById("info").innerHTML = "DISTANCE: <br>----------------------<br>"+dist.toFixed(3)+" meters"
    }
}

function latLonToXYZ(latlon, R){
    const xyz = {x:0, y:0, z:0}
    xyz.y = Math.sin(degToRoad(latlon.latitude))*R
    const r = Math.cos(degToRoad(latlon.latitude))*R
    xyz.x = Math.sin(degToRoad(latlon.longitude))*r
    xyz.z = Math.cos(degToRoad(latlon.longitude))*r
    return xyz
}
function degToRoad(degree){
    return degree * Math.PI/180
}

function getDistance(loc1, loc2){
    const R = 637100
    const xyz1 = latLonToXYZ(loc1, R)
    const xyz2 = latLonToXYZ(loc2, R)
    const eucl = euclidean(xyz1, xyz2)
    return eucl
}
function euclidean(p1, p2){
    return Math.sqrt(
        (p1.x-p2.x)*(p1.x-p2.x)+
        (p1.y-p2.y)*(p1.y-p2.y)+
        (p1.z-p2.z)*(p1.z-p2.z)
        )
}