
import { IActionComponent } from "../aiEntities/components/iActionsComponent";
import { IDrInfoComponent } from "../aiEntities/components/iDrInfoComponent";
import { INpcStateComponent } from "../aiEntities/components/iNpcStateComponent";
import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IRespawnComponent } from "../aiEntities/components/iRespawnComponent";
import { IActionDescriptionComponent } from "../aiEntities/components/iActionDescriptionComponent";
import { IEnemyComponent } from "../aiEntities/components/iEnemyComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { IActionHistoryComponent } from "../aiEntities/components/iActionHistoryComponent";
import { IAttackEventComponent } from "../aiEntities/components/iAttackEventComponent";

const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
/**
 * Class that contains all lookups between the entity id and it's components.
 * TODO: document the different components and the interface.
 */
export class EntityManager {

    private dailyRoutineComponents:Map<number, IDrInfoComponent>;
    private actionsComponents:Map<number, IActionComponent>;
    private actionDescriptionComponents: Map<number, IActionDescriptionComponent>;
    private positionsComponents:Map<number, IPositionComponent>;
    private npcStateComponents:Map<number, INpcStateComponent>;
    private respawnComponents:Map<number, IRespawnComponent>;
    private enemyComponents: Map<number, IEnemyComponent>;
    private actionHistoryComponents: Map<number, IActionHistoryComponent>;
    private attackEventComponents: Map<number, IAttackEventComponent>;

    constructor() {
        this.dailyRoutineComponents = new Map()
        this.actionsComponents = new Map()
        this.actionDescriptionComponents = new Map()
        this.positionsComponents = new Map()
        this.npcStateComponents = new Map()
        this.respawnComponents = new Map()
        this.enemyComponents = new Map()
        this.actionHistoryComponents = new Map()
        this.attackEventComponents = new Map()
    }

    //todo: add more functionality once revmp functions are available
    registerBot(npc: IAiNpc): void{
        const stateInfo:INpcStateComponent = {entityId: npc.id, isDead:false, isUnconscious: false, npcInstance: npc.npcInstance}
        const respawnInfo:IRespawnComponent = {entityId: npc.id, respawnTime: npc.respawnTime, deathTime: -1}
        const actionInfo:IActionComponent = {entityId: npc.id}
        const positionInfo:IPositionComponent = {entityId: npc.id, currentPosX:0, currentPosY:0, currentPosZ:0, lastPosX:0, lastPosY: 0, lastPosZ: 0, lastPosUpdate: 0, startWorld: npc.startWorld, startPoint: npc.startPoint}
        const actionDescription:IActionDescriptionComponent = {entityId: npc.id, descriptions: npc.actionDescriptions}
        const actionHistory:IActionHistoryComponent = {entityId: npc.id, lastAttackTime: 0}
        const attackEvent:IAttackEventComponent = {isUnderAttack: false, attackedBy: -1}

        this.setNpcStateComponent(npc.id, stateInfo)
        this.setRespawnComponent(npc.id, respawnInfo)
        this.setActionsComponent(npc.id, actionInfo)
        this.setPositionsComponent(npc.id, positionInfo)
        this.setActionDescriptionComponent(npc.id, actionDescription)
        this.setActionHistoryComponent(npc.id, actionHistory)
    }

    unregisterBot(npcId: number): void{
        this.npcStateComponents.delete(npcId)
        this.respawnComponents.delete(npcId)
        this.actionsComponents.delete(npcId)
        this.positionsComponents.delete(npcId)
        this.actionDescriptionComponents.delete(npcId)
        this.enemyComponents.delete(npcId)
    }

    getDailyRoutineComponent(entityId: number): IDrInfoComponent|undefined{
        return this.dailyRoutineComponents.get(entityId);
    }

    setDailyRoutineComponent(entityId: number, component: IDrInfoComponent){
        this.dailyRoutineComponents.set(entityId, component)
    }

    getActionsComponent(entityId: number): IActionComponent|undefined{
        return this.actionsComponents.get(entityId);
    }

    setActionsComponent(entityId: number, component: IActionComponent){
        this.actionsComponents.set(entityId, component)
    }

    getActionDescriptionComponent(entityId: number): IActionDescriptionComponent | undefined {
        return this.actionDescriptionComponents.get(entityId);
    }

    setActionDescriptionComponent(entityId: number, component: IActionDescriptionComponent) {
        this.actionDescriptionComponents.set(entityId, component)
    }

    getPositionsComponents(entityId: number): IPositionComponent|undefined{
        return this.positionsComponents.get(entityId);
    }

    setPositionsComponent(entityId: number, component: IPositionComponent){
        this.positionsComponents.set(entityId, component)
    }

    getNpcStateComponent(entityId: number): INpcStateComponent|undefined{
        return this.npcStateComponents.get(entityId);
    }
    setNpcStateComponent(entityId: number, component: INpcStateComponent){
        this.npcStateComponents.set(entityId, component)
    }

    getRespawnComponent(entityId: number): IRespawnComponent|undefined{
        return this.respawnComponents.get(entityId);
    }

    setRespawnComponent(entityId: number, component: IRespawnComponent){
        this.respawnComponents.set(entityId, component)
    }

    getEnemyComponent(entityId: number): IEnemyComponent | undefined {
        return this.enemyComponents.get(entityId);
    }

    setEnemyComponent(entityId: number, component: IEnemyComponent) {
        this.enemyComponents.set(entityId, component)
    }
    deleteEnemyComponent(entityId: number) {
        this.enemyComponents.delete(entityId)
    }

    getActionHistoryComponent(entityId: number): IActionHistoryComponent | undefined {
        return this.actionHistoryComponents.get(entityId);
    }
    setActionHistoryComponent(entityId: number, component: IActionHistoryComponent) {
        this.actionHistoryComponents.set(entityId, component)
    }
    getAttackEventComponent(entityId: number): IAttackEventComponent | undefined {
        return this.attackEventComponents.get(entityId);
    }
    setAttackEventComponent(entityId: number, component: IAttackEventComponent) {
        this.attackEventComponents.set(entityId, component)
    }
}
