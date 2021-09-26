import Heap from 'heap-js';
import { IActionDescription } from '../src/aiEntities/iActionDescription';
import { IAiAction } from '../src/aiEntities/iAiAction';
import { IAiNpc } from '../src/aiEntities/iAiNpc';
export class StubAiNpc implements IAiNpc {

    id: number;
    isDead: boolean;
    isUnconscious: boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Array<IAiAction>;
    aiFlags: Map<string, number | string>;
    actionDescriptions: IActionDescription[];
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    startPoint: string | undefined;
    startWorld: string | undefined;
    npcInstance: string;
    constructor(id: number) {
        this.id = id
        this.isDead = false
        this.isUnconscious = false
        this.enemyIds = []
        this.friendIds = []
        this.respawnTime = 100
        this.nextActions = new Array<IAiAction>()
        this.aiFlags = new Map()
        this.actionDescriptions = []
        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.startPoint = "HAFEN"
        this.startWorld = "NEWWORLD\\NEWWORLD.ZEN"
        this.npcInstance = ""
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}
