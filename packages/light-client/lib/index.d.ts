import { phase0, RootHex, SyncPeriod, allForks } from "@lodestar/types";
import { BeaconConfig, ChainForkConfig } from "@lodestar/config";
import { LightclientEmitter } from "./events.js";
import { ILcLogger } from "./utils/logger.js";
import { ProcessUpdateOpts } from "./spec/processLightClientUpdate.js";
import { LightClientTransport } from "./transport/interface.js";
export { LightclientEvent } from "./events.js";
export { SyncCommitteeFast } from "./types.js";
export type GenesisData = {
    genesisTime: number;
    genesisValidatorsRoot: RootHex | Uint8Array;
};
export type LightclientOpts = ProcessUpdateOpts;
export type LightclientInitArgs = {
    config: ChainForkConfig;
    logger?: ILcLogger;
    opts?: LightclientOpts;
    genesisData: GenesisData;
    transport: LightClientTransport;
    bootstrap: allForks.LightClientBootstrap;
};
/**
 * Server-based Lightclient. Current architecture diverges from the spec's proposed updated splitting them into:
 * - Sync period updates: To advance to the next sync committee
 * - Header updates: To get a more recent header signed by a known sync committee
 *
 * To stay synced to the current sync period it needs:
 * - GET lightclient/committee_updates at least once per period.
 *
 * To get continuous header updates:
 * - subscribe to SSE type lightclient_update
 *
 * To initialize, it needs:
 * - GenesisData: To initialize the clock and verify signatures
 *   - For known networks it's hardcoded in the source
 *   - For unknown networks it can be provided by the user with a manual input
 *   - For unknown test networks it can be queried from a trusted node at GET beacon/genesis
 * - `beaconApiUrl`: To connect to a trustless beacon node
 * - `LightclientStore`: To have an initial trusted SyncCommittee to start the sync
 *   - For new lightclient instances, it can be queries from a trustless node at GET lightclient/bootstrap
 *   - For existing lightclient instances, it should be retrieved from storage
 *
 * When to trigger a committee update sync:
 *
 *  period 0         period 1         period 2
 * -|----------------|----------------|----------------|-> time
 *              | now
 *               - active current_sync_committee
 *               - known next_sync_committee, signed by current_sync_committee
 *
 * - No need to query for period 0 next_sync_committee until the end of period 0
 * - During most of period 0, current_sync_committee known, next_sync_committee unknown
 * - At the end of period 0, get a sync committee update, and populate period 1's committee
 *
 * syncCommittees: Map<SyncPeriod, SyncCommittee>, limited to max of 2 items
 */
export declare class Lightclient {
    readonly emitter: LightclientEmitter;
    readonly config: BeaconConfig;
    readonly logger: ILcLogger;
    readonly genesisValidatorsRoot: Uint8Array;
    readonly genesisTime: number;
    private readonly transport;
    private readonly lightclientSpec;
    private status;
    constructor({ config, logger, genesisData, bootstrap, transport }: LightclientInitArgs);
    get currentSlot(): number;
    static initializeFromCheckpointRoot(args: Omit<LightclientInitArgs, "bootstrap"> & {
        checkpointRoot: phase0.Checkpoint["root"];
    }): Promise<Lightclient>;
    start(): void;
    stop(): void;
    getHead(): allForks.LightClientHeader;
    sync(fromPeriod: SyncPeriod, toPeriod: SyncPeriod): Promise<void>;
    private runLoop;
    /**
     * Processes new optimistic header updates in only known synced sync periods.
     * This headerUpdate may update the head if there's enough participation.
     */
    private processOptimisticUpdate;
    /**
     * Processes new header updates in only known synced sync periods.
     * This headerUpdate may update the head if there's enough participation.
     */
    private processFinalizedUpdate;
    private processSyncCommitteeUpdate;
    private currentSlotWithTolerance;
}
//# sourceMappingURL=index.d.ts.map