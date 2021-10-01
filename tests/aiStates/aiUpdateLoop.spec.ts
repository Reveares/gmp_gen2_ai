import {AiUpdateLoop} from "../../src/aiStates/aiUpdateLoop";
import { mock,verify, instance, when } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';
import { IAiAction } from "../../src/aiEntities/iAiAction";
import { AiState } from "../../src/aiStates/aiState";


class StubAiAction implements IAiAction{
    priority: number;
    aiId: number;
    shouldLoop: boolean;
    constructor(){
        this.priority = 1
        this.aiId = 1
        this.shouldLoop = false
    }
    executeAction(): void {
        console.log("test action")
    }
}

Object.defineProperty(global, "revmp", {
    value: {
        getHealth: (entity:number) => { return {current: 100, max: 100} },
        isCharacter: (entity:number) => { return true }
    },
});



test('Executes for the given id the executeAction() - method of the correct npc.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const aiNpc = new StubAiNpc(1)
    const aiNpc2 = new StubAiNpc(2)
    const action:IAiAction = mock(StubAiAction)
    aiNpc.addAction(instance(action))
    aiState.getEntityManager().registerBot(aiNpc)
    aiState.getEntityManager().registerBot(aiNpc2)
    const updateLoop = new AiUpdateLoop(aiState);
    updateLoop.updateAi(1);
    verify(action.executeAction()).once()
})


test('Executes for the given id the executeAction() - non loopable action should be removed after execution.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const aiNpc = new StubAiNpc(1)

    const nonLoopableAction:IAiAction = mock(StubAiAction)
    when(nonLoopableAction.shouldLoop).thenReturn(false)

    aiNpc.addAction(instance(nonLoopableAction))
    aiState.getEntityManager().registerBot(aiNpc)

    const updateLoop = new AiUpdateLoop(aiState);
    updateLoop.updateAi(1)
    updateLoop.updateAi(1)

    verify(nonLoopableAction.executeAction()).atMost(1)
})


test('Executes for the given id the executeAction() - loopable action should NOT be removed after execution.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const aiNpc = new StubAiNpc(1)

    const nonLoopableAction:IAiAction = mock(StubAiAction)
    when(nonLoopableAction.shouldLoop).thenReturn(true)

    aiNpc.addAction(instance(nonLoopableAction))
    aiState.getEntityManager().registerBot(aiNpc)

    const updateLoop = new AiUpdateLoop(aiState)
    updateLoop.updateAi(1)
    updateLoop.updateAi(1)

    verify(nonLoopableAction.executeAction()).twice()
})

test('After executing all actions of npc. Nothing will happen. Action heap is empty.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const aiNpc = new StubAiNpc(1)

    const nonLoopableAction: IAiAction = mock(StubAiAction)
    when(nonLoopableAction.shouldLoop).thenReturn(false)

    aiNpc.addAction(instance(nonLoopableAction))
    aiState.getEntityManager().registerBot(aiNpc)

    const updateLoop = new AiUpdateLoop(aiState)
    expect(aiNpc.nextActions.length).toBe(1)
    updateLoop.updateAi(1)
    expect(aiNpc.nextActions.length).toBe(0)
    updateLoop.updateAi(1)
    expect(aiNpc.nextActions.length).toBe(0)
})
