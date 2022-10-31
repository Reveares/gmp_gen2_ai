/**
 * @interface IAiPosition
 * Contains position information of an entity.
 *
 * @field lastPosUpdate last time when the position was checked in ticks
 * @field startPoint start waypoint/freepoint
 * @field startWorld start world
 * */

export interface IAiPosition {
    entityId:number,
    lastPosUpdate:number,
    startPoint:string|undefined,
    startWorld:string|undefined,
}
