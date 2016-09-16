const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
}) => {
    return {acceleration, velocity, position, mass}
}
const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
   	
   	//update the position by the velocity
   	position[0] = position[0] + velocity[0] * delta
   	position[1] = position[1] + velocity[1] * delta
   	//particles should wrap around the world
   	if (position[0] > 800){
   		position[0] = 799
   		velocity[0] = -velocity[0]
   	}
   	if (position[0] < 0){
   		position[0] = 1
   		velocity[0] = -velocity[0]
   	}
   	if (position[1] > 800){
   		position[1] = 799
   		velocity[1] = -velocity[1]
   	}
   	if (position[1] < 0){
   		position[1] = 1
   		velocity[1] = -velocity[1]
   	}
   	//update the velocity by the acceleration
   	velocity[0] = velocity[0] + acceleration[0] * delta
   	velocity[1] = velocity[1] + acceleration[1] * delta
    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
