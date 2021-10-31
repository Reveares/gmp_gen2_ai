
import { IActionDescription } from "../iActionDescription";
import { HeavyCrimminalDescription } from "../descriptions/heavyCrimminalDescription";
import { WeaponInstances } from "../../serverComponents/weapons";
import { ArmorInstances } from "../../serverComponents/armors";
import { IAiNpc } from "../iAiNpc";
import { getHeavyCrimminalInstance, INSTANCE_HEAVY_CRIMMINAL} from "./npcInits";
import { OrcMasterDescription } from "../descriptions/orcMasterDescription";

export class HeavyCrimminal implements IAiNpc {
    enemyIds: number[];
    friendIds: number[];
    respawnTime: number;
    actionDescriptions: Array<IActionDescription>;
    aiFlags: Map<string, string | number>;
    id: number;
    isDead: boolean;
    isUnconscious: boolean;
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    startPoint:string|undefined;
    startWorld:string|undefined;
    npcInstance:string;


    constructor() {
        this.id = revmp.createBot(getHeavyCrimminalInstance());
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.actionDescriptions = [new OrcMasterDescription(this.id)]
        this.aiFlags = new Map();

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_HEAVY_CRIMMINAL

        revmp.addOverlay(this.id, "Humans_1hST2.MDS")
        revmp.setAttributes(this.id, {oneHanded: 100})
        revmp.addItem(this.id, WeaponInstances.nobleSword, 1);
        revmp.addItem(this.id, ArmorInstances.guardianArmor, 1);
        revmp.equipItem(this.id, WeaponInstances.nobleSword)
        revmp.equipItem(this.id, ArmorInstances.guardianArmor)
    }
}
