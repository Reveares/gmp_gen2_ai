import { IAiPosition } from "../aiEntities/components/iAiPosition";
import {Vector3} from "three";

export function updateGotoPos(npcPosition: IAiPosition, nextPos: Vector3): [Vector3, number] {
    const currentPosArray = revmp.getPosition(npcPosition.entityId).position;
    const currentPos = new Vector3(...currentPosArray);
    let distance = currentPos.distanceTo(nextPos);
    if (npcPosition.lastPosUpdate + 30 <= revmp.tick) {
        if (distance < 2) {
            currentPos.lerp(nextPos, 0.1);
            console.log(currentPos)
            distance = currentPos.distanceTo(nextPos);
            revmp.setPosition(npcPosition.entityId, currentPos.toArray(currentPosArray));
        }
        npcPosition.lastPosUpdate = revmp.tick;
    }
    return [currentPos, distance];
}
