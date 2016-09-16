import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0,{width : 800, height : 800})
        expect(position[0]).to.closeTo(1.5, 0)
        expect(position[1]).to.closeTo(0.5, 0)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, {width : 800, height : 800}) // dt is different here
        expect(position[0]).to.closeTo(2.0, 0)
        expect(position[1]).to.closeTo(0, 0)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ position: [1, 1], acceleration: [0.1, 0.1], velocity: [1, 1]})
        const { velocity } = update(p, 1.0, {width : 800, height : 800})
        expect(velocity[0]).to.closeTo(1.1, 0)
        expect(velocity[1]).to.closeTo(1.1, 0)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        let p = particle({ position: [-10000, 100]})
        expect(update(p, 0, {width : 800, height : 800}).position[0]).to.be.within(0, 800)
        expect(update(p, 0, {width : 800, height : 800}).position[1]).to.be.within(0, 800)

        p = particle({ position: [1000, 100]})
        expect(update(p, 1.0, {width : 800, height : 800}).position[0]).to.be.within(0, 800)
        expect(update(p, 1.0, {width : 800, height : 800}).position[1]).to.be.within(0, 800)

        p = particle({ position: [100, -100]})
        expect(update(p, 1.0, {width : 800, height : 800}).position[0]).to.be.within(0, 800)
        expect(update(p, 1.0, {width : 800, height : 800}).position[1]).to.be.within(0, 800)

        p = particle({ position: [100, 1000]})
        expect(update(p, 1.0, {width : 800, height : 800}).position[0]).to.be.within(0, 800)
        expect(update(p, 1.0, {width : 800, height : 800}).position[1]).to.be.within(0, 800)

        
        

    })

})
