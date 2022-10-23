function pointCircle( px, py, cx, cy, r){
    let distX = px - generalOffset.x - cx;
    let distY = py - generalOffset.y - cy;
    let distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}