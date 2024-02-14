let CANVAS
let ANGLE
let ANGLE_TO_REFERENCE_POINT = 0
function main(){
    CANVAS = document.getElementById("myCanvas")
    CANVAS.width = window.innerWidth
    CANVAS.height = window.innerHeight

    window.addEventListener("deviceorientation", onOrientationChange)
}


function onOrientationChange(event){
    ANGLE = event.alpha
    const offset = -Math.PI/2
    const fixedAngle = (ANGLE-ANGLE_TO_REFERENCE_POINT)*Math.PI/180+offset

    const distToReference = document.getElementById("mySlider").value;
    document.getElementById("myLabel").innerHTML = "Distance to reference: " + distToReference + " m"

    let distanceToTarget = Math.abs(Math.tan(fixedAngle-offset))*distToReference

    const rad = Math.min(CANVAS.width, CANVAS.height)*0.45
    const movingTip = {
        x: CANVAS.width/2 + Math.cos(fixedAngle)*rad,
        y: CANVAS.height/2 + Math.sin(fixedAngle)*rad
    }
    const ctx = CANVAS.getContext("2d")
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height)

    ctx.beginPath()
    ctx.fillStyle = "#47f"
    if(movingTip.y>CANVAS.height/2){
        ctx.fillStyle = "red"
        distanceToTarget=0
    }
    if(movingTip.x>CANVAS.width/2){
        ctx.arc(CANVAS.width/2, CANVAS.height/2, rad, offset, fixedAngle)
    }else{
        ctx.arc(CANVAS.width/2, CANVAS.height/2, rad, offset, fixedAngle, true)
    }
    
    ctx.lineTo(CANVAS.width/2, CANVAS.height/2)
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.moveTo(CANVAS.width/2, CANVAS.height/2)
    ctx.lineTo(CANVAS.width/2, CANVAS.height/2 - rad)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "#47f"
    ctx.moveTo(CANVAS.width/2, CANVAS.height/2)
    
    ctx.lineTo(movingTip.x, movingTip.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.font = "55px Aerial"
    ctx.textAlign = "center"
    ctx.fillText(distanceToTarget.toFixed(1) +" meters", CANVAS.width/2, CANVAS.height*0.7)
}

function reset(){
    ANGLE_TO_REFERENCE_POINT = ANGLE
}