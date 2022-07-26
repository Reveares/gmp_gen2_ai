
import { AiDialogueHandler } from "./aiStates/aiDialogueHandler";
import { AiEventHandler } from "./aiStates/aiEventHandler";
import { AiState } from "./aiStates/aiState";
import { AiUpdateLoop } from "./aiStates/aiUpdateLoop";
import { AiWorldStateEventHandler } from "./aiStates/aiWorldStateEventHandler";
import { initNewWorldNpcs } from "./initNewWorldNpcs";



export function initAiState(waynet?: revmp.Waynet): AiState {
    // TODO: Avoid fixed paths
    const aiState = new AiState('./waynet/newworld.wp', './waynet/newworld.fp', waynet)
    const updateLoop = new AiUpdateLoop(aiState)
    const worldStateEventHandler = new AiWorldStateEventHandler(aiState)
    const dialogueHandler = new AiDialogueHandler(aiState)
    const aiEventHandler = new AiEventHandler(aiState, worldStateEventHandler, dialogueHandler)


    aiEventHandler.initEventHandler()
    setInterval(updateLoop.updateAll.bind(updateLoop), 50);
    /*const testMonster = new OrcElite()
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster, "HAFEN", "NEWWORLD\\NEWWORLD.ZEN")
    */
    initNewWorldNpcs(aiState)
    return aiState
}