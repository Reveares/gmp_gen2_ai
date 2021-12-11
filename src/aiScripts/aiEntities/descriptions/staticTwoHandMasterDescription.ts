import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { ForwardAttackWithPause} from '../actions/fightActions';
import { gotoStartPoint, setActionWhenUndefined, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { getActionsComponent, getEnemyComponent } from '../../aiStates/aiStateFunctions';

export class StaticTwoHandMaster implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 300 
    }

    describeAction(aiState: AiState): void {
        if (revmp.valid(this.entityId)) {
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const template: IDefaultDescriptionTemplateValues = {
            aiId: this.entityId,
            aiState: aiState,
            attackRange: this.attackRange,
            onAiAttacks: this.describeAttackAction.bind(this),
            onIdle: this.describeIdleAction.bind(this),
            onAiEnemyDies: gotoStartPoint,
            onEnemyInWarnRange: warnEnemy,
            onEnemyOutOfRange: gotoStartPoint,
            onEnemyDisconnected: gotoStartPoint,
            onAiIsAttacked: setAttackerToEnemy
        }
        describeGeneralRoutine(template)
    }

    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)
        const enemyId = getEnemyComponent(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeIdleAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
    }

}